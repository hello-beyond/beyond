class Controller extends ReactiveModel {
    get ready() {
        return module.texts.ready;
    }

    get texts() {
        return module.texts.value ?? {};
    }

    #workspace;
    get workspace() {
        return this.#workspace;
    }

    get application() {
        return this.#workspace?.active;
    }

    get moduleManager() {
        return this.workspace?.active?.moduleManager;
    }

    get modules() {
        return this.workspace?.active?.modules;
    }

    constructor(workspace) {
        super();
        this.#workspace = workspace;
        workspace.bind('change', this.triggerEvent)
        module.texts.bind('change', this.triggerEvent);

    }

    clean() {
        module.texts.unbind('change', this.triggerEvent);
    }

}
