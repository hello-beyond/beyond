const {ipc} = global.utils;
const DynamicProcessor = global.utils.DynamicProcessor(Map);

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.transversal.dependencies';
    }

    // The transversal packager
    #tp;
    get tp() {
        return this.#tp;
    }

    #Dependency;
    #propagator;
    #bundles;

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
        return new this.#Dependency(resource, this.#tp);
    }

    _notify() {
        ipc.notify('data-notification', {
            type: 'list/update',
            table: 'transversal-dependencies',
            filter: {transversal: this.#tp.id}
        });
    }

    #added;

    add(resource, is) {
        this.#added.add(resource, is);
    }

    /**
     * The transversal packager dependencies constructor
     *
     * @param tp {object} The transversal packager
     * @param bundles {object} The bundles packagers
     * @param Dependency= {object} An specialized Dependency class
     * @param Propagator {object} An specialized Propagator class
     */
    constructor(tp, bundles, Dependency, Propagator) {
        super();
        this.#tp = tp;
        this.#bundles = bundles;
        this.#Dependency = Dependency ? Dependency : require('../../../dependencies/dependency');
        this.#hash = new (require('./hash'))(bundles);
        this.#code = new (require('../../../dependencies/code'))(this, tp);
        this.#added = new (require('./added'))(this);

        Propagator = Propagator ? Propagator : require('../../../dependencies/propagator');
        this.#propagator = new Propagator(this._events);
    }

    _prepared(require) {
        if (!this.children.has('bundles')) {
            this.setup(new Map([['bundles', {child: this.#bundles}]]));
            if (!require(this.#bundles)) return;
        }

        this.#bundles.forEach(({dependencies}) => {
            dependencies && require(dependencies) && dependencies.forEach(dependency => require(dependency))
        });
    }

    _process() {
        this.forEach(dependency => dependency.clear());

        const errors = [], updated = new Map();

        this.#added.forEach((is, resource) => {
            const dependency = this.has(resource) ? this.get(resource) : this._create(resource);
            is.forEach(type => dependency.is.add(type));
            updated.set(resource, dependency);
        });

        const bundles = this.children.get('bundles').child;
        bundles.forEach(({dependencies: d}) => d?.forEach(({resource, is}) => {
            // Exclude the imports that refers to bundles that are part of the actual transversal
            if (resource.endsWith(`/${this.tp.transversal.name}`)) return;

            const dependency = this.has(resource) ? this.get(resource) : this._create(resource);
            is.forEach(type => dependency.is.add(type));
            updated.set(resource, dependency);
        }));

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
