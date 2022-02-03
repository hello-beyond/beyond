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
        const self = new (require('./self'))(application, config);
        this.#application = application;
        const children = new Map();
        children.set('excludes', {child: excludes});

        let subscriptions = ['item.initialised', 'item.change'];
        children.set('self', {child: self, events: subscriptions});

        subscriptions = ['module.initialised', 'module.change'];
        children.set('libraries', {child: application.libraries.modules, events: subscriptions});
        super.setup(children);

        this.#seekers = new (require('./seekers'))(application);
        this.#propagator = new (require('./propagator'))(this._events);
    }

    _prepared(check) {
        const self = this.children.get('self').child;
        const libraries = this.children.get('libraries').child;
        self.forEach(module => check(module, module.id));
        libraries.forEach(module => check(module, module.id));
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
            let changed = false;
            for (const module of updated.values()) {
                changed = !this.has(module.id);
                if (changed) break;
            }
            return changed;
        })();
        if (!changed) return false;

        // Set the processed collection
        super.clear(); // Do not use this.clear() as it would unsubscribe reused modules
        this.#resources.ids.clear();
        this.#resources.platforms.clear();
        updated.forEach(module => {
            this.set(module.id, module);
            module.platforms.forEach(platform => {
                this.#resources.ids.set(`${module.resource}`, module);
                this.#resources.platforms.set(`${module.resource}//${platform}`, module);
            });
        });
    }

    clear() {
        this.#propagator.unsubscribe([...this.values()]);
        super.clear();
        this.#resources.ids.clear();
        this.#resources.platforms.clear();
    }

    destroy() {
        super.destroy();
        this.clear();
    }
}
