class ConsumersManager extends ReactiveModel {

    #ready;
    get ready() {
        return this.#ready;
    }

    #model;
    get model() {
        return this.#model;
    }

    #entries = new Map;
    get entries() {
        return this.#entries;
    }

    #items = [];
    get items() {
        return Array.from(this.#entries.values());
    }

    #applicationManager;

    #modules = new Map;
    get modules() {
        return this.#modules;
    }

    #bundle;
    get bundle() {
        return this.#bundle;
    }

    constructor(bundle, application, tree, specs = {load: true}) {
        super();
        this.#applicationManager = application;
        this.#bundle = bundle;
        if (specs.load) this.load();
    }

    load() {
        const specs = {
            tree: {
                properties: {
                    bundle: true
                }
            },
            filter: [{field: 'bundle', operand: 0, value: this.bundle.id}]
        };
        this.#model = new Consumers(specs);
        this.#model.bind('change', this.#check);
        this.#model.fetch();
        window.c = this.#model;
    }

    #check = () => {
        if (!this.#model.tree.landed) return;
        this.triggerEvent();

        // const branch = this.tree.items.get(this.bundle.name);
        // branch.addConsumers(this.#model);
        const {moduleManager} = this.#applicationManager;

        this.#model.items.forEach(item => {
            const module = moduleManager.getItem(item.moduleId);
            if (!module) {
                /**
                 * TODO: @julio check iterations
                 */
                return;
            }

            this.#entries.set(item.bundle.id, {
                id: item.bundle.id,
                bundle: item.bundle,
                name: `${module.name}/${item.bundle?.name}`,
                consumer: item,
                module: module
            });
        });
        this.#ready = true;
        this.#model.unbind('change', this.#check);
        //TODO: @julio check events
        this.triggerEvent('consumers.loaded');
        this.triggerEvent();
    };

    setItem(bundleId, module) {
        const item = this.#entries.get(bundleId)
        item.module = module;
        item.loaded = true;
        this.#entries.set(bundleId, item);
        this.triggerEvent();
    }
}
