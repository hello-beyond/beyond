const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'jsx-processor.code';
    }

    #compiler = () => this.children.get('compiler').child;

    #code;
    get code() {
        if (this.#code !== undefined) return this.#code;
        if (!this.valid) return;

        const {header} = global.utils.code;
        this.#code = header('JSX PROCESSOR') + '\n' + this.#compiler().code;
        return this.#code;
    }

    get errors() {
        return this.#compiler().errors;
    }

    get valid() {
        return this.#compiler().valid;
    }

    constructor(compiler) {
        super();
        super.setup(new Map([['compiler', {child: compiler}]]));
    }

    _process() {
        this.#code = undefined;
    }
}
