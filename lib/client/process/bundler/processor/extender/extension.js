module.exports = class {
    #extending;
    get extending() {
        return this.#extending;
    }

    #sources;
    get sources() {
        return this.#sources;
    }

    /**
     * Processor extension constructor
     *
     * @param extending {string} The name of the processor that is being extended
     * @param preprocessor {object} The preprocessor of the files that extends others processors
     */
    constructor(extending, preprocessor) {
        this.#extending = extending;
        this.#sources = new (require('./sources'))(extending, preprocessor);
    }
}
