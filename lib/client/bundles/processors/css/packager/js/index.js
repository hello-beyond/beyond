module.exports = class extends global.ProcessorCode {
    get dp() {
        return 'css.code';
    }

    #lines;
    get lines() {
        return this.#lines;
    }

    // The code of the processor and its HMR is the same
    #code;

    _process(request) {
        this.#code = this.#lines = undefined;
        super._process(request);
    }

    _build(hmr, diagnostics) {
        void (hmr); // No matter if it is hmr or not, the code is just the same

        if (this.#code !== void 0) return {code: this.#code};

        const {compiler} = this;

        let code = this.#code = '';
        let warnings;

        const {specs, name} = this.packager.processor;

        const done = ({errors, warnings, code, lines}) => {
            warnings?.forEach(warning => diagnostics.warnings.push(warning));
            errors?.forEach(error => diagnostics.general.push(error));
            this.#code = code;
            this.#lines = lines;
            return {code};
        }

        if (!specs.bundle.name.startsWith('template/')) {
            const compressed = require('./compress.js')(compiler.code);
            ({warnings} = compressed);
            const {styles, errors} = compressed;
            if (errors.length) return done({errors, warnings});

            code += global.utils.code.header(`${name.toUpperCase()} STYLES`);
            code += `bundle.styles.processor = '${name}';\n`;
            code += `bundle.styles.value = '${styles}';\n`;

            // Insert the styles in the DOM if configured
            this.config.dom && (code += `bundle.styles.appendToDOM();\n\n`);
        }
        else {
            code = compiler.code;
        }

        const lines = !code ? 0 : (code.length - code.replace(/\n/g, '').length + 1);
        return done({code, lines});
    }
}
