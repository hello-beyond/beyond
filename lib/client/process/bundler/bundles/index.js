const {ipc} = global.utils;
const DynamicProcessor = global.utils.DynamicProcessor(Map);

/**
 * Bundles collection used by application module (AM) and application library (AL)
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundles';
    }

    // The application module or application library
    #container;
    get container() {
        return this.#container;
    }

    #propagator;

    _notify() {
        if (this.#container.is === 'library') return;

        ipc.notify('data-notification', {
            type: 'record/update',
            table: 'applications-modules',
            id: this.#container.id
        });
    }

    /**
     * The bundles collection
     *
     * @param container {object} The application module or application library
     */
    constructor(container) {
        super();

        // Each child bundle binds the bundle collection (currently to check if the module has a txt bundle).
        // Consider that it is multiplied by the number of distributions.
        this.setMaxListeners(100);

        this.#container = container;
        super.setup(new Map([
            ['config', {child: container[container.is === 'module' ? 'module' : 'library'].bundles}],
            ['global.bundles', {child: global.bundles}]
        ]));

        this.#propagator = new (require('./propagator'))(this._events);
    }

    _process() {
        const config = this.children.get('config').child;

        const updated = new Map();
        let changed = false;
        config.forEach((config, name) => {
            let bundle = this.has(name) && this.get(name);
            if (!bundle) {
                const {Bundle} = global.bundles.get(name);
                bundle = new Bundle(this.#container, name, config);
                changed = true;
            }
            updated.set(name, bundle);
        });

        if (!changed) return false;

        // Subscribe modules that are new to the collection
        this.#propagator.subscribe([...updated.values()].filter(bundle => !this.has(bundle.name)));

        // Unsubscribe unused modules
        this.#propagator.unsubscribe([...this.values()].filter(bundle => !updated.has(bundle.name)));

        // Destroy unused bundles
        this.forEach((bundle, name) => !updated.has(name) && (changed = true) && bundle.destroy());

        super.clear(); // Do not use this.clear as it would destroy still used bundles
        updated.forEach((value, key) => this.set(key, value));
    }

    clear() {
        this.forEach(bundle => bundle.destroy());
        super.clear();
    }
}
