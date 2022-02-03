/**
 * Processors extensions
 */
module.exports = class extends Map {
    #processor;
    get processor() {
        return this.#processor;
    }

    constructor(processor) {
        super();
        this.#processor = processor;

        const {meta} = processor;
        const {Preprocessor, Compiler, extends: _extends} = meta.extender;

        const compiler = new Compiler(processor);
        const preprocessor = new Preprocessor(processor);

        _extends.forEach(processorName => {
            const extension = new (require('./extension'))(processorName, preprocessor, compiler);
            this.set(processorName, extension);
        });
    }
}
