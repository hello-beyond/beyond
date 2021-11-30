const {PathnameParser} = global;
const {ipc} = global.utils;

module.exports = class {
    #model;

    // Cache of application ids from application paths to avoid duplicated IPC calls
    #ids = new Map();

    constructor(model) {
        this.#model = model;
    }

    async get(application, resources, distribution) {
        if (!distribution.local) throw new Error('Distribution is invalid, .local property should be true');

        if (typeof application !== 'number') throw new Error('Invalid parameters');
        resources = typeof resources === 'string' ? [resources] : resources;
        if (!(resources instanceof Array)) throw new Error('Invalid parameters');

        const ids = this.#ids;
        const path = ids.has(application) ? ids.get(application) : await ipc.exec('main', 'ids.path/get', application);
        ids.set(application, path);
        if (!path) throw new Error(`Path of application ${application} not found`);

        // Getting the application object
        const {applications} = this.#model.core;
        await applications.ready;
        if (!applications.has(path)) throw new Error(`Application "${path}" - "${application}" not found`);
        application = applications.get(path);
        await application.ready;
        await application.transversals.ready;

        const promises = new Map();
        const process = async resource => {
            const pathname = (() => {
                // Check if resource is a transversal,
                // in which case, the pathname is just the name of the traversal
                if (application.transversals.has(resource)) return `/${resource}.js`;

                // Check if it is an application package,
                // where the pathname does not include the /packages folder
                const pkg = application.package;
                const appPackage = resource === pkg || resource.startsWith(`${pkg}/`);
                if (appPackage) return `${resource.substr(pkg.length)}.js`;

                // Any other bundle must be in the /packages folder
                return `/packages/${resource}.js`;
            })();

            const parsed = new PathnameParser(application, pathname);
            await parsed.process();
            if (parsed.error) return {error: parsed.error};

            const {error, transversal, bundle} = await parsed.find(distribution);
            if (error) return {error};

            switch (parsed.is) {
                case 'bundle':
                    return await require('./bundle')('bundle', bundle, distribution);
                case 'transversal':
                    return await require('./bundle')('transversal', transversal, distribution);
                case 'processor':
                    return await require('./processor')(bundle, distribution);
            }
        }
        resources.forEach(resource => promises.set(resource, process(resource)));

        try {
            await Promise.all([...promises.values()]);
        }
        catch (exc) {
            console.error(exc.stack);
            return [];
        }

        const output = new Map();
        for (const [id, bundle] of promises) {
            output.set(id, await bundle);
        }

        return [...output];
    }
}
