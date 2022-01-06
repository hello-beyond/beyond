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

        this.#files = new (require('./files'))(processor, extname);
        this.#overwrites = new (require('./overwrites'))(processor, extname);
    }

    destroy() {
        this.#files.destroy();
        this.#overwrites.destroy();
    }
}
