module.exports = class {
    #application;
    #packagers = new Map();

    constructor(application) {
        this.#application = application;
    }

    get(distribution) {
        if (this.#packagers.has(distribution.key)) return this.#packagers.get(distribution.key);
        const packager = new (require('./packager'))(this.#application, distribution);
        this.#packagers.set(distribution.key, packager);
        return packager;
    }
}
