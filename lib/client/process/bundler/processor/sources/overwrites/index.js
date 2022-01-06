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

    #overwrites;

    constructor(processor) {
        const {specs} = processor;
        const {watcher} = specs;
        super(watcher, Source, {items: {subscriptions: ['initialised', 'change']}});

        this.#processor = processor;

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

        const {extname} = this.#processor;
        config = {includes: includes, extname};
        super.configure(path, config);
    }

    destroy() {
        this.#overwrites.off('initialised', this.update);
        this.#overwrites.off('change', this.update);
    }
}
