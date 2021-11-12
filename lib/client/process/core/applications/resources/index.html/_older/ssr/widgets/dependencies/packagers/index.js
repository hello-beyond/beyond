const DynamicProcessor = global.utils.DynamicProcessor(Map);

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application.resources.index.ssr.dependencies.packagers';
    }

    #errors = [];
    get errors() {
        return this.#errors;
    }

    get valid() {
        return !this.#errors.length;
    }

    #distribution;
    #propagator;

    constructor(bundle, distribution) {
        super();
        this.#distribution = distribution;
        this.#propagator = new (require('./propagator'))(this._events);

        const {dependencies} = bundle;
        super.setup(new Map([['dependencies', {child: dependencies}]]));
    }

    _process() {
        const dependencies = this.children.get('dependencies').child;

        const errors = this.#errors = [];
        this.clear();

        dependencies.forEach(dependency =>
            !dependency.valid && errors.push(`Dependency "${dependency.resource}" is not valid`));

        if (errors.length) {
            this.#errors = errors;
            return;
        }

        const updated = new Map();
        for (const dependency of dependencies.values()) {
            if (dependency.external) continue;

            const {bundle} = dependency;
            const packager = bundle.code.get(this.#distribution);
            updated.set(bundle.id, {packager, dependency});
        }

        // Subscribe packagers that are new to the collection
        this.#propagator.subscribe(([...updated].filter(([key]) => !this.has(key))).map(([, {packager}]) => packager));

        // Unsubscribe unused packagers
        this.#propagator.unsubscribe(([...this].filter(([key]) => !updated.has(key))).map(([, {packager}]) => packager));

        updated.forEach((value, key) => this.set(key, value));
    }
}
