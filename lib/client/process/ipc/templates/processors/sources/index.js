//TODO [@box pendiente] no se obtienen los errors y warnings
module.exports = class {
    #model;
    #Application;

    constructor(model) {
        this.#model = model;
        this.#Application = model.Application;
    }

    detail = require('./detail');
    prepare = require('./prepare');

    /**
     * @param ids:[appId//processorName]
     */
    async list(ids) {
        if (!(ids instanceof Array)) throw new Error('Invalid parameters');
        if (!ids.length) return;

        const regex = /\/\/[a-zA-z]*/;
        const appIds = ids.map(id => `application//${id.replace(regex, '')}`);

        const collection = new this.#model.Collection(this.#model.Template, appIds);
        await this.prepare(collection);

        const output = {};
        for (const id of ids) {
            const [applicationId, processorName] = id.split('//');

            const template = collection.get(`application//${applicationId}`);
            if (template.error || !template.processors.has(processorName)) continue;

            const distribution = {dashboard: true, key: 'dashboard'};
            const processor = template.processors[processorName].get(distribution);
            await processor.ready;
            if (!processor.valid || !processor.instance) continue;

            await processor.instance.files.ready;

            const promises = [];
            processor.instance.files.forEach(source => promises.push(source.ready));
            await Promise.all(promises);

            output[id] = [...processor.instance.files.values()].map(item => this.detail(id, processorName, item));
        }

        return output;
    }

    /**
     * @param ids:[appId//processorName//filename]
     */
    async get(ids) {
        if (!(ids instanceof Array)) throw new Error('Invalid parameters');
        if (!ids.length) return;

        const regex = /\/\/.*/;
        const appIds = ids.map(id => `application//${id.replace(regex, '')}`);

        const collection = new this.#model.Collection(this.#model.Template, appIds);
        await this.prepare(collection);

        const output = {};
        for (const id of ids) {
            const [applicationId, processorName, filename] = id.split('//');
            const template = collection.get(`application//${applicationId}`);
            if (template.error || !template.processors.has(processorName)) continue;

            const processor = template.processors.get(processorName);
            if (!processor.valid) continue;

            const source = output[id] = [...processor.files.values()].find(i => i.filename === filename);
            if (!source) continue;
            output[id] = this.detail(`${applicationId}//${processorName}`, processorName, source);
        }

        return output;
    }
}
