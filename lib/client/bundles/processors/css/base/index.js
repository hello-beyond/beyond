/**
 * BeyondJS abstract class for "scss" and "less" native processors
 */
module.exports = class {
    #name;
    get name() {
        return this.#name;
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
        return `${this.#specs.bundle.id}//${this.#name}`;
    }

    #extname;
    #sources;

    get files() {
        return this.#sources.files;
    }

    get overwrites() {
        return this.#sources.overwrites;
    }

    #source;
    get source() {
        return this.#source;
    }

    #compiler;
    get compiler() {
        return this.#compiler;
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

    #code;
    get code() {
        return this.#code;
    }

    /**
     * Processor constructor
     *
     * @param name {string} The processor name. Actually can be 'less' or 'scss'
     * @param specs {{bundle: {id: string, resource: string, name: string, container: {is: string}, path: string, pathname: string}, distribution: object, application: object, watcher: object}}
     * @param transpiler {function} The processor function
     * @param extname {string[]} The files extensions array
     */
    constructor(name, specs, transpiler, extname) {
        if (!specs || !specs.bundle || !specs.bundle.path) throw new Error('Invalid parameters');

        this.#name = name;
        this.#specs = specs;
        this.#extname = extname;
        this.#sources = new (require('./sources'))(name, specs, extname);
        this.#compiler = new (require('./compiler'))(specs, this.#sources, transpiler);
        this.#code = new (require('./code'))(name, specs, this.#compiler);

        this.#source = new (require('./source'))(this.#sources);
        this.#hash = new (require('./hash'))(this.#sources);
    }

    configure(config) {
        const dom = typeof config === 'object' && !!config.dom;

        config = require('../../finder-config')(config, {extname: this.#extname});
        if (config.errors) {
            this.#errors = config.errors;
            this.#sources.files.configure();
            return;
        }

        this.#errors = [];
        this.#path = require('path').join(this.#specs.bundle.path, config.path);
        this.#sources.files.configure(this.#path, config.value);
        this.#code.configure({dom: dom});
    }

    destroy() {
        this.#sources.destroy();
        this.#compiler.destroy();
        this.#code.destroy();
    }
}
