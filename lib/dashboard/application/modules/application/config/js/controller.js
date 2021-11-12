
class Controller extends ReactiveModel {

    get ready() {
        return module.texts?.ready;
    }

    _model;
    get model() {
        return this._model;
    }
    get texts() {
        return module.texts?.value ?? {};
    }
    constructor() {
        super();
        module.texts.bind('change', this.triggerEvent);
        this._model = monacoDependency.settings;
        this.model.bind('change', this.triggerEvent);
    }

    dispose() {
        module.texts.unbind('change', this.triggerEvent);
    }

}
