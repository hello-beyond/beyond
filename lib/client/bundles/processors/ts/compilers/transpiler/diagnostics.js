module.exports = class {
    #general;
    #files;

    get valid() {
        const general = this.#general;
        const files = this.#files;

        const invalid = (general && general.length) || (files && files.size);
        return !invalid;
    }

    constructor({general, files}) {
        this.#general = general ? general : [];
        this.#files = files ? files : new Map();
    }

    get general() {
        return this.#general;
    }

    get files() {
        return this.#files;
    }

    toJSON() {
        return {
            general: this.#general,
            files: [...this.#files]
        };
    }
}
