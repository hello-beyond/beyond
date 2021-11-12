const {ipc} = global.utils;

/**
 * The collection of BeyondJS bundles imported by the application
 */
module.exports = class extends Map {
    #is;
    #application;
    get application() {
        return this.#application;
    }

    #errors = {general: [], bundles: new Map()};
    get errors() {
        return this.#errors;
    }

    get valid() {
        const {general, bundles} = this.#errors;
        return !general.length && !bundles.size;
    }

    /**
     * Bundles collection constructor
     *
     * @param is {string} The type of bee: can be 'backend', 'node', 'ssr'
     * @param application {string} The application id
     */
    constructor(is, application) {
        super();
        this.#is = is;
        this.#application = application;
        require('./bimport')(this);
    }

    /**
     * Import a bundle or a list of bundles
     *
     * @param required {string | string[]} The bundle that are required to be imported
     * @return {Promise<void>}
     */
    async import(required) {
        if (!this.valid) return;

        required = typeof required === 'string' ? [required] : required;
        if (!(required instanceof Array)) throw new Error('Invalid parameters');

        // Filter the already loaded bundles
        required = required.filter(bundle => !this.has(bundle));

        // No bundles are required to be loaded
        if (!required.length) return;

        try {
            const distribution = (require('./distribution'))(this.#is);

            // Request the code of the bundles by IPC
            const params = [this.#application, required, distribution];

            const response = await ipc.exec('main-client', 'code/get', ...params);
            const loaded = new Map(response);

            // Check for errors
            const errors = this.#errors.bundles;
            loaded.forEach(({error}, resource) => error && errors.set(resource, error));
            if (!this.valid) return;

            // Check if any of the requested bundles were not found
            required.forEach(resource => !loaded.has(resource) && errors.push(resource, 'Resource not found'));
            if (!this.valid) return;

            // Load the required dependencies of the bundles recently loaded
            const dependencies = new Set();
            loaded.forEach(({dependencies: d}) => d.forEach(({resource, kind}) => {
                ['bundle', 'transversal'].includes(kind) && dependencies.add(resource);
            }));

            dependencies.size && await this.import([...dependencies]);

            // Instantiate the bundles that has been loaded
            loaded.forEach(({is, code, map, dependencies}, id) =>
                this.set(id, new (require('./bundle'))(this, is, id, code, map)));
        }
        catch (exc) {
            console.log(`Error getting bundles: ${[...required]}`, exc.stack);
            this.#errors.general.push(`Error getting bundles: ${[...required]}: ${exc.message}`);
            return;
        }

        this.#compile();
    }

    #compile() {
        if (!this.valid) return;

        for (const bundle of this.values()) {
            if (bundle.compiled) continue;
            bundle.compile();

            if (bundle.error) {
                this.#errors.bundles.set(bundle.id, bundle.error);
                break;
            }
        }
    }
}
