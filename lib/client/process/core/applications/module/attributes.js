const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application.module';
    }

    #application;
    #module;

    constructor(application, module) {
        super();
        this.#application = application;
        this.#module = module;

        const children = new Map();
        children.set('module', {child: module});
        super.setup(children);
    }

    get is() {
        return 'module';
    }

    get scope() {
        return this.#module.scope;
    }

    get name() {
        return this.#module.name;
    }

    get package() {
        return this.#module.package;
    }

    get resource() {
        return this.#module.resource;
    }

    get rname() {
        return this.#module.rname;
    }

    get pathname() {
        const {container, name, resource} = this.#module;
        const application = this.#application;
        return container.package === application.package ? name : `packages/${resource}`;
    }

    get title() {
        return this.#module.title;
    }

    get description() {
        return this.#module.description;
    }

    get transpile() {
        return this.#module.transpile;
    }

    get hmr() {
        return this.#module.hmr;
    }

    get layoutId() {
        return this.#module.layoutId;
    }

    get route() {
        return this.#module.route;
    }

    get vdir() {
        return this.#module.vdir;
    }

    get engines() {
        return this.#module.engines;
    }

    get platforms() {
        return this.#module.platforms;
    }

    get tu() {
        return this.#module.tu;
    }
}
