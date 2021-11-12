const {FinderCollection} = global.utils;
const Source = require('./source');

module.exports = class extends FinderCollection {
    #processorName;
    get processorName() {
        return this.#processorName;
    }

    #specs;
    get specs() {
        return this.#specs;
    }

    #hash;
    get hash() {
        return this.#hash;
    }

    constructor(processorName, specs) {
        const {watcher} = specs;
        super(watcher, Source, {items: {subscriptions: ['initialised', 'change']}});

        this.#processorName = processorName;
        this.#specs = specs;

        this.#hash = new (require('../hash'))(this);
    }

    configure(path, config) {
        super.configure(path, config);
    }
}
