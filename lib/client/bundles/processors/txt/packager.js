/**
 * BeyondJS "txt" native processor compiler
 */
module.exports = class {
    get name() {
        return 'txt';
    }

    #specs;
    get specs() {
        return this.#specs;
    }

    get application() {
        return this.#specs.application;
    }

    get distribution() {
        return this.#specs.distribution;
    }

    get language() {
        return this.#specs.language;
    }

    #path;
    get path() {
        return this.#path;
    }

    get id() {
        return `${this.#specs.bundle.id}//${this.name}`;
    }

    #sources;

    get files() {
        return this.#sources.files;
    }

    get overwrites() {
        return this.#sources.overwrites;
    }

    #compiler;
    get compiler() {
        return this.#compiler;
    }

    #hash;
    get hash() {
        return this.#hash;
    }

    #multilanguage;
    get multilanguage() {
        return this.#multilanguage;
    }

    set multilanguage(value) {
        if (this.#multilanguage === value) return;
        this.#multilanguage = value;
    }

    #errors = [];
    get errors() {
        return this.#errors;
    }

    get valid() {
        return !this.#errors.length;
    }

    #declaration;
    get declaration() {
        return this.#declaration;
    }

    #code;
    get code() {
        return this.#code;
    }

    /**
     * Processor constructor
     *
     * @param specs {{bundle: {id: string, resource: string, name: string, container: {is: string}, path: string, pathname: string}, distribution: object, application: object, watcher: object}}
     */
    constructor(specs) {
        this.#specs = specs;

        const {distribution} = specs;
        let ts = distribution.ts && ['tsc', 'transpiler'].includes(distribution.ts.compiler) && distribution.ts.compiler;
        ts = distribution.dashboard ? 'tsc' : ts;
        ts = ts ? ts : 'transpiler';

        this.#sources = new (require('./sources'))(specs);
        this.#compiler = new (require('./compiler'))(specs, this.#sources);
        this.#code = new (require('./code'))(specs, this.#compiler);
        ts === 'tsc' && (this.#declaration = new (require('./declaration'))(specs, this.#code));
        this.#hash = new (require('./hash'))(this.#sources);
    }

    configure(config, multilanguage) {
        this.#errors = [];

        config = require('../finder-config')(config, {extname: ['.json']});
        if (config.errors) {
            this.#errors = config.errors;
            this.#sources.files.configure();
            return;
        }

        this.#path = require('path').join(this.#specs.bundle.path, config.path);
        this.#sources.files.configure(this.#path, config.value);
        this.#code.configure({multilanguage: !!multilanguage});
    }

    destroy() {
        this.#sources.destroy();
        this.#compiler.destroy();
        this.#code.destroy();
    }
}
