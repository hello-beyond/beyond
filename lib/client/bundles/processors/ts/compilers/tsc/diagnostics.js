module.exports = class {
    #general;
    #dependencies;
    #files;

    get valid() {
        const general = this.#general;
        const dependencies = this.#dependencies;
        const files = this.#files;

        const invalid = (general && general.length) || (dependencies && dependencies.size) ||
            (files && files.size);
        return !invalid;
    }

    constructor({general, files, dependencies}) {
        this.#general = general ? general : [];
        this.#files = files ? files : new Map();
        this.#dependencies = dependencies ? dependencies : new Map();
    }

    get general() {
        return this.#general;
    }

    get dependencies() {
        return this.#dependencies;
    }

    get files() {
        return this.#files;
    }

    toJSON() {
        return {
            general: this.#general,
            dependencies: [...this.#dependencies],
            files: [...this.#files]
        };
    }
}
