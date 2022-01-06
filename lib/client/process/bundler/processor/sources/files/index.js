const {FinderCollection} = global.utils;
const Source = require('./source');

module.exports = class extends FinderCollection {
    #processor;
    get processor() {
        return this.#processor;
    }

    #hash;
    get hash() {
        return this.#hash;
    }

    constructor(processor) {
        const {watcher} = processor.specs;
        super(watcher, Source, {items: {subscriptions: ['initialised', 'change']}});

        this.#processor = processor;
        this.#hash = new (require('../hash'))(this);
    }

    configure(path, config) {
        const {extname} = this.#processor;
        config = config && Object.assign(config, {extname});
        super.configure(path, config);
    }
}
