const DynamicProcessor = global.utils.DynamicProcessor();

/**
 * The seeker wrapper
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application.modules.seeker';
    }

    #factory;
    #modules;
    #resource;
    get resource() {
        return this.#resource;
    }

    #distribution;
    get distribution() {
        return this.#distribution;
    }

    get #seeker() {
        return this.children.get('seeker').child;
    }

    get errors() {
        return this.#seeker.errors;
    }

    get valid() {
        return this.#seeker.valid;
    }

    get node() {
        return this.#seeker.node;
    }

    get internal() {
        return this.#seeker.internal;
    }

    get bundle() {
        return this.#seeker.bundle;
    }

    get external() {
        return this.#seeker.external;
    }

    constructor(factory, modules, resource, distribution) {
        super();
        this.#factory = factory;
        this.#modules = modules;
        this.#resource = resource;
        this.#distribution = distribution;

        const seeker = factory.obtain(this);
        super.setup(new Map([['seeker', {child: seeker}]]));
    }

    destroy() {
        super.destroy();
        this.#factory.release(this);
    }
}
