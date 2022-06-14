const controller = new (class Controller extends ReactiveModel {

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
        this.#model = Dashboard;
        module.texts.current.bind('change', this.triggerEvent);
        this.#model.bind('change', this.triggerEvent);

    }

});
