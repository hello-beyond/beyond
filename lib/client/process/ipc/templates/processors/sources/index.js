//TODO [@box pendiente] no se obtienen los errors y warnings
module.exports = class {
    #model;
    #Application;

    constructor(model) {
        this.#model = model;
        this.#Application = model.Application;
    }

    source = require('./source');
    prepare = require('./prepare');

    /**
     * @param ids:[template//appId//processorName]
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

            const processor = template.processors[processorName].get(this.#model.distribution());
            await processor.ready;
            if (!processor.valid || !processor.instance) continue;

            await processor.instance.files.ready;

            const promises = [];
            processor.instance.files.forEach(source => promises.push(source.ready));
            await Promise.all(promises);

            output[id] = [...processor.instance.files.values()].map(item => this.source(id, processorName, item));
        }

        return output;
    }

    /**
     * @param ids:[template//appId//processorName//filename]
     */
    async get(ids) {
        if (!(ids instanceof Array)) throw new Error('Invalid parameters');
        if (!ids.length) return;

        const regex = /\/\/[a-zA-z]*\/\/[a-zA-z]*\.[a-zA-z]*/;
        const appIds = ids.map(id => {
            const replace = id.replace(regex, '');
            return replace.replace('template//', '');
        });


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
            output[id] = this.source(`${applicationId}//${processorName}`, processorName, source);
        }

        console.log('template processors output', output)

        return output;
    }
}
