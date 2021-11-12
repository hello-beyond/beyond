class Controller extends ReactiveModel {
    get ready() {
        return module.texts.ready;
    }

    get texts() {
        return module.texts.value ?? {};
    }

    _workspace;
    get workspace() {
        return this._workspace;
    }

    get application() {
        return this._workspace?.active;
    }

    get moduleManager() {
        return this.workspace?.active?.moduleManager;
    }

    get modules() {
        return this.workspace?.active?.modules;
    }

    constructor(workspace) {
        super();
        this._workspace = workspace;
        workspace.bind('change', this.triggerEvent)
        module.texts.bind('change', this.triggerEvent);

    }

    clean() {
        module.texts.unbind('change', this.triggerEvent);
    }

}
