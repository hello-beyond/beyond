const DynamicProcessor = global.utils.DynamicProcessor(Map);

/**
 * The processors of a packager
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.processors';
    }

    #packager;
    #supported;
    #propagator;

    #hashes;
    get hashes() {
        return this.#hashes;
    }

    #errors = [];
    get errors() {
        return this.#errors;
    }

    #warnings = [];
    get warnings() {
        return this.#warnings;
    }

    /**
     * Packager processors constructor
     *
     * @param packager {object} The packager
     */
    constructor(packager) {
        super();
        this.#packager = packager;
        const {bundle} = packager;
        this.#supported = global.bundles.get(bundle.name).processors;

        this.#propagator = new (require('./propagator'))(this._events);
        this.#hashes = new (require('./hashes'))(this);

        super.setup(new Map([
            ['bundle', {child: bundle}],
            ['global.processors', {child: global.processors}]
        ]));
    }

    _process() {
        let {valid, path, config} = this.children.get('bundle').child;
        config = valid && config ? config : {};

        const {multilanguage} = config;
        const reserved = ['imports', 'standalone', 'scoped', 'multilanguage'];

        const updated = new Map();
        let changed = false;
        const processors = Object.entries(valid && config ? config : {});

        for (const [name, config] of processors) {
            if (reserved.includes(name)) continue;

            if (this.#supported.includes(name) && !global.processors.has(name)) {
                this.#errors.push(`Processor "${name}" is not registered`);
                continue;
            }
            if (!this.#supported.includes(name)) {
                this.#warnings.push(`Configuration property "${name}" is invalid`);
                continue;
            }

            const {bundle, distribution, language} = this.#packager;
            const {id, container, resource, pathname, watcher} = bundle;
            const specs = {
                watcher,
                bundle: {
                    path, id, resource, pathname,
                    name: bundle.name,
                    container: {is: container.is}
                },
                distribution, language,
                application: container.application
            };

            const Processor = require('./processor')(name);
            const processor = this.has(name) ? this.get(name) : (changed = true) && new Processor(specs);
            processor.configure(config, multilanguage);
            updated.set(name, processor);
        }

        // Subscribe modules that are new to the collection
        this.#propagator.subscribe([...updated.values()].filter(processor => !this.has(processor.name)));

        // Unsubscribe unused modules
        this.#propagator.unsubscribe([...this.values()].filter(processor => !updated.has(processor.name)));

        // Destroy unused processors
        this.forEach((processor, name) => !updated.has(name) && processor.destroy());

        super.clear(); // Do not use this.clear() as it would destroy still used processors
        updated.forEach((value, key) => this.set(key, value));

        return changed;
    }

    clear() {
        this.forEach(processor => processor.destroy());
        super.clear();
    }

    destroy() {
        this.clear();
        super.destroy();
    }
}
