const DynamicProcessor = global.utils.DynamicProcessor();

/**
 * The processor of the code of the bundles of the application modules
 * Including the modules of the libraries that are imported by the application
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.transversal.modules.code';
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

    // Counter of modules that have the transversal bundle configured
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
            'module.initialised', 'module.change',
            `bundle.${name}.initialised`, `bundle.${name}.change`,
            `packager.${name}.${distribution.key}.${language}.initialised`,
            `packager.${name}.${distribution.key}.${language}.change`,
            `code.${name}.${distribution.key}.${language}.initialised`,
            `code.${name}.${distribution.key}.${language}.change`
        ];

        const children = new Map();
        const {modules} = transversal.application;
        children.set('modules', {child: modules, events: subscriptions});
        super.setup(children);
    }

    _prepared(check) {
        const {transversal, distribution, language} = this.#packager;
        const {name} = transversal;
        const modules = this.children.get('modules').child;

        modules.forEach(module => {
            if (!check(module, module.id) || !check(module.bundles, module.id)) return;

            const {bundles} = module;
            if (!bundles.has(name)) return;
            const packager = module.bundles.get(name).packagers.get(distribution, language);
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
        const modules = this.children.get('modules').child;

        // Check for errors on bundles
        this.#errors = [];
        modules.forEach(module => {
            if (!module.name || !module.bundles.has(name)) return;
            const bundle = module.bundles.get(name);
            if (!bundle.valid) {
                this.#errors.push(`Bundle "${bundle.pathname}" has reported errors`);
                return;
            }

            const packager = bundle.packagers.get(distribution, language);
            const {code} = packager;
            if (!code.valid) {
                this.#errors.push(`Code packager of bundle "${bundle.pathname}" has reported errors`);
            }
        });

        if (this.#errors.length) return;

        const dependencies = new Map();
        modules.forEach(module => {
            if (!module.bundles.has(name)) return;

            const bundle = module.bundles.get(name);
            const packager = bundle.packagers.get(distribution, language);
            const {dependencies: d} = packager;
            d.forEach(({url, resource}) => !resource.endsWith(`/${name}`) && dependencies.set(resource, url));
        });
        this.#dependencies = dependencies;

        const sourcemap = this.#sourcemap = new (require('../../../sourcemap'))();
        let counter = 0;
        let unnamed = 0; // Used by the modules without developer name and module name
        modules.forEach(module => {
            if (!module.bundles.has(name)) return;
            const bundle = module.bundles.get(name);
            const packager = bundle.packagers.get(distribution, language);
            const {code} = packager;
            if (!code.code) return;

            counter++;
            let id;
            const setUnnamed = () => id = `unnamed:${unnamed++}`;
            if (!module.name || (module.container.is === 'application' && !module.developer)) {
                id = setUnnamed();
            }
            else if (module.container.is === 'library') {
                id = `beyond_libraries/${module.container.name}/${module.name}/${name}`;
            }
            else {
                id = `beyond_modules/${module.developer}/${module.name}/${name}`;
            }

            const {pathname} = module;
            sourcemap.concat(global.utils.code.header(`MODULE: ${pathname}`));
            sourcemap.concat(`transversal.bundles.obtain('${id}', function (bundle, exports) {`);
            sourcemap.concat(code.code, code.map);
            sourcemap.concat('});\n\n');
        });
        this.#count = counter;
    }
}
