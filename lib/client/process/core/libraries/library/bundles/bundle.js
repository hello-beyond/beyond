const DynamicProcessor = global.utils.DynamicProcessor();
const {equal} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'library.bundle';
    }

    #name;
    #library;

    #path;
    get path() {
        return this.#path;
    }

    #configured = false;
    #config = {};

    get value() {
        return this.#config.processed;
    }

    #errors = [];
    get errors() {
        return this.#errors;
    }

    get valid() {
        return !this.#errors.length;
    }

    #destroyed = false;
    get destroyed() {
        return this.#destroyed;
    }

    /**
     * Bundle configuration constructor
     *
     * @param name {string} The bundle's name
     * @param library {object} The library object
     */
    constructor(name, library) {
        if (!name || !library) throw new Error('Invalid parameters');
        super();

        this.#name = name;
        this.#library = library;
    }

    _prepared() {
        return this.#configured;
    }

    _process() {
        const library = this.#library;
        const {input} = this.#config;

        const path = input.path ? require('path').join(library.path, input.path) : library.path;
        delete input.path;

        if (this.#path === path && equal(input, this.#config.processed)) return;

        this.#errors = typeof input === 'object' ? [] : ['Bundle configuration should be an object'];
        this.#path = path;
        this.#config.processed = input;
    }

    configure(config) {
        this.#config.input = config;
        this.#configured = true;
        this._invalidate();
    }
}
