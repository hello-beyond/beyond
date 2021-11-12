module.exports = class {
    #general;
    #files;
    #overwrites;

    get valid() {
        const general = this.#general;
        const files = this.#files;
        const overwrites = this.#overwrites;

        const invalid = (general && general.length) || (files && files.size) || (overwrites && overwrites.size);
        return !invalid;
    }

    constructor(diagnostics) {
        this.#general = diagnostics.general ? diagnostics.general : [];
        this.#files = diagnostics.files ? diagnostics.files : new Map();
        this.#overwrites = diagnostics.overwrites ? diagnostics.overwrites : new Map();
    }

    get general() {
        return this.#general;
    }

    get files() {
        return this.#files;
    }

    get overwrites() {
        return this.#overwrites;
    }

    toJSON() {
        return {
            general: this.#general,
            files: [...this.#files],
            overwrites: [...this.#overwrites]
        };
    }
}
