/**
 * Represents the model-ui of the module
 */
export class ModuleModel extends ReactiveModel {
    _tree = {
        properties: {
            module: {
                properties: {
                    static: true,
                }
            },
            bundles: {
                properties: {
                    consumers: true,
                    processors: {
                        properties: {
                            dependencies: true,
                            sources: true,
                            overwrites: true,
                        }
                    }
                }
            }
        }
    };

    _applicationManager;

    get processed() {
        let processed = true;
        this.bundles.forEach(item => {
            if (!item.processed) processed = false;
        });
        return processed;
    }

    get application() {
        return this._applicationManager.application;
    }

    get applicationId() {
        return this.am?.container?.id;
    }

    get bundles() {
        return this.#bundlesManager.items;
    }

    #bundlesManager;
    get bundlesManager() {
        return this.#bundlesManager;
    }

    get id() {
        return this.am?.id;
    }

    /**
     * Returns the module's name.
     *
     * If the module does not have name returns the identifier without
     * the application id section.
     * @returns {string}
     */
    get name() {
        let name = this.am?.id?.replace(`application//${this.application.id}//`, '');
        return this.am?.name ?? name;
    }

    #bundlesTree;
    get bundlesTree() {
        return this.#bundlesTree;
    }

    /**
     * @private {ApplicationModule}
     */
    #am;
    get am() {
        return this.#am;
    }

    /**
     * @deprecated use am property instead
     * @returns {*}
     */
    get module() {
        return this.#am;
    }

    _ready;
    get ready() {
        return this.am.tree.landed && this._ready;
    }

    _updating;
    get updating() {
        return this._updating;
    }

    _backend;
    get backend() {
        return this._backend;
    }

    _static
    get static() {
        return this._static;
    }

    _errors = [];
    get errors() {
        return this._errors;
    }

    _warnings = [];
    get warnings() {
        return this._warnings;
    }

    _found
    get found() {
        return this.#am?.found;
    }

    get alerts() {
        const total = this.errors.length + this.warnings.length;
        return {
            total: total
        }
    }

    get totalFiles() {
        let total = 0;
        this.bundles.forEach(bundle => total += bundle.totalFiles);
        return total;
    }

    #moduleManager;

    constructor(moduleId, application, moduleManager) {
        super();

        this.#moduleManager = moduleManager;
        this._applicationManager = application;
        this.checkLoaded = this.checkLoaded.bind(this);
        this.load(moduleId);

    }

    /**
     * Loads a Module
     *
     * @param moduleId
     * @param concat if is true the moduleId will be concatenated with the application string id.
     */
    load(moduleId, concat = false) {
        if (this.#am) {
            this.#am.off('change', this.triggerEvent);
            this.#am = undefined;
        }

        moduleId = concat ? `${this._applicationManager.id}//${moduleId}` : moduleId;

        this.#am = new ApplicationModule({identifier: {id: moduleId}, tree: this._tree});
        this.#am.on('change', this.checkLoaded);
        this.fetch();

    }

    /**
     * Validates if the module is fully load
     *
     * Processes all the properties of the module to leave prepared the structure could be consumed.
     */
    checkLoaded() {
        if (!this.am.found) {
            this._ready = true;
            this._found = false;
            this.triggerEvent('model.loaded');
        }
        if (!this.am.tree.landed) return;

        this.am.off('change', this.checkLoaded)
        // load bundles by name;
        this.checkModule();
        this.triggerEvent();

        if (this.am.module?.static) {
            const specs = [this.application, this.am, this.am.module.static.items];
            this._static = TreeFactory.get('static', specs);
        }

        this.am.on('change', this.triggerEvent);
        this._ready = true;
        this.triggerEvent('model.loaded');
    }

    /**
     * Validates the module and generates de bundleManager instances
     *
     * Also check if the module has a text bundle and adds its txt processor
     * as a processor of the each bundle.
     */
    checkModule() {
        const txt = this.am.getBundle('txt');
        const {application, module, module: {bundles}} = this;
        this.#bundlesTree = TreeFactory.get('module', [application, module, [...bundles.values()]]);
        this.#bundlesManager = new BundlesManager(this._applicationManager, this.#bundlesTree, bundles, txt);
        const onProcessed = () => {
            this.#moduleManager.setProcessed(this.id);
            this.#bundlesManager.unbind('bundles.processed', onProcessed);
        };
        this.#bundlesManager.bind('bundles.processed', onProcessed);

    }

    getFile(bundleName, processorContainer, fileName) {
        bundleName = processorContainer === 'txt' ? 'txt' : bundleName;
        const bundle = this.am.getBundle(bundleName);
        const processor = bundle.processors.get(processorContainer);

        let file;
        processor.files.items.forEach(item => {
            const name = item.relative.file.replace(/\\/g, '/').split(['/']).pop();
            if (name === fileName) file = item;
        });

        if (!file) {
            console.warn(`the file ${file} was not found`);
        }

        return file;
    }

    /**
     * TODO: @julio
     */
    async deleteFile(params) {
        const bundle = this.#am.getBundle(this._bundleId);
        await file.delete({target: params.name});
    }

    async fetch() {
        const promise = new PendingPromise();
        const {module} = this;
        module.fetch({container: true, bundles: {processors: true}});
        return promise;
    }

    /**
     * TODO: @julio
     * @param params
     * @returns {Promise<void>}
     */
    async createFile(params) {
        await this.#am.createFile(params);
    }

}
