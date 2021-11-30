const {FinderCollection} = global.utils;
const Source = require('./source');
const {equal} = global.utils;

module.exports = class extends FinderCollection {
    #processorName;
    get processorName() {
        return this.#processorName;
    }

    #specs
    get specs() {
        return this.#specs;
    }

    #path;
    #config;
    #extname;
    get extname() {
        return this.#extname;
    }

    #hash;
    get hash() {
        return this.#hash;
    }

    /**
     * Processor overwrites constructor
     *
     * @param processorName {string} The processor name
     * @param specs {{bundle: {id: string, resource: string, name: string, container: {is: string}, path: string, pathname: string}, distribution: object, application: object, watcher: object}}
     * @param extname {string[]} The files extensions array
     */
    constructor(processorName, specs, extname) {
        const {watcher} = specs;
        super(watcher, Source, {items: {subscriptions: ['initialised', 'change']}});

        this.#processorName = processorName;
        this.#specs = specs;
        this.#extname = extname;

        const {template} = specs.application;
        const to = template.overwrites.get(specs.bundle.resource);
        super.setup(new Map([['template.overwrites', {child: to}]]));

        this.#hash = new (require('../hash'))(this);
    }

    _prepared() {
        const to = this.children.get('template.overwrites').child;
        const {path, config} = require('./config')(this, to);
        if (path === this.#path && equal(config, this.#config)) return super._prepared;

        this.#path = path;
        this.#config = config;
        super.configure(path, config);
        return false;
    }
}
