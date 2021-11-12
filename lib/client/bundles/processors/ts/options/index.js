const {fs} = global.utils;
const DynamicProcessor = global.utils.DynamicProcessor();
const ts = require('typescript');

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'ts-processor.options';
    }

    #specs;
    #listener;

    #errors = [];
    get errors() {
        return this.#errors;
    }

    #defaults;
    #value;
    get value() {
        return this.#value;
    }

    #hash;
    get hash() {
        return this.#hash;
    }

    #getOptionsPath = () => require('path').join(this.#specs.bundle.path, 'tsconfig.json');

    #listen = () => {
        const {watcher} = this.#specs;
        const {path} = this.#specs.bundle;

        this.#listener?.destroy();
        this.#listener = watcher.listeners.create(path, {includes: ['tsconfig.json']});
        this.#listener.listen().catch(exc => console.log(exc.stack));
        this.#listener.on('change', this._invalidate);
    }

    constructor(specs) {
        super();
        this.#specs = specs;

        this.#defaults = {
            module: ts.ModuleKind.CommonJS,
            target: ts.ScriptTarget.ESNext,
            moduleResolution: ts.ModuleResolutionKind.NodeJs,
            noEmitOnError: true,
            sourceMap: true,
            inlineSources: true,
            declaration: true,
            // declarationMap: true
        };
        this.#hash = new (require('./hash'))(this);

        this.#listen();
    }

    _invalidate = () => super._invalidate();

    async _process(request) {
        this.#errors = [];
        this.#value = undefined;

        const file = this.#getOptionsPath();
        const exists = file && await fs.exists(file);
        if (request !== this._request) return;

        let value;
        try {
            value = exists ? await fs.readFile(file, 'utf8') : {};
            if (request !== this._request) return;

            value = exists ? JSON.parse(value) : value;
            value = value.compilerOptions;
            value = value ? value : {};
            value.jsx && (value.jsx = ts.JsxEmit.React);
            delete value.paths;
            delete value.outDir;
            delete value.moduleResolution;
            value.noImplicitUseStrict = true;
        }
        catch (exc) {
            this.#errors.push(`Error reading or parsing tsconfig.json - ${exc.message}`);
            return;
        }
        this.#value = Object.assign(value, this.#defaults);
    }

    destroy() {
        super.destroy();
        this.#listener?.destroy();
    }
}
