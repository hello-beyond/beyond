const {FinderCollection} = global.utils;

module.exports = class extends FinderCollection {
    #hash;
    get hash() {
        return this.#hash;
    }

    constructor(specs) {
        const {watcher} = specs;
        super(watcher, FinderCollection.Item, {items: {subscriptions: ['initialised', 'change']}});

        this.#hash = new (require('./hash'))(this);
    }

    configure(path, config) {
        super.configure(path, config);
    }
}
