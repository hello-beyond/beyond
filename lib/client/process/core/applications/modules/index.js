const {ipc} = global.utils;
const DynamicProcessor = global.utils.DynamicProcessor(Map);

/**
 * Collection of application modules
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application.modules';
    }

    #application;

    // The modules in a map where the key is its resource id (not the PLM id)
    #resources = new Map();
    get resources() {
        return this.#resources;
    }

    // The modules in a map where the key is its relative paths
    #rpaths = new Map();
    get rpaths() {
        return this.#rpaths;
    }

    // The modules in a map where the key is `${resource}//${platform}`
    #platforms = new Map();
    get platforms() {
        return this.#platforms;
    }

    /**
     * The collection of bundles of the project
     */
    #bundles;
    get bundles() {
        return this.#bundles;
    }

    #seekers;
    get seekers() {
        return this.#seekers;
    }

    #propagator;

    get self() {
        return this.children.get('self').child;
    }

    /**
     * Application modules constructor
     *
     * @param application {object} The application object
     * @param config {object} The modules configuration
     * @param excludes {object} Excluded modules
     */
    constructor(application, config, excludes) {
        super();
        this.setMaxListeners(500); // One listener per seekers is require

        this.#application = application;

        const children = new Map();
        children.set('excludes', {child: excludes});

        const self = new (require('./self'))(application, config);
        children.set('self', {child: self});

        children.set('libraries', {child: application.libraries.modules});
        super.setup(children);

        this.#bundles = new (require('./bundles'))(this);
        this.#seekers = new (require('./seekers'))(application);
        this.#propagator = new (require('./propagator'))(this._events);
    }

    _prepared(require) {
        const self = this.children.get('self').child;
        self.forEach(module => require(module, module.id));

        const libraries = this.children.get('libraries').child;
        libraries.forEach(module => require(module, module.id));
    }

    _notify() {
        ipc.notify('data-notification', {
            type: 'list/update',
            table: 'applications-modules',
            filter: {application: this.#application.id}
        });
    }

    _process() {
        const excludes = this.children.get('excludes').child;
        const self = this.children.get('self').child;
        const libraries = this.children.get('libraries').child;

        const updated = new Map();
        libraries.forEach(module => !excludes.check(module) && updated.set(module.id, module));
        self.forEach(module => !excludes.check(module) && updated.set(module.id, module));

        // Subscribe modules that are new to the collection
        this.#propagator.subscribe([...updated.values()].filter(module => !this.has(module.id)));

        // Unsubscribe unused modules
        this.#propagator.unsubscribe([...this.values()].filter(module => !updated.has(module.id)));

        // Check if collection has changed
        const changed = (() => {
            if (this.size !== updated.size) return true;

            // Check the count of module+platforms entries
            const platforms = [...updated.values()].reduce((prev, {platforms}) => prev += platforms.size, 0);
            if (this.#platforms.size !== platforms) return true;

            let changed = false;
            for (const {id, resource, rpath, platforms} of updated.values()) {
                changed = !this.has(id) || !this.#resources.has(resource) || !this.#rpaths.has(rpath);
                if (changed) break;

                changed = [...platforms].reduce((prev, curr) => prev ||
                    !this.#platforms.has(`${resource}//${curr}`), false);
            }
            return changed;
        })();
        if (!changed) return false;

        // Set the processed collection
        super.clear(); // Do not use this.clear() as it would unsubscribe reused modules
        this.#resources.clear();
        this.#platforms.clear();
        this.#rpaths.clear();

        updated.forEach(module => {
            this.set(module.id, module);
            this.#resources.set(module.resource, module);
            this.#rpaths.set(module.rpath, module);

            module.platforms.forEach(platform =>
                this.#platforms.set(`${module.resource}//${platform}`, module));
        });
    }

    clear() {
        this.#propagator.unsubscribe([...this.values()]);
        this.#resources.clear();
        this.#rpaths.clear();
        super.clear();
    }

    destroy() {
        super.destroy();
        this.clear();
    }
}
