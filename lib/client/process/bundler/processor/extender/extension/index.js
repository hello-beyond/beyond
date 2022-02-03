module.exports = class {
    #extending;
    get extending() {
        return this.#extending;
    }

    #sources;
    get sources() {
        return this.#sources;
    }

    #code;
    get code() {
        return this.#code;
    }

    /**
     * Processor extension constructor
     *
     * @param extending {string} The name of the processor that is being extended
     * @param preprocessor {object} The preprocessor of the files that extends others processors
     * @param compiler {object} The compiler of the processor that extends other processors
     */
    constructor(extending, preprocessor, compiler) {
        this.#extending = extending;
        this.#sources = new (require('./sources'))(extending, preprocessor);
        this.#code = new (require('./code'))(extending, compiler);
    }
}
