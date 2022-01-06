module.exports = class {
    #cached;

    get id() {
        return this.#cached.id;
    }

    get is() {
        return this.#cached.is;
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

    constructor(cached) {
        this.#cached = cached;
        this.#cached.dependencies = new Map(this.#cached.dependencies);
        this.#cached.exports = new Set(this.#cached.exports);
    }

    toJSON() {
        const json = Object.assign({}, this.#cached);
        json.dependencies = [...json.dependencies];
        json.exports = [...json.exports];
        return json;
    }
}
