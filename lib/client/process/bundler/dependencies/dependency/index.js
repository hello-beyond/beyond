const DynamicProcessor = global.utils.DynamicProcessor();

/**
 * The Dependency object required by:
 *   . The processors (actually it is being used by the "ts" and "sass" processors)
 *   . The dependencies collection of the Bundle and Transversal objects
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.dependency';
    }

    #resource;
    get resource() {
        return this.#resource;
    }

    #container;
    #propagator;

    get id() {
        return `${this.#container.id}//dependency//${this.resource}`;
    }

    get distribution() {
        return this.#container.distribution;
    }

    get language() {
        return this.#container.language;
    }

    get seeker() {
        return this.children.get('seeker').child;
    }

    get errors() {
        return this.seeker.errors;
    }

    get valid() {
        return !this.errors.length;
    }

    // true if dependency is a beyond internal bundle. Actually 'beyond_context'
    get internal() {
        return this.seeker.internal;
    }

    // true if dependency is a node internal module
    get node() {
        return this.seeker.node;
    }

    get external() {
        return this.seeker.external;
    }

    get bundle() {
        return this.seeker.bundle;
    }

    get kind() {
        if (!this.processed) throw new Error('Processor is not ready');

        if (!this.seeker.valid) return;
        if (this.internal) return 'beyond.internal';
        if (this.node) return 'node.internal';
        if (this.external) return 'external';

        const {bundle} = this.seeker;
        const transversal = !!global.bundles.get(bundle.name).Transversal;
        return transversal ? 'transversal' : 'bundle';
    }

    // What kind of dependency it is ('import' | 'type' | 'reference', 'css.import')
    #is = new Set();
    get is() {
        return this.#is;
    }

    /**
     * Processor dependency constructor
     *
     * @param resource {string} The dependency resource
     * @param container {{application: object, distribution: object, language: string}}
     * @param Propagator? {object}
     */
    constructor(resource, container, Propagator) {
        super();
        this.#resource = resource;
        this.#container = container;

        const {application, distribution} = container;
        const seeker = application.modules.seekers.create(resource, distribution);
        super.setup(new Map([['seeker', {child: seeker}]]));

        this.#propagator = Propagator ? new Propagator(this._events) : void 0;
    }

    _process() {
        this.#propagator?.subscribe(this);
    }

    clear() {
        this.#is.clear();
    }

    hydrate(cached) {
        this.#is = new Set(cached.is);
    }

    toJSON() {
        return {is: [...this.#is]};
    }

    destroy() {
        this.#propagator?.unsubscribe();
    }
}
