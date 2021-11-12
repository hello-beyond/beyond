const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application.resources.index.ssr.router';
    }

    #url;
    #distribution;
    #workers;
    #required = ['libraries/beyond/core', 'libraries/beyond/routing/v1'];


    #errors = [];
    get errors() {
        return this.#errors;
    }

    get valid() {
        return !this.#errors.length;
    }

    #layouts;

    async layouts() {
        if (this.#layouts !== undefined) return this.#layouts;

        // Process the layouts
        const bundle = this.children.get('start').child;
        const start = {code: bundle.code, map: bundle.map};

        const bundles = new Map();
        this.#required.forEach(module => {
            const bundle = this.children.get(module).child;
            bundles.set(module, {code: bundle.code, map: bundle.map});
        });

        this.#workers.process('process-url', start, bundles, this.#url);
    }

    constructor(application, url, distribution, workers) {
        super();
        this.#url = url;
        this.#distribution = distribution;
        this.#workers = workers;

        const required = this.#required;
        const subscriptions = [];
        const language = '.';
        required.forEach(module => {
            subscriptions.push(`module.${module}.initialised`);
            subscriptions.push(`bundles.${module}.initialised`);
            subscriptions.push(`bundle.${module}/ts.initialised`);
            subscriptions.push(`code.${module}/ts.${distribution.key}.${language}.initialised`);
        });

        const start = application.transversals.get('start').packagers.get(distribution).code;
        super.setup(new Map([
            ['start', {child: start}],
            ['modules', {child: application.modules, events: subscriptions}]
        ]));
    }

    _prepared(check) {
        if (this.children.has('libraries/beyond/core')) return;

        const modules = this.children.get('modules').child;
        const distribution = this.#distribution;

        const required = this.#required;
        for (const m of required) {
            const module = modules.pathnames.get(m);
            if (!check(module) || !check(module.bundles) || !check(module.bundles.get('ts'))) return false;
            if (!check(module.bundles.get('ts').packagers.get(distribution).code)) return false;
        }

        const bundles = required.map(module => {
            const child = modules.pathnames.get(module).bundles.get('ts').packagers.get(distribution).code;
            return [module, {child}];
        });

        this.children.unregister(['modules'], false);
        this.children.register(new Map(bundles));
    }

    _process() {
        this.#layouts = undefined;
    }
}
