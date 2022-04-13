/**
 *  Represents the editor instance
 *
 */
export class Editor extends ReactiveModel {

    #type;
    /**
     *@property {ModuleModel}  #module Represents the moduleModel object
     */
    #module;
    get module() {
        return this.#module;
    }

    #project;
    get project() {
        return this.#project;
    }

    get application() {
        return this.#project;
    }

    _bundleDependency = BUNDLE_DEPENDENCY;

    _controller;
    get controller() {
        return this._controller;
    }

    /**
     * Source id
     * @private
     */
    #currentSource;
    get currentSource() {
        return this.#currentSource;
    }

    _currentProcessor;
    get currentProcessor() {
        return this._currentProcessor;
    }

    #dependency;
    get dependency() {
        return this.#dependency;
    }

    _id;
    get id() {
        return this._id;
    }

    #instance;
    get instance() {
        return this.#instance;
    }

    _files = new Map();
    get files() {
        return this._files;
    }

    _language;
    get language() {
        return this._language;
    }

    set language(language) {
        this._language = language;
        this.monaco.editor.setModelLanguage(this.model, language);
    }

    #monaco;
    get monaco() {
        return this.#monaco;
    }

    /**
     * The current active Model instance of monaco editor
     *
     * @private
     */
    _model;

    #unpublished;
    get unpublished() {
        return this.#unpublished;
    }

    #currentModel;
    get currentModel() {
        return this.#currentModel;
    }

    _disposablesEvents = [];
    /***
     * Represent the source of the file opened.
     *
     * @private
     */
    #source;
    get source() {
        return this.#source;
    }

    get filename() {
        return this.#source?.filename;
    }

    get settings() {
        return monacoDependency.settings;
    }

    /**
     * Start position where the file will be focused
     * @private
     */
    #position;

    constructor({application, id, type}) {
        super();

        this.#project = application;
        if (!monacoDependency || !monacoDependency.ready) {
            throw Error('The monaco dependency is not loaded correctly');
        }
        this._id = id;
        /**
         * monacodependency is loaded from workspace module.
         * @type {MonacoDependency|*}
         * @private
         */
        this.#dependency = monacoDependency;
        //TODO: @editor
        this.#monaco = monacoDependency.monaco;
        this.#type = type;
        this.save = this.save.bind(this);
        this.setUnpublished = this.setUnpublished.bind(this);
        this.updateSettings = this.updateSettings.bind(this);
        monacoDependency.settings.bind('settings.changed', this.updateSettings);

        // if (source && processor) this.addFile(bundle, this.currentProcessor, source, true);
    }

    updateSettings() {

        if (!this.instance) return;
        this.instance.updateOptions(monacoDependency.settings.properties);
    }

    init(selector) {
        const settings = this.settings.properties;
        settings.model = this.currentModel ?? this.dependency.defaultModel;
        this.setDependency(this._bundleDependency, 'beyond_context');
        // editor box
        this.#instance = this.monaco.editor.create(selector, settings);

        /**
         * TODO: check if it's necessary
         */
        if (this.#position?.column) {
            this.instance.setPosition(this.#position);
            this.#position = undefined;
        }
        this.instance.focus();
        this._setActions();
        if (this.#source) {
            this.loadFile();
        }

    }

    loadFile() {
        const model = this.#dependency.models.get(this.#type, this.#source, this._currentProcessor);
        this.#currentModel = model;
        this.instance.setModel(model)
        this.instance.updateOptions({readOnly: this.#type === 'dependency'});
        this.triggerEvent();
        if (this.module) {
            this.loadDependencies();
        }
    }

    loadDependencies = () => {
        this.module?.bundles?.items?.forEach(bundle => {
            const {dependencies: {model}} = bundle;
            model.items.forEach(item => {
                if (!item.declaration) {
                    console.warn(`the next declaration is undefined : ${item.id}`);
                    return;
                }
                this.setDependency(item.declaration.code, item.resource)
            });
        });
    }

    /**
     *
     * @param module
     * @param type
     * @param processor
     * @param source
     * @param active
     */
    addFile({module, type, processor, source, active}) {

        if (!source.code) {
            console.error('El objeto pasado no posee codigo');
            return;
        }

        this.files.set(source.id, {type, source, processor, module});
        this.#module = module;
        this.#currentSource = source;
        if (this.#source) {
            this.#source.unbind('change', this.#listenFileChanges);
            this.#source = undefined;
        }
        this.#source = source;
        this.#source.bind('change', this.#listenFileChanges);
        this._currentProcessor = processor;
        this.#type = type;
        if (active) this.triggerEvent();
        if (!this.instance) {
            return;
        }
        this.loadFile();
    }

    #listenFileChanges = () => {
        this.setUnpublished();
    }

    setUnpublished() {

        if (!this.instance) {
            this.#unpublished = false;
            return;
        }
        this.#unpublished = this.#source.code !== this.instance?.getModel().getValue();

        this.triggerEvent();
    }

    /**
     * Adds actions to monaco instance.
     * @private
     */
    _setActions() {
        this.instance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
            this.save();
        });
        //adding possibility to increase font size with "ctrl" + "+"
        this.instance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.NUMPAD_ADD, () => {
            this.instance.trigger('keyboard', 'editor.action.fontZoomIn', {});
        });
        //adding possibility to reduce font size with "ctrl" + "-"
        this.instance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.NUMPAD_SUBTRACT, () => {
            this.instance.trigger('keyboard', 'editor.action.fontZoomOut', {});
        });
        this._disposablesEvents.push(this.instance.onDidChangeModelContent(this.setUnpublished));
    }

    removeListeners() {
        this._disposablesEvents.forEach(disposable => disposable.dispose());
    }

    setSource(type, source, processor) {
        this.setModel(this.dependency.models.get(type, source, processor), processor);
        this.instance.updateOptions({readOnly: type === 'dependency'});
    }

    setModel(model, language) {
        this._model = model;
        this.instance.setModel(model);
        if (language !== this.language) {
            this.language = language;
        }
    }

    createModel(source, processor) {
        this.dependency.models.get('source', source, processor)
    }

    setDependency(code, name) {

        const {typescriptDefaults} = monaco.languages.typescript;
        const path = `file:///node_modules/`;
        const uri = `${path}${name}.d.ts`;

        typescriptDefaults.addExtraLib(code, uri);
        window.monaco = monaco;
    }

    _defaultModel(language = 'ts') {
        return {
            source: '//your code here',
            language: language
        }

    }

    /**
     * @TODO: agregar bundle
     * @param data
     * @private
     */
    _processData(data) {
        if (!data.files) return;
        data.files.forEach(file => this.addFile({name: file.name, processor: file.processor}, file.active));
    }

    /**
     * TODO: @julio la accion save debe ser valida para cualquier tipo de source, no solo el de los
     * modulos.
     * @returns {Promise<void>}
     */
    async save() {
        this._processing = true;
        this.triggerEvent();
        try {
            if (!this.#source) {
                throw Error('The source object does not exist');
            }
            await this.#source.save({
                applicationId: this.application.id,
                moduleId: this.module.id,
                file: this.#source?.file,
                source: this.instance.getModel().getValue()
            });

            // this.setUnpublished(false);
            this.triggerEvent();
        }
        catch (e) {
            console.error("error saving file", e);
        }

    }

}
