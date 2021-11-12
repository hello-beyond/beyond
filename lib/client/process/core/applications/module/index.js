module.exports = class extends require('./attributes') {
    #application;
    get application() {
        return this.#application;
    }

    #module;
    get module() {
        return this.#module;
    }

    get is() {
        return 'module';
    }

    get container() {
        return this.module.container;
    }

    get watcher() {
        return this.module.watcher;
    }

    get path() {
        return this.module.path;
    }

    #id;
    get id() {
        return this.#id;
    }

    get errors() {
        return this.module.errors;
    }

    get warnings() {
        return this.module.warnings;
    }

    get backend() {
        return this.module.backend;
    }

    #bundles;
    get bundles() {
        return this.#bundles;
    }

    #_static;
    get static() {
        return this.#_static;
    }

    constructor(application, module) {
        super(module);
        this.#application = application;
        this.#module = module;

        this.#bundles = new global.Bundles(this);
        this.#_static = new (require('./static'))(application, module);

        this.#id = module.container.is === 'application' ? module.id :
            `application//${application.id}//${module.id}`;
    }

    destroy() {
        this.#bundles.destroy();
        this.#_static.destroy();
    }
}
