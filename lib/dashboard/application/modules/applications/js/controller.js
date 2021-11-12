const AppsController = new (class Controller extends ReactiveModel {
    #createApp;
    get createApp() {
        return this.#createApp;
    }

    set createApp(value) {
        if (value === this.#createApp) return;
        this.#createApp = value;
        this.triggerEvent();
    }

    _applications;
    get applications() {
        return this._applications;
    }

    get ready() {
        return this.applications?.tree.landed && module.texts.ready;
    }

    get texts() {
        return module.texts.value;
    }

    constructor() {
        super();
        module.texts.bind('change', this.triggerEvent);
    }

    setApplications(applications) {
        this._applications = applications;
        applications.bind('change', this.triggerEvent);
    }

})();
