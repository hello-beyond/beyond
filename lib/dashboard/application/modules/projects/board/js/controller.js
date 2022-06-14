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

    #applications;
    get applications() {
        return this.#applications;
    }

    #firstTime;

    get ready() {
        let isReady = (this.#firstTime || this.applications?.tree.landed) && module.texts.current.ready;
        if (!this.#firstTime && isReady) {
            this.#firstTime = true;
        }
        return isReady;
    }

    get texts() {
        return module.texts.current.value;
    }

    get items() {
        return this.#applications?.items.length ?? 0
    }

    constructor() {
        super();
        module.texts.current.bind('change', this.triggerEvent);
    }

    setApplications(applications) {
        this.#applications = applications;
        applications.bind('change', this.triggerEvent);
    }
})();