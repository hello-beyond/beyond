/**
 * Manages the modules instances and interfaces between them and editors instances
 */
export class ModuleManager extends ReactiveModel {
    #application;
    get application() {
        return this.#application;
    }

    /**
     * Return the active module
     * @private
     */
    _active;
    get active() {
        return this._active;
    }

    /**
     * Returns the total of modules
     */
    get total() {
        return this.#application.am.items.length;
    }

    #processed = new Set();

    get processed() {
        return this.#processed.size;
    }

    #models = new Map;
    get models() {
        return this.#models;
    }

    #promises = new Map();
    get promises() {
        return this.#promises;
    }

    setProcessed(id) {
        this.#processed.add(id);
        this.triggerEvent();
    }

    get ready() {

    }

    /**
     *
     * @param application {ApplicationModel}
     * @param application.application {Application} PLM Item of application.
     * * @param moduleId if is passed then the Module manager will load it.
     */
    constructor(application, moduleId) {
        super();
        this.#application = application;
        window.moduleManager = this;
        this._editorManager = getEditorManager(application.application);
        const saved = localStorage.getItem('dashboard.module.active');
        if (!moduleId && saved) moduleId = saved;
        if (![undefined].includes(moduleId)) {
            this.setActive(moduleId);
        }
    }

    /**
     * Obtains the module required and set as active in the workspace
     * @param id
     * @returns {Promise<{ModuleModel}>} Return the model of the module loaded.
     */
    async setActive(id) {
        try {
            this._active = await this.load(id);
            window.module = model;
            console.log(10000)
            localStorage.setItem('dashboard.module.active', id);
        }
        catch (e) {
            console.error(e);
        }
    }

    /**
     * Loads the module required and returns its instance
     *
     * @param moduleId
     * @returns {Promise<ModuleManager>}
     */
    async load(moduleId) {
        try {
            if (!moduleId) {
                console.trace(moduleId)
                return;
            }
            const model = await this.getInstance(moduleId);
            // this._editorManager.setModule(model);
            return model;
        }
        catch (e) {
            console.error(104.6, "error", e)
        }
    }

    /**
     * Instances the ModelModule object
     *
     * Waits to validate if the module is fully loaded, then returns it.
     * @param id
     * @returns {V|*}
     * @private
     */
    getInstance(id) {
        if (!id) return;

        if (this.promises.has(id)) return this.promises.get(id);
        const promise = new PendingPromise();
        this.#promises.set(id, promise);

        if (this.models.has(id)) {
            this.promises.delete(id);
            promise.resolve(this.models.get(id));
            return promise;
        }

        const model = new ModuleModel(id, this.application, this);
        if (model.ready) return promise.resolve(model);
        const response = () => {
            model.unbind('model.loaded', response);
            this.models.set(model.id, model);
            this.triggerEvent('model.loaded');
            promise.resolve(model);
            this.promises.delete(id);
        };
        model.bind('model.loaded', response);

        return promise;
    }

    /**
     * Loads the ModuleModel's Model
     *
     * This method sets the module passed as active. If is only required
     * to load the tree, then use loadModuleTree instead
     * @param id
     * @deprecated
     * @returns {{}}
     */
    async loadModule(id) {
        return this.setActive(id);
    }

    loadAll = async () => {
        const promises = [];
        this.#application.am.items.forEach(item => promises.push(this.getInstance(item.id)));
        try {
            await Promise.all(promises)
            console.log("todos cargados");
        }
        catch (e) {
            console.warn(e);
        }
    }

}
