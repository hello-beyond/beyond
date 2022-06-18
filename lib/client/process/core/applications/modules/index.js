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

    #seekers;
    get seekers() {
        return this.#seekers;
    }

    // The modules in a map where the key is its resource id (not the PLM id)
    #resources = {
        ids: new Map(),
        rpaths: new Map(),
        platforms: new Map() // Includes the platform in the key of the map `//${platform}`
    };
    get resources() {
        return this.#resources;
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
            if (this.#resources.platforms.size !== platforms) return true;

            let changed = false;
            for (const module of updated.values()) {
                changed =
                    !this.has(module.id) ||
                    !this.#resources.ids.has(module.resource) ||
                    !this.#resources.rpaths.has(module.rpath);
                if (changed) break;

                changed = [...module.platforms].reduce((prev, curr) => prev ||
                    !this.#resources.platforms.has(`${module.resource}//${curr}`), false);
                changed && console.log('one of the platforms of the module has changed', module.id);
                if (changed) break;
            }
            return changed;
        })();
        if (!changed) return false;

        // Set the processed collection
        super.clear(); // Do not use this.clear() as it would unsubscribe reused modules
        this.#resources.ids.clear();
        this.#resources.platforms.clear();
        this.#resources.rpaths.clear();

        updated.forEach(module => {
            this.set(module.id, module);
            this.#resources.ids.set(module.resource, module);
            this.#resources.rpaths.set(module.rpath, module);

            module.platforms.forEach(platform =>
                this.#resources.platforms.set(`${module.resource}//${platform}`, module));
        });
    }

    clear() {
        this.#propagator.unsubscribe([...this.values()]);
        super.clear();
        this.#resources.ids.clear();
        this.#resources.platforms.clear();
        this.#resources.rpaths.clear();
    }

    destroy() {
        super.destroy();
        this.clear();
    }
}
