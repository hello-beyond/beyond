const DynamicProcessor = global.utils.DynamicProcessor();
const {equal} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'dependencies.seeker';
    }

    #propagator;

    #application;
    #resource;
    get resource() {
        return this.#resource;
    }

    #errors = [];
    get errors() {
        return this.#errors;
    }

    get valid() {
        return !this.#errors.length;
    }

    #external;
    get external() {
        return this.#external;
    }

    // #node {string} true Can be 'node' or 'node.internal'
    // 'node.internal' is in cases like 'http' or 'fs'
    #node;
    get node() {
        return this.#node;
    }

    #bundle;
    get bundle() {
        return this.#bundle;
    }

    /**
     * Dependency seeker constructor
     *
     * @param application {object} The application object
     * @param resource {string} The dependency resource
     */
    constructor(application, resource) {
        super();
        this.setMaxListeners(500); // how many bundles can have the same dependency
        this.#application = application;
        this.#resource = resource;

        const subscriptions = ['module.initialised', 'module.change',
            'bundles.initialised', 'bundles.change'];

        super.setup(new Map([
            ['modules', {child: application.modules, events: subscriptions}],
            ['externals', {child: application.externals}]
        ]));

        this.#propagator = new (require('./propagator'))(this, this._events);
    }

    _prepared(check) {
        const modules = this.children.get('modules').child;
        modules.forEach(module => check(module) && check(module.bundles));
    }

    _process() {
        const done = ({node, external, bundle, errors}) => {
            errors = errors ? errors : [];

            // Returning false makes the dynamic processor not to emit the change event
            if (external === this.#external && this.node === node &&
                bundle === this.#bundle && equal(this.#errors, errors)) return false;

            this.#node = node;
            this.#external = external;
            this.#bundle = bundle;
            this.#errors = errors;

            this.#propagator.subscribe();
        }

        const externals = this.children.get('externals').child;
        const external = [...externals.values()].find(external => external.package === this.#resource);
        if (external) {
            return done({external});
        }

        // Try to find the resource as a node module
        const node = () => require('./resolve')(this.#resource, this.#application);

        const split = this.#resource.split('/');
        const pkg = split.length === 1 || !split[0].startsWith('@') ? split.shift() : split.splice(0, 2).join('/');

        // The resource is just a package
        if (!split.length) {
            const is = node();
            const response = is ? {node: is} : {errors: [`Resource "${this.#resource}" not found`]};
            return done(response);
        }

        const bundle = split.pop();
        const resource = split.length ? pkg + '/' + split.join('/') : pkg;

        const modules = this.children.get('modules').child;
        const module = [...modules.values()].find(module => module.resource === resource);

        if (!module) {
            return done({errors: [`Module ${resource} not found`]});
        }

        return module.bundles.has(bundle) ?
            done({bundle: module.bundles.get(bundle)}) :
            done({errors: [`Bundle "${bundle}" not found`]});
    }

    destroy() {
        super.destroy();
        this.#propagator.unsubscribe();
    }
}
