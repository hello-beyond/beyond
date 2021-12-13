define(["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.ReactiveModel = _exports.ModuleBundleBuilder = _exports.ApplicationBuilder = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard-lib/models/js', false, {});
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /***********
  JS PROCESSOR
  ***********/

  /***********************
  FILE: _reactive-model.js
  ***********************/


  class ReactiveModel {
    #ready;

    get ready() {
      return this.#ready;
    }

    #fetching;

    get fetching() {
      return this.#fetching;
    }

    set fetching(value) {
      if (value === this.#fetching) return;
      this._fetching = value;
      this.triggerEvent();
    }

    _fetched;

    get fetched() {
      return this._fetched;
    }

    #processing;

    get processing() {
      return this.#processing;
    }

    set processing(value) {
      if (value === this.#processing) return;
      this.#processing = value;
      this.triggerEvent();
    }

    #processed;

    get processed() {
      return this._processed;
    }

    set processed(value) {
      if (value === this.#processed) return;
      this.#processed = value;
      this.triggerEvent();
    }

    #loaded;

    get loaded() {
      return this.#loaded;
    }

    #error;

    get error() {
      return this.#error;
    }

    set error(value) {
      if (value === this.#error || typeof value !== 'string') return;
      this.#error = value;
      this.triggerEvent();
    }

    constructor() {
      this._events = new Events({
        bind: this
      });
      this.triggerEvent = this.triggerEvent.bind(this);
      this._set = this._set.bind(this);
    }

    triggerEvent(event = 'change') {
      this._events.trigger(event);
    }
    /**
     * set value in a private property
     * @param property
     * @param value
     */


    _set(property, value) {
      let props = {};
      if (property && value !== 'undefined') props[property] = value;else props = property;
      let updated = false;

      for (const prop in props) {
        const key = `_${prop}`;
        if (!this.hasOwnProperty(key)) continue; //same value on store

        if (this[key] === props[prop]) continue;
        this[key] = props[prop];
        updated = true;
      }

      if (updated) this.triggerEvent();
    }

    getProperties() {
      const props = {};
      Object.keys(this).forEach(property => props[property.replace('_', '')] = this[property]);
      return props;
    }

  }
  /***************************************
  FILE: builder\application\application.js
  ***************************************/


  _exports.ReactiveModel = ReactiveModel;

  class ApplicationBuilder extends ReactiveModel {
    #id;

    get id() {
      return this.#id;
    }

    set id(value) {
      if (value === this.#id || typeof value !== 'string') return;
      this.triggerEvent();
    }

    #title;

    get title() {
      return this.#title;
    }

    set title(value) {
      if (value === this.#title || typeof value !== 'string') return;
      this.#title = value;
      this.triggerEvent();
    }

    get version() {
      return 1;
    }

    #description;

    get description() {
      return this.#description;
    }

    set description(value) {
      if (value === this.#description || typeof value !== 'string') return;
      this.#description = value;
      this.triggerEvent();
    }

    #created;

    get created() {
      return this.#created;
    }

    set created(value) {
      if (value === this.#created || typeof value !== 'boolean') return;
      this.#created = value;
      this.triggerEvent();
    }

    #identifier;

    get identifier() {
      return this.#identifier;
    }

    set identifier(value) {
      if (value === this.#identifier || typeof value !== 'string') return;
      this.#identifier = value;
      this.triggerEvent();
    }

    #type;

    get type() {
      return this.#type;
    }

    set type(value) {
      if (value === this.#type || typeof value !== 'string') return;
      this.#type = value;
      this.triggerEvent();
    }

    #validPort;

    get validPort() {
      return this.#validPort;
    }

    set validPort(value) {
      if (value === this.#validPort) return;
      this.#validPort = !!value;
      this.triggerEvent();
    }

    #port = 4080;

    get port() {
      return this.#port;
    }

    set port(value) {
      if (value === this.#port || value !== '' && isNaN(parseInt(value))) return;
      this.#port = value === '' ? value : parseInt(value);
      this.triggerEvent();
    }

    #ready;

    get ready() {
      return this.#ready;
    }

    get getters() {
      return {
        id: this.id,
        port: this.port,
        type: this.type,
        name: this.name,
        title: this.title,
        version: this.version,
        modules: this.modules,
        created: this.created,
        processed: this.processed,
        processing: this.processing,
        description: this.description
      };
    }

    set(specs) {}

    constructor() {
      super();

      this.create = () => create(this);

      this.checkPort = port => checkPort(this, port);

      this.getInitialPort();
    }

    async getInitialPort() {
      let cont = 0;
      let port = 8080;

      while (cont < 5 || !this.#port) {
        await this.checkPort(port);

        if (this.#port && this.#validPort) {
          this.#ready = true;
          this.triggerEvent();
          return;
        }

        port = port - 100;
        this.#ready = true;
        cont++;
      }
    }

  }
  /**********************************
  FILE: builder\application\create.js
  **********************************/


  _exports.ApplicationBuilder = ApplicationBuilder;

  async function create(parent) {
    if (!parent.name) throw new Error('Name is required');
    parent.processing = true;

    try {
      const response = await module.execute('builder/application/create', parent.getters);

      if (!response?.status) {
        parent.error = response.error;
        return;
      }

      parent.created = true;
      parent.id = response.data.id;
    } catch (error) {
      console.error("error", error);
      parent.created = false;
    } finally {
      console.log(90);
      parent.processed = true;
      parent.processing = false;
    }
  }
  /********************************
  FILE: builder\application\port.js
  ********************************/


  async function checkPort(base, port) {
    if (!port) throw new Error('port to check is required');
    base.processing = true;

    try {
      const response = await module.execute('builder/application/checkPort', {
        port: port
      });
      base.processing = false;

      if (!response.valid) {
        base.triggerChange();
        return;
      }

      base.port = port;
      base.validPort = true;
      return response;
    } catch (error) {
      base.processing = false;
      base.validPort = false;
      base.processed = true;
    }
  }
  /************************************
  FILE: builder\bundle\module-bundle.js
  ************************************/

  /**
   * Manager to create bundles
   */


  class ModuleBundleBuilder extends ReactiveModel {
    _bundle;
    _applicationId;
    _PROCESSORS = ['scss', 'less'];
    _BUNDLES = ['page', 'widget', 'layout', 'code', 'bridge', 'typescript'];
    _TEMPLATES = Object.freeze({
      page: {
        'id': 'page',
        'bundle': 'page'
      },
      server_page: {
        'id': 'server_page',
        'bundle': 'page'
      },
      mobile_login: {
        'id': 'mobile_login',
        'bundle': 'page'
      }
    });

    get applicationId() {
      return this._applicationId;
    }

    get PROCESSORS() {
      return this._PROCESSORS;
    }

    get BUNDLES() {
      return this._BUNDLES;
    }

    get type() {
      return this._bundle.template ?? this._bundle.type;
    }

    _origin;

    get origin() {
      return this._origin;
    }

    set origin(value) {
      if (value === this._origin) return;
      this._origin = value;
      this.triggerEvent();
    }

    setTemplate(name) {
      if (!this._TEMPLATES.hasOwnProperty(name)) {
        console.warn('the template does not exists');
      }

      const template = this._TEMPLATES[name];
      this._bundle.type = template.bundle;
      this._bundle.template = template.id;
    }

    get bundle() {
      return this._bundle;
    }

    constructor(applicationId) {
      super(applicationId);
      this._applicationId = applicationId;
      this._bundle = new ModuleBundle(this._applicationId);

      this._bundle.bind('change', this.triggerEvent);
    }

    getStructure(bundle) {
      return Structures[bundle];
    }

    setType(type) {
      this._bundle.type = type;
    }

    cleanType() {
      this._bundle.type = undefined;
      this._bundle.template = undefined;
    }

  }
  /*****************************
  FILE: builder\bundle\module.js
  *****************************/

  /**
   * Represents a module that could be create and only has a bundle
   */


  _exports.ModuleBundleBuilder = ModuleBundleBuilder;

  class ModuleBundle extends ReactiveModel {
    _id;

    get id() {
      return `${this.moduleId}//${this._type}`;
    }

    get moduleId() {
      return `application//${this._applicationId}//${this.name.replace(/ /g, '-')}`;
    }

    _type;

    get type() {
      return this._type;
    }

    _name;

    get name() {
      return this._name ?? '';
    }

    _error;

    get error() {
      return this._error;
    }

    _vdir;

    get vdir() {
      return this._vdir ?? 0;
    }

    _structure;

    get structure() {
      return this._structure;
    }

    _route;

    get route() {
      return this._route;
    }

    _txt;
    _author;
    _developer;
    _title;
    _description;
    _styles;
    _fields;
    _layoutId;
    _applicationId;
    _server = false;
    _multilanguage = false;
    _processors = new Map();
    /**
     * Define if the module to create is a predefined template.
     * @private
     */

    _template;

    get valid() {
      const structure = this._structure;
      if (!structure.required) return true;
      const keepEmpty = structure.required.filter(property => !this[`_${property}`]);
      return !keepEmpty.length;
    }

    constructor(applicationId) {
      super();
      this._applicationId = applicationId;
    }

    set type(type) {
      if (type === this._type) return;
      this._type = type;
      if (!this._type) return this.triggerEvent();
      this._structure = Structures[this._type];
      this._fields = Structures.module.fields.concat(this._structure.fields);
      this.triggerEvent();
    }

    get template() {
      return this._template;
    }

    set template(template) {
      if (template === this._template) return;
      this._template = template;
      this.triggerEvent();
    }

    set(property, value) {
      this._set(property, value);
    }

    setMultilanguage(value) {
      if (value === this._multilanguage) return;
      this._multilanguage = value;
      this.triggerEvent();
    }

    addProcessor(value) {
      if (this._processors.has(value)) return;

      this._processors.set(value, true);

      this.triggerEvent();
    }

    removeProcessor(value) {
      if (!this._processors.has(value)) return;

      this._processors.delete(value);

      this.triggerEvent();
    }

    async publish() {
      const params = {};

      this._fields.forEach(field => {
        const key = `_${field}`;
        if (this[key]) params[field] = this[key];
      });

      if (this._type === 'layout') params.id = params.name;

      try {
        this._set({
          fetching: true,
          error: undefined
        });

        params.applicationId = this._applicationId;
        params.bundle = this._type;
        params.processors = Array.from(this._processors.keys());
        const action = params.template ? '/builder/module/clone' : '/builder/module/create';
        const response = await module.execute(action, params);

        if (response.error) {
          this._set({
            error: response.error
          });

          return response;
        }

        this._set({
          fetching: false
        });

        return true;
      } catch (exc) {
        console.error(1, exc);
      }
    }

  }
  /********************************
  FILE: builder\bundle\processor.js
  ********************************/


  class BundleProcessor extends ReactiveModel {
    constructor(type) {
      super(type);
    }

  }
  /*********************************
  FILE: builder\bundle\structures.js
  *********************************/


  const Structures = {
    module: {
      fields: ['id', 'name', 'title', 'description', 'developer', 'author', 'template', 'styles', 'server', 'multilanguage']
    },
    page: {
      fields: ['vdir', 'route', 'layoutId'],
      required: ['route', 'name'],
      processors: ['ts', 'jsx'],
      dependencies: ['layout']
    },
    widget: {
      required: ['name'],
      processors: ['ts', 'scss']
    },
    layout: {
      required: ['name'],
      processors: ['ts', 'jsx']
    },
    code: {
      required: ['name'],
      processors: ['ts', 'jsx']
    },
    bridge: {
      required: ['name']
    },
    ts: {
      required: ['name']
    },
    js: {
      required: ['name']
    }
  };
});