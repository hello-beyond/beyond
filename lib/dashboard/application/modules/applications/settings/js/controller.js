const controller = new (class Controller extends ReactiveModel {

    #model;
    get model() {
        return this.#model;
    }

    get texts() {
        return module.texts?.value;
    }

    get ready() {
        return module.texts.ready && this.#model.ready;
    }

    constructor(props) {
        super(props);
        const model = new Dashboard();
        window.d = model;
        this.#model = model;
        module.texts.bind('change', this.triggerEvent);
        model.bind('change', this.triggerEvent);

    }

});
