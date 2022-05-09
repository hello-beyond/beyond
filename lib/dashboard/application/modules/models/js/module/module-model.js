/**
 /**
 * Represents the model-ui of the module
 */

export class ModuleModel extends ReactiveModel {
    #tree = {
        properties: {
            module: {
                properties: {
                    static: true,
                }
            },
            bundles: {
                properties: {
                    processors: {
                        properties: {
                            sources: true, overwrites: true,
                        }
                    }
                }
            }
        }
    };

    /**
     * @property {ApplicationModel}
     */
    #applicationModel;
    get applicationModel() {
        return this.#applicationModel;
    }

    get application() {
        return this.#applicationModel.application;
    }

    get applicationId() {
        return this.am?.container?.id;
    }

    #sources = new Map();
    get sources() {
        return this.#sources;
    }

    get processed() {
        let processed = true;
        this.bundles.forEach(item => {
            if (!item.processed) processed = false;
        });
        return processed;
    }

    get bundles() {
        return this.#bundlesManager;
    }

    /**
     * @property {BundlesManager} bundlesManager
     */
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

    #ready;
    get ready() {
        return this.am.tree.landed && this.#ready;
    }

    #updating;
    get updating() {
        return this.#updating;
    }

    #_static

    get static() {
        return this.#_static;
    }

    #errors = [];
    get errors() {
        return this.#am.module?.errors ?? [];
    }

    #warnings = [];
    get warnings() {
        return this.#am.module?.warnings ?? [];
    }

    #found
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
        this.bundles.items.forEach(bundle => total += bundle.totalFiles);
        return total;
    }

    #moduleManager;

    constructor(moduleId, application, moduleManager) {
        super();
        this.#moduleManager = moduleManager;
        this.#applicationModel = application;
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

        moduleId = concat ? `${this.#applicationModel.id}//${moduleId}` : moduleId;
        //Instanciar TemplateApplicationsSource
        this.#am = new ApplicationModule({identifier: {id: moduleId}, tree: this.#tree});
        this.#am.on('change', this.checkLoaded);
        this.fetch();
    }

    /**
     * Validates if the module is fully load
     *
     * Processes all the properties of the module to leave prepared the structure could be consumed.
     */
    checkLoaded = () => {
        if (!this.am.found) {
            this.#ready = true;
            this.#found = false;
            this.triggerEvent('model.loaded');
        }

        if (!this.am.tree.landed) return;
        /**
         * TODO: remove timeout function. Was added to avoid PLM tree landed error.
         */
        window.setTimeout(() => {

            this.am.off('change', this.checkLoaded)
            // load bundles by name;
            this.checkModule();
            this.triggerEvent();
            this.loadStatic();

            this.am.bundles.forEach(bundle => {
                bundle.processors.forEach(item => {
                    item.sources.items.forEach(source => this.#sources.set(source.id, source));
                });
            });

            this.am.on('change', this.triggerEvent);
            this.#ready = true;
            this.triggerEvent('model.loaded');
        }, 100)
    }

    loadStatic() {
        if (!this.am.module?.static) return;
        const specs = {
            project: this.application, object: this.am, items: this.am.module.static.items,
            listener: () => {
                const {am, am: {module}} = this;
                if (!am.tree.landed) return;
                this.#bundlesTree.setElements(module.static.items);
            }
        };
        this.#_static = TreeFactory.get('static', specs);
    }

    /**
     * Validates the module and generates de bundleManager instances
     *
     * Also check if the module has a text bundle and adds its txt processor
     * as a processor of the each bundle.
     */
    checkModule() {
        const txt = this.am.getBundle('txt');
        const {application, am, am: {bundles}} = this;

        this.#bundlesTree = TreeFactory.get('module', {
            project: this.#applicationModel, object: am, items: [...bundles.values()],
            listener: () => {
                const {am, am: {bundles}} = this;
                const items = [...bundles.values()];
                if (!am.tree.landed) return;
                this.#bundlesTree.setElements(items);
            },
        });
        this.#bundlesManager = new BundlesManager(this, this.#bundlesTree, bundles, txt);
        this.#bundlesManager.bind('change', this.triggerEvent);

        const onProcessed = () => {
            this.#moduleManager.setProcessed(this.id);
            // this.#bundlesManager.unbind('bundles.processed', onProcessed);
        };
        if (this.#bundlesManager.processed) onProcessed();
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
