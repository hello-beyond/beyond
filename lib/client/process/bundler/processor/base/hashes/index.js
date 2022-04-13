const DynamicProcessor = global.utils.DynamicProcessor();
const {crc32, equal} = global.utils;

/**
 * The hashes of the processor are the result of including the hash of the dependencies
 * to the hashes of the sources of the processor.
 * As each case works with the dependencies differently, the specification of the hash value of the dependencies
 * is done by the specialized processor (ts, sass, ...).
 * The "ts" processor, for example, requires the declarations of the dependencies, and the "sass" processor
 * requires the source files of the dependencies.
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'processor.hashes';
    }

    #processor;
    get processor() {
        return this.#processor;
    }

    /**
     * The hashes of the extensions
     * @type {Map<string, number>}
     */
    #extensions = new Map();
    get extensions() {
        return this.#extensions;
    }

    /**
     * The hash of the sources of the processor
     * @return {number}
     */
    get sources() {
        return this.children.get('sources.hashes').child.sources;
    }

    /**
     * The hash of all the inputs of the processor,
     * it actually refers to the hash of the sources plus the hash of the dependencies
     * @return {number}
     */
    #inputs;
    get inputs() {
        if (this.#inputs !== void 0) return this.#inputs;

        const {sources} = this;
        const inheritance = this._compute();
        if (inheritance === 0) return this.#inputs = sources;

        const compute = {sources, inheritance};
        return this.#inputs = crc32(equal.generate(compute));
    }

    constructor(processor) {
        super();
        this.#processor = processor;
        super.setup(new Map([['sources.hashes', {child: processor.sources.hashes}]]));
    }

    /**
     * This method allows inheritance of the hash calculation
     *
     * @return {number} The calculated hash of the children of the inherited class
     * @private
     */
    _compute() {
        return 0;
    }

    _process() {
        this.#inputs = void 0;
        this.#extensions = new Map(this.children.get('sources.hashes').child.extensions);
    }
}
