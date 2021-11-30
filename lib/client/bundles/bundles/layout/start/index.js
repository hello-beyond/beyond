const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'layout-bundle.start';
    }

    #code;
    get code() {
        return this.#code;
    }

    constructor(application) {
        super();

        const children = new Map();
        const subscriptions = ['module.initialised', 'module.change', 'bundle.initialised', 'bundle.change'];
        children.set('modules', {child: application.modules, events: subscriptions});
        super.setup(children);
    }

    _prepared(check) {
        const modules = this.children.get('modules').child;
        modules.forEach(module =>
            check(module) && module.bundles.has('layout') && check(module.bundles.get('layout')));
    }

    _process() {
        const modules = this.children.get('modules').child;

        const layouts = [];
        modules.forEach(module => {
            if (!module.bundles.has('layout')) return;

            const bundle = module.bundles.get('layout');
            bundle.layoutId && layouts.push({
                name: bundle.layoutId,
                bundle: `${bundle.pathname}.js`
            });
        });

        this.#code = layouts.length ?
            `routing.config.layouts.register(${JSON.stringify(layouts)});\n` : undefined;
    }
}
