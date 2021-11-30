const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.transversal.packager.code';
    }

    get id() {
        return this.#tp.id;
    }

    // The transversal packager
    #tp;
    get tp() {
        return this.#tp;
    }

    #errors;
    get errors() {
        this.#process();
        return this.#errors ? this.#errors : [];
    }

    get valid() {
        return !this.errors.length;
    }

    #warnings;
    get warnings() {
        return this.#warnings ? this.#warnings : [];
    }

    #code;
    get code() {
        this.#process();
        return this.#code;
    }

    #map;
    get map() {
        this.#process();
        return this.#map;
    }

    _generate() {
        const packagers = this.children.get('packagers.code').child;
        const {count, code, map} = packagers;

        const sourcemap = new (require('./sourcemap'))();
        sourcemap.concat('const bundles = new Map();');
        count && sourcemap.concat(code, map);
        sourcemap.concat('transversal.initialise(bundles);\n\n');

        return {sourcemap};
    }

    _post(sourcemap) {
        return sourcemap;
    }

    _process() {
        this.#code = this.#map = this.#errors = this.#warnings = undefined;
    }

    #process() {
        if (this.#code || this.#errors) return; // Already processed
        if (!this.processed) throw new Error('Dynamic processor is not ready');

        const dependencies = this.children.get('dependencies.code').child;
        const packagers = this.children.get('packagers.code').child;
        if (!dependencies.valid || !packagers.valid) {
            this.#code = this.#map = undefined;
            this.#warnings = [];
            this.#errors = [].concat(dependencies.errors, packagers.errors);
            return;
        }

        let {sourcemap: generated, errors, warnings} = this._generate();
        this.#errors = errors;
        this.#warnings = warnings;
        if (errors) return;

        let sourcemap = new (require('./sourcemap'))();
        dependencies.count && sourcemap.concat(dependencies.code);

        const {transversal} = this.#tp;
        const {multilanguage} = transversal;
        const language = `, '${multilanguage ? this.#tp.language : ''}'`;
        const params = `'${transversal.name}'${language}` + (dependencies.count ? ', dependencies' : '');

        sourcemap.concat(`const transversal = beyond.transversals.obtain(${params});\n\n`);

        sourcemap.concat(generated.code, generated.map);

        // Transform to module system type according to distribution configuration
        const {mode} = this.#tp.distribution.bundles;

        let map, code;
        ({errors, map, code} = ['amd', 'cjs'].includes(mode) ? require(`./mode/${mode}`)(sourcemap) : sourcemap);
        this.#errors = errors;
        if (this.#errors) return;

        // Post process. Required for the start bundle to prepend the requirejs config
        ({errors, code, map} = this._post({code, map}));
        this.#errors = errors;
        if (this.#errors) return;

        this.#code = code;
        this.#map = map;
    }

    constructor(tp, packagers) {
        super();
        this.#tp = tp;

        super.setup(new Map([
            ['packagers.code', {child: packagers.code}],
            ['dependencies.code', {child: tp.dependencies.code}]
        ]))
    }
}
