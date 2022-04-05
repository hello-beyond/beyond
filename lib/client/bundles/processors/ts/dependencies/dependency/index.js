module.exports = class extends global.ProcessorDependency {
    get dp() {
        return 'ts.dependency';
    }

    #declaration;
    get declaration() {
        return this.#declaration;
    }

    constructor(resource, processor) {
        super(resource, processor);
        this.#declaration = new (require('./declaration'))(this);
    }
}
