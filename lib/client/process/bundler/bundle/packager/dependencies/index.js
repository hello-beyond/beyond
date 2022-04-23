const {ipc} = global.utils;
const DynamicProcessor = global.utils.DynamicProcessor(Map);

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.bundle.dependencies';
    }

    // The bundle packager
    #bp;
    get bp() {
        return this.#bp;
    }

    #Dependency;
    #propagator;

    #hash;
    get hash() {
        return this.#hash;
    }

    #code;
    get code() {
        return this.#code;
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
        return new this.#Dependency(resource, this.#bp);
    }

    _notify() {
        ipc.notify('data-notification', {
            type: 'list/update',
            table: 'bundle-dependencies',
            filter: {bundle: this.#bp.id}
        });
    }

    constructor(bp, Dependency, Propagator) {
        super();
        this.#bp = bp;
        this.#Dependency = Dependency ? Dependency : require('../../../dependencies/dependency');
        this.#hash = new (require('./hash'))(this);
        this.#code = new (require('../../../dependencies/code'))(this, bp);

        super.setup(new Map([['hash', {child: bp.processors.hashes.dependencies}]]));

        Propagator = Propagator ? Propagator : require('../../../dependencies/propagator');
        this.#propagator = new Propagator(this._events);
    }

    _process() {
        this.forEach(dependency => dependency.clear());

        const errors = [], updated = new Map();
        this.#bp.processors.forEach(({dependencies}) => {
            dependencies?.forEach(({valid, resource, is}) => {
                if (!valid) {
                    errors.push(`Dependency "${resource}" is invalid`);
                    return;
                }

                const dependency = this.has(resource) ? this.get(resource) : this._create(resource);
                is.forEach(type => dependency.is.add(type));
                updated.set(resource, dependency);
            });
        });

        this.#errors = errors;

        // Subscribe modules that are new to the collection
        updated && this.#propagator.subscribe([...updated.values()].filter(dependency => !this.has(dependency.resource)));

        // Unsubscribe unused modules
        this.#propagator.unsubscribe([...this.values()].filter(dependency => !updated?.has(dependency.resource)));

        // Destroy unused processors
        this.forEach((dependency, resource) => !updated?.has(resource) && dependency.destroy());

        super.clear(); // Do not use this.clear() as it would destroy still used processors
        updated?.forEach((value, key) => this.set(key, value));
    }
}
