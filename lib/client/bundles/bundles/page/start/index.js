const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'page-bundle.start';
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
            check(module) && module.bundles.has('page') && check(module.bundles.get('page')));
    }

    _process() {
        const modules = this.children.get('modules').child;

        const routes = [], is = {};
        modules.forEach(module => {
            if (!module.bundles.has('page')) return;

            const bundle = module.bundles.get('page');
            if (bundle.route) {
                const vdir = !!bundle.vdir;
                routes.push({
                    route: bundle.route,
                    bundle: `${bundle.pathname}.js`,
                    vdir: vdir,
                    layout: bundle.layout
                });
            }
            else if (bundle.pageIs) {
                is[bundle.pageIs] = `${bundle.pageIs}.js`;
            }
        });

        let code = '';
        code += routes.length ? `routing.config.pages.register(${JSON.stringify(routes)});\n` : '';
        code += is.error ? `routing.error = '${is.error}';\n` : '';
        code += is.loading ? `routing.loading = '${is.loading}';` : '';

        this.#code = code;
    }
}
