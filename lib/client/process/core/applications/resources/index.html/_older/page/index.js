module.exports = class {
    #application;
    #pages = new Map();

    constructor(application) {
        this.#application = application;
    }

    get(distribution) {
        const application = this.#application;

        const pages = this.#pages;
        const {key} = distribution;
        if (pages.has(key)) return pages.get(key);

        const page = new (require('./page'))(application, distribution);
        pages.set(key, page);
        return page;
    }
}
