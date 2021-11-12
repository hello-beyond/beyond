const DynamicProcessor = global.utils.DynamicProcessor(Map);

module.exports = class extends DynamicProcessor {
    dp() {
        return 'application.consumers';
    }

    #distribution;
    #language;

    constructor(application, distribution, language) {
        super();
        this.#distribution = distribution;
        this.#language = language;
        this.setMaxListeners(500); // how many bundles can have the same dependency

        const subscriptions = ['module.initialised', 'module.change',
            'bundles.initialised', 'bundles.change',
            'bundle.initialised', 'bundle.change',
            `packager.${distribution.key}.${language}.initialised`,
            `packager.${distribution.key}.${language}.change`,
            `dependencies.${distribution.key}.${language}.initialised`,
            `dependencies.${distribution.key}.${language}.change`,
            `dependency.${distribution.key}.${language}.initialised`,
            `dependency.${distribution.key}.${language}.change`
        ];

        super.setup(new Map([['modules', {child: application.modules, events: subscriptions}]]));
    }

    _prepared(check) {
        const modules = this.children.get('modules').child;
        modules.forEach(module => {
            if (!check(module) || !check(module.bundles)) return;
            module.bundles.forEach(bundle => {
                if (!check(bundle)) return;
                const packager = bundle.packagers.get(this.#distribution, this.#language);
                if (!check(packager) || !check(packager.dependencies)) return;
                packager.dependencies.forEach(dependency => check(dependency));
            });
        });
    }

    _process() {
        const updated = new Map();
        const modules = this.children.get('modules').child;
        modules.forEach(module => module.bundles.forEach(bundle => {
            const packager = bundle.packagers.get(this.#distribution, this.#language);
            packager.dependencies.forEach(dependency => {
                if (dependency.external || dependency.node || !dependency.valid) return;
                if (dependency.bundle.resource.startsWith('@beyond-js/')) return;

                const consumers = updated.has(dependency.bundle.id) ? updated.get(dependency.bundle.id) : new Set();
                updated.set(dependency.bundle.id, consumers);
                consumers.add(bundle);
            });
        }));

        this.clear();
        updated.forEach((value, key) => this.set(key, value));
    }
}
