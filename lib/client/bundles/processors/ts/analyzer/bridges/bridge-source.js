module.exports = class {
    #source;

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

    #hash;
    get hash() {
        return this.#hash;
    }

    #content;
    get content() {
        return this.#content;
    }

    #info;
    get info() {
        return this.#info;
    }

    constructor(source, parsed) {
        this.#source = source;
        this.#hash = source.hash;
        this.#content = parsed?.code;
        this.#info = parsed?.info;
    }

    toJSON() {
        let info;
        if (this.#info) {
            info = [...this.#info];
            info = info.map(([key, methods]) => [key, [...methods]]);
        }

        return Object.assign(this.#source.toJSON(), {
            content: this.#content,
            info: info
        });
    }
}
