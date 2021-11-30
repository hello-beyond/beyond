const DynamicProcessor = global.utils.DynamicProcessor();

/**
 * The processor of the code of the bundles of the libraries (ex: the start of a library)
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.transversal.libraries.code';
    }

    #packager;
    get packager() {
        return this.#packager;
    }

    #dependencies;
    get dependencies() {
        this.#process();
        return this.#dependencies;
    }

    #errors;
    get errors() {
        this.#process();
        return this.#errors ? this.#errors : [];
    }

    get valid() {
        return this.processed && !this.errors.length;
    }

    // Counter of libraries that have the transversal bundle configured
    #count;
    get count() {
        this.#process();
        return this.#count;
    }

    #processed;
    #sourcemap;

    get code() {
        this.#process();
        return this.#sourcemap.code;
    }

    get map() {
        this.#process();
        return this.#sourcemap.map;
    }

    constructor(packager) {
        super();
        this.#packager = packager;
        const {transversal, distribution, language} = packager;
        const {name} = transversal;

        const subscriptions = [
            'library.initialised', 'library.change',
            `bundle.${name}.initialised`, `bundle.${name}.change`,
            `packager.${name}.${distribution.key}.${language}.initialised`,
            `packager.${name}.${distribution.key}.${language}.change`,
            `code.${name}.${distribution.key}.${language}.initialised`,
            `code.${name}.${distribution.key}.${language}.change`
        ];

        const children = new Map();
        const {libraries} = transversal.application;
        children.set('libraries', {child: libraries, events: subscriptions});
        super.setup(children);
    }

    _prepared(check) {
        const {transversal, distribution, language} = this.#packager;
        const {name} = transversal;
        const libraries = this.children.get('libraries').child;

        libraries.forEach(library => {
            if (!check(library, library.id) || !check(library.bundles, library.name)) return;

            const {bundles} = library;
            if (!bundles.has(name)) return;
            const packager = library.bundles.get(name).packagers.get(distribution, language);
            check(packager, packager.id) && check(packager.code, packager.id);
        });
    }

    _process() {
        this.#processed = this.#sourcemap = this.#dependencies = this.#count = undefined;
    }

    #process() {
        if (this.#processed) return;
        this.#processed = true;

        const {transversal, distribution, language} = this.#packager;
        const {name} = transversal;
        const libraries = this.children.get('libraries').child;

        // Check for errors on bundles
        this.#errors = [];
        libraries.forEach(library => {
            if (!library.name || !library.bundles.has(name)) return;
            const bundle = library.bundles.get(name);
            if (!bundle.valid) {
                this.#errors.push(`Bundle "${bundle.pathname}" has reported errors`);
                return;
            }

            const packager = bundle.packagers.get(distribution, language);
            const {code} = packager;
            if (!code.valid) {
                this.#errors.push(`Code packager of library bundle "${bundle.pathname}" has reported errors`);
            }
        });

        if (this.#errors.length) return;

        const dependencies = new Map();
        libraries.forEach(library => {
            if (!library.bundles.has(name)) return;

            const bundle = library.bundles.get(name);
            const packager = bundle.packagers.get(distribution, language);
            const {dependencies: d} = packager;
            d.forEach(({url, resource}) => !resource.endsWith(`/${name}`) && dependencies.set(resource, url));
        });
        this.#dependencies = dependencies;

        const sourcemap = this.#sourcemap = new (require('../../../sourcemap'))();
        let counter = 0;
        libraries.forEach(library => {
            if (!library.name || !library.bundles.has(name)) return;
            const bundle = library.bundles.get(name);
            const packager = bundle.packagers.get(distribution, language);
            const {code} = packager;
            if (!code.code) return;

            counter++;
            const id = `beyond_libraries/${library.name}/start`;

            sourcemap.concat(global.utils.code.header(`LIBRARY: ${library.name}`));
            sourcemap.concat(`transversal.bundles.obtain('${id}', function (bundle, exports) {`);
            sourcemap.concat(code.content, code.map);
            sourcemap.concat('});\n\n');
        });
        this.#count = counter;
    }
}
