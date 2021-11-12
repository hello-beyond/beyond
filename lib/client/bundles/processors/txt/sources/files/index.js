const {FinderCollection} = global.utils;
const Source = require('./source');

module.exports = class extends FinderCollection {
    #specs
    get specs() {
        return this.#specs;
    }

    #hash;
    get hash() {
        return this.#hash;
    }

    constructor(specs) {
        const {watcher} = specs;
        super(watcher, Source, {items: {subscriptions: ['initialised', 'change']}});

        this.#specs = specs;
        this.#hash = new (require('../hash'))(this);
    }

    configure(path, config) {
        super.configure(path, config);
    }
}
