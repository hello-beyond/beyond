/**
 * Processor sources
 */
module.exports = class {
    #files;
    get files() {
        return this.#files;
    }

    #overwrites;
    get overwrites() {
        return this.#overwrites;
    }

    #extensions;
    get extensions() {
        return this.#extensions;
    }

    /**
     * Processor sources constructor
     *
     * @param processor {object} The processor packager
     */
    constructor(processor) {
        if (!processor.meta.sources) throw new Error(`Processor sources specification must be defined`);
        let {extname} = processor.meta.sources;
        extname = typeof extname === 'string' ? [extname] : extname;
        if (!(extname instanceof Array)) throw new Error(`Processor extname sources specification is invalid`);

        const {bundle} = processor.specs;

        // Create the overwrites instance only if the processor specifies that it uses overwrites
        // Do not create the overwrites instance if it is a template (template.processors)
        const overwrites = processor.meta.sources.overwrites && !bundle.name.startsWith('template/');

        this.#files = new (require('./files'))(processor, extname);
        this.#overwrites = overwrites ? new (require('./overwrites'))(processor, extname) : void 0;
        this.#extensions = new (require('./extensions'))(processor);
    }

    configure(path, config) {
        this.#files.configure(path, config);
    }

    destroy() {
        this.#files.destroy();
        this.#overwrites?.destroy();
    }
}