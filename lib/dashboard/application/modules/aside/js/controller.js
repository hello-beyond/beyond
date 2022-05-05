class Controller extends ReactiveModel {
    get ready() {
        return module.texts.current.ready;
    }

    get texts() {
        return module.texts.current.value ?? {};
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
        module.texts.current.bind('change', this.triggerEvent);

    }

    clean() {
        module.texts.current.unbind('change', this.triggerEvent);
    }

}
