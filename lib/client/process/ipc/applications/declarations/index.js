const {ipc} = global.utils;

/**
 * Call the declarations. Update method of the Application object to generate all declarations.
 * The changes of the declarations state will be notified to the client through the notify method of the application object.
 * @param {object} core Core of the client process
 */
module.exports = class {
    #model;
    #declarations = new Map();

    constructor(model) {
        this.#model = model;
    };

    packagers = require('./packagers');

    async #updateAll(application) {
        const packagers = await this.packagers(application, this.#model);

        const processed = new Set();
        const total = packagers.size;
        ipc.notify(`declarations-save`, {total: total, applicationId: application.item.id});

        const processDeclaration = async declaration => {
            if (processed.has(declaration.id)) return;

            const dependencies = declaration.packager.dependencies;
            await dependencies.ready;

            const promises = [];
            dependencies.forEach(dependency => promises.push(dependency.ready));
            await Promise.all(promises);

            for (const dependency of dependencies.values()) {
                if (!dependency.valid) continue;
                if (dependency.kind !== 'bundle') continue;
                const {bundle} = dependency;
                const {declaration} = bundle.packagers.get(this.#model.distribution());
                await processDeclaration(declaration);
            }

            await declaration.ready;
            const {id, valid} = declaration;

            const notify = error => ipc.notify(`declarations-save`, {
                total: total,
                applicationId: application.item.id,
                item: {id: id, valid: valid && !error}
            });

            if (!valid) return notify();
            try {
                await declaration.save();
            }
            catch (exc) {
                notify({error: exc.message});
                return;
            }
            notify();
            processed.add(id);
            this.#declarations.set(id, declaration);
        }

        for (const packager of packagers.values()) {
            const {declaration} = packager;
            await processDeclaration(declaration);
        }
    };

    async updateAll(params) {
        const {applicationId} = params;
        const application = new this.#model.Application(`application//${applicationId}`);
        await application.ready;

        if (application.error) {
            console.error(`Application "${applicationId}" not found`);
            return;
        }

        this.#updateAll(application).catch(exc => console.error(exc.stack));
    }

    async update(params) {
        const {id, applicationId} = params;

        const application = new this.#model.Application(`application//${applicationId}`);
        await application.ready;

        if (application.error) {
            console.error(`Application "${applicationId}" not found`);
            return;
        }

        if (this.#declarations.has(id)) {
            const declaration = this.#declarations.get(id);
            await declaration.ready;
            await declaration.save();
            this.#declarations.set(declaration.id, declaration);

            return;
        }

        const packagers = await this.packagers(application, this.#model);
        const packager = packagers.get(id);
        await packager.declaration.ready;

        if (!packager.declaration.valid) {
            return {error: `Error creating module declaration: ${packager.declaration.id}`};
        }

        await packager.declaration.save();
        this.#declarations.set(packager.declaration.id, packager.declaration);
    }
}