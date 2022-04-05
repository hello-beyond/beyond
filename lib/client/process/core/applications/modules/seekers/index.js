module.exports = class {
    #application;
    #factory;

    constructor(application) {
        this.#application = application;
        this.#factory = new (require('./factory'))(application);
    }

    /**
     * Creates a seeker instance
     *
     * @param resource {string} The resource of the bundle
     * @param distribution {object} The distribution specification
     * @return {object}
     */
    create(resource, distribution) {
        return new (require('./wrapper'))(this.#factory, this.#application, resource, distribution);
    }
}
