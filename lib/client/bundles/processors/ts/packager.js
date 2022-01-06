/**
 * BeyondJS "ts" native processor compiler
 */
module.exports = class {
    get name() {
        return 'ts';
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
        return `${this.#specs.bundle.id}//${this.name}//${this.distribution.key}//${this.language}`;
    }

    #sources;

    get files() {
        return this.#sources;
    }

    #analyzer;
    get analyzer() {
        return this.#analyzer;
    }

    #dependencies;
    get dependencies() {
        return this.#dependencies;
    }

    #compiler;
    get compiler() {
        return this.#compiler;
    }

    #options;
    get options() {
        return this.#options;
    }

    #hash;
    get hash() {
        return this.#hash;
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
     * Processor packager constructor
     *
     * @param specs {{bundle: {id: string, resource: string, name: string, container: {is: string}, path: string, pathname: string}, distribution: object, application: object, watcher: object}}
     */
    constructor(specs) {
        if (!specs || !specs.bundle.name || !specs.bundle.container || !specs.bundle.path ||
            !specs.bundle.resource || !specs.application || !specs.watcher) {

            const id = specs && specs.bundle && specs.bundle.id ? `of bundle "${specs.bundle.id}" ` : '';
            console.log(`Parameter specs ${id}is invalid:`, specs);
            throw new Error('Invalid "specs" parameter');
        }

        this.#specs = specs;
        this.#sources = new (require('./sources'))(this);
        this.#analyzer = new (require('./analyzer'))(specs, this.#sources);
        this.#options = new (require('./options'))(specs);
        this.#hash = new (require('./hash'))(this.#sources, this.#analyzer, this.#options);
        this.#dependencies = new (require('./dependencies'))(this);
        this.#compiler = require('./compilers').get(this);
        this.#compiler.is === 'tsc' && (this.#declaration = new (require('./declaration'))(specs, this.#compiler));
        this.#code = new (require('./code'))(specs, this.#compiler);
    }

    configure(config) {
        this.#errors = [];

        config = require('../finder-config')(config, {extname: ['.ts', '.tsx']});
        if (config.errors) {
            this.#errors = config.errors;
            this.#sources.configure();
            return;
        }

        this.#path = require('path').join(this.#specs.bundle.path, config.path);
        this.#sources.configure(this.#path, config.value);
    }

    destroy() {
        this.#sources.destroy();
        this.#analyzer.destroy();
        this.#dependencies.destroy();
        this.#compiler.destroy();
        this.#declaration?.destroy();
        this.#code.destroy();
    }
}
