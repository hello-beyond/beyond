const controller = new (class extends ReactiveModel {

    get texts() {
        return module.texts.current.value;
    }

    get ready() {
        return module.texts.current.ready && (this.#application || this.#error);
    }

    #application;
    get application() {
        return this.#application?.application;
    }

    #error;
    get error() {
        return this.#error;
    }

    constructor() {
        super();
        module.texts.current.bind('change', this.triggerEvent);
    }

    async getApp(id) {
        const application = await projectsFactory.get(id)
        if (!application) {
            this.#error = 'APP_NOT_FOUND';
        }
        this.#application = application;
        window._app = this.application;
        this.triggerEvent();
    }
});
