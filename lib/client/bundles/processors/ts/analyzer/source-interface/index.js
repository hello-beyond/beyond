module.exports = class {
    #source;
    #dependencies;
    get dependencies() {
        return this.#dependencies;
    }

    #exports;
    get exports() {
        return this.#exports;
    }

    constructor(source) {
        const {dependencies, exports} = require('./parser')(source.relative.file, source.content);
        this.#source = source;
        this.#dependencies = dependencies;
        this.#exports = exports;
    }

    toJSON() {
        return {
            dependencies: [...this.#dependencies],
            exports: [...this.#exports]
        }
    }
}
