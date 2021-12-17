module.exports = class {
    #model;

    constructor(model) {
        this.#model = model;
    }

    async list(ids) {
        if (!(ids instanceof Array)) throw new Error('Invalid parameters');
        if (!ids.length) return;

        const bundles = new this.#model.Collection(this.#model.Bundle, ids);
        await bundles.ready;

        // Wait for all packagers to be ready
        const promises = [];
        bundles.forEach(bundle => {
            if (bundle.error) return;
            const packager = bundle.packagers.get(this.#model.distribution());
            promises.push(packager.ready);
        });
        await Promise.all(promises);

        // Wait for all consumers to be ready
        promises.length = 0;
        bundles.forEach(bundle => {
            if (bundle.error) return;
            const packager = bundle.packagers.get(this.#model.distribution());
            promises.push(packager.consumers.ready);
        });
        await Promise.all(promises);

        const output = {};
        bundles.forEach(bundle => {
            if (bundle.error) return;
            const packager = bundle.packagers.get(this.#model.distribution());

            const items = [];
            packager.consumers.forEach(consumer => items.push({
                id: `${bundle.id}///${consumer.id}`,
                bundle: consumer.id
            }));
            output[bundle.id] = items;
        });

        return output;
    }

    async get(ids) {
        if (!(ids instanceof Array)) throw new Error('Invalid parameters');
        if (!ids.length) return;

        const output = {};
        ids.forEach(id => {
            const consumerId = id.split('///');
            output[id] = {id: id, bundle: consumerId[1]}
        });

        return output;
    }
}
