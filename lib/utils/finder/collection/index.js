const ConfigurableFinder = require('../configurable');
const DynamicProcessor = require('../../dynamic-processor')(Map);

class FinderCollection extends DynamicProcessor {
    get dp() {
        return 'utils.finder-collection';
    }

    #finder;
    #items;
    get items() {
        return this.#items;
    }

    get ready() {
        return this.#finder.ready.then(() => super.ready);
    }

    get watcher() {
        return this.#finder.watcher;
    }

    get path() {
        return this.#finder.path;
    }

    get specs() {
        return this.#finder.specs;
    }

    get filename() {
        return this.#finder.filename;
    }

    get extname() {
        return this.#finder.extname;
    }

    get errors() {
        return this.#finder.errors;
    }

    get warnings() {
        return this.#finder.warnings;
    }

    get missing() {
        return this.#finder.missing;
    }

    /**
     * FinderCollection constructor
     *
     * @param watcher {object} The fs watcher
     * @param Item {object} The collection item
     * @param specs= {{items: object}} Finder additional specifications
     */
    constructor(watcher, Item, specs) {
        super();

        if (watcher && !(watcher instanceof global.utils.watchers.BackgroundWatcher)) {
            throw new Error('watcher parameter is not a valid background watcher');
        }

        this.#finder = new ConfigurableFinder(watcher);
        this.#finder.on('initialised', this._invalidate);
        this.#finder.on('change', this._onChanged);
        this.#finder.on('file.change', this._onFileChanged);

        specs = specs ? specs : {};
        this.#items = new (require('./items'))(this, this.#finder, Item, specs.items);
    }

    _invalidate = () => super._invalidate();

    _onChanged = (file, reason) => {
        void (file);
        void (reason);
        this._invalidate();
    }

    _onFileChanged = (file) => {
        this.#items.fileChanged(file);
        this._events.emit('file.change');
    };

    #initialising = false;
    get initialising() {
        return this.#initialising || super.initialising;
    }

    async initialise() {
        if (this.initialised || this.#initialising) return;
        this.#initialising = true;

        this.#finder.initialise();

        await super.initialise();
        this.#initialising = false;
    }

    /**
     * Access to the .has(key) method of the items map
     *
     * @param file {object | string}
     */
    has = file => {
        if (!this.#finder.path) return false;
        if (super.has(file)) return super.has(file);
        const key = this.#items.getKey(this.#finder._getFileObject(file));
        return super.has(key);
    }

    /**
     * Access to the .get(key) method of the items map
     *
     * @param file {object | string}
     */
    get = file => {
        if (!this.#finder.path) return;
        if (super.has(file)) return super.get(file);
        const key = this.#items.getKey(this.#finder._getFileObject(file));
        return super.get(key);
    }

    _prepared() {
        return this.#finder.processed;
    }

    _process() {
        this.#items.update();
    }

    configure(path, specs) {
        this.#finder.configure(path, specs);
    }

    // forEach must respect the order of the files arranged by the finder
    forEach(callback) {
        this.#items.ordered.forEach(key => callback(super.get(key), key));
    }

    entries() {
        const entries = [];
        this.#items.ordered.forEach(key => entries.push([key, super.get(key)]));
        return entries.values();
    };

    get ordered() {
        return this.#items.ordered;
    }

    [Symbol.iterator] = () => {
        return this.entries();
    };

    keys() {
        const keys = [];
        this.#items.ordered.forEach(key => keys.push(key));
        return keys.values();
    }

    values() {
        const values = [];
        this.#items.ordered.forEach(key => values.push(super.get(key)));
        return values.values();
    }

    destroy() {
        super.destroy();
        this.#items.clear();
        this.#finder.destroy();
    }
}

FinderCollection.Item = require('./item');
module.exports = FinderCollection;
