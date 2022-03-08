/**
 * Processors extensions
 */
module.exports = class extends Map {
    #processor;
    get processor() {
        return this.#processor;
    }

    #distribution;
    get distribution() {
        return this.#distribution;
    }

    constructor(processor, distribution) {
        super();
        this.#processor = processor;
        this.#distribution = distribution;

        const {meta} = processor;
        const {Preprocessor, extends: _extends} = meta.extender;
        const preprocessor = new Preprocessor(processor, distribution);

        _extends.forEach(processorName => {
            const extension = new (require('./extension'))(processorName, preprocessor);
            this.set(processorName, extension);
        });
    }
}
