module.exports = class extends require('../../dependencies/dependency') {
    // The sources that depend on this dependency
    #sources = new Map();
    get sources() {
        return this.#sources;
    }

    clear() {
        super.clear();
        this.#sources.clear();
    }

    hydrate(cached) {
        super.hydrate(cached);
        this.#sources = new Map(cached.sources);
    }

    toJSON() {
        const sources = [...this.#sources];
        return Object.assign({sources}, super.toJSON());
    }
}
