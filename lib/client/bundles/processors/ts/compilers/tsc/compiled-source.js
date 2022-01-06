module.exports = class {
    #is;
    get is() {
        return this.#is;
    }

    #source;
    #compiled;

    get id() {
        return this.#source.id;
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

    get filename() {
        return this.#source.filename;
    }

    get basename() {
        return this.#source.basename;
    }

    get extname() {
        return this.#source.extname;
    }

    get relative() {
        return this.#source.relative;
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
        return this.#source.dependencies;
    }

    get exports() {
        return this.#source.exports;
    }

    get map() {
        return this.#compiled.map;
    }

    get code() {
        return this.#compiled.code;
    }

    get declaration() {
        return this.#compiled.declaration;
    }

    constructor(is, source, compiled) {
        this.#is = is;
        this.#source = source;
        this.#content = source.content;
        this.#hash = source.hash;
        this.#compiled = compiled;
    }

    toJSON() {
        return Object.assign({is: this.#is,}, this.#source, this.#compiled);
    }
}
