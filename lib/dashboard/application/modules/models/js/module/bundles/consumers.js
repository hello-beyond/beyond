class ConsumersManager extends ReactiveModel {

    #ready;
    get ready() {
        return this.#ready;
    }

    #model;
    get model() {
        return this.#model;
    }

    #applicationManager;

    #modules = new Map;
    get modules() {
        return this.#modules;
    }

    constructor(application) {
        super();
        this.#applicationManager = application;

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
        const model = new Consumers(specs);
        this.#model.bind('change', this.#check);
        this.#model.fetch();

        this.#model = model;
    }

    #check = () => {
        if (!this.#model.tree.landed) return;
        this.triggerEvent();
        const branch = this.tree.items.get(this.bundle.name);
        branch.addConsumers(this.#model);
        this.#ready = true;
        this.#model.unbind('change', this.#check);
        this.triggerEvent('consumers.loaded');

    };

    async set(items) {
        const promises = [];
        items.forEach(item => {
            const [ownId, consumerId] = item.id.split('///');

            let parts = consumerId.split('//');
            parts.splice(parts.length - 1, 1);
            const {moduleManager} = this.#applicationManager;
            promises.push(moduleManager.load(parts.join('//')));
        });

        const modules = await Promise.all(promises);
        modules.forEach(item => {
            this.#modules.set(item.id, item);
        });
        this.triggerEvent('consumers.ready');

    }
}
