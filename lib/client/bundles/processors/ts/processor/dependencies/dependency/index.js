module.exports = class extends global.Dependency {
    get dp() {
        return 'ts.dependency';
    }

    #declaration;
    get declaration() {
        return this.#declaration;
    }

    constructor(resource, processor) {
        super(resource, processor, require('./propagator'));
        this.#declaration = new (require('./declaration'))(this);
    }
}
