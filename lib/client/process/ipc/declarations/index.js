module.exports = class {
    #model;

    constructor(model) {
        this.#model = model;
    }

    async get(ids) {
        if (!(ids instanceof Array)) throw new Error('Invalid parameters');
        if (!ids.length) return;

        const output = {};
        const beyondDependencies = [];
        ids.forEach(id => id.includes('application//') && beyondDependencies.push(id));

        const bundles = new this.#model.Collection(this.#model.Bundle, beyondDependencies);
        await bundles.ready;

        const packagers = new Map();
        for (const bundle of bundles.values()) {
            const {application, platforms} = bundle.item.container;
            const distribution = await this.#model.distribution(application.id, bundle, platforms);
            distribution && !bundle.error && packagers.set(bundle.id, bundle.packagers.get(distribution));
        }

        const promises = [];
        packagers.forEach(packager => promises.push(packager.ready));
        await Promise.all(promises);

        promises.size = 0;
        packagers.forEach(packager => promises.push(packager.declaration.ready));
        await Promise.all(promises);

        for (const bundle of bundles.values()) {
            if (bundle.error) continue;

            output[bundle.id] = {id: bundle.id};
            if (!packagers.has(bundle.id)) continue;

            const packager = packagers.get(bundle.id);
            output[bundle.id].code = packager.declaration.code;
            output[bundle.id].processed = packager.declaration.processed;
            output[bundle.id].errors = packager.declaration.errors;
            output[bundle.id].warnings = packager.declaration.warnings;
        }

        return output;
    }
}
