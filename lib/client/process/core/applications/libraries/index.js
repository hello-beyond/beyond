const {ipc} = global.utils;
const DynamicProcessor = global.utils.DynamicProcessor(Map);

/**
 * The collection of libraries imported by the application
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application.libraries';
    }

    #application;

    #errors = [];
    get errors() {
        return this.#errors;
    }

    #warnings = [];
    get warnings() {
        return this.#warnings;
    }

    #modules;
    get modules() {
        return this.#modules;
    }

    #propagator;

    /**
     * Application libraries constructor
     *
     * @param application {object} The application
     * @param libraries {object} The registered libraries collection
     * @param config {object} The application libraries configuration
     */
    constructor(application, libraries, config) {
        super();
        this.#application = application;

        const children = new Map();
        children.set('libraries', {child: libraries});
        children.set('config', {child: new (require('./config'))(config)});
        super.setup(children);

        this.#modules = new (require('./modules'))(this);
        this.#propagator = new (require('./propagator'))(this._events);
    }

    async _process(request) {
        const libraries = this.children.get('libraries').child;
        const config = this.children.get('config').child;

        this.#warnings = libraries.warnings.concat(config.warnings);
        if (!libraries.valid || !config.valid) {
            this.#errors = libraries.errors.concat(config.errors);
            return;
        }

        this.#errors = [];
        const updated = new Map();
        for (const imported of config.imports) {
            let library;
            if (this.has(imported)) {
                library = this.get(imported)
            }
            else {
                // The library registered in the BeyondJS instance
                const found = await libraries.find(imported);
                if (this._request !== request) return;
                if (!found) {
                    this.#warnings.push(`Library "${imported}" not found`);
                    continue;
                }
                library = new (require('./library'))(this.#application, found);
            }
            updated.set(imported, library);
        }

        // Subscribe modules that are new to the collection
        this.#propagator.subscribe([...updated.values()].filter(library => !this.has(library.package)));

        // Unsubscribe unused modules
        this.#propagator.unsubscribe([...this.values()].filter(library => !updated.has(library.package)));

        // Destroy unused application libraries
        this.forEach((library, pkg) => !updated.has(pkg) && library.destroy());

        // Set the updated data into the collection
        super.clear(); // Do not use this.clear(), as it would destroy libraries still being used
        updated.forEach((value, key) => this.set(key, value));
    }

    _notify() {
        ipc.notify('data-notification', {
            type: 'list/update',
            table: 'applications-libraries',
            filter: {application: this.#application.id}
        });
    }

    clear() {
        this.#propagator.unsubscribe([...this.values()]);
        this.forEach(library => library.destroy());
        super.clear();
    }
}
