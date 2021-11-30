module.exports = class {
    #cached;

    get is() {
        return this.#cached.is;
    }

    get id() {
        return this.#cached.id;
    }

    get root() {
        return this.#cached.root;
    }

    get file() {
        return this.#cached.file;
    }

    get dirname() {
        return this.#cached.dirname;
    }

    get filename() {
        return this.#cached.filename;
    }

    get basename() {
        return this.#cached.basename;
    }

    get extname() {
        return this.#cached.extname;
    }

    get relative() {
        return this.#cached.relative;
    }

    get content() {
        return this.#cached.content;
    }

    get hash() {
        return this.#cached.hash;
    }

    get dependencies() {
        return this.#cached.dependencies;
    }

    get exports() {
        return this.#cached.exports;
    }

    get map() {
        return this.#cached.map;
    }

    get code() {
        return this.#cached.code;
    }

    constructor(cached) {
        this.#cached = cached;
    }

    toJSON() {
        return Object.assign({}, this.#cached);
    }
}
