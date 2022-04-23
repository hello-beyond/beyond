define(["exports", "emmet-monaco-es", "@beyond-js/dashboard/core-components/code", "@beyond-js/dashboard-lib/models/js", "@beyond-js/dashboard/ds-contexts/code", "@beyond-js/dashboard/hooks/code", "react", "react-dom"], function (_exports2, _emmetMonacoEs, _code, _js, _code2, _code3, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.Editor = void 0;
  _exports2.EditorView = EditorView;
  _exports2.MonacoDependency = void 0;
  _exports2.getEditorManager = getEditorManager;
  _exports2.monacoDependency = _exports2.hmr = void 0;
  //dashboard
  //models
  //CONTEXTS
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/ds-editor/code', false, {
    "txt": {
      "multilanguage": true
    }
  }, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
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
    #promise;
    #monaco;

    get monaco() {
      return this.#monaco;
    }

    #models;

    get models() {
      return this.#models;
    }

    #settings;

    get settings() {
      return this.#settings;
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
      if (!this.ready && this.#promise) return this.#promise;
      this.#promise = new PendingPromise();

      require(['vs/editor/editor.main'], monaco => {
        this.#monaco = monaco;
        this.#ready = true;
        this.#config();
        this.#promise.resolve(true);
        this.#promise = undefined;
        this.triggerEvent();
        this.#models = new Models(monaco);
        this.#settings = new Settings();
      });

      return this.#promise;
    }

    setConfig(specs) {}

    #source;

    setSource(source) {
      this.#source = source;
    }
    /**
     * TODO: the configuration needs accepts the definitions from the tsconfig file.
     * @private
     */


    #config() {
      this.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false
      }); // this.monaco.languages.registerDocumentFormattingEditProvider('typescript', {
      //     provideDocumentFormattingEdits: async model => {
      //
      //         // const text = prettier.format(model.getValue(), {
      //         //     plugins: [babel, parserTs],
      //         //     singleQuote: true,
      //         // });
      //
      //         const {text} = await this.#source.format({
      //             filename: this.#source.filename,
      //             content: model.getValue()
      //         });
      //
      //         return [
      //             {range: model.getFullModelRange(), text}
      //         ]
      //     }
      // })

      this.monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        experimentalDecorators: true,
        allowSyntheticDefaultImports: true,
        jsx: this.monaco.languages.typescript.JsxEmit.React,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        allowNonTsExtensions: true,
        reactNamespace: 'React',
        // typeRoots: ["node_modules/@types"],
        target: monaco.languages.typescript.ScriptTarget.ES2020
      });
    }

  }

  _exports2.MonacoDependency = MonacoDependency;
  const monacoDependency = new MonacoDependency();
  /**************
  FILE: editor.js
  **************/

  /**
   *  Represents the editor instance
   *
   */

  _exports2.monacoDependency = monacoDependency;

  class Editor extends _js.ReactiveModel {
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

    constructor({
      application,
      id,
      type
    }) {
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

      this.#dependency = monacoDependency; //TODO: @editor

      this.#monaco = monacoDependency.monaco; // this.#type = type;

      this.save = this.save.bind(this);
      this.setUnpublished = this.setUnpublished.bind(this);
      this.updateSettings = this.updateSettings.bind(this);
      monacoDependency.settings.bind('settings.changed', this.updateSettings); // if (source && processor) this.addFile(bundle, this.currentProcessor, source, true);
    }

    updateSettings() {
      if (!this.instance) return;
      this.instance.updateOptions(monacoDependency.settings.properties);
    }

    init(selector, sourceId) {
      const settings = this.settings.properties;
      settings.model = this.currentModel ?? this.dependency.defaultModel;
      this.setDependency(this._bundleDependency, 'beyond_context'); // editor box

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


    addFile({
      module,
      type,
      processor,
      source,
      active
    }) {
      if (["undefined", false].includes(source.code)) {
        console.error('FILE_WITHOUT_CODE');
        return;
      }

      this.files.set(source.id, {
        type,
        source,
        processor,
        module
      });

      if (this.#source) {
        this.#source.unbind('change', this.#listenFileChanges);
        this.#source = undefined;
        this.dependency.setSource(undefined);
      }

      const open = ready => {
        if (!ready) this.unbind('initialised', open);
        this.#current = this.files.get(source.id);
        this.#source = source;
        this.dependency.setSource(source);
        this.#source.bind('change', this.#listenFileChanges);
        this.triggerEvent();
        this.loadFile(this.files.get(source.id));
      };

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
      const {
        type,
        source,
        processor,
        module
      } = fileItem;
      const model = this.#dependency.models.get(type, source, processor);
      this.#source = source;
      this.dependency.setSource(source);
      this.#source.bind('change', this.#listenFileChanges); // this.#currentModel = model;

      this.instance.setModel(model);
      this.instance.updateOptions({
        readOnly: type === 'dependency'
      });
      this.triggerEvent();

      if (this.module) {
        this.loadDependencies(module);
      }
    }
    /***
     *
     */


    loadDependencies = module => {
      module?.bundles?.items?.forEach(bundle => {
        const {
          dependencies: {
            model
          }
        } = bundle;
        model.items.forEach(item => {
          if (!item.declaration) {
            console.warn(`the next declaration is undefined : ${item.id}`);
            return;
          }

          this.setDependency(item.declaration.code, item.resource);
        });
      });
    };
    #listenFileChanges = () => {
      this.#outsideChange = this.#source.code !== this.instance?.getModel().getValue();
      this.setUnpublished();
    };
    setUnpublished = () => {
      if (!this.instance) {
        this.#unpublished = false;
        return;
      }

      this.#unpublished = this.#source.code !== this.instance?.getModel().getValue();
      this.triggerEvent();
    };
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

      this.instance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.NUMPAD_SUBTRACT, () => {
        this.instance.trigger('keyboard', 'editor.action.fontZoomOut', {});
      });
      this.instance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_K, () => {
        this.instance.getAction('editor.action.formatDocument').run();
      });

      this._disposablesEvents.push(this.instance.onDidChangeModelContent(this.setUnpublished)); // emmetHTML(this.monaco, ['html', 'tsx', 'jsx']);
      // emmetCSS(this.monaco);


      (0, _emmetMonacoEs.emmetJSX)(this.monaco, ['html', 'typescript', 'javascript']);
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
        if (!this.#source) {
          throw Error('The source object does not exist');
        }

        if (!this.unpublished) {
          console.log('no changes');
          return;
        }

        const sourceId = this.source.id; // this.files.set(source.id, {type, source, processor, module});

        const {
          source,
          module
        } = this.files.get(sourceId);
        await this.#source.save({
          applicationId: this.application.id,
          moduleId: module.id,
          file: source.file,
          source: this.instance.getModel().getValue()
        }); // this.setUnpublished(false);

        this.triggerEvent();
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
   * Each project has an EditorManager
   * @type {Map<any, any>}
   */


  _exports2.Editor = Editor;
  const managers = new Map();
  /**
   * Manages the editor instances created by the panels
   *
   * Each panel has it's own editor
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
    #sources = new Map();

    get sources() {
      return this.#sources;
    }

    #instanceId;
    #items = new Map();
    /**
     * Represent the list of editor instances
     * @returns {Map<unknown, unknown>}
     */

    get items() {
      return this.#items;
    }

    #favorites = new Map();

    get favorites() {
      return this.#favorites;
    }

    #project;

    get project() {
      return this.#project;
    }

    get monaco() {
      return monacoDependency.monaco;
    }

    constructor(project) {
      super();
      this.#instanceId = performance.now();
      this.#project = project;
    }

    #dependencies = new Map();

    get(id) {
      return this.items.get(id);
    }
    /**
     * Creates a new Monaco Editor
     * @param specs
     * @returns {*}
     */


    create = specs => {
      if (this.items.has(specs.id)) return this.items.get(specs.id);
      const editor = new Editor(specs);
      this.items.set(specs.id, editor);

      if (!!this.#dependencies.size) {
        this.#processEditorModels(editor);
      }

      return editor;
    };
    /**
     * Loads the sources of the module in all editor instances.
     *
     */

    setModuleManager(module) {
      module?.bundles?.items.forEach(bundle => {
        const process = () => {
          if (bundle.dependencies.ready) return;
          bundle.dependencies.items.forEach(dependency => {
            if (dependency.external) {
              return console.warn(`external dependency: ${dependency.id}`);
            }

            this.#dependencies.set(dependency.id, dependency);
          });
          this.#processSources();
        };

        if (!bundle.dependencies.ready) {
          bundle.dependencies.bind('change', process);
          return;
        }

        process();
      });
    }

    #processSources() {
      this.items.forEach(editor => this.#processEditorModels(editor));
    }
    /**
     * Creates the models of the module
     * @param editor
     * @private
     */


    #processEditorModels(editor) {
      this.#dependencies.forEach(dependency => {
        editor.setDependency(dependency.declaration.code, dependency.resource);
      });
    }

  }

  function getEditorManager(project) {
    if (!project || !project.id) {
      console.error("cannot access to an undefined project");
      return;
    }

    if (managers.has(project.id)) return managers.get(project.id);
    let editorManager = new Manager(project);
    managers.set(project.id, editorManager);
    return editorManager;
  }
  /**************
  FILE: models.js
  **************/


  class Models extends _js.ReactiveModel {
    #languages = Object.freeze({
      jsx: 'typescript',
      js: 'javascript',
      ts: 'typescript',
      scss: 'scss'
    });
    #items = new Map();

    get items() {
      return this.#items;
    }

    _default;

    get default() {
      if (!this._default) this._default = this.monaco.editor.createModel("//your code here");
      return this._default;
    }

    #monaco;

    constructor(monaco) {
      super();
      this.#monaco = monaco;
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
        uri = `${source.file}`.replace(/^[A-Z]:/, '');
      }

      if (this.#items.has(uri)) return this.#items.get(uri);
      const model = this.#monaco.editor.createModel(source.code, this.#languages[processor], // language
      this.#monaco.Uri.file(uri) // uri
      ); //we save a local map for all files

      this.#items.set(uri, model);
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
        formatOnPaste: true,
        formatOnType: true,
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
  /**********
  context.jsx
  **********/
  //@TODO: @julio Remove editor context


  const EditorContext = React.createContext();

  const useEditorContext = () => React.useContext(EditorContext);
  /*********
  editor.jsx
  *********/


  function EditorView(props) {
    const {
      panel,
      editor,
      tab
    } = props;
    const [isUnpublished, setIsUnpublished] = React.useState();
    const vs = React.useRef();
    (0, _code3.useBinder)([editor], () => setIsUnpublished(editor.unpublished));
    React.useEffect(() => {
      editor.init(vs.current, tab.sourceId);
      vs.current.addEventListener('click', panel.setActive);
      return () => {
        vs.current.removeEventListener('click', panel.setActive);
        editor.removeListeners();
      };
    }, []);
    const cls = `ds-editor__container ${isUnpublished ? ' is-unpublished' : ''} `;
    return /*#__PURE__*/React.createElement("div", {
      className: cls
    }, isUnpublished && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "ds-editor__icons"
    }, /*#__PURE__*/React.createElement(_code.DSIcon, {
      title: "tienes cambios por guardar",
      icon: "save"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "vs-editor",
      ref: vs
    }));
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '.ds-editor__container{display:flex;flex-wrap:wrap;flex-basis:100%;position:relative;width:100%;height:100%}.ds-editor__container .vs-editor{width:100%;height:100%}.ds-editor__container:not(:last-child){border-right:1px solid #e36152}.ds-editor__container .ds-editor__icons{position:absolute;right:20px;top:20px;z-index:200;fill:#E36152}.beyond-element-modal.ds-modal .ds-modal-editor{padding:30px}.beyond-element-modal.ds-modal .ds-modal-editor form{width:100%;display:grid;grid-gap:15px}.beyond-element-modal.ds-modal .ds-modal-editor .beyond-alert{margin-bottom:30px}.beyond-element-modal.ds-modal .ds-modal-editor input{border:1px solid #e4e5dc;outline:0;padding:8px;width:100%}.beyond-element-modal.ds-modal .ds-modal-editor input:focus,.beyond-element-modal.ds-modal .ds-modal-editor input:hover{border:1px solid #82837f}.beyond-element-modal.ds-modal .ds-modal-editor .actions{display:grid;justify-items:center}.beyond-element-modal.ds-modal .ds-modal-editor .actions .beyond-button{margin-top:30px;min-width:200px}.ds-page.ds-editor-page .preload-content{display:flex;height:100%;width:100%;align-items:center;justify-content:center}';
  bundle.styles.appendToDOM();
  const modules = new Map(); // Exports managed by beyond bundle objects

  __pkg.exports.managed = function (require, _exports) {}; // Module exports


  __pkg.exports.process = function (require) {};

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;

  __pkg.initialise(modules);
});