module.exports = class {
    #specs;
    #source;

    #is;
    get is() {
        return this.#is;
    }

    get id() {
        const is = this.#is !== 'source' ? `${this.#is}//` : '';
        return `${this.#specs.bundle.id}//ts//${is}${this.#source.relative.file}`;
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

    get content() {
        return this.#source.content;
    }

    #hash;
    get hash() {
        return this.#hash;
    }

    #code;
    get code() {
        return this.#code;
    }

    constructor(specs, is, source, code) {
        this.#specs = specs;
        this.#is = is;
        this.#source = source;
        this.#hash = source.hash;
        this.#code = code;
    }
}
