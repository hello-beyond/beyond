/**
 *  Represents the editor instance
 *
 */
export class Editor extends ReactiveModel {

    _application;
    get application() {
        return this._application;
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
    _currentSource;
    get currentSource() {
        return this._currentSource;
    }

    _currentProcessor;
    get currentProcessor() {
        return this._currentProcessor;
    }

    _dependency;
    get dependency() {
        return this._dependency;
    }

    _id;
    get id() {
        return this._id;
    }

    _instance;
    get instance() {
        return this._instance;
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

    _module;
    get module() {
        return this._module;
    }

    _monaco;
    get monaco() {
        return this._monaco;
    }

    /**
     * The current active Model instance of monaco editor
     *
     * @private
     */
    _model;

    _unpublished;
    get unpublished() {
        return this._unpublished;
    }

    get currentModel() {
        return this._currentModel;
    }

    _sources;
    _disposablesEvents = [];
    /***
     * Represent the source of the file opened.
     *
     * @private
     */
    _source;

    get settings() {
        return monacoDependency.settings;
    }

    /**
     * Start position where the file will be focused
     * @private
     */
    _position;

    constructor(specs) {
        super();
        const {
            application, id, path,
            position, source, processor, module, type
        } = specs;
        this._application = application;

        if (!monacoDependency || !monacoDependency.ready) {
            throw Error('The monaco dependency is not loaded correctly');
        }
        this._id = id;
        /**
         * monacodependency is loaded from workspace module.
         * @type {MonacoDependency|*}
         * @private
         */
        this._dependency = monacoDependency;
        this._module = module;
        //TODO: @editor
        this._monaco = monacoDependency.monaco;
        this._path = path;
        this._processor = processor;
        this._source = source;
        this._position = position;
        this._type = type;
        this.save = this.save.bind(this);
        this.setUnpublished = this.setUnpublished.bind(this);
        this.updateSettings = this.updateSettings.bind(this);
        monacoDependency.settings.bind('settings.changed', this.updateSettings);

        if (source) {
            this._currentModel = this.dependency.models.get(type ?? 'source', source, processor)
        }
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
        this._instance = this.monaco.editor.create(selector, settings);
        this._instance.updateOptions({readOnly: this._type === 'dependency'});
        if (this._position?.column) {
            this.instance.setPosition(this._position);
            this._position = undefined;
        }
        this.instance.focus();
        this._setActions();

    }

    /**
     *
     * @param bundle
     * @param processor
     * @param source
     * @param active
     */
    addFile(type, processor, source, active) {

        this.files.set(source.id, {type: type, source: source, processor: processor});

        if (active) {
            // const file = this.model.getFile( processor, source.id);
            this._currentSource = source;
            this._source = source;
            this._currentProcessor = processor;

            if (!source.code) {
                console.error('El objeto pasado no posee codigo');
                return;
            }
            const model = this._dependency.models.get(type, source, processor);
            this._currentModel = model;
            if (this.instance) {
                this.instance.setModel(model)
            }

            this.instance.updateOptions({readOnly: type === 'dependency'});

        }
        this.triggerEvent();
    }

    setUnpublished(value = true) {
        this._unpublished = this._source.code !== this.instance.getModel().getValue();
        this.triggerEvent('model.changed');
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
            if (!this._source) {
                throw Error('The source object does not exist');
            }
            await this._source.save({
                applicationId: this.application.id,
                moduleId: this.module.id,
                file: this._source?.file,
                source: this.instance.getModel().getValue()
            });
            this.setUnpublished(false);
            this.triggerEvent('change');
        }
        catch (e) {
            console.error("error saving file", e);
        }

    }

}
