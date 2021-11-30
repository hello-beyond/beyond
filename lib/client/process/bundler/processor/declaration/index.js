const DynamicProcessor = global.utils.DynamicProcessor();

/**
 * Generator of the declaration of the "ts" processor
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'txt-processor.declaration';
    }

    #specs;

    get diagnostics() {
        const code = this.children.get('code').child;
        return code.diagnostics;
    }

    get valid() {
        return this.diagnostics.valid;
    }

    /**
     * Declaration constructor
     *
     * @param specs {{bundle: {id: string, resource: string, name: string, container: {is: string}, path: string, pathname: string}, distribution: object, application: object, watcher: object}}
     * @param code {object} The code packager
     */
    constructor(specs, code) {
        super();
        this.#specs = specs;
        super.setup(new Map([['code', {child: code}]]));
    }

    #code;
    get code() {
        if (!this.valid) return;
        if (this.#code !== undefined) return this.#code;

        const code = this.children.get('code').child;
        if (!code.valid) throw new Error('Compiler has errors. Check the .valid property before calling this property');

        return this.#code = require('./generate')(code.code);
    }

    _process() {
        this.#code = undefined;
    }
}
