const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application.resources.index.ssr.router';
    }

    #url;

    #bundle;
    get bundle() {
        return this.#bundle;
    }

    #errors = [];
    get errors() {
        return this.#errors;
    }

    get valid() {
        return !this.#errors.length;
    }

    constructor(application, url) {
        super();
        this.#url = url;
        super.setup(new Map([['modules', {child: application.modules}]]));
    }

    _prepared(check) {
        const modules = this.children.get('modules').child;
        modules.forEach(module => check(module));
    }

    _process() {
        const modules = this.children.get('modules').child;
        this.#bundle = undefined;
        const errors = this.#errors = [];

        // Actually hard-coded
        const route = {module: 'welcome'};

        !modules.pathnames.has(route.module) && errors.push(`Module "${route.module}" not found`);

        const module = modules.pathnames.get(route.module);
        !module.bundles.has('page') && errors.push(`Bundle "page" is not defined in module "${route.module}"`);

        this.#bundle = !errors.length ? module.bundles.get('page') : undefined;
    }
}
