const DynamicProcessor = global.utils.DynamicProcessor();

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

    #seeker = () => this.children.get('seeker').child;

    get errors() {
        return this.#seeker().errors;
    }

    get valid() {
        return this.#seeker().valid;
    }

    get external() {
        return this.#seeker().external;
    }

    get node() {
        return this.#seeker().node;
    }

    get bundle() {
        return this.#seeker().bundle;
    }

    constructor(factory, modules, resource) {
        super();
        this.#factory = factory;
        this.#modules = modules;
        this.#resource = resource;

        const seeker = factory.obtain(this, resource);
        super.setup(new Map([['seeker', {child: seeker}]]));
    }

    destroy() {
        super.destroy();
        this.#factory.release(this, this.#resource);
    }
}
