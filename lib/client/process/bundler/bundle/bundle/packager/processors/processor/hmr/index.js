const DynamicProcessor = global.utils.DynamicProcessor();

/**
 * Process the processor HMR code
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.bundle.processor.hmr';
    }

    #errors = [];
    get errors() {
        return this.#errors;
    }

    get valid() {
        return !this.#errors.length;
    }

    #processor;
    #sourcemap;

    get code() {
        return this.#sourcemap?.code;
    }

    get map() {
        return this.#sourcemap?.map;
    }

    constructor(processor) {
        super();
        this.notifyOnFirst = true;
        this.#processor = processor;

        const children = new Map([['code', {child: processor.code}]]);
        const {dependencies} = processor;
        dependencies && children.set('dependencies', {child: dependencies.code});
        super.setup(children);
    }

    _process() {
        const processor = this.#processor;

        const {specs, dependencies, distribution, language} = processor;
        const {bundle} = specs;
        const {mode} = distribution.bundles;

        this.#sourcemap = void 0;
        const sourcemap = new (require('./sourcemap'));

        dependencies && sourcemap.concat(dependencies.code.code);

        let code = processor.code.hmr;
        code = typeof code === 'string' ? {code: code} : code;
        if (!code || !code.code) return;

        const multilanguage = language !== '.';
        const params = `'${bundle.resource}', ${multilanguage}, {}` +
            (dependencies?.size ? ', dependencies' : '');

        sourcemap.concat(`const {beyond} = globalThis;`);
        sourcemap.concat(`const bundle = beyond.bundles.obtain(${params});`);
        sourcemap.concat(`const __pkg = bundle.package(${multilanguage ? `'${language}'` : ''});`);

        sourcemap.concat(code.code, code.map);

        let map, errors;
        ({code, map, errors} = ['amd', 'cjs'].includes(mode) ? require(`./${mode}`)(sourcemap) : sourcemap);
        if (errors) {
            this.#errors = errors;
            return;
        }

        this.#sourcemap = {code, map};
    }
}
