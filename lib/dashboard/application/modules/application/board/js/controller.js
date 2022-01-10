const controller = new (class Controller extends ReactiveModel {
        #application;
        get application() {
            return this.#application;
        }

        #changed = false;

        get ready() {
            const dependencies = !!module.texts.ready && !!monacoDependency?.ready
            const models = !!this.application?.ready && !!DSModel.ready
            return dependencies && models && this.currentId === this.application?.application?.id;
        }

        #moduleManager;
        get moduleManager() {
            return this.#moduleManager;
        }

        #favorites;
        get favorites() {
            return this.#favorites;
        }

        get texts() {
            return module.texts.value;
        }

        #currentId;
        get currentId() {
            return this.#currentId;
        }

        start(workspace, appId, moduleId, element) {

            if (this.#application && this.currentId !== appId) {
                this.#application.unbind('change', this.triggerEvent);
                this.#application = undefined;
            }

            const model = workspace.getApplication(appId, moduleId, element);
            this.#currentId = appId;
            model.bind('change', this.triggerEvent);

            this._workspace = workspace;
            this.#application = model;
            this.#favorites = model.favorites;
            this.#moduleManager = model.moduleManager;
            module.texts.bind('change', this.triggerEvent);
            monacoDependency.bind('change', this.triggerEvent);
            window.app = this;
            this.triggerEvent();
        }

    }
);
