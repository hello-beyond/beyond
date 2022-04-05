module.exports = class extends global.ProcessorAnalyzerDependencies {
    get dp() {
        return 'sass.dependencies';
    }

    #files;
    get files() {
        return this.#files;
    }

    constructor(processor) {
        const {hash} = processor.analyzer;
        super(processor, hash, require('./dependency'), require('./propagator'));

        this.#files = new (require('./files'))(this);
    }
}
