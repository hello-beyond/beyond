module.exports = class {
    #model;

    constructor(model) {
        this.#model = model;
    }

    sources = require('./sources');

    async list(id) {
        const output = {};
        const template = new this.#model.Template(`application//${id}`);
        await template.ready;
        if (template.error) return;

        await template.global.ready;

        const processor = template.global.processors.get(this.#model.webDistribution());
        await processor.ready;
        if (!processor.valid || !processor.instance) return;

        await processor.instance.files.ready;

        const promises = [];
        processor.instance.files.forEach(source => promises.push(source.ready));
        await Promise.all(promises);

        const sources = this.sources(processor.instance.files);
        if (!sources) return;

        output[id] = sources;
        return output;
    }

    async get(ids) {
        if (!(ids instanceof Array)) throw new Error('Invalid parameters');
        if (!ids.length) return;

        const appIds = ids.map(id => id.split('//').slice(0, 2).join('//'));

        const collection = new this.#model.Collection(this.#model.Template, appIds);
        await collection.ready;

        const promises = [];
        collection.forEach(t => promises.push(t.global.ready));
        await Promise.all(promises);

        promises.size = 0;
        collection.forEach(template =>
            promises.push(template.global.processors.get(this.#model.webDistribution()).ready)
        );
        await Promise.all(promises);

        promises.size = 0;
        collection.forEach(template => {
            const processor = template.global.processors.get(this.#model.webDistribution());
            if (!processor.valid || !processor.instance) return;
            promises.push(processor.instance.files.ready);
        });
        await Promise.all(promises);

        promises.size = 0;
        collection.forEach(template => {
            const processor = template.global.processors.get(this.#model.webDistribution());
            processor.instance.files.forEach(source => promises.push(source.ready));
        });
        await Promise.all(promises);

        const output = {};
        collection.forEach(template => {
            const processor = template.global.processors.get(this.#model.webDistribution());
            const sources = this.sources(processor.instance.files);
            const source = sources.find(source => ids.includes(source.id));
            output[source.id] = source;
        });

        return output;
    }
}