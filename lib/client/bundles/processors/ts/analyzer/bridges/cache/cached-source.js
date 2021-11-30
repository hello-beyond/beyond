module.exports = class {
    #cached;

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

    #info;
    get info() {
        return this.#info;
    }

    constructor(cached) {
        this.#cached = cached;
        this.#info = cached.info ? new Map(cached.info) : undefined;
        this.#info?.forEach((methods, key) => this.#info.set(key, new Map(methods)));
    }

    toJSON() {
        return Object.assign({}, this.#cached);
    }
}
