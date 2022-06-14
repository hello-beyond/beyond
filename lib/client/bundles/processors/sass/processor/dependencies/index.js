module.exports = class extends global.ProcessorAnalyzerDependencies {
    get dp() {
        return 'sass.dependencies';
    }

    #files;
    get files() {
        return this.#files;
    }

    constructor(processor) {
        super(processor, require('./dependency'));
        this.#files = new (require('./files'))(this);
    }
}
