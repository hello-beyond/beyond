class Controller extends ReactiveModel {
    _application;
    get application() {
        return this._application;
    }

    get texts() {
        return module.texts.value;
    }

    get ready() {
        return this.application?.ready && module.texts.ready
    }

    get state() {
        return {
            ready: this.ready,
            texts: this.texts
        }
    }

    get BUNDLES() {
        return this.model?.BUNDLES;
    }

    get PROCESSORS() {
        return this.model?.PROCESSORS;
    }

    _model;
    get model() {
        return this._model;
    }

    get bundleType() {
        return this.model?.bundle?.type;
    }

    constructor(workspace) {
        super();

        this._workspace = workspace;
        this._application = workspace.application;
        module.texts.bind('change', this.triggerEvent);
        const model = new ModuleBundleBuilder(workspace.application.application.id);
        this._model = model;
        model.bind('change', this.triggerEvent);

        this.triggerEvent();
    }
}

