const {ipc} = global.utils;
const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'css-processor.code';
    }

    #name;
    #specs;
    #config;

    _notify() {
        const message = {
            type: 'change',
            bundle: this.#specs.bundle.resource,
            processor: this.#name
        };
        ipc.notify('processors', message);
    }

    #errors = [];
    get errors() {
        return this.#errors;
    }

    get diagnostics() {
        const compiler = this.children.get('compiler').child;
        return compiler.diagnostics;
    }

    get valid() {
        return !this.#errors.length && this.diagnostics.valid;
    }

    #warnings = [];
    get warnings() {
        return this.#warnings;
    }

    constructor(name, specs, compiler) {
        super();
        this.#name = name;
        this.#specs = specs;

        super.setup(new Map([['compiler', {child: compiler}]]));
    }

    #code;
    get code() {
        this.#process();
        return this.#code;
    }

    get hmr() {
        return this.code;
    }

    #lines;
    get lines() {
        this.#process();
        return this.#lines;
    }

    #process = () => {
        if (this.#code !== undefined) return; // Already processed
        if (!this.valid) return;

        const compiler = this.children.get('compiler').child;
        if (!compiler.valid) return;

        this.#lines = 0;
        let code = this.#code = '';
        if (!this.#specs.bundle.name.startsWith('template/')) {
            const {styles, errors, warnings} = require('./compress.js')(compiler.code);
            this.#warnings = warnings;
            this.#errors = errors;
            if (errors.length) return;

            code += global.utils.code.header(`${this.#name.toUpperCase()} STYLES`);
            code += `bundle.styles.processor = '${this.#name}';\n`;
            code += `bundle.styles.value = '${styles}';\n`;

            // Insert the styles in the DOM if configured
            this.#config.dom && (code += `bundle.styles.appendToDOM();\n\n`);
        }
        else {
            this.#errors = [];
            this.#warnings = [];
            code = compiler.code;
        }

        this.#lines = !code ? 0 : (code.length - code.replace(/\n/g, '').length + 1);
        this.#code = code;
    };

    _prepared() {
        return !!this.#config;
    }

    _process() {
        this.#code = undefined;
    }

    configure(config) {
        this.#config = config ? config : {};
        this._invalidate();
    }
}
