class DependenciesManager extends ReactiveModel {
    #ready = false;
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

    get items() {
        return Array.from(this.#entries.values());
    }

    #bundle;
    get bundle() {
        return this.#bundle;
    }

    #tree;
    #applicationManager;

    constructor(bundle, application, tree, specs = {load: true}) {
        super();
        this.#bundle = bundle;
        this.#applicationManager = application;
        this.#tree = tree;
        if (bundle.processors.has('ts')) this.load(bundle.processors.get('ts').id);
    }

    load(processorId) {
        const specs = {
            tree: {
                properties: {
                    bundle: true,
                    declaration: true
                }
            },
            filter: [{
                field: 'processor',
                operand: 0,
                value: processorId
            }]
        };
        this.#model = new ProcessorDependencies(specs);
        this.#model.bind('change', this.#check);
        this.#model.fetch();

        window.d = this.#model;
    }

    #check = () => {
        if (!this.model.tree.landed) return;

        this.#model.items.forEach(item => {
            const module = moduleManager.getItem(item.moduleId);
            if (item.external) {
                this.#entries.set(item.id, {
                    id: item.id,
                    name: item.resource,
                    dependency: item
                });
                return;
            }

            if (!module && !item.external) return false;
            this.#entries.set(item.bundle.id, {
                id: item.bundle.id,
                bundle: item.bundle,
                name: `${module.name}/${item.bundle.name}`,
                dependency: item,
                module
            });
        });

        this.#ready = true;
        this.#model.unbind('change', this.#check);
        //TODO: @julio check events
        this.triggerEvent('dependencies.ready');
        this.triggerEvent();
    }
    check = () => this.#check();

    setItem(bundleId, module) {
        const item = this.#entries.get(bundleId)
        item.module = module;
        item.loaded = true;
        this.#entries.set(bundleId, item);
        this.triggerEvent();
    }
}
