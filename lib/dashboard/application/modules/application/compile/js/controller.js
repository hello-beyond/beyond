const controller = new (class extends ReactiveModel {

    get texts() {
        return module.texts.value;
    }

    get ready() {
        return module.texts.ready && (this.#application || this.#error);
    }

    #application;
    get application() {
        return this.#application.application;
    }

    #error;
    get error() {
        return this.#error;
    }

    constructor() {
        super();
        module.texts.bind('change', this.triggerEvent);
    }

    async getApp(id) {
        const application = await applicationsFactory.get(id)
        if (!application) {
            this.#error = 'APP_NOT_FOUND';
        }
        this.#application = application;
        window._app = this.application;
        this.triggerEvent();
    }
});
