module.exports = class {
    #model;

    constructor(model) {
        this.#model = model;
    }

    async get(ids) {
        if (!(ids instanceof Array)) throw new Error('Invalid parameters');
        if (!ids.length) return;

        const collection = new this.#model.Collection(this.#model.Bundle, ids);
        await collection.ready;

        const packagers = new Map();
        collection.forEach(b =>
            !b.error && packagers.set(b.id, b.packagers.get(this.#model.distribution()))
        );

        const promises = [];
        packagers.forEach(packager => promises.push(packager.ready));
        await Promise.all(promises);

        promises.size = 0;
        packagers.forEach(packager => promises.push(packager.processors.ready));
        await Promise.all(promises);

        const output = {};
        for (const bundle of collection.values()) {
            if (bundle.error) continue;

            const processors = [];
            if (packagers.has(bundle.id)) {
                const packager = packagers.get(bundle.id);
                for (const processor of packager.processors.keys()) {
                    processors.push(`${bundle.id}//${processor}`);
                }
            }

            const data = bundle.toJSON();
            data.processors = processors;
            output[bundle.id] = data;
        }

        return output;
    }
}