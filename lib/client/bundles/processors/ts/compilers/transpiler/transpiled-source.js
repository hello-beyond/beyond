module.exports = class {
    #source;

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

    #map;
    get map() {
        return this.#map;
    }

    #code;
    get code() {
        return this.#code;
    }

    constructor(source, transpiled) {
        this.#source = source;
        this.#content = source.content;
        this.#hash = source.hash;
        this.#map = transpiled.sourceMapText;
        this.#code = transpiled.outputText;
    }

    toJSON() {
        return Object.assign({map: this.#map, code: this.#code}, this.#source.toJSON());
    }
}
