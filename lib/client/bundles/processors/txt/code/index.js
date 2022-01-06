const DynamicProcessor = global.utils.DynamicProcessor();
const {ipc} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'txt-processor.code';
    }

    #specs;

    _notify() {
        const message = {
            type: 'change',
            bundle: this.#specs.bundle.resource,
            processor: 'txt',
            distribution: this.#specs.distribution.key,
            language: this.#specs.language
        };
        ipc.notify('processors', message);
    }

    #configured = false;
    #multilanguage;
    get multilanguage() {
        return this.#multilanguage;
    }

    get diagnostics() {
        const compiler = this.children.get('compiler').child;
        return compiler.diagnostics;
    }

    get valid() {
        return this.diagnostics.valid;
    }

    constructor(specs, compiler) {
        super();
        this.#specs = specs;
        super.setup(new Map([['compiler', {'child': compiler}]]));
    }

    _prepared() {
        return !!this.#configured;
    }

    _process() {
        this.#code = this.#json = undefined;
    }

    #json;
    get json() {
        if (this.#json !== undefined) return this.#json;

        const {application} = this.#specs;
        const language = this.#specs.language === '.' ? application.languages.default : this.#specs.language;
        const compiler = this.children.get('compiler').child;

        if (!compiler.valid) return this.#json = {};

        let json = this.#multilanguage ? compiler.code[language] : compiler.code;
        return this.#json = typeof json === 'object' ? json : {};
    }

    #code;
    get code() {
        return this.#code !== undefined ? this.#code : (this.#code = this.#process(false));
    }

    #hmr;
    get hmr() {
        return this.#hmr !== undefined ? this.#hmr : (this.#hmr = this.#process(true));
    }

    #process(hmr) {
        const compiler = this.children.get('compiler').child;

        let code =
            (!compiler.valid ? '// Processor compiled with errors\n' : '') +
            `__pkg.exports.process = (require, _exports) => (_exports.txt = ${JSON.stringify(this.json)});\n\n`;

        code += require('./initialisation')(this.#specs, hmr);

        return code;
    }

    configure(multilanguage) {
        multilanguage = !!multilanguage;
        if (multilanguage === this.#multilanguage) return;

        this.#multilanguage = multilanguage;
        this.#configured = true;
        super._invalidate();
    }
}
