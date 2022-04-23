class Controller extends ReactiveModel {

    get ready() {
        return module.texts?.ready;
    }

    #editorSettings;

    get editorSettings() {
        return this.#editorSettings;
    }

    get texts() {
        return module.texts?.value ?? {};
    }

    constructor() {
        super();
        module.texts.bind('change', this.triggerEvent);
        this.#editorSettings = monacoDependency.settings;
        this.#editorSettings.bind('change', this.triggerEvent);
    }

    dispose() {
        module.texts.unbind('change', this.triggerEvent);
    }

}
