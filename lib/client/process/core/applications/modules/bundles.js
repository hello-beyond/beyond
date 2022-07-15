const DynamicProcessor = global.utils.DynamicProcessor(Map);

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application.modules.bundles';
    }

    #resources = new Set();
    get resources() {
        return this.#resources;
    }

    constructor(modules) {
        super();
        super.setup(new Map([['modules', {child: modules}]]));
    }

    _prepared(require) {
        const modules = this.children.get('modules').child;
        modules.forEach(module => {
            if (!require(module) || !require(module.bundles)) return false;
            module.bundles.forEach(bundle => require(bundle));
        });
    }

    _process() {
        const modules = this.children.get('modules').child;

        const updated = {platforms: new Map(), resources: new Set()};
        modules.forEach(module => module.bundles.forEach(bundle => {
            if (bundle.errors?.length) return;
            updated.resources.add(bundle.resource);
            bundle.platforms.forEach(platform => updated.platforms.set(`${bundle.resource}//${platform}`, bundle));
        }));

        const changed = (() => {
            if (this.size !== updated.platforms.size) return true;
            if (this.#resources.size !== updated.resources.size) return true;

            let changed;
            changed = [...this].reduce((prev, [key, value]) =>
                prev || !updated.platforms.has(key) || updated.platforms.get(key) !== value, false);
            if (changed) return true;

            changed = [...this.#resources].reduce((prev, resource) => prev || !updated.resources.has(resource), false);
            return changed;
        })();
        if (!changed) return false;

        this.#resources.clear();
        this.clear();
        updated.platforms.forEach((bundle, key) => this.set(key, bundle));
        updated.resources.forEach(resource => this.#resources.add(resource));
    }
}
