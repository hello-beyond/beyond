/**
 * BeyondJS "js" native processor compiler
 */
module.exports = class {
    get name() {
        return 'js';
    }

    #sources;

    #specs;
    #path;
    get path() {
        return this.#path;
    }

    #hash;
    get hash() {
        return this.#hash;
    }

    #errors = [];
    get errors() {
        return this.#errors;
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
        this.#sources = new (require('./sources'))(specs);
        this.#code = new (require('./code'))(this.#sources);
        this.#hash = new (require('./hash'))(this.#sources);
    }

    configure(config) {
        config = require('../finder-config')(config, {extname: ['.js']});
        if (config.errors) {
            this.#errors = config.errors;
            this.#sources.configure();
            return;
        }

        this.#errors = [];
        this.#path = require('path').join(this.#specs.bundle.path, config.path);
        this.#sources.configure(this.#path, config.value);
    }

    destroy() {
        this.#sources.destroy();
        this.#code.destroy();
    }
}
