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
                    consumers: {
                        properties: {
                            bundle: true
                        }
                    },
                    processors: {
                        properties: {
                            sources: true,
                            overwrites: true,
                            compiler: true,
                            // dependencies: {
                            //     properties: {
                            //         bundle: true,
                            //         // declaration: true
                            //     }
                            // }
                        }
                    }
                }
            }
        }
    };

    _applicationManager;

    get application() {
        return this._applicationManager.application;
    }

    get applicationId() {
        return this.am?.container?.id;
    }

    _bundles = new Map;
    get bundles() {
        return this._bundles;
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

    _bundlesTree;
    get bundlesTree() {
        return this._bundlesTree;
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

    _processors = new Set();
    get processors() {
        return this._processors;
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

    constructor(moduleId, application) {
        super();
        this._applicationManager = application;
        this.checkLoaded = this.checkLoaded.bind(this);
        this.validateErrors = this.validateErrors.bind(this);
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
            this.#am.off('change', this.validateErrors);
            this.#am = undefined;
        }

        moduleId = concat ? `${this._applicationManager.id}//${moduleId}` : moduleId;

        this.#am = new ApplicationModule({identifier: {id: moduleId}, tree: this._tree});
        this.#am.on('change', this.checkLoaded);
        this.am.on('change', this.validateErrors);
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
        const processors = new Set();
        this._bundlesTree = TreeFactory.get('module', [application, module, [...bundles.values()]]);
        bundles.forEach((bundle) => {
            if (bundle.name === 'txt') return;
            this.bundles.set(bundle.name, new BundleManager(this._applicationManager,
                this._bundlesTree,
                bundle,
                this.#am,
                txt));
            bundle.processors.forEach(processor => processors.add(processor.name));
        });

        /**
         * TODO: @julio the processors set object is used only to show the
         * processors tags into the module view. The processors badges are also
         * showed into the application's module list. Both ui modules may
         * take the processors information from the same model.
         * @type {Set<any>}
         * @private
         */
        this._processors = processors;

    }

    validateErrors() {
        if (!this.am.tree.landed) return;

        const specs = {id: this.am.id, module: this.am};
        DSNotifications.register(this.am.module.errors, specs);

        this.am.bundles.forEach(bundle => {
            const specs = {id: bundle.id, module: this.am};
            DSNotifications.register(bundle.errors, specs);
            // bundle.processors.forEach(p => {
            //     const specs = {id: p.id, module: this.am, bundle: bundle};
            //     DSNotifications.register(p.compiler.diagnostics, specs);
            // });
        });
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
