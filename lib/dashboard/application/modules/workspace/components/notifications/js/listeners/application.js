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
        return this.#model.id;
    }

    get application() {
        return this.#model.application;
    }

    get processed() {
        return this.#model.moduleManager.processed
    }

    get total() {
        return this.#model.moduleManager.total;
    }

    constructor(app) {
        super();
        const model = applicationsFactory.get(app.id);
        this.#model = model;
        model.bind('change', this.listener);
    }

    get items() {
        return Array.from(this.#maps.errors.values()).concat(Array.from(this.#maps.warnings.values()));
    }

    listener = () => {
        let change = false;

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
