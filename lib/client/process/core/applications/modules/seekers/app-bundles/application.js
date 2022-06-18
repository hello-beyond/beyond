const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'dependencies.seeker.app-bundles.application';
    }

    #packages = new Set();
    get packages() {
        return this.#packages;
    }

    #bundles = new Map();
    get bundles() {
        return this.#bundles;
    }

    constructor(application) {
        super();
        super.setup(new Map([['modules', {child: application.modules}]]));
    }

    _prepared(require) {
        const modules = this.children.get('modules').child;
        modules.forEach(module => require(module) && require(module.bundles));
    }

    _process() {
        this.#packages.clear();
        this.#bundles.clear();

        const modules = this.children.get('modules').child;
        modules.forEach(module => module.bundles.forEach(bundle => {
            module.platforms.forEach(platform => {
                this.#packages.add(module.container.package);

                const key = `${module.resource}//${bundle.name}//${platform}`;
                this.#bundles.set(key, bundle);
            });
        }));
    }
}
