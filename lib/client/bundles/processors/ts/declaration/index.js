const DynamicProcessor = global.utils.DynamicProcessor();

/**
 * Generator of the declaration of the "ts" processor
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'ts-processor.declaration';
    }

    #specs;

    get diagnostics() {
        const compiler = this.children.get('compiler').child;
        return compiler.diagnostics;
    }

    get valid() {
        return this.diagnostics.valid;
    }

    /**
     * Declaration constructor
     *
     * @param specs {{bundle: {id: string, resource: string, name: string, container: {is: string}, path: string, pathname: string}, distribution: object, application: object, watcher: object}}
     * @param compiler {object} The tsc compiler
     */
    constructor(specs, compiler) {
        super();
        this.#specs = specs;
        super.setup(new Map([['compiler', {child: compiler}]]));
    }

    #code;
    get code() {
        if (!this.valid) return;
        if (this.#code !== undefined) return this.#code;

        const compiler = this.children.get('compiler').child;
        if (!compiler.valid) throw new Error('Compiler has errors. Check the .valid property before calling this property');

        let code = '';
        code += require('./modules')(compiler);
        code += require('./exports')(compiler);
        return this.#code = code;
    }

    _process() {
        this.#code = undefined;
    }
}
