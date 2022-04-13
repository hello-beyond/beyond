const {crc32, equal} = global.utils;

module.exports = class {
    #dependencies;

    #sources;
    get sources() {
        return this.#sources;
    }

    #extensions;
    get extensions() {
        return this.#extensions;
    }

    #resources;
    get resources() {
        return this.#resources;
    }

    constructor(dependencies) {
        this.#dependencies = dependencies;
    }

    update() {
        const {hashes} = this.#dependencies.processor;
        this.#sources = hashes.sources;
        this.#extensions = new Map(hashes.extensions);

        this.#resources = (() => {
            const compute = [];
            this.#dependencies.forEach(dependency => compute.push(dependency.resource));
            return crc32(equal.generate(compute));
        })();
    }
}
