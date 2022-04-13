const DynamicProcessor = global.utils.DynamicProcessor(Map);
const ExtendedCompilers = (require('./compilers'));

/**
 * The compiled files from the compilers of the processors being extended
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'processor.packager.compiler.extended';
    }

    #errors = [];
    get errors() {
        return this.#errors;
    }

    get valid() {
        return !this.#errors.length;
    }

    // The root hashes of the extended compilers
    #hashes = new Map();
    get hashes() {
        return this.#hashes;
    }

    #processor;
    get processor() {
        return this.#processor;
    }

    constructor(processor) {
        super();
        this.#processor = processor;

        const {meta} = this.#processor;
        const {bundle} = processor.specs;
        if (bundle.name.startsWith('template/')) return;

        const {extends: _extends} = meta.extender;
        _extends.forEach(processor => this.set(processor, new Map()));

        // The extensions of the current processor being extended by other processors of the same bundle
        super.setup(new Map([['extended.compilers', {child: new ExtendedCompilers(processor)}]]));
    }

    _prepared(require) {
        const compilers = this.children.get('extended.compilers').child;
        compilers.forEach(compiler => require(compiler));
    }

    _process() {
        const compilers = this.children.get('extended.compilers').child;

        this.forEach(extended => extended.clear());

        // Find errors in the compilers
        const errors = this.#errors;
        errors.length = 0;
        for (const [name, compiler] of compilers) {
            // Set the root hash of the compiler
            if (!compiler.hashes.extensions.has(this.#processor.name)) {
                throw new Error(`Extended root hash of compiler "${compiler.id}" not set`);
            }
            this.#hashes.set(name, compiler.hashes.extensions.get(this.#processor.name));

            if (compiler.valid) continue;
            errors.push(`Compiler "${name}" has reported errors`);
        }

        if (!this.valid) return;

        // Iterate through the source files of the processor and look for the compiled files
        // from the extended compilers
        compilers.size &&
        this.#processor.sources.files.forEach((source, file) => {
            compilers.forEach(compiler => {
                if (!compiler.extensions.has(file)) return;

                const {processor} = compiler.packager;
                const extended = this.get(processor.name);
                const compiled = compiler.extensions.get(file);
                extended.set(file, compiled);
            });
        });
    }
}
