class ApplicationListener extends ReactiveModel {

    #app;
    #model;

    #maps = {
        errors: new Map(),
        warnings: new Map()
    }

    get errors() {
        return this.#maps.errors;
    }

    get warnings() {
        return this.#maps.warnings;
    }

    get name() {
        return this.#model.application?.name;
    }

    get id() {
        return this.#model.application.id;
    }

    get application() {
        return this.#model.application;
    }

    #processed;
    get processed() {
        return this.#model.moduleManager.processed
    }

    get total() {
        return this.#model.moduleManager.total;
    }

    get manager() {
        return this.#model;
    }

    #modules = new Map();
    get modules() {
        return this.#modules;
    }

    constructor(app) {
        super();
        const model = projectsFactory.get(app.id);
        this.#model = model;
        model.bind('change', this.listener);
        model.moduleManager.bind('model.loaded', this.listener);
    }

    get items() {
        return Array.from(this.#maps.errors.values()).concat(Array.from(this.#maps.warnings.values()));
    }

    processModules() {
        this.#model?.moduleManager.models.forEach(item => {
            if (this.#modules.has(item.id)) return;
            this.#modules.set(item.id, new ModuleListener(item));
            this.triggerEvent();
        });
    }

    listener = () => {
        let change = false;
        this.processModules();
        if (this.#processed !== this.processed) {
            this.#processed = this.processed;
            change = true;
            this.processModules();
        }
        const clean = (type, id) => {
            const property = type === 'errors' ? this.#model.errors : this.#model.warnings;
            type = type === 'errors' ? 'errors' : 'warnings';
            const exists = property.find(error => error.id === id);
            if (exists) this.#maps[type].delete(id);
            change = true;
        };
        const set = (type, element) => {
            type = type === 'errors' ? 'errors' : 'warnings';
            if (this.#maps[type].has(element.id)) return;
            this.#maps[type].set(element.id, new ApplicationItemModel(element, this.#model));
            change = true;
        };

        Array.from(this.#maps.errors.keys()).forEach(id => clean('errors', id));
        this.#model.errors.forEach(error => set('errors', error));
        Array.from(this.#maps.warnings.keys()).forEach(id => clean('warnings', id));
        this.#model.warnings.forEach(warnings => set('warnings', warnings));

        if (change) {
            this.triggerEvent();
        }

    }
}
