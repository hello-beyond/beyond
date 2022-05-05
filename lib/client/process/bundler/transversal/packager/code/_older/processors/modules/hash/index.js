const DynamicProcessor = global.utils.DynamicProcessor();
const {crc32, equal} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.transversal.modules.hash';
    }

    #packager;
    get packager() {
        return this.#packager;
    }

    #value;
    get value() {
        if (this.#value !== undefined) return this.#value;

        const {transversal, distribution, language} = this.#packager;
        const {name} = transversal;
        const modules = this.children.get('modules').child;
        const hashes = new Map();

        modules.forEach(module => {
            if (!module.bundles.has(name)) return;

            const bundle = module.bundles.get(name);
            const packager = bundle.packagers.get(distribution, language);
            hashes.set(module.id, packager.hash.value);
        });
        return (this.#value = crc32(equal.generate([...hashes])));
    }

    constructor(packager) {
        super();
        this.#packager = packager;
        const {transversal, distribution, language} = packager;
        const {name} = transversal;

        const subscriptions = [
            'module.initialised', 'module.change',
            'bundles.initialised', 'bundles.change',
            `bundle.${name}.initialised`, `bundle.${name}.change`,
            `packager.${name}.${distribution.key}.${language}.initialised`,
            `packager.${name}.${distribution.key}.${language}.change`,
            `hash.${name}.${distribution.key}.${language}.initialised`,
            `hash.${name}.${distribution.key}.${language}.change`
        ];

        const children = new Map();
        const {modules} = packager.transversal.application;
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
            if (!check(bundles) || !bundles.has(name)) return;
            const packager = module.bundles.get(name).packagers.get(distribution, language);
            check(packager, packager.id) && check(packager.hash, packager.id);
        });
    }

    _process() {
        this.#value = undefined;
    }
}
