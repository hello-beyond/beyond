define(["exports", "@beyond-js/dashboard-lib/models/js", "@beyond-js/dashboard-lib/models/ts", "@beyond-js/dashboard/unnamed/workspace/components/editor/code", "@beyond-js/dashboard/workspace-tree/code", "@beyond-js/dashboard/unnamed/workspace/components/favorites/code", "@beyond-js/dashboard/unnamed/workspace/components/notifications/code", "@beyond-js/plm/plm-indexed-db/code"], function (_exports, _js, _ts, _code, _code2, _code3, _code4, _code5) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.BundleManager = void 0;
  _exports.DSDatabase = DSDatabase;
  _exports.applicationsFactory = _exports.ModuleModel = _exports.ModuleManager = _exports.Dashboard = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/models/code', false, {});
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /***********
  JS PROCESSOR
  ***********/

  /*******************
  FILE: application.js
  *******************/


  class ApplicationModel extends _js.ReactiveModel {
    _bundles = ['layout', 'page', 'code', 'all', 'widget'];

    get bundles() {
      return this._bundles;
    }
    /**
     * Returns the compound id of the application
     *
     * This id is used to destructure the module id
     * @returns {string}
     */


    get id() {
      return `application//${this.application.id}//`;
    }

    get containers() {
      const items = ['all', 'application'];
      this.application.libraries?.items?.forEach(item => items.push(item.library.name));
      return items;
    }
    /**
     * Array with the
     * @private
     */


    _containersIds;

    get containersIds() {}

    _container = undefined;

    get container() {
      return this._container;
    }

    _filterContainer = 'application';

    get filterContainer() {
      return this._filterContainer;
    }

    set filterContainer(value) {
      if (value === this._filterContainer) return;
      this._filterContainer = value;
      this.triggerEvent();
    }

    _filterBundle = 'all';

    get filterBundle() {
      return this._filterBundle;
    }

    set filterBundle(value) {
      if (value === this._filterBundle) return;
      this._filterBundle = value;
      this.triggerEvent();
    }

    _filterText = '';

    get filterText() {
      return this._filterText;
    }

    set filterText(value) {
      if (value === this._filterText) return;
      this._filterText = value;
      this.triggerEvent();
    }
    /**
     * Return the items of the application checking if it's necessary apply a filter.
     * @returns {*}
     */


    get items() {
      if (this.filterBundle || this.filterText || this.filterContainer) {
        return this._filterItems();
      }

      return this.modules.elements;
    }

    get modules() {
      return this.application.am;
    }

    get am() {
      return this.application.am;
    }

    get deployment() {
      return this.application.deployment;
    }

    _backend = {};

    get backend() {
      return this._backend;
    }

    _libraries = [];

    get libraries() {
      if (!this.application?.libraries?.fetched) return this._libraries;
      return this.application.libraries.items;
    }

    get static() {
      return this._static;
    }

    _template = {};

    get template() {
      return this._template;
    }

    _errors = [];

    get errors() {
      return this._errors;
    }

    _warnings = [];

    get warnings() {
      return this._warnings;
    }

    _modulesTree;

    get modulesTree() {
      return this._modulesTree;
    }

    _moduleManager;

    get moduleManager() {
      return this._moduleManager;
    }

    _favorites;

    get favorites() {
      return this._favorites;
    }

    _element;

    get element() {
      return this._element;
    }

    get found() {
      return this.application.found;
    }

    _ready = undefined;

    get ready() {
      if (!this.application.found && !this.application.fetching) {
        console.warn(`The application ${this.application.id} was not found`);
        return true;
      }

      if (this.element === 'template') {
        return this.application?.template?.landed;
      }

      if (this.element === 'module') {
        return this.moduleManager?.active?.ready;
      }

      if (this.element === 'favorites') {
        return this.application?.am?.tree.landed && this.favorites?.ready;
      }

      if ([undefined, 'favorites', '', 'application'].includes(this.element)) {
        return this.application?.am?.tree.landed;
      }

      if (['statics'].includes(this.element)) {
        return this.application.static?.tree.landed;
      } // TODO: @julio no se esta validando este tab en el ready del modelo


      return this.application.tree.landed;
    }
    /**
     *
     * @param {String} id Id of the application
     * @param {String} moduleId Id of the module to open into workspace.
     * @param {string} element Represents the element of the application to wait to be ready
     * could by one of the next values
     *  - template
     *  - module
     *  - favorites
     *  - statics
     *  - config
     */


    constructor(id, moduleId, element) {
      super();
      this._element = element;
      this.application = new _ts.Application({
        identifier: {
          id: parseInt(id)
        },
        tree: SPECS.tree
      });
      this.application.bind('change', this.checkLoaded);
      this.application.bind('change', this.validateErrors);
      this.application.bind('change', this.checkModulesErrors);
      this.application.fetch();
      this._moduleManager = new ModuleManager(this, moduleId);
      this._favorites = _code3.FavoritesFactory.get(this.application.id, this);

      this._favorites.bind('change', this.triggerEvent);

      window._app = this;
    }

    checkLoaded = () => {
      if (!this.application.tree.landed) return;

      this._checkErrors();

      this._processModules();

      this._processStatic();

      this._processTemplate();

      this.triggerEvent();
      this.application.unbind('change', this.checkLoaded);
    };

    _checkErrors() {}

    _processModules() {
      const items = this.itemsByContainer('application').map(module => module);
      this._modulesTree = _code2.TreeFactory.get('application', [this, this.application, items]);
    }

    _processStatic() {
      this._static = _code2.TreeFactory.get('static', [this.application, this.application.static, this.application.static.items]);
    }

    _processTemplate() {
      //TODO: @julio TREE
      const {
        template: {
          application,
          processors
        }
      } = this.application;
      this._template.application = _code2.TreeFactory.get('template', [this.application, application, application.sources.items]);
      this._template.processors = new Map();
      processors.forEach(processor => {
        if (!processor.path) return;

        const tree = _code2.TreeFactory.get('template', [this.application, processor, processor.sources.items, this._template, this._template]);

        this._template.processors.set(processor.processor, tree);
      });
    }

    clean() {
      this.application?.am.clean();
    }

    _filterItems() {
      const specs = {};
      if (!this.am) return [];
      specs.container = this.filterContainer ? this._getContainerId(this.filterContainer) : 'application';
      if (this.filterText) specs.text = this.filterText;
      if (this.filterBundle) specs.bundle = this.filterBundle;
      return this.am.getItems(specs);
    }

    itemsByContainer(container) {
      return this.application.am.getItems({
        container: this._getContainerId(container)
      });
    }

    _getContainerId(container) {
      if (['application', 'all'].includes(container)) return container;
      const library = this.application.libraries.items.find(library => library.library.name === container);
      if (!library) return container;
      return `${library.id}/`;
    }

    getItems(filter) {
      this._filterContainer = filter;
      return this._filterItems();
    }

    validateErrors = () => {
      if (!this.application.errors) return;
      const specs = {
        id: this.application.id,
        application: this.application
      };

      _code4.DSNotifications.register(this.application.errors, specs);
    };
    checkModulesErrors = () => {
      if (!this.application.am) return;

      const setNotifications = am => {
        if (!am.tree.landed || this.moduleManager.models.has(am.id)) {
          return;
        }

        const specs = {
          id: am.id,
          module: am
        };

        _code4.DSNotifications.register(am.module.errors, specs);

        am.bundles.forEach(bundle => _code4.DSNotifications.register(bundle.errors, {
          id: bundle.id,
          module: am
        }));
      };

      this.application.am.items.forEach(setNotifications);
    };
  }
  /*****************
  FILE: dashboard.js
  *****************/


  class DSModel extends _js.ReactiveModel {
    _db;

    get db() {
      return this._db;
    }

    ready() {
      return this.db.initialised;
    }

    constructor() {
      super();
      const database = new DSDatabase();
      database.initialise();
      this._db = database;
    }

    async initialise() {
      return this.db.initialise();
    }

    store = name => this.db.store(name);
  }

  const Dashboard = new DSModel();
  /***********************
  FILE: database\config.js
  ***********************/

  _exports.Dashboard = Dashboard;

  function getConfig() {
    const CONFIG = Object.freeze({
      DB: 'beyond.dashboard',
      VERSION: 4
    }); //TODO validar uso de tablas list, records, storages y unpublished

    const tables = {
      favorites: {
        name: 'favorites',
        config: {
          keyPath: 'id',
          autoIncrement: true
        },
        indexes: [['id', 'id', {
          unique: true
        }], ['name', 'name', {
          unique: true
        }], ['items', 'items', {
          unique: false
        }]]
      },
      workspace: {
        name: 'workspace',
        config: {
          keyPath: 'id',
          autoIncrement: true
        },
        indexes: [['id', 'id', {
          unique: true
        }], ['application', 'application', {
          unique: true
        }], ['panels', 'panels'], ['config', 'config']]
      }
    };
    const stores = [];

    for (const store in tables) {
      stores.push(tables[store]);
    }

    return {
      name: CONFIG.DB,
      version: CONFIG.VERSION,
      stores: stores
    };
  }
  /************************
  FILE: database\indexed.js
  ************************/


  function DSDatabase() {
    'use strict';

    let db, initialised;
    const config = getConfig();
    Object.defineProperty(this, 'initialised', {
      get: () => initialised
    });
    Object.defineProperty(this, 'db', {
      get: () => db
    });
    let promise;

    this.initialise = async () => {
      if (initialised || promise) return promise;
      promise = new PendingPromise();
      const {
        BeyondDB
      } = await beyond.import('@beyond-js/dashboard/indexeddb/code');
      db = await BeyondDB.create(config);
      initialised = true;
      promise.resolve(db);
      promise = undefined;
    };

    this.store = name => db.stores.has(name) ? db.stores.get(name) : false;
  }
  /***************
  FILE: factory.js
  ***************/


  class ApplicationsFactory {
    _applications = new Map();

    get applications() {
      return this._applications;
    }

    constructor() {}

    get(id, moduleId, element) {
      if (this.applications.has(id)) return this.applications.get(id);
      const application = new ApplicationModel(id, moduleId, element);
      this.applications.set(id, application);
      return application;
    }

  }

  const applicationsFactory = new ApplicationsFactory();
  /*****************************
  FILE: module\bundle-manager.js
  *****************************/

  _exports.applicationsFactory = applicationsFactory;

  class BundleManager extends _js.ReactiveModel {
    #tree = new Map();

    get tree() {
      return this.#tree;
    }

    #bundle;

    get bundle() {
      return this.#bundle;
    }

    get id() {
      return this.#bundle.id;
    }

    get name() {
      return this.#bundle.name;
    }

    HAS_DEPENDENCIES = ['ts'];
    #dependencies;

    get dependencies() {
      return this.#dependencies;
    }

    #consumers;

    get consumers() {
      return this.#consumers;
    }

    #compiler;

    get compiler() {
      return this.#compiler;
    }
    /**
     * Represents the model of the current application
     * @private
     */


    #application;

    get application() {
      return this.#application;
    }

    #processors;

    get processors() {
      return this.#processors;
    }

    get diagnostics() {
      const processor = this.bundle.processors.get('ts');
      if (!processor) return {};
      return processor?.compiler?.diagnostics ?? {};
    }

    #am;
    /**
     *
     * @param {ApplicationModel} application
     * @param tree {TreeFactory} Tree of module's bundles.
     * @param bundle
     * @param txt
     * @param am
     */

    constructor(application, tree, bundle, am, txt) {
      super();
      this.#am = am;
      const processors = bundle.processors;
      this.#bundle = bundle;
      this.#tree = tree;
      this.#application = application;
      if (txt) processors.set('txt', txt.processors.get('txt')); // this.#processors = processors;

      this._process();
    }

    _process() {
      this.bundle.processors.forEach(processor => {
        if (!this.HAS_DEPENDENCIES.includes(processor.name)) return;
        this.loadDependencies(processor.id);
        this.loadConsumers(processor.id);
        this.loadCompiler(processor.id);
      });
    }

    loadDependencies(processorId) {
      const specs = {
        tree: {
          properties: {
            bundle: true,
            declaration: true
          }
        },
        filter: [{
          field: 'processor',
          operand: 0,
          value: processorId
        }]
      };
      const dependencies = new _ts.ProcessorDependencies(specs);
      dependencies.bind('change', this._checkDependencies);
      dependencies.fetch();
      this.#dependencies = dependencies;
    }

    loadConsumers() {
      const specs = {
        tree: {
          properties: {
            bundle: {
              properties: {
                processors: {
                  properties: {
                    compiler: true,
                    dependencies: true
                  }
                }
              }
            }
          }
        },
        filter: [{
          field: 'bundle',
          operand: 0,
          value: this.bundle.id
        }]
      };
      const collection = new _ts.Consumers(specs);
      collection.bind('change', this._checkConsumers);
      collection.fetch();
      this.#consumers = collection;
    }

    _checkConsumers = () => {
      if (!this.consumers.tree.landed) return;
      this.triggerEvent();
      const branch = this.tree.items.get(this.bundle.name);
      branch.addConsumers(this.consumers);
      this.consumers.unbind('change', this._checkDependencies);
      this.triggerEvent('consumers.loaded');
    };
    _checkDependencies = () => {
      if (!this.dependencies.landed) return;

      if (this.dependencies.landed) {
        const branch = this.tree.items.get(this.bundle.name);
        branch.addDependencies(this.dependencies);
        this.triggerEvent();
      }

      if (this.dependencies.tree.landed) {
        this.dependencies.unbind('change', this._checkDependencies);
        this.triggerEvent('dependencies.loaded');
      }
    };

    getFile(file, processorName) {
      file = file.replace(/\//g, '\\');

      if (!this.bundle.processors.has(processorName)) {
        return;
      }

      const processor = this.bundle.processors.get(processorName);
      return processor.sources.items.find(i => i.file === file);
    }

    async loadCompiler() {
      if (!this.bundle.processors.has('ts')) return;
      const processor = this.bundle.processors.get('ts');
      const compiler = new _ts.ProcessorCompiler({
        identifier: {
          id: processor.id
        }
      });
      compiler.bind('change', () => {
        const specs = {
          id: processor.id,
          module: this.#am,
          bundle: this.#bundle
        };

        _code4.DSNotifications.register(compiler.diagnostics, specs);
      });
      await compiler.fetch();
      this.#compiler = compiler;
    }

  }
  /*****************************
  FILE: module\module-manager.js
  *****************************/

  /**
   * Manages the modules instances and interfaces between them and editors instances
   */


  _exports.BundleManager = BundleManager;

  class ModuleManager extends _js.ReactiveModel {
    _application;

    get application() {
      return this._application;
    }
    /**
     * Return the active module
     * @private
     */


    _active;

    get active() {
      return this._active;
    }

    #models = new Map();

    get models() {
      return this.#models;
    }

    #promises = new Map();

    get promises() {
      return this.#promises;
    }

    get ready() {}
    /**
     *
     * @param application {ApplicationModel}
     * @param application.application {Application} PLM Item of application.
     * * @param moduleId if is passed then the Module manager will load it.
     */


    constructor(application, moduleId) {
      super();
      this._application = application;
      this._editorManager = (0, _code.getEditorManager)(application.application);
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
        window._module = this._active;
        localStorage.setItem('dashboard.module.active', id);
      } catch (e) {
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
          console.trace(moduleId);
          return;
        }

        const model = await this.getInstance(moduleId);

        this._editorManager.setModule(model);

        return model;
      } catch (e) {
        console.error(104.6, "error", e);
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
      } else {
        const model = new ModuleModel(id, this.application);
        if (model.ready) return promise.resolve(model);

        const response = () => {
          model.unbind('model.loaded', response);
          this.models.set(model.id, model);
          this.triggerEvent('model.loaded');
          promise.resolve(model);
          this.promises.delete(id);
        };

        model.bind('model.loaded', response);
      }

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

  }
  /***************************
  FILE: module\module-model.js
  ***************************/

  /**
   * Represents the model-ui of the module
   */


  _exports.ModuleManager = ModuleManager;

  class ModuleModel extends _js.ReactiveModel {
    _tree = {
      properties: {
        module: {
          properties: {
            static: true
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
                overwrites: true // compiler: true,
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

    _bundles = new Map();

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

    _static;

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

    _found;

    get found() {
      return this.#am?.found;
    }

    get alerts() {
      const total = this.errors.length + this.warnings.length;
      return {
        total: total
      };
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
      this.#am = new _ts.ApplicationModule({
        identifier: {
          id: moduleId
        },
        tree: this._tree
      });
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
      this.am.off('change', this.checkLoaded); // load bundles by name;

      this.checkModule();
      this.triggerEvent();

      if (this.am.module?.static) {
        const specs = [this.application, this.am, this.am.module.static.items];
        this._static = _code2.TreeFactory.get('static', specs);
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
      const {
        application,
        module,
        module: {
          bundles
        }
      } = this;
      const processors = new Set();
      this._bundlesTree = _code2.TreeFactory.get('module', [application, module, [...bundles.values()]]);
      bundles.forEach(bundle => {
        if (bundle.name === 'txt') return;
        this.bundles.set(bundle.name, new BundleManager(this._applicationManager, this._bundlesTree, bundle, this.#am, txt));
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
      const specs = {
        id: this.am.id,
        module: this.am
      };

      _code4.DSNotifications.register(this.am.module.errors, specs);

      this.am.bundles.forEach(bundle => {
        const specs = {
          id: bundle.id,
          module: this.am
        };

        _code4.DSNotifications.register(bundle.errors, specs); // bundle.processors.forEach(p => {
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
      await file.delete({
        target: params.name
      });
    }

    async fetch() {
      const promise = new PendingPromise();
      const {
        module
      } = this;
      module.fetch({
        container: true,
        bundles: {
          processors: true
        }
      });
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
  /********************************
  FILE: module\processor-manager.js
  ********************************/


  _exports.ModuleModel = ModuleModel;

  class ProcessorManager extends _js.ReactiveModel {
    constructor() {
      super();
    }

  }
  /*************
  FILE: specs.js
  *************/


  const SPECS = {
    tree: {
      properties: {
        static: true,
        bee: true,
        deployment: {
          properties: {
            distributions: true
          }
        },
        template: {
          properties: {
            application: {
              properties: {
                sources: true
              }
            },
            processors: {
              properties: {
                sources: true
              }
            }
          }
        },
        libraries: {
          properties: {
            library: true,
            application: true
          }
        },
        am: {
          properties: {
            module: true,
            bundles: {
              properties: {
                processors: true
              }
            }
          }
        }
      }
    }
  };
});