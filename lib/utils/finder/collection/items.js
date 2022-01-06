/**
 * Collection items manager
 */
module.exports = class {
    #collection;
    #finder;
    #Item;
    #specs;
    #subscriptions = new Map();

    // Ordered array of collection keys
    #ordered = [];
    get ordered() {
        return this.#ordered;
    }

    /**
     * Collection items constructor
     *
     * @param collection {object} The collection that contains the items
     * @param finder {object} The configurable finder
     * @param Item {object} The item of the collection
     * @param specs {{subscriptions: string[]}}
     */
    constructor(collection, finder, Item, specs) {
        if (!Item) throw new Error('Parameter Item is required');
        if (specs && (typeof specs !== 'object' || specs instanceof Array)) {
            throw new Error('Invalid items specification');
        }
        if (specs && specs.subscriptions && !(specs.subscriptions instanceof Array)) {
            throw new Error('Invalid items subscriptions specification');
        }

        specs = specs ? specs : {};
        specs.subscriptions = specs.subscriptions ? specs.subscriptions : [];

        this.#collection = collection;
        this.#finder = finder;
        this.#Item = Item;
        this.#specs = specs;
    }

    get processed() {
        let processed = true;
        this.#collection.forEach(item => processed = processed && item.processed);
        return processed;
    }

    fileChanged(file) {
        const key = this.getKey(file);
        if (!this.#collection.has(key)) return;
        const item = this.#collection.get(key);
        typeof item.fileChanged === 'function' && item.fileChanged();
    }

    getKey = (file) => {
        const normalize = file => file.replace(/\\/g, '/')
            .replace(/\/$/, ''); // Remove trailing slash

        const key = this.#collection.filename ? file.relative.dirname : file.relative.file;
        return normalize(key);
    }

    update() {
        const updated = new Map(), subscriptions = new Map();
        const ordered = [];
        this.#finder.forEach(file => {
            const key = this.getKey(file);
            ordered.push(key);

            let item, listeners;
            if (this.#collection.has(key)) {
                item = this.#collection.get(key);
                listeners = this.#subscriptions.get(key);
            }
            else {
                item = new this.#Item(this.#collection, file);

                listeners = new Map();
                for (const name of this.#specs.subscriptions) {
                    const listener = () => this.#collection._events.emit(`item.${name}`);
                    listeners.set(name, listener);
                    item.on(name, listener);
                }
            }

            updated.set(key, item);
            subscriptions.set(key, listeners);
        });

        // Destroy the resources that are not currently in the collection
        this.#collection.forEach((item, key) => {
            if (updated.has(key)) return;
            item.destroy();
            const listeners = this.#subscriptions.get(key);
            listeners.forEach((listener, name) => item.off(name, listener));
        });

        this.#collection.clear(); // Do not use this.clear, as it will destroy all the previously created items
        this.#subscriptions.clear();
        updated.forEach((item, key) => this.#collection.set(key, item));
        subscriptions.forEach((listeners, key) => this.#subscriptions.set(key, listeners));

        // The assignment of #ordered must be done at the end of the method,
        // because this property is used by the forEach of the collection,
        // which in turn is used by the current method
        this.#ordered = ordered;
    }

    // Used when the path set in the .configure(..) method of the collection changed
    clear() {
        this.#ordered.length = 0;
        this.#collection.forEach(item => item.destroy());
        return this.#collection.clear();
    }
}
