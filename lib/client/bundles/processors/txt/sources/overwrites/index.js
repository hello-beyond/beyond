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

    #overwrites;
    #extname;

    /**
     * Processor overwrites constructor
     *
     * @param specs {{bundle: {id: string, resource: string, name: string, container: {is: string}, path: string, pathname: string}, distribution: object, application: object, watcher: object}}
     * @param extname {string[]} The files extensions array
     */
    constructor(specs, extname) {
        const {watcher} = specs;
        super(watcher, Source, {items: {subscriptions: ['initialised', 'change']}});

        this.#specs = specs;
        this.#extname = extname;

        const {template} = specs.application;
        this.#overwrites = template.overwrites.get(specs.bundle.resource);
        this.#overwrites.on('change', this.update);
        this.#overwrites.initialised ? this.update() : this.#overwrites.on('initialised', this.update);

        this.#hash = new (require('../hash'))(this);
    }

    update = () => {
        let {config, path} = this.#overwrites;
        if (!path || !config) {
            this.configure();
            return;
        }

        path = require('path').join(this.#overwrites.path, config.path ? config.path : '');

        let includes = typeof config === 'string' || config instanceof Array ? config : config.files;
        includes = typeof includes === 'string' ? [includes] : includes;
        config = {includes: includes, extname: ['.json']};
        super.configure(path, config);
    }

    destroy() {
        this.#overwrites.off('initialised', this.update);
        this.#overwrites.off('change', this.update);
    }
}
