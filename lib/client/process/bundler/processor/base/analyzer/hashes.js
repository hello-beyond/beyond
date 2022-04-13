module.exports = class {
    #analyzer;

    #sources;
    get sources() {
        return this.#sources;
    }

    #extensions;
    get extensions() {
        return this.#extensions;
    }

    constructor(analyzer) {
        this.#analyzer = analyzer;
    }

    update() {
        const {hashes} = this.#analyzer.processor.sources;
        this.#sources = hashes.sources;
        this.#extensions = new Map(hashes.extensions);
    }

    hydrate(cached) {
        this.#sources = cached.sources;
        this.#extensions = new Map(cached.extensions);
    }

    toJSON() {
        return {sources: this.#sources, extensions: [...this.#extensions]};
    }
}
