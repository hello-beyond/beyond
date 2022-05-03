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

    #outsideChange;
    get outsideChange() {
        return this.#outsideChange;
    }

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
    #current;
    get current() {
        return this.#current;
    }

    #ready = false;
    get ready() {
        return this.#ready;
    }

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

        window.editor = this;
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
        // this.#type = type;
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

    init(selector, sourceId) {

        const settings = this.settings.properties;
        settings.model = this.currentModel ?? this.dependency.defaultModel;
        this.setDependency(this._bundleDependency, 'beyond_context');
        // editor box

        this.#instance = this.monaco.editor.create(selector, settings);
        window.instance = this.instance;
        this.#ready = true;

        this.triggerEvent('initialised');
        /**
         * TODO: check if it's necessary
         */
        if (this.#position?.column) {
            this.instance.setPosition(this.#position);
            this.#position = undefined;
        }

        if (sourceId) {
            this.loadFile(this.files.get(sourceId));
        }

        this.instance.focus();
        this._setActions();

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

        if (["undefined", false].includes(source.code)) {
            console.error('FILE_WITHOUT_CODE');
            return;
        }

        this.files.set(source.id, {type, source, processor, module});

        if (this.#source) {
            this.#source.unbind('change', this.#listenFileChanges);
            this.#source = undefined;
            this.dependency.setSource(undefined);
        }

        const open = (ready) => {
            if (!ready) this.unbind('initialised', open);

            this.#current = this.files.get(source.id);
            this.#source = source;
            this.dependency.setSource(source);
            this.#source.bind('change', this.#listenFileChanges);
            this.triggerEvent();
            this.loadFile(this.files.get(source.id));
        }

        if (!active) return;

        if (!this.instance) {
            this.bind('initialised', open);
            return;
        }
        open(true);

    }

    /**
     * Loads a source file into the Monaco Editor instance
     * @param fileItem
     */
    loadFile(fileItem) {

        if (!fileItem) console.trace(17, fileItem);

        const {type, source, processor, module} = fileItem;

        const model = this.#dependency.models.get(type, source, processor);
        this.#source = source;
        this.dependency.setSource(source);
        this.#source.bind('change', this.#listenFileChanges);
        // this.#currentModel = model;
        this.instance.setModel(model)
        this.instance.updateOptions({readOnly: type === 'dependency'});
        this.triggerEvent();
        if (this.module) {
            this.loadDependencies(module);
        }
    }

    /***
     *
     */
    loadDependencies = (module) => {
        module?.bundles?.items?.forEach(bundle => {
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
    #listenFileChanges = () => {
        this.#outsideChange = this.#source.code !== this.instance?.getModel().getValue();
        this.setUnpublished();
    }

    setUnpublished = () => {
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
        this.instance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.NUMPAD_SUBTRACT, () => {
            this.instance.trigger('keyboard', 'editor.action.fontZoomOut', {});
        });
        this.instance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_K, () => {
            this.instance.getAction('editor.action.formatDocument').run();
        })
        this._disposablesEvents.push(this.instance.onDidChangeModelContent(this.setUnpublished));
        // emmetHTML(this.monaco, ['html', 'tsx', 'jsx']);
        // emmetCSS(this.monaco);
        emmetJSX(this.monaco, ['html', 'typescript', 'javascript']);
    }

    removeListeners() {
        this._disposablesEvents.forEach(disposable => disposable.dispose());
    }

    /**
     *
     * @param type
     * @param source
     * @param processor
     */
    setSource(type, source, processor) {
        this.loadFile(this.files.get(source.id));
    }

    /**
     * Set the source model into MonacoEditor
     * @param model
     * @param language
     */
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

            if (!this.unpublished) {
                console.log('no changes');
                return;
            }
            const sourceId = this.source.id;
            // this.files.set(source.id, {type, source, processor, module});
            const {source, module} = this.files.get(sourceId);
            await this.#source.save({
                applicationId: this.application.id,
                moduleId: module.id,
                file: source.file,
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
