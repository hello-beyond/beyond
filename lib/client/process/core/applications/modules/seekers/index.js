module.exports = class {
    #application;
    #factory;

    constructor(application) {
        this.#application = application;
        this.#factory = new (require('./factory'))(application);
    }

    create(resource) {
        return new (require('./instance'))(this.#factory, this.#application, resource);
    }
}
