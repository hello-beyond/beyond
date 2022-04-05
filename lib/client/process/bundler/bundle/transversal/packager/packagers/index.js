const DynamicProcessor = global.utils.DynamicProcessor(Map);

/**
 * All the packagers of the modules and libraries of the application for the distribution and language
 * of the transversal code packager
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.transversal.packagers';
    }

    // The transversal packager
    #tp;
    #propagator;

    #errors = [];
    get errors() {
        return this.#errors;
    }

    get valid() {
        return !this.errors.length;
    }

    #code;
    get code() {
        return this.#code;
    }

    #hash;
    get hash() {
        return this.#hash;
    }

    #initialising = false;
    get initialising() {
        return this.#initialising || super.initialising;
    }

    async initialise() {
        if (this.#initialising || this.initialised) return;
        this.#initialising = true;

        await this.#tp.initialise();
        await super.initialise();
        this.#initialising = false;
    }

    /**
     * Containers constructor
     *
     * @param tp {object} The transversal packager
     */
    constructor(tp) {
        super();
        this.#tp = tp;
        const {transversal, distribution, language} = tp;
        const {name} = transversal;

        const subscriptions = [
            'bundles.initialised', 'bundles.change',
            `bundle.${name}.initialised`, `bundle.${name}.change`,
            `packager.${name}.${distribution.key}.${language}.initialised`,
            `packager.${name}.${distribution.key}.${language}.change`
        ];

        // The libraries subscriptions
        const ls = subscriptions.concat(['library.initialised', 'library.change']);
        // The modules subscriptions
        const ms = subscriptions.concat(['module.initialised', 'module.change']);

        const children = new Map();
        const {libraries} = transversal.application;
        const {modules} = transversal.application;
        children.set('libraries', {child: libraries, events: ls});
        children.set('modules', {child: modules, events: ms});
        super.setup(children);

        this.#propagator = new (require('./propagator'))(this._events);
        this.#hash = new (require('./hash'))(this);
        this.#code = new (require('./code'))(this.#tp, this);
    }

    /**
     * Check if the dynamic processor is prepared or not
     *
     * @param collection {object} Can be a collection of libraries or a collection of application modules
     * @param check {function} The dynamic processor checker function
     */
    #prepared(collection, check) {
        const {transversal, distribution, language} = this.#tp;
        const {name} = transversal;

        collection.forEach(container => {
            if (!container.library) return;
            if (!check(container, container.id) || !check(container.bundles, container.name)) return;

            const {bundles} = container;
            if (!bundles.has(name)) return;
            const packager = container.bundles.get(name).packagers.get(distribution, language);
            check(packager, packager.id);
        });
    }

    _prepared(check) {
        this.#prepared(this.children.get('libraries').child, check);
        this.#prepared(this.children.get('modules').child, check);
    }

    /**
     * Create the map of packagers
     *
     * @param collection {object} Can be a collection of libraries or a collection of application modules
     * @param updated {Map} The collection of packagers that are being processed
     * @param errors {Array} The array of errors
     */
    #process(collection, updated, errors) {
        const {transversal, distribution, language} = this.#tp;
        const {platform} = distribution;
        const {platforms} = global;
        const {name} = transversal;

        collection.forEach(container => {
            if (!container.bundles.has(name)) return;
            const bundle = container.bundles.get(name);

            // Check if the packager have to be excluded because
            // the distribution platform is not reached by the module where the bundle is contained
            if (bundle.container.is === 'application.module' && !bundle.container.platforms.has(platform)) return;

            // If the container is a library, the start bundles should not be included in node projects
            if (bundle.container.is === 'library' &&
                bundle.name === 'start' && platforms.nodeExceptSSR.includes(platform)) return;

            if (!bundle.valid) {
                errors.push(`Bundle "${bundle.pathname}" has reported errors`);
                return;
            }
            const packager = bundle.packagers.get(distribution, language);
            updated.set(bundle.path, packager);
        });
    }

    _process() {
        const errors = [];
        const updated = new Map();
        this.#process(this.children.get('libraries').child, updated, errors);
        this.#process(this.children.get('modules').child, updated, errors);

        this.#errors = errors;

        // Subscribe modules that are new to the collection
        this.#propagator.subscribe([...updated.values()].filter(({bundle}) => !this.has(bundle.path)));

        // Unsubscribe unused modules
        this.#propagator.unsubscribe([...this.values()].filter(({bundle}) => !updated.has(bundle.path)));

        // Set the updated data into the collection
        super.clear();
        updated.forEach((value, key) => this.set(key, value));
    }
}
