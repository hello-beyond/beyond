const {equal} = global.utils;
const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application.libraries.config';
    }

    #value;

    get imports() {
        return this.#value.imports;
    }

    #errors = [];
    get errors() {
        return this.#errors;
    }

    get valid() {
        return !this.#errors.length;
    }

    #warnings = [];
    get warnings() {
        return this.#warnings;
    }

    constructor(config) {
        super();
        const children = new Map();
        children.set('config', {child: config});
        super.setup(children);
    }

    _process() {
        const config = this.children.get('config').child;
        this.#warnings = config.warnings;

        if (!config.valid) {
            this.#errors = config.errors;
            this.#value = {};
            return;
        }

        const value = Object.assign({}, config.value);
        value.imports = value.imports ? value.imports : [];
        if (!(value.imports instanceof Array)) {
            this.#warnings.push('Invalid excludes configuration');
            value.imports = [];
        }

        // Add beyond and beyond-bundles to the libraries imported by the application
        const defaults = ['@beyond-js/kernel', '@beyond-js/local', '@beyond-js/backend', '@beyond-js/ssr'];
        defaults.forEach(pkg => !value.imports.includes(pkg) && value.imports.push(pkg));
        if (equal(value, this.#value)) return false;

        this.#value = value;
    }
}
