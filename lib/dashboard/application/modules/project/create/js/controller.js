const createController = new (class Controller extends ReactiveModel {
    #model;
    get model() {
        return this.#model;
    }

    get texts() {
        return module.texts.current?.value;
    }

    get ready() {
        return module.texts.current.ready && this.#model.ready;
    }

    constructor(props) {
        super(props);
        const model = new ApplicationBuilder()
        this.#model = model;
        module.texts.current.bind('change', this.triggerEvent);
        model.bind('change', this.triggerEvent);
    }
});