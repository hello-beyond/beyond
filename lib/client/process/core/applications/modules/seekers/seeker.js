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
        this.#application = application;
        this.#resource = resource;
        this.#distribution = distribution;

        // The application bundles
        super.setup(new Map([
            ['libraries', {child: application.libraries}],
            ['bundles', {child: application.modules.bundles}]
        ]));
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
                const resolved = require.resolve(this.#resource);
                if (resolved === this.#resource) return done({node: true});
            }
            catch (exc) {
                void (exc);
            }
        }

        if (split[0].startsWith('@') && split.length < 2) {
            return done({errors: [`Dependency "${this.#resource}" is invalid`]});
        }
        const pkg = split[0].startsWith('@') ? `${split.shift()}/${split.shift()}` : split.shift();

        // Check if bundle resource is contained in a module of the project or one of its libraries
        const libraries = this.children.get('libraries').child;
        if (pkg === this.#application.package || libraries.has(pkg)) {
            const bundles = this.children.get('bundles').child;
            const {platform} = this.#distribution;

            const key = `${this.#resource}//${platform}`;
            if (!bundles.has(key)) {
                const error = bundles.resources.has(this.#resource) ?
                    `Bundle "${this.#resource}" does not support the "${platform}" platform` :
                    `Dependency "${this.#resource}" not found`;

                return done({errors: [error]});
            }

            const bundle = bundles.get(key);
            return done({bundle});
        }

        // Check if the resource is an external resource
        const external = new (require('./external'))(pkg, this.#application);
        return done(external.error ? {errors: [external.error]} : {external});
    }

    destroy() {
        super.destroy();
    }
}
