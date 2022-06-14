module.exports = class {
    #processor;
    get processor() {
        return this.#processor;
    }

    #source;

    get id() {
        if (!this.#processor) return;

        const is = this.#is === 'source' ? '' : `${this.#is}//`;
        const {name, specs} = this.#processor;
        return `${specs.bundle.id}//${name}//${is}${this.#source.relative.file}`;
    }

    get url() {
        return this.#source.url;
    }

    #is;
    get is() {
        return this.#is;
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

    /**
     * Source constructor
     *
     * @param processor {object} The processor object
     * @param is {string} Can be 'source' or 'overwrite'
     * @param source? {object} Optional. If undefined, the source object is set when it is hydrated
     */
    constructor(processor, is, source) {
        if (typeof is !== 'string') throw new Error('Invalid parameters');

        this.#processor = processor;
        this.#is = is;

        this.#source = source;
        this.#hash = source?.hash;
    }

    hydrate(cached) {
        this.#source = cached;
        this.#hash = cached.hash;
    }

    toJSON() {
        const relative = {dirname: this.relative.dirname, file: this.relative.file};
        const {is, url, root, file, dirname, filename, basename, extname, content, hash} = this;
        return {is, url, root, file, dirname, filename, basename, extname, relative, content, hash};
    }
}
