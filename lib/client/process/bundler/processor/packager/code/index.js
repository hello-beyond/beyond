const DynamicProcessor = global.utils.DynamicProcessor();
const {ipc, equal} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'packager.code';
    }

    #packager;
    get packager() {
        return this.#packager;
    }

    #extname;
    get extname() {
        return this.#extname;
    }

    get analyzer() {
        return this.children.get('analyzer')?.child;
    }

    get files() {
        return this.children.get('files')?.child;
    }

    get extensions() {
        return this.children.get('extensions').child;
    }

    get overwrites() {
        return this.children.get('overwrites')?.child;
    }

    get compiler() {
        return this.children.get('compiler')?.child;
    }

    _notify() {
        const {name, specs, distribution, language} = this.#packager.processor;
        const message = {
            type: 'change',
            bundle: specs.bundle.resource,
            extname: this.#extname,
            processor: name,
            distribution: distribution.key,
            language
        };
        ipc.notify('processors', message);
    }

    #configured = false;
    get configured() {
        return this.#configured;
    }

    #config;
    get config() {
        return this.#config;
    }

    get multilanguage() {
        return this.#config?.multilanguage;
    }

    #diagnostics;
    get diagnostics() {
        !this.#diagnostics && this.code; // Accessing the code property will generate the diagnostics
        return this.#diagnostics;
    }

    get valid() {
        return this.diagnostics.valid;
    }

    constructor(packager, extname) {
        super();
        this.#packager = packager;
        this.#extname = extname;

        this.notifyOnFirst = true;

        const children = [];

        const extensions = new (require('./extensions'))(packager.processor);
        children.push(['extensions', {child: extensions}]);

        // The children can be the compiler if it exists, otherwise it could be the analyzer if it exists,
        // or the processor sources (files and overwrites)
        const {processor: {analyzer, files, overwrites}, compiler} = packager;
        if (compiler) {
            children.push(['compiler', {'child': compiler}]);
        }
        else if (analyzer) {
            children.push(['analyzer', {'child': analyzer}]);
        }
        else {
            const events = ['item.initialised', 'item.change'];
            children.push(['files', {'child': files, events}]);
            overwrites && children.push(['overwrites', {'child': overwrites, events}]);
        }

        super.setup(new Map(children));
    }

    _prepared(check) {
        if (!this.#configured) return false;
        this.files?.forEach(source => check(source));
        this.overwrites?.forEach(source => check(source));
    }

    _process() {
        this.#built = this.#diagnostics = this.#code = this.#hmr = void 0;
    }

    _build(hmr, diagnostics) {
        void (hmr);
        void (diagnostics);
        throw new Error('Method must be overridden');
    }

    #built = false;

    #build(hmr) {
        if (this.#built) return;
        this.#built = true;

        const {compiler} = this.#packager;
        if (compiler && !compiler.valid) {
            this.#diagnostics = compiler.diagnostics;
            return;
        }

        const diagnostics = this.#diagnostics = new (require('./diagnostics'))();
        const built = this._build(hmr, diagnostics);
        if (!built) return;

        const {sourcemap, code} = built;
        if (!diagnostics.valid || (!sourcemap && !code)) return;
        if (sourcemap && code) throw new Error('Sourcemap or code, but not both have to be returned');

        // Update the package or exports in HMR
        const update = (() => {
            if (!hmr) return '';

            let update = '';
            const {name} = this.#packager.processor;
            update = name === 'ts' ? `\n__pkg.update(modules);\n` : update;
            update = name === 'txt' ? `\n__pkg.exports.update();\n` : update;
            return update;
        })();

        sourcemap && update && sourcemap.concat(update);
        return sourcemap ? sourcemap : (code + update);
    }

    #code;
    get code() {
        return this.#built ? this.#code : (this.#code = this.#build(false));
    }

    #hmr;
    get hmr() {
        return this.#built ? this.#hmr : (this.#hmr = this.#build(true));
    }

    configure(config) {
        if (equal(config, this.#config)) return;

        this.#config = config;
        this.#configured = true;
        super._invalidate();
    }
}
