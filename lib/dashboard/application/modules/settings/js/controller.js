class Controller extends ReactiveModel {

    get ready() {
        return module.texts.current?.ready;
    }

    #editorSettings;

    get editorSettings() {
        return this.#editorSettings;
    }

    get texts() {
        return module.texts.current?.value ?? {};
    }

    constructor() {
        super();
        module.texts.current.bind('change', this.triggerEvent);
        this.#editorSettings = monacoDependency.settings;
        this.#editorSettings.bind('change', this.triggerEvent);
    }

    dispose() {
        module.texts.current.unbind('change', this.triggerEvent);
    }

}
