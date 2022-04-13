module.exports = class {
    #compiler;

    #sources;
    get sources() {
        return this.#sources;
    }

    #inputs;
    get inputs() {
        return this.#inputs;
    }

    #extensions;
    get extensions() {
        return this.#extensions;
    }

    constructor(compiler) {
        this.#compiler = compiler;
    }

    update() {
        const {hashes} = this.#compiler.packager.processor;

        this.#sources = hashes.sources;
        this.#inputs = hashes.inputs;
        this.#extensions = new Map(hashes.extensions);
    }

    hydrate(cached) {
        this.#sources = cached.sources;
        this.#inputs = cached.inputs;
        this.#extensions = new Map(cached.extensions);
    }

    toJSON() {
        return {sources: this.#sources, inputs: this.#inputs, extensions: [...this.#extensions]};
    }
}
