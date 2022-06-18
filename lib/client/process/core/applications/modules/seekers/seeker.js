const DynamicProcessor = global.utils.DynamicProcessor();
const {equal} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'dependencies.seeker';
    }

    #application;
    get application() {
        return this.#application;
    }

    #distribution;

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

    // Is it a node internal module?
    #node;
    get node() {
        return this.#node;
    }

    // Is it a beyond internal bundle? Actually beyond_context
    #internal;
    get internal() {
        return this.#internal;
    }

    // The bundle object when it is found in the application project or a library
    #bundle;
    get bundle() {
        return this.#bundle;
    }

    // When it is an external package
    #external;
    get external() {
        return this.#external;
    }

    /**
     * Dependency seeker constructor
     *
     * @param application {object} The application object
     * @param resource {string} The dependency resource
     * @param distribution {object} The distribution specification
     */
    constructor(application, resource, distribution) {
        if (!application || !resource || !distribution) throw new Error('Invalid parameters');

        super();
        this.setMaxListeners(500); // how many bundles can have the same dependency
        this.#application = application;
        this.#resource = resource;
        this.#distribution = distribution;

        // The application bundles
        const bundles = require('./app-bundles').obtain(this);
        super.setup(new Map([['bundles', {child: bundles}]]));
    }

    _process() {
        // Just as a performance improvement, if it is a node internal module dependency, then
        // it will never change
        if (this.#node) return false;

        if (this.#resource === 'beyond_context') {
            this.#internal = true;
            return;
        }

        const done = ({node, external, bundle, errors}) => {
            errors = errors ? errors : [];

            // Returning false makes the dynamic processor not to emit the change event
            if (external === this.#external && this.node === node &&
                bundle === this.#bundle && equal(this.#errors, errors)) return false;

            this.#node = !!node;
            this.#external = external;
            this.#bundle = bundle;
            this.#errors = errors;
        }

        const split = this.#resource.split('/');
        if (split.length === 1) {
            // Check if it is a node internal module
            try {
                const resolved = require.resolve(split[0]);
                if (resolved === this.#resource) return done({node: true});
            }
            catch (exc) {
                void (exc);
            }
        }

        if (split[0].startsWith('@') && split.length < 2) {
            return done({errors: [`Dependency "${this.#resource}" is invalid`]});
        }

        // The package name
        const pkg = split[0].startsWith('@') ? `${split.shift()}/${split.shift()}` : split.shift();

        // Check if bundle resource is contained in a module of the application
        const {bundles, packages} = this.children.get('bundles').child;
        const {bundle, errors} = (() => {
            if (split.length < 2) return {}; // The resource is just a package (cannot be a bundle)

            const name = split.pop();
            const resource = split.length ? pkg + '/' + split.join('/') : pkg;
            const {platform} = this.#distribution;

            const bundle = bundles.get(`${resource}//${name}//${platform}`);

            // If the package is registered as an imported project, and the bundle was not found, then it is an error
            // Not required to try to search in the externals
            if (!bundle && packages.has(pkg)) {
                const error = `Dependency "${this.#resource}" is invalid: bundle not found or platform not supported`;
                return {errors: [error]};
            }

            return {bundle};
        })();
        if (bundle || errors) return done({bundle, errors});

        const external = new (require('./external'))(pkg, this.#application);
        return done(external.error ? {errors: [external.error]} : {external});
    }

    destroy() {
        super.destroy();
        require('./app-bundles').release(this);
    }
}
