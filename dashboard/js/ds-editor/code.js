define(["exports", "react", "react-dom", "@beyond-js/dashboard/core-components/code", "@beyond-js/dashboard-lib/models/js", "@beyond-js/dashboard/ds-contexts/code"], function (_exports, React, ReactDOM, _code, _js, _code2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.MonacoDependency = _exports.EditorView = _exports.Editor = void 0;
  _exports.getEditorManager = getEditorManager;
  _exports.monacoDependency = void 0;
  //dashboard
  //models
  //CONTEXTS
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/ds-editor/code', false, {
    "txt": {
      "multilanguage": true
    }
  });
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /***********
  JS PROCESSOR
  ***********/

  /*************************
  FILE: bundle-dependency.js
  *************************/

  /**
   * beyond_context
   * @type {string}
   */


  const BUNDLE_DEPENDENCY = `
import {Bundle, Module} from '@beyond-js/kernel/core/ts';
export const bundle = <Bundle>null;
export const module = <Module>null;
`;
  /******************
  FILE: dependency.js
  ******************/

  /***
   * Loads the monaco dependency
   *
   * After load the monaco dependency sets the default editor settings and languages.
   * The object is a singleton.
   * Manages the models  to allow them to be shared between
   * different instances of the monaco editor.
   */

  class MonacoDependency extends _js.ReactiveModel {
    _promise;
    _monaco;

    get monaco() {
      return this._monaco;
    }

    _models;

    get models() {
      return this._models;
    }

    _settings;

    get settings() {
      return this._settings;
    }

    constructor(props) {
      super(props);
      this.load();
    }

    #ready;

    get ready() {
      return this.#ready;
    }

    load() {
      if (this.ready) return true;
      if (!this.ready && this._promise) return this._promise;
      this._promise = new PendingPromise();

      require(['vs/editor/editor.main'], monaco => {
        this._monaco = monaco;
        this.#ready = true;

        this._config();

        this._promise.resolve(true);

        this._promise = undefined;
        this.triggerEvent();
        this._models = new Models(monaco);
        this._settings = new Settings();
      });

      return this._promise;
    }

    setConfig(specs) {}
    /**
     * TODO: the configuration needs accepts the definitions from the tsconfig file.
     * @private
     */


    _config() {
      this.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false
      });
      this.monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        experimentalDecorators: true,
        allowSyntheticDefaultImports: true,
        jsx: this.monaco.languages.typescript.JsxEmit.React,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        allowNonTsExtensions: true,
        // typeRoots: ["node_modules/@types"],
        target: monaco.languages.typescript.ScriptTarget.ES2020
      });
    }

  }

  _exports.MonacoDependency = MonacoDependency;
  const monacoDependency = new MonacoDependency();
  /**************
  FILE: editor.js
  **************/

  /**
   *  Represents the editor instance
   *
   */

  _exports.monacoDependency = monacoDependency;

  class Editor extends _js.ReactiveModel {
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
        application,
        id,
        path,
        position,
        source,
        processor,
        module,
        type
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
      this._module = module; //TODO: @editor

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
        this._currentModel = this.dependency.models.get(type ?? 'source', source, processor);
      } // if (source && processor) this.addFile(bundle, this.currentProcessor, source, true);

    }

    updateSettings() {
      if (!this.instance) return;
      this.instance.updateOptions(monacoDependency.settings.properties);
    }

    init(selector) {
      const settings = this.settings.properties;
      settings.model = this.currentModel ?? this.dependency.defaultModel;
      this.setDependency(this._bundleDependency, 'beyond_context'); // editor box

      this._instance = this.monaco.editor.create(selector, settings);

      this._instance.updateOptions({
        readOnly: this._type === 'dependency'
      });

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
      this.files.set(source.id, {
        type: type,
        source: source,
        processor: processor
      });

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
          this.instance.setModel(model);
        }

        this.instance.updateOptions({
          readOnly: type === 'dependency'
        });
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
      }); //adding possibility to increase font size with "ctrl" + "+"

      this.instance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.NUMPAD_ADD, () => {
        this.instance.trigger('keyboard', 'editor.action.fontZoomIn', {});
      }); //adding possibility to reduce font size with "ctrl" + "-"

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
      this.instance.updateOptions({
        readOnly: type === 'dependency'
      });
    }

    setModel(model, language) {
      this._model = model;
      this.instance.setModel(model);

      if (language !== this.language) {
        this.language = language;
      }
    }

    createModel(source, processor) {
      this.dependency.models.get('source', source, processor);
    }

    setDependency(code, name) {
      const {
        typescriptDefaults
      } = monaco.languages.typescript;
      const path = `file:///node_modules/`;
      const uri = `${path}${name}.d.ts`;
      typescriptDefaults.addExtraLib(code, uri);
      window.monaco = monaco;
    }

    _defaultModel(language = 'ts') {
      return {
        source: '//your code here',
        language: language
      };
    }
    /**
     * @TODO: agregar bundle
     * @param data
     * @private
     */


    _processData(data) {
      if (!data.files) return;
      data.files.forEach(file => this.addFile({
        name: file.name,
        processor: file.processor
      }, file.active));
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
      } catch (e) {
        console.error("error saving file", e);
      }
    }

  }
  /***************
  FILE: manager.js
  ***************/

  /**
   * Map of editor's manager created.
   *
   * Each application has an EditorManager
   * @type {Map<any, any>}
   */


  _exports.Editor = Editor;
  const managers = new Map();
  /**
   * Manages the editor instances created by the panels
   *
   */

  class Manager extends _js.ReactiveModel {
    /**
     * Map of available sources.
     *
     * The sources could be a entire module or a file.
     * @type {Map<any, any>}
     * @private
     */
    _sources = new Map();

    get sources() {
      return this._sources;
    }

    _instanceId;
    _items = new Map();

    get items() {
      return this._items;
    }

    _favorites = new Map();

    get favorites() {
      return this._favorites;
    }

    _application;

    get application() {
      return this._application;
    }

    get monaco() {
      return monacoDependency.monaco;
    }

    constructor(application) {
      super();
      this._instanceId = performance.now();
      this._application = application;
    }

    get(id) {
      return this.items.get(id);
    }
    /**
     * Creates a new Monaco Editor
     * @param specs
     * @returns {*}
     */


    create = specs => {
      if (this.items.has(specs.id)) return;
      const editor = new Editor(specs);
      this.items.set(specs.id, editor);

      if (!!this.sources.size) {
        this._processEditorModels(editor);
      }

      return editor;
    };
    /**
     * Loads the sources of the module in all editor instances.
     *
     */

    setModule(module) {
      this.sources.set(module.id, module);

      if (!!this.items.size) {
        this._processSources(module);
      }
    }

    _processSources() {
      this.items.forEach(editor => this._processEditorModels(editor));
    }
    /**
     * Creates the models of the module
     * @param editor
     * @private
     */


    _processEditorModels(editor) {
      if (this._application.backend?.core?.path) {
        const {
          core
        } = this._application.backend;
        core.sources.items.forEach(source => editor.setDependency(source.code, `beyond_core/${source.basename}`));
      }

      if (this._application.backend?.sessions?.path) {
        const {
          sessions
        } = this._application.backend;
        sessions.sources.items.forEach(source => editor.setDependency(source, 'beyond_core'));
      }

      this.sources.forEach(source => {
        source.bundles.forEach(bundle => {
          bundle.dependencies?.items.forEach(dependency => {
            if (!dependency.declaration) {
              return;
            }

            editor.setDependency(dependency.declaration.code, dependency.resource);
          });
        });
      });
    }

  }

  function getEditorManager(application) {
    if (!application || !application.id) {
      console.error("cannot access to an undefined application");
      return;
    }

    if (managers.has(application.id)) return managers.get(application.id);
    let editorManager = new Manager(application);
    managers.set(application.id, editorManager);
    return editorManager;
  }
  /**************
  FILE: models.js
  **************/


  class Models extends _js.ReactiveModel {
    _languages = Object.freeze({
      jsx: 'typescript',
      js: 'javascript',
      ts: 'typescript',
      scss: 'scss'
    });
    _items = new Map();

    get items() {
      return this._items;
    }

    _default;

    get default() {
      if (!this._default) this._default = this.monaco.editor.createModel("//your code here");
      return this._default;
    }

    _monaco;

    constructor(monaco) {
      super();
      this._monaco = monaco;
    }
    /**
     * Generates the model of a code
     * @param type
     * @param source
     * @param processor
     * @returns {V|*}
     */


    get(type, source, processor = 'ts') {
      let uri = '';

      if (type === 'dependency') {
        const path = '/node_modules/';
        uri = `${path}${source.label}.ts`;
      } else {
        uri = `${source.file}`.replace('C:', '');
        uri = `${source.file}`.replace('D:', '');
      }

      if (this._items.has(uri)) return this._items.get(uri);

      const model = this._monaco.editor.createModel(source.code, this._languages[processor], // language
      this._monaco.Uri.file(uri) // uri
      ); //we save a local map for all files


      this._items.set(uri, model);

      return model;
    }

  }
  /****************
  FILE: settings.js
  ****************/


  class Settings extends _js.ReactiveModel {
    /**
     * Name of how it's saved in localstorage
     * @type {string}
     * @private
     */
    __NAME = 'beyond.dashboard.editorconfig';
    _fontSize = '';

    get configurable() {
      return ['fontSize', 'theme'];
    }

    get fontSize() {
      return this._fontSize;
    }

    set fontSize(value) {
      if (value === this._fontSize) return;
      this._fontSize = value;
      this.setChange();
    }

    get defaults() {
      return {
        theme: 'vs-dark',
        language: 'typescript',
        fontSize: 12
      };
    }

    _theme = '';

    get theme() {
      return this._theme;
    }

    _wordWrap;

    get wordWrap() {
      return this._wordWrap;
    }

    set wordWrap(value) {
      value = value === true ? 'on' : 'off';
      if (value === this.wordWrap) return;
      this._wordWrap = value;
      this.setChange();
    }

    set theme(value) {
      if (value === this._theme) return;
      this._theme = value;
      this.setChange();
    }

    _unpublished;

    get unpublished() {
      return this._unpublished;
    }

    get properties() {
      return {
        wordWrap: this.wordWrap,
        fontSize: this.fontSize,
        theme: this.theme,
        scrollbar: {
          alwaysConsumeMouseWheel: false
        },
        ...this.required
      };
    }

    get required() {
      return {
        automaticLayout: true,
        fixedOverflowWidgets: true,
        mouseWheelZoom: true
      };
    }

    constructor() {
      super();
      this.restore();
    }

    setChange() {
      this._unpublished = true;
      this.triggerEvent();
    }

    restore() {
      try {
        const settings = JSON.parse(localStorage.getItem(this.__NAME)) ?? this.defaults;
        Object.keys(settings).forEach(property => {
          if (!this.configurable.includes(property)) return;
          this[property] = settings[property];
          this._unpublished = false;
          this.triggerEvent('settings.loaded');
          this.triggerEvent();
        });
      } catch (e) {
        console.error(e);
      }
    }

    save() {
      try {
        localStorage.setItem(this.__NAME, JSON.stringify(this.properties));
        this.triggerEvent('settings.changed');
        this._unpublished = false;
      } catch (e) {
        console.error(e);
      }
    }

  }
  /************
  JSX PROCESSOR
  ************/

  /*********
  editor.jsx
  *********/


  class EditorView extends React.Component {
    /**
     * @param {object} props.editor Editor Model object
     * @param {object} props.panel The module controller
     * @params {string} props.processor The processor type of the file
     * @params {string} props.file The filename
     * @params {string} props.id Identifier of the module
     * @param props
     */
    constructor(props) {
      super(props);
      this.state = {
        ready: false
      };
      this.vs = React.createRef();
      this.editor = props.editor;
      this.id = props.editor.id;
      this.panel = props.panel;
      this.listenChanges = this.listenChanges.bind(this);

      this.updateState = () => this.setState({});

      this.disposables = [];
      this.setActive = this.setActive.bind(this);
    }

    setActive() {
      this.panel.setActive();
    }

    listenChanges() {
      this.setState({
        isUnpublished: true
      });
    }

    componentDidMount() {
      const data = this.state.file ? {
        file: this.state.file,
        processor: this.state.processor
      } : {};
      this.editor.init(this.vs.current);
      this.vs.current.addEventListener('click', this.setActive);
      this.editor.bind('change', this.updateState);
    }

    componentWillUnmount() {
      this.vs.current.removeEventListener('click', this.setActive);
      this.editor.unbind('change', this.updateState);
      this.editor.removeListeners(); // this.editor && this.editor.instance.dispose();
      // this.panel.editor.delete(this.id, this.editor);
    }

    render() {
      const cls = `ds-editor__container ${this.state.unpublished ? ' is-unpublished' : ''} `;
      return /*#__PURE__*/React.createElement("div", {
        className: cls
      }, this.state.isUnpublished ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "ds-editor__icons"
      }, /*#__PURE__*/React.createElement(_code.DSIcon, {
        icon: "save"
      }))) : null, /*#__PURE__*/React.createElement("div", {
        className: "vs-editor",
        ref: this.vs
      }));
    }

  }

  _exports.EditorView = EditorView;
  EditorView.contextType = _code2.DSWorkspaceContext;
  /**********
  SCSS STYLES
  **********/

  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.ds-editor__container{display:flex;flex-wrap:wrap;flex-basis:100%;position:relative;width:100%;height:100%}.ds-editor__container .vs-editor{width:100%;height:100%}.ds-editor__container:not(:last-child){border-right:1px solid #e36152}.ds-editor__container .ds-editor__icons{position:absolute;right:50px;top:20px;z-index:200}.beyond-element-modal.ds-modal .ds-modal-editor{padding:30px}.beyond-element-modal.ds-modal .ds-modal-editor form{width:100%;display:grid;grid-gap:15px}.beyond-element-modal.ds-modal .ds-modal-editor .beyond-alert{margin-bottom:30px}.beyond-element-modal.ds-modal .ds-modal-editor input{border:1px solid #e4e5dc;outline:0;padding:8px;width:100%}.beyond-element-modal.ds-modal .ds-modal-editor input:focus,.beyond-element-modal.ds-modal .ds-modal-editor input:hover{border:1px solid #82837f}.beyond-element-modal.ds-modal .ds-modal-editor .actions{display:grid;justify-items:center}.beyond-element-modal.ds-modal .ds-modal-editor .actions .beyond-button{margin-top:30px;min-width:200px}.ds-page.ds-editor-page .preload-content{display:flex;height:100%;width:100%;align-items:center;justify-content:center}';
  bundle.styles.appendToDOM();
});