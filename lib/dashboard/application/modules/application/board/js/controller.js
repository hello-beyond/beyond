class Controller extends ReactiveModel {
    _application;
    get application() {
        return this._application;
    }

    get ready() {
        return this.application?.ready
               && Dashboard.ready
               && module.texts.ready
               && monacoDependency?.ready;
    }

    _moduleManager;
    get moduleManager() {
        return this._moduleManager;
    }

    _favorites;
    get favorites() {
        return this._favorites;
    }

    get texts() {
        return module.texts.value;
    }

    /**
     * @TODO: @julio Check element parameter
     * @param workspace
     * @param appId
     * @param moduleId
     * @param element
     */
    constructor(workspace, appId, moduleId, element) {
        super();

        const model = workspace.getApplication(appId, moduleId, element);
        model.bind('change', this.triggerEvent);

        this._application = model;
        this._workspace = workspace;
        this._favorites = model.favorites;
        this._moduleManager = model.moduleManager;
        this._workspace.active = model;
        module.texts.bind('change', this.triggerEvent);
        monacoDependency.bind('change', this.triggerEvent);
        window.app = this;
    }

}
