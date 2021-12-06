module.exports = class {
    #model;

    constructor(model) {
        this.#model = model;
    }

    async get(ids) {
        if (!(ids instanceof Array)) throw new Error('Invalid parameters');
        if (!ids.length) return;

        ids = ids.map(id => `application//${id}`);
        const collection = new this.#model.Collection(this.#model.Template, ids);
        await collection.ready;

        const promises = [];
        collection.forEach(template => promises.push(template.global.ready));
        await Promise.all(promises);

        promises.size = 0;
        const distribution = {dashboard: true, key: 'dashboard'};
        collection.forEach(template => {
            const processor = template.global.processors.get(distribution);
            promises.push(processor.ready);
        });
        await Promise.all(promises);

        const output = {};
        for (const template of collection.values()) {
            if (template.error) continue;

            const processor = template.global.processors.get(distribution);
            output[template.id] = {
                id: template.id,
                path: template.global.path,
                processor: processor.instance?.name,
                files: template.global.files,
                errors: template.global.errors,
                warnings: template.global.warnings,
            };
        }

        return output;
    }
}