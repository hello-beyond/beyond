const {EventEmitter} = require('events');

module.exports = class extends EventEmitter {
    #specs;
    #source;
    #_interface;
    get interface() {
        return this.#_interface;
    }

    get id() {
        return `${this.#specs.bundle.id}//ts//${this.#source.relative.file}`;
    }

    get version() {
        return this.#source.version;
    }

    get root() {
        return this.#source.root;
    }

    get file() {
        return this.#source.file;
    }

    get dirname() {
        return this.#source.dirname;
    }

    get relative() {
        return this.#source.relative;
    }

    get filename() {
        return this.#source.filename;
    }

    get basename() {
        return this.#source.basename;
    }

    get extname() {
        return this.#source.extname;
    }

    #content;
    get content() {
        return this.#content;
    }

    #hash;
    get hash() {
        return this.#hash;
    }

    get dependencies() {
        return this.#_interface.dependencies;
    }

    get exports() {
        return this.#_interface.exports;
    }

    constructor(specs, source, _interface) {
        super();
        this.#specs = specs;
        this.#source = source;
        this.#_interface = _interface;

        this.#hash = source.hash;
        this.#content = source.content;
    }

    toJSON() {
        return Object.assign({id: this.id},
            this.#source.toJSON(),
            this.#_interface.toJSON()
        );
    }
}
