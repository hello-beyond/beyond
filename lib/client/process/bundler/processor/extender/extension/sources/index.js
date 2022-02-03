const DynamicProcessor = global.utils.DynamicProcessor(Map);

/**
 * The files of an extension.
 * Example: the "svelte" processor extends the "ts" processor.
 * This object would have the "ts" preprocessed files of the "svelte" files.
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'processor.extender.extension.sources';
    }

    #extending;
    get extending() {
        return this.#extending;
    }

    #preprocessor;

    #hash;
    get hash() {
        return this.#hash;
    }

    /**
     * Processor extension sources constructor
     *
     * @param extending {string} The name of the processor that is being extended
     * @param preprocessor {object} The preprocessor of the files that extends others processors
     */
    constructor(extending, preprocessor) {
        super();
        this.#extending = extending;
        this.#preprocessor = preprocessor;
        this.#hash = new (require('./hash'))(this);

        super.setup(new Map([['preprocessor', {child: preprocessor}]]));
    }

    _process() {
        this.clear();

        const files = this.#preprocessor.get(this.#extending);
        files.forEach((source, file) => this.set(file, source));
    }
}
