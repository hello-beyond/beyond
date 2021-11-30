const DynamicProcessor = global.utils.DynamicProcessor(Map);

/**
 * This is an abstract class inherited by bundle/packager/dependencies and transversal/packager/dependencies
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.dependencies';
    }

    /**
     * @property #packager {object} Can be:
     *   . a processor (actually the "ts" processor)
     *   . a bundle packager
     *   . a transversal packager
     */
    #packager;
    get packager() {
        return this.#packager;
    }

    #Dependency;
    #propagator;
    #hash;
    #cache;

    #code;
    get code() {
        return this.#code;
    }

    #declarations;
    get declarations() {
        return this.#declarations;
    }

    #errors;
    get errors() {
        return this.#errors ? this.#errors : [];
    }

    get valid() {
        return this.processed && !this.errors.length;
    }

    _create(resource) {
        if (this.has(resource)) throw new Error(`Dependency "${resource}" already created`);
        return new this.#Dependency(resource, this.#packager);
    }

    constructor(packager, Dependency) {
        if (!packager?.id || !packager.application || !packager.distribution || !packager.language) {
            throw new Error('Invalid packager parameter');
        }

        super();
        this.#packager = packager;
        this.#Dependency = Dependency ? Dependency : require('./dependency');
        this.#cache = new (require('./cache'))(packager);
        super.setup(new Map([['hash', {child: packager.hash}]]));

        this.#code = new (require('./code'))(this, packager);
        this.#declarations = new (require('./declarations'))(this);
        this.#propagator = new (require('./propagator'))(this._events);
    }

    #initialising = false;
    get initialising() {
        return this.#initialising || super.initialising;
    }

    async initialise() {
        if (this.initialised || this.#initialising) return;
        this.#initialising = true;

        const cached = await this.#cache.load();
        if (cached) {
            cached.dependencies.forEach((data, resource) => {
                const dependency = this._create(resource);
                data.is.forEach(type => dependency.is.add(type));
                this.set(resource, dependency);
            });

            this.#propagator.subscribe([...this.values()]);

            this.#errors = cached.errors;
            this.#hash = cached.hash;
        }

        await super.initialise();
        this.#initialising = false;
    }

    get updated() {
        const hash = this.children.get('hash').child;
        return hash.value === this.#hash;
    }

    _save() {
        this.#cache.save(this, this.#hash);
    }

    _process() {
        if (this.updated) return false;

        this.forEach(({is}) => is.clear());
        const {errors, updated} = this._processUpdatedItems();
        this.#errors = errors;

        // Subscribe modules that are new to the collection
        this.#propagator.subscribe([...updated.values()].filter(dependency => !this.has(dependency.resource)));

        // Unsubscribe unused modules
        this.#propagator.unsubscribe([...this.values()].filter(dependency => !updated.has(dependency.resource)));

        // Destroy unused processors
        this.forEach((dependency, resource) => !updated.has(resource) && dependency.destroy());

        super.clear(); // Do not use this.clear() as it would destroy still used processors
        updated.forEach((value, key) => this.set(key, value));

        this.#hash = this.children.get('hash').child.value;
        this._save();
    }

    clear() {
        this.forEach(dependency => dependency.destroy());
    }

    destroy() {
        super.destroy();
        this.clear();
    }
}
