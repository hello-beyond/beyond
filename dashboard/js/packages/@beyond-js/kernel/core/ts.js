define(["exports"], function (_exports2) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.widgets = _exports2.beyond = _exports2.WidgetSpecs = _exports2.SingleCall = _exports2.PendingPromise = _exports2.NodeWidget = _exports2.ModuleTexts = _exports2.Module = _exports2.ListenerFunction = _exports2.IWidgetRendered = _exports2.Events = _exports2.Collection = _exports2.CancellationToken = _exports2.BundleStyles = _exports2.Bundle = _exports2.BeyondWidgetControllerSSR = _exports2.BeyondWidgetControllerBase = _exports2.BeyondWidgetController = _exports2.ActionsBridge = void 0;
  const amd_require = require;
  let __pkg = {
    exports: {}
  };
  const modules = new Map();
  /**********************************
  FILE: _prepare-stack-trace\error.ts
  **********************************/

  modules.set('./_prepare-stack-trace/error', {
    hash: 1344789388,
    creator: function (require, exports) {
      "use strict";

      const prepareStackTrace = Error => {
        Error.prepareStackTrace = (err, frames) => {
          for (const frame of frames) {
            if (frame.isNative()) continue;
            const file = frame.getFileName();
            const line = frame.getLineNumber();
            const column = frame.getColumnNumber();
            console.log(file, line, column);
          }

          return err.stack;
        };
      };

      Error.prepareStackTrace && prepareStackTrace(Error);
    }
  });
  /*******************************
  FILE: application\application.ts
  *******************************/

  modules.set('./application/application', {
    hash: 3460213121,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Application = void 0;

      var _languages = require("./languages");

      var _modules = require("../modules/modules");

      var _data = require("../package/data");

      var _service = require("../service/service");

      class Application extends _service.Service {
        get is() {
          return 'application';
        }

        #beyond;

        constructor(beyond) {
          super();
          this.#beyond = beyond;
        }

        #package;

        get package() {
          return this.#package;
        }

        get id() {
          return this.#package.id;
        }

        #version;

        get version() {
          return this.#version;
        }

        #layout;

        get layout() {
          return this.#layout;
        }

        #modules = new _modules.Modules(this);

        get modules() {
          return this.#modules;
        } // External modules are standalone packages that do not have a container


        #externals = new _modules.Modules();

        get externals() {
          return this.#externals;
        }

        #params;

        get params() {
          return this.#params;
        }

        #languages;

        get languages() {
          return this.#languages;
        }

        setup(config) {
          // The configuration of the application package is not required when
          // it is a web page that is not being created with BeyondJS,
          // but where it is going to import packages created with BeyondJS as standalone modules and/or libraries
          this.#package = config.package && new _data.PackageData(config.package);
          this.#version = config.version ? config.version : '';
          this.#layout = config.layout;
          this.#params = config.params;
          this.#languages = new _languages.Languages(config.languages);
          config.package && this.#beyond.packages.register(config.package, '.');
          super.setup(config);
        }

      }

      exports.Application = Application;
    }
  });
  /*****************************
  FILE: application\languages.ts
  *****************************/

  modules.set('./application/languages', {
    hash: 142137764,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Languages = void 0;

      var _events = require("../utils/events/events");

      class Languages extends _events.Events {
        #config;
        #storage = typeof localStorage === 'object' ? localStorage : void 0;
        #supported;

        get supported() {
          return this.#supported;
        }

        get default() {
          return this.#config.default;
        }

        #current;

        get current() {
          return this.#current;
        }

        #configure(value) {
          if (this.#current === value) return true;

          if (typeof value !== 'string' || value.length !== 2) {
            console.warn(`Configured language "${value}" is invalid`);
            return false;
          }

          if (value && !this.#supported.has(value)) {
            console.log(`Language "${value}" is not supported`);
            return false;
          }

          const previous = this.#current;
          this.#current = value;
          previous && this.trigger('change');
          return true;
        }

        set current(value) {
          if (!this.#configure(value)) return;
          this.#storage?.setItem('__beyond_language', value);
        }

        constructor(config) {
          super(); // Check the supported languages, if not set, default will be english

          config.supported = config.supported instanceof Array ? config.supported : ['en'];
          this.#supported = new Set(config.supported); // Check if the default language is valid

          if (config.default && typeof config.default !== 'string' || config.default.length !== 2) {
            console.log(`Default language "${config.default}" is invalid`);
            config.default = undefined;
          } // If default language not set or was invalid, take the first supported language


          config.default = config.default ? config.default : [...this.#supported][0]; // If default language was configured, but not set in the supported list, warn it

          if (!this.#supported.has(config.default)) {
            console.warn(`Default language "${config.default}" is not supported by current application`);
            config.default = [...this.#supported][0];
          }

          this.#config = config;
          const configured = this.#storage?.getItem('__beyond_language'); // Try to configure the locally previously configured language

          if (configured && this.#configure(configured)) return; // Try to configure the language configured in the device

          const device = typeof navigator === 'object' ? navigator.language.split('-')[0] : void 0;
          if (device && this.#configure(device)) return;
          this.#configure(config.default);
        }

      }

      exports.Languages = Languages;
    }
  });
  /********************
  FILE: base\package.ts
  ********************/

  modules.set('./base/package', {
    hash: 890772254,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.BeyondPackage = void 0;
      exports.resolve = resolve;

      function resolve(source, id) {
        if (!id.startsWith('.')) throw new Error(`Module id must be a relative resource "${id}"`);
        const split = {};
        split.source = source.split('/');
        split.source.pop();
        split.target = (id.startsWith('./') ? id.substr(2) : id).split('../');

        while (split.target[0] === '') {
          split.target.shift();
          split.source.pop();
        }

        return split.source.join('/') + '/' + split.target.join('/');
      }
      /**
       * This class is used only by beyond/core
       */


      class BeyondPackage {
        #ims;
        #cached = new Map();
        #exports;

        constructor(exports) {
          this.#exports = exports;
        }

        initialise(ims) {
          this.#ims = ims;
          this.#exports.process((id, source) => this.require(id, source), {});
        }
        /**
         * Solve the require function
         *
         * @param source {string} The module from where the require is being triggered
         * @param id {string} The module id being requested
         * @returns {*}
         */


        require(id, source) {
          id = source ? resolve(source, id) : id;
          if (this.#cached.has(id)) return this.#cached.get(id);
          if (!this.#ims.has(id)) throw new Error(`Internal module "${id}" not found`);
          const fn = this.#ims.get(id).creator;

          const require = required => this.require(required, id); // Here the id is the source of the require


          const exports = {};
          fn(require, exports);
          this.#cached.set(id, exports);
          return exports;
        }

      }

      exports.BeyondPackage = BeyondPackage;
    }
  });
  /**************
  FILE: beyond.ts
  **************/

  modules.set('./beyond', {
    hash: 3735049903,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.beyond = exports.Beyond = void 0;

      var _application = require("./application/application");

      var _libraries = require("./libraries/libraries");

      var _import = require("./import/import");

      var _collection = require("./utils/collection/collection");

      var _widgets = require("./widgets/widgets");

      var _instances = require("./bundles/instances/instances");

      var _dependencies = require("./bundles/instances/dependencies");

      var _transversals = require("./transversals/transversals");

      var _packages = require("./packages/packages");

      var _toast = require("./toast/toast");

      var _messages = require("./toast/messages");

      class Beyond {
        #packages = new _packages.Packages();

        get packages() {
          return this.#packages;
        }

        #application = new _application.Application(this);

        get application() {
          return this.#application;
        }

        #libraries = new _libraries.Libraries(this);

        get libraries() {
          return this.#libraries;
        }

        get bundles() {
          return _instances.instances;
        }

        #transversals = _transversals.transversals;

        get transversals() {
          return this.#transversals;
        }

        get dependencies() {
          return _dependencies.dependencies;
        }

        #local;

        get local() {
          return this.#local;
        }

        #distribution;

        get distribution() {
          return this.#distribution;
        }

        #environment;

        get environment() {
          return this.#environment;
        }

        get params() {
          return this.#application.params;
        }

        get languages() {
          return this.#application.languages;
        }

        #mode;

        get mode() {
          return this.#mode;
        }

        #baseUrl;

        get baseUrl() {
          return this.#baseUrl;
        }

        #import;
        import = module => this.#import.import(module); // Required by HMR only in local environment

        reload = (module, version) => this.#import.reload(module, version);
        require = module => this.#import.require(module);

        get widgets() {
          return _widgets.widgets;
        }

        get Collection() {
          return _collection.Collection;
        }

        setup(distribution, packages) {
          const {
            key,
            local,
            baseUrl,
            environment,
            mode
          } = distribution; // The distribution key is only required in local environment to support HMR

          this.#distribution = local ? key : void 0;
          this.#environment = environment ? environment : 'production';
          this.#local = local ? local : false;
          this.#mode = typeof window === 'object' ? 'amd' : 'cjs';

          if (mode && this.#mode !== mode) {
            throw new Error(`Expected module packaging type to be "${this.#mode}" instead of "${mode}"`);
          }

          this.#baseUrl = baseUrl ? baseUrl : ''; // Register the externals and the modules that are packages

          const mpackages = new Map(packages);
          mpackages?.forEach(({
            errors,
            filename
          }, pkg) => {
            if (errors) {
              console.log(`Package "${pkg}" is invalid:`, errors);
              return;
            }

            this.#packages.register(pkg, `packages/${pkg}/${filename}`);
          });
          this.#import = new _import.BeyondImport(this.#packages, this.#mode, baseUrl);
        } // Required for backward compatibility


        rpc = {
          prepare: () => void 0
        };
        #toast = new _toast.Toast();
        showMessage = (specs, duration) => this.#toast.showMessage(specs, duration);
        showConnectionError = callback => this.#toast.showMessage({
          type: _messages.MessageType.ConnectionError,
          retry: callback
        });
        showWarning = (text, duration) => this.#toast.showMessage({
          type: _messages.MessageType.Warning,
          text: text,
          duration: duration
        });
        removeMessage = id => this.#toast.removeMessage(id);
      }

      exports.Beyond = Beyond;
      /*bundle*/

      const beyond = new Beyond();
      exports.beyond = beyond;
      globalThis.beyond = beyond;
      /**
       * In local environment, beyond set the global variable __beyond_config
       * In production environments, the beyond configuration is expected to be done by calling the following methods:
       * beyond.setup, beyond.application.setup and beyond.libraries.register
       */

      if (typeof __beyond_config === 'object') {
        const {
          distribution,
          packages,
          application,
          libraries
        } = __beyond_config;
        beyond.setup(distribution, packages);
        beyond.application.setup(application);
        beyond.libraries.register(libraries);
      }
    }
  });
  /**********************
  FILE: bundles\bundle.ts
  **********************/

  modules.set('./bundles/bundle', {
    hash: 539277548,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Bundle = void 0;

      var _styles = require("./styles/styles");

      var _package = require("./package/package");

      var _dependencies = require("./instances/dependencies");

      var _dependencies2 = require("./dependencies");

      var _hmr = require("./hmr");
      /*bundle*/


      class Bundle extends Map {
        #container;

        get container() {
          return this.#container;
        }

        #name;

        get name() {
          return this.#name;
        }

        #multilanguage;

        get multilanguage() {
          return this.#multilanguage;
        }

        #hmr;

        get hmr() {
          return this.#hmr;
        }

        package(language) {
          if (this.#multilanguage && !language) throw new Error('Language not specified');
          if (language && language.length !== 2) throw new Error(`Language "${language}" is invalid`);
          language = this.#multilanguage ? language : '';
          language = language === undefined ? '' : language;
          if (this.has(language)) return this.get(language);
          const pkg = new _package.Package(this, language);
          this.set(language, pkg);
          return pkg;
        }

        get id() {
          return `${this.#container.id}/${this.#name}`;
        }

        get pathname() {
          return `${this.#container.pathname}/${this.#name}`;
        }

        #dependencies = new _dependencies2.Dependencies();

        get dependencies() {
          return this.#dependencies;
        }

        #styles;

        get styles() {
          return this.#styles;
        } // Set when the widgets are registered


        #widget;

        get widget() {
          return this.#widget;
        }

        set widget(value) {
          if (this.#widget) throw new Error('Property widget already set');
          this.#widget = value;
        }

        constructor(container, name, multilanguage, deps) {
          super();
          this.#container = container;
          this.#name = name;
          this.#multilanguage = multilanguage;
          deps && _dependencies.dependencies.register(deps);
          this.#dependencies.update(deps);
          this.#hmr = new _hmr.HMR(this);
          this.#styles = new _styles.BundleStyles(this);
        }

      }

      exports.Bundle = Bundle;
    }
  });
  /***********************
  FILE: bundles\bundles.ts
  ***********************/

  modules.set('./bundles/bundles', {
    hash: 3592526895,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Bundles = void 0;

      var _bundle = require("./bundle");

      var _dependencies = require("./instances/dependencies");

      class Bundles extends Map {
        #container;

        get container() {
          return this.#container;
        }

        constructor(container) {
          super();
          this.#container = container;
        }

        obtain(name, multilanguage, deps) {
          if (this.has(name)) {
            deps && _dependencies.dependencies.register(deps);
            return this.get(name);
          }

          const bundle = new _bundle.Bundle(this.#container, name, multilanguage, deps);
          this.set(bundle.name, bundle);
          return bundle;
        }

      }

      exports.Bundles = Bundles;
    }
  });
  /****************************
  FILE: bundles\dependencies.ts
  ****************************/

  modules.set('./bundles/dependencies', {
    hash: 1554910602,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Dependencies = void 0;

      class Dependencies extends Set {
        update(dependencies) {
          this.clear();
          dependencies && [...dependencies.keys()].forEach(resource => this.add(resource));
        }

      }

      exports.Dependencies = Dependencies;
    }
  });
  /*******************
  FILE: bundles\hmr.ts
  *******************/

  modules.set('./bundles/hmr', {
    hash: 1009328673,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.HMR = void 0;

      var _events = require("../utils/events/events");

      class HMR extends _events.Events {
        #bundle;
        #beyond;
        #local;

        constructor(bundle) {
          super();
          this.#bundle = bundle;
          this.#beyond = require('../beyond').beyond;
          this.#activate().catch(exc => console.error(exc.stack));
        }

        #activate = async () => {
          // HMR is only available in local environment
          const beyond = this.#beyond;
          if (!beyond.local) return;
          const local = (await beyond.import('@beyond-js/local/main/ts')).local;

          const onchange = (processor, extname, language) => {
            this.trigger(`${extname}//${language}`, processor);
          };

          const event = `change:${this.#bundle.id}//${beyond.distribution}`;
          local.on(event, onchange);
          this.#local = local;
        };
      }

      exports.HMR = HMR;
    }
  });
  /**************************************
  FILE: bundles\instances\dependencies.ts
  **************************************/

  modules.set('./bundles/instances/dependencies', {
    hash: 702635386,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.dependencies = exports.Dependencies = void 0;

      class Dependencies extends Map {
        register(dependencies) {
          dependencies.forEach((value, key) => this.set(key, value));
        }

      }

      exports.Dependencies = Dependencies;
      const dependencies = new Dependencies();
      exports.dependencies = dependencies;
    }
  });
  /***********************************
  FILE: bundles\instances\instances.ts
  ***********************************/

  modules.set('./bundles/instances/instances', {
    hash: 3832910888,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.instances = exports.BundlesInstances = void 0;

      var _data = require("../../package/data");

      class BundlesInstances extends Map {
        obtain(id, multilanguage, specs, dependencies) {
          const {
            beyond
          } = require('../../beyond');

          const split = id.split('/');
          const bundleName = split.pop(); // Remove the bundle name

          const module = split.join('/'); // Create the bundle

          const container = (() => {
            const pkg = new _data.PackageData(id);
            const mspecs = {
              dirname: specs.module?.dirname,
              txt: specs.txt
            }; // Check if the container of the module is the application

            const {
              application
            } = beyond;
            if (application.package?.id === pkg.id) return application.modules.obtain(module, mspecs); // Check if the container of the module is a library

            const {
              libraries
            } = beyond;

            if (libraries.has(pkg.id)) {
              const library = libraries.get(pkg.id);
              return module === pkg.id ? library : library.modules.obtain(module, mspecs);
            } // If the container of the module is not the application or a library, the it is an external module


            return application.externals.obtain(id, mspecs);
          })();

          const bundle = container.bundles.obtain(bundleName, multilanguage, dependencies);
          this.set(bundle.id, bundle);
          return bundle;
        }

      }

      exports.BundlesInstances = BundlesInstances;
      const instances = new BundlesInstances();
      exports.instances = instances;
    }
  });
  /***************************************
  FILE: bundles\package\exports\exports.ts
  ***************************************/

  modules.set('./bundles/package/exports/exports', {
    hash: 2546705124,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Exports = void 0;

      var _trace = require("../require/trace");

      class Exports {
        #require;
        #values = {};

        get values() {
          return this.#values;
        }

        constructor(require) {
          this.#require = require;
        } // This method is overridden by the bundle file


        process(require, exports) {
          void (require && exports);
        }

        update() {
          const require = id => {
            const trace = new _trace.Trace();
            trace.register('exports.update', id);
            return this.#require.solve(id, trace);
          };

          this.process(require, this.#values);
        }

      }

      exports.Exports = Exports;
    }
  });
  /***************************
  FILE: bundles\package\hmr.ts
  ***************************/

  modules.set('./bundles/package/hmr', {
    hash: 7735247,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.PackageHMR = void 0;

      var _events = require("../../utils/events/events");

      class PackageHMR extends _events.Events {
        #beyond;
        #pkg;
        #change = 0;

        async #onchange(processor) {
          if (['js', 'jsx'].includes(processor)) return; // Legacy processors does not support HMR

          const beyond = this.#beyond;
          this.#change++; // In AMD mode, the querystring is not allowed (it is used require.undef by the beyond.reload method)

          const qs = beyond.mode !== 'amd' ? `?change=${this.#change}` : '';
          const url = `${this.#pkg.bundle.id}[${processor}]${qs}`;
          await beyond.reload(url, this.#change);
          this.trigger('change');
        }

        constructor(pkg) {
          super();
          this.#pkg = pkg;
          this.#beyond = require('../../beyond').beyond;

          const onchange = processor => this.#onchange(processor).catch(exc => console.log(exc.stack));

          const {
            language
          } = pkg;
          pkg.bundle.hmr.on(`.js//${language}`, onchange);
        }

      }

      exports.PackageHMR = PackageHMR;
    }
  });
  /******************************
  FILE: bundles\package\ims\im.ts
  ******************************/

  modules.set('./bundles/package/ims/im', {
    hash: 1018388379,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.InternalModule = void 0;

      var _trace = require("../require/trace"); // Bundle internal module


      class InternalModule {
        #pkg;

        get package() {
          return this.#pkg;
        }

        #id;

        get id() {
          return this.#id;
        }

        #hash;

        get hash() {
          return this.#hash;
        }

        #require;
        #exports = {};
        #creator;
        #created = false;

        get created() {
          return this.#created;
        }

        #create = trace => {
          if (this.#created) throw new Error(`Internal module "${this.#id}" already created`);

          const require = id => this.#require.solve(id, trace, this);

          Object.keys(this.#exports).forEach(key => delete this.#exports[key]);
          this.#creator(require, this.#exports);
          this.#created = true;
        };

        require(trace, source) {
          if (!this.#created) {
            source && trace.register(source.id, this.#id);
            this.#create(trace);
            trace.pop();
          }

          return this.#exports;
        }

        initialise() {
          if (this.#created) return;
          const trace = new _trace.Trace();
          trace.register('initialisation', this.#id);
          this.#create(trace);
        }

        update(creator, hash) {
          this.#created = false;
          this.#creator = creator;
          this.#hash = hash;
        }

        constructor(pkg, id, hash, creator, require) {
          this.#pkg = pkg;
          this.#id = id;
          this.#hash = hash;
          this.#creator = creator;
          this.#require = require;
        }

      }

      exports.InternalModule = InternalModule;
    }
  });
  /*******************************
  FILE: bundles\package\ims\ims.ts
  *******************************/

  modules.set('./bundles/package/ims/ims', {
    hash: 240871094,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.InternalModules = void 0;

      var _im = require("./im");

      class InternalModules {
        #pkg;
        #ims = new Map();
        #require;

        constructor(pkg) {
          this.#pkg = pkg;
        }

        set _require(value) {
          this.#require = value;
        }

        #register = (id, hash, creator) => {
          if (this.#ims.has(id)) throw new Error(`IM "${id}" already registered`);
          const im = new _im.InternalModule(this.#pkg, id, hash, creator, this.#require);
          this.#ims.set(im.id, im);
        };

        register(ims) {
          ims.forEach(({
            creator,
            hash
          }, id) => this.#register(id, hash, creator));
        }

        require(id, trace, source) {
          if (!this.#ims.has(id)) throw new Error(`Module "${id}" not found`);
          const im = this.#ims.get(id);
          return im.require(trace, source);
        }

        initialise() {
          this.#ims.forEach(im => im.initialise());
        }

        update(ims) {
          ims.forEach(({
            creator,
            hash
          }, id) => {
            if (!this.#ims.has(id)) {
              this.#register(id, hash, creator);
              return;
            }

            const im = this.#ims.get(id);
            if (im.hash === hash) return;
            im.update(creator, hash);
          });
        }

      }

      exports.InternalModules = InternalModules;
    }
  });
  /*******************************
  FILE: bundles\package\package.ts
  *******************************/

  modules.set('./bundles/package/package', {
    hash: 4173488530,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Package = void 0;

      var _ims = require("./ims/ims");

      var _require = require("./require/require");

      var _exports = require("./exports/exports");

      var _hmr = require("./hmr");

      class Package {
        #bundle;

        get bundle() {
          return this.#bundle;
        }

        #language;

        get language() {
          return this.#language;
        }

        get multilanguage() {
          return this.#language !== '.';
        }

        #require;
        #ims;

        get ims() {
          return this.#ims;
        }

        #hmr;

        get hmr() {
          return this.#hmr;
        }

        #exports;

        get exports() {
          return this.#exports;
        }

        constructor(bundle, language) {
          this.#bundle = bundle;
          this.#language = language ? language : '.';
          this.#ims = new _ims.InternalModules(this);
          this.#require = new _require.Require(this);
          this.#ims._require = this.#require;
          this.#exports = new _exports.Exports(this.#require);
          this.#hmr = new _hmr.PackageHMR(this);
        }

        #initialised = false;

        get initialised() {
          return this.#initialised;
        }

        initialise(ims) {
          if (this.#initialised) throw new Error('Package already initialised');
          this.#initialised = true;
          ims && this.#ims.register(ims);
          this.exports.update();
          this.#ims.initialise();
        }

        update(ims) {
          this.#ims.update(ims);
          this.exports.update();
          this.#ims.initialise();
        }

      }

      exports.Package = Package;
    }
  });
  /***************************************
  FILE: bundles\package\require\require.ts
  ***************************************/

  modules.set('./bundles/package/require/require', {
    hash: 2353798450,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Require = void 0;

      var _package = require("../../../base/package");

      var _dependencies = require("../../instances/dependencies");

      var _instances = require("../../instances/instances");

      var _transversals = require("../../../transversals/transversals");

      class Require {
        #pkg;

        constructor(pkg) {
          this.#pkg = pkg;
        }
        /**
         * Solve a cjs require function
         *
         * @param {string} id The id of the internal module being required
         * @param {Trace} trace {object} The internal trace to find cyclical dependencies of internal modules
         * @param {InternalModule=} im The internal module that is making the call
         * @return {*}
         */


        solve(id, trace, im) {
          if (id === 'beyond_context') {
            const {
              container
            } = this.#pkg.bundle;
            return {
              bundle: this.#pkg.bundle,
              module: container.is === 'module' ? container : void 0,
              library: container.is === 'library' ? container : void 0
            };
          } // Check for non-relative require


          if (!id.startsWith('.')) {
            if (_dependencies.dependencies.has(id)) return _dependencies.dependencies.get(id);
            if (_instances.instances.has(id)) return _instances.instances.get(id).package().exports.values; // Check if the bundle that is being required is a transversal,
            // and it is in the same transversal of the bundle that is requiring it,
            // and it has not been initialised yet

            const name = id.split('/').pop();

            if (!_transversals.transversals.has(name, '') || this.#pkg.bundle.name !== name) {
              throw new Error(`Dependency "${id}" not found`);
            }

            const transversal = _transversals.transversals.obtain(name, '');

            transversal.bundles.get(id).initialise();
            return _instances.instances.get(id).package().exports.values;
          } // Relative require (internal module)


          id = im ? (0, _package.resolve)(im.id, id) : id;
          return this.#pkg.ims.require(id, trace, im);
        }

      }

      exports.Require = Require;
    }
  });
  /*************************************
  FILE: bundles\package\require\trace.ts
  *************************************/

  modules.set('./bundles/package/require/trace', {
    hash: 1932027471,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Trace = void 0; // Used to find cyclical requires of internal modules
      // Key is the id being required and the value is the source

      class Trace extends Array {
        has = id => this.find(rt => rt.id === id);

        register(source, id) {
          // Check for cyclical module require
          if (this.has(id)) {
            let traced = '';
            this.forEach(({
              id,
              source
            }) => {
              const s = ['initialisation', 'exports.update'].includes(source) ? 'Cycle initiates with source' : `then "${source}" requires`;
              traced += `\t${s} "${id}"\n`;
            });
            traced += `\tthat finally requires "${id}" again.\n`;
            throw new Error(`Recursive module load found.\n` + `Internal module "${source}" is requiring another internal module that was previously required: "${id}"\n` + `Trace of required modules:\n${traced}`);
          }

          this.push({
            id,
            source
          });
        }

      }

      exports.Trace = Trace;
    }
  });
  /*****************************
  FILE: bundles\styles\styles.ts
  *****************************/

  modules.set('./bundles/styles/styles', {
    hash: 403429166,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.BundleStyles = void 0;

      var _events = require("../../utils/events/events");
      /*bundle*/


      class BundleStyles extends _events.Events {
        processor;
        #bundle;

        get bundle() {
          return this.#bundle;
        }

        get id() {
          return this.#bundle.id;
        }

        #version = 0;

        get version() {
          return this.#version;
        }

        #mode;

        set mode(value) {
          if (value !== 'external') throw new Error(`Invalid mode "${value}"`);
          this.#mode = value;
        }

        #beyond;

        get beyond() {
          if (this.#beyond) return this.#beyond;
          return this.#beyond = require('../../beyond').beyond;
        } // Is the stylesheet appended to the DOM of the page (not a shadow dom of a widget)


        #appended = false;

        get appended() {
          return this.#appended;
        }

        #value;

        set value(value) {
          // Find and replace #host...
          const regexp = /#host\.([\w\d]*)#([^.]*\.[\w\d]*)/g;
          this.#value = value.replace(regexp, (match, host, resource) => {
            if (host === 'module' || host === 'library') {
              return `${this.#bundle.container.pathname}/static/${resource}`;
            } else if (host === 'application') {
              return `${this.beyond.baseUrl}${resource}`;
            }

            console.warn(`Invalid css host specification on bundle "${this.#bundle.id}"`, match);
          });
          this.#version++;
          this.#version > 1 && this.trigger('change', this);
        }

        css() {
          if (this.#mode !== 'external' && !this.#value) return;
          let css;

          if (this.#mode === 'external') {
            css = document.createElement('link');
            css.rel = 'stylesheet';
            css.type = 'text/css';
            css.href = `${this.beyond.baseUrl}${this.#bundle.pathname}.css`;
          } else {
            css = document.createElement('style');
            css.appendChild(document.createTextNode(this.#value));
          }

          css.setAttribute('bundle', this.id);
          return css;
        }

        constructor(bundle) {
          super();
          this.#bundle = bundle;

          const change = processor => this.trigger('change', this, processor);

          const language = '.';
          bundle.hmr.on(`.css//${language}`, change);
        }

        appendToDOM(is) {
          if (!this.#value) throw new Error(`CSS values are not set on bundle "${this.id}"`);

          if (this.#appended) {
            const previous = document.querySelectorAll(`:scope > [bundle="${this.id}"]`)[0];
            previous && document.removeChild(previous);
          }

          const css = this.css();
          is && css.setAttribute('is', is);
          document.getElementsByTagName('head')[0].appendChild(css);
          this.#appended = true;
        }

      }

      exports.BundleStyles = BundleStyles;
    }
  });
  /*********************
  FILE: import\import.ts
  *********************/

  modules.set('./import/import', {
    hash: 2930579115,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.BeyondImport = void 0;

      var _require = require("./require");

      class BeyondImport {
        #require;
        #packages;
        #mode;
        #baseUrl;

        constructor(packages, mode, baseUrl) {
          this.#packages = packages;
          this.#mode = mode;
          this.#baseUrl = baseUrl;

          if (['amd', 'cjs'].includes(mode)) {
            this.#require = new _require.BeyondRequire(mode);
            mode === 'amd' && this.#require.setup(baseUrl);
          }
        }
        /**
         * Import a module with baseURL resolution
         *
         * @param module {string} The module to be imported
         * @param version {number} The version required by hmr to update a bundle's processor
         * @returns {Promise<*>}
         */


        async import(module, version) {
          if (module.startsWith('/') || module.startsWith('.')) {
            console.warn(`Module "${module}" must only specify non-relative paths`);
            module = module.substr(1);
          }

          if (this.#mode === 'cjs' && typeof bimport !== 'undefined') return await bimport(module, version);
          if (this.#mode !== 'es6') return await this.#require.require(module);
          let url;

          if (/^https?:\/\/.*$/.test(module)) {
            url = module;
          } else {
            const pkg = [...this.#packages].find(pkg => pkg === module || module.startsWith(`${pkg}/`));
            module = pkg ? 'packages/' + module : module;
            url = `${this.#baseUrl}${module}` + (version ? `?version=${version}` : '');
          }

          return await es6_import(url);
        }
        /**
         * Used only in local environment to support HMR
         *
         * @param {string} module The module to be loaded
         * @param {number} version
         * @return {Promise<*>}
         */


        async reload(module, version) {
          if (this.#mode === 'cjs') return await bimport(module, version);
          if (this.#mode === 'es6') return await this.import(module, version);
          return await this.#require.reload(module);
        }

        require(module) {
          return this.#require.require(module);
        }

      }

      exports.BeyondImport = BeyondImport;
    }
  });
  /**********************
  FILE: import\require.ts
  **********************/

  modules.set('./import/require', {
    hash: 1334565985,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.BeyondRequire = void 0;

      class BeyondRequire {
        #mode;

        constructor(mode) {
          this.#mode = mode;
        }

        setup(baseUrl) {
          const mode = this.#mode;
          if (mode !== 'amd') throw new Error(`Setup should only be called on amd mode. Actual mode is "${mode}"`);
          baseUrl = baseUrl ? baseUrl : '';
          const root = location.protocol === 'file:' ? '' : '/';
          baseUrl = baseUrl.startsWith(root) ? baseUrl : `${root}${baseUrl}`;
          amd_require.config({
            baseUrl
          });

          amd_require.onError = function (error) {
            if (error.requireType === 'timeout') {
              let modules = error.requireModules;

              for (let module of modules) {
                amd_require.undef(module);
              } // Try again loading modules


              console.log('Retrying to load AMD modules:', modules);
              amd_require(modules, () => null);
            } else {
              console.error(error.stack);
            }
          };
        }
        /**
         * Require a module
         * @param module {string} The module to be required
         * @returns {Promise<any>>}
         */


        require(module) {
          if (this.#mode === 'cjs') {
            return cjs_require(module);
          }

          return new Promise((resolve, reject) => {
            if (typeof module !== "string") throw 'Invalid module parameter';
            module = module.endsWith('.js') ? module.substr(0, module.length - 3) : module;
            const error = new Error(`Error loading or processing module "${module}"`);
            amd_require([module], returned => resolve(returned), exc => {
              console.error(`Error loading module "${module}."`, exc.stack);
              reject(error);
            });
          });
        }
        /**
         * Used only in local environment to support HMR
         *
         * @param {string} module
         * @return {Promise<*>}
         */


        async reload(module) {
          const mode = this.#mode;
          if (mode !== 'amd') throw new Error(`This method is only supported in amd mode. Current mode is "${mode}"`);
          amd_require.undef(module);
          return await this.require(module);
        }

      }

      exports.BeyondRequire = BeyondRequire;
    }
  });
  /************************
  FILE: import\requirejs.ts
  ************************/

  modules.set('./import/requirejs', {
    hash: 2243979856,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
    }
  });
  /***************************
  FILE: libraries\libraries.ts
  ***************************/

  modules.set('./libraries/libraries', {
    hash: 2638341245,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Libraries = void 0;

      var _library = require("./library");

      class Libraries extends Map {
        #beyond;

        register(libraries) {
          for (const config of libraries) {
            const library = new _library.Library(this.#beyond, config);

            if (library.id !== '@beyond-js/kernel' && this.has(library.id)) {
              throw new Error(`Library "${library.package.id}" already registered`);
            }

            this.set(library.package.id, library);
          }
        }

        constructor(beyond) {
          super();
          this.#beyond = beyond;
          this.register([{
            package: '@beyond-js/kernel'
          }]);
        }

      }

      exports.Libraries = Libraries;
    }
  });
  /*************************
  FILE: libraries\library.ts
  *************************/

  modules.set('./libraries/library', {
    hash: 3822010233,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Library = void 0;

      var _data = require("../package/data");

      var _service = require("../service/service");

      var _modules = require("../modules/modules");

      var _bundles = require("../bundles/bundles");

      class Library extends _service.Service {
        get is() {
          return 'library';
        }

        #package;

        get package() {
          return this.#package;
        }

        get id() {
          return this.#package.id;
        }

        get pathname() {
          return `packages/${this.id}`;
        }

        #version;

        get version() {
          return this.#version;
        }

        #modules = new _modules.Modules(this);

        get modules() {
          return this.#modules;
        }

        #bundles = new _bundles.Bundles(this);

        get bundles() {
          return this.#bundles;
        }

        constructor(beyond, config) {
          super();
          if (!config.package) throw new Error('Package specification not set');
          this.#version = config.version;
          this.#package = new _data.PackageData(config.package);
          config.package && beyond.packages.register(config.package);
          super.setup(config);
        }

      }

      exports.Library = Library;
    }
  });
  /**********************
  FILE: modules\module.ts
  **********************/

  modules.set('./modules/module', {
    hash: 1186330794,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Module = void 0;

      var _action = require("../service/action");

      var _texts = require("./texts");

      var _bundles = require("../bundles/bundles");

      var _data = require("../package/data");
      /*bundle*/


      class Module {
        get is() {
          return 'module';
        }

        #container;

        get container() {
          return this.#container;
        } // Only when the module is an external module (it is contained in its own package)


        #package;

        get package() {
          return this.#package;
        }

        #id;

        get id() {
          return this.#id;
        }

        #dirname;

        get dirname() {
          // dirname is a property that is only available in node environments (node, backend)
          if (typeof window === 'object') return;
          const {
            beyond
          } = this;
          if (beyond.local) return this.#dirname; // In production, resolve the dirname of the module

          const pkg = this.package ? this.package.id : this.container.id; // The path relative to the application

          const relative = this.id.slice(pkg.length + 1);

          if (pkg === beyond.application.id) {
            // __dirname is the path where the bundle @beyond-js/kernel/core is located (node_modules/@beyond-js/kernel/core)
            require('path').resolve(__dirname, '../../../..', relative);
          } else {
            const resolved = require.resolve(pkg);

            return require('path').join(resolved, relative);
          }
        }

        #beyond;

        get beyond() {
          if (this.#beyond) return this.#beyond;
          return this.#beyond = require('../beyond').beyond;
        }

        get pathname() {
          const {
            beyond
          } = this;
          const pkg = this.package ? this.package.id : this.container.id;
          const path = this.id.slice(pkg.length + 1);
          return pkg === beyond.application.id ? path : `${this.container.pathname}/${path}`;
        }

        #bundles = new _bundles.Bundles(this);

        get bundles() {
          return this.#bundles;
        }

        get socket() {
          return this.container.socket;
        }

        #texts;

        get texts() {
          return this.#texts;
        }

        async execute(path, params) {
          if (!this.#container?.connect) throw new Error('Module does not support backend communication');
          const action = new _action.Action(this, path, params);
          return action.execute();
        }
        /**
         * Module constructor
         *
         * @param {string} id The module id
         * @param {IModuleSpecs} specs
         * @param {Container} container Can be a library, an application or undefined (external modules)
         */


        constructor(id, specs, container) {
          specs = specs ? specs : {};
          this.#id = id;
          this.#dirname = specs.dirname;
          this.#package = !container ? new _data.PackageData(id) : undefined;
          this.#container = container;
          const {
            txt
          } = specs; // To know if the bundle's container has a txt bundle

          txt && (this.#texts = new _texts.ModuleTexts(this, 'txt', txt.multilanguage));
        }

      }

      exports.Module = Module;
    }
  });
  /***********************
  FILE: modules\modules.ts
  ***********************/

  modules.set('./modules/modules', {
    hash: 2152102243,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Modules = void 0;

      var _module = require("./module");

      class Modules extends Map {
        #container;

        get container() {
          return this.#container;
        }

        constructor(container) {
          super();
          this.#container = container;
        }

        obtain(id, specs) {
          if (this.has(id)) return this.get(id);
          const module = new _module.Module(id, {
            txt: specs.txt
          }, this.#container);
          this.set(id, module);
          return module;
        }

      }

      exports.Modules = Modules;
    }
  });
  /*********************
  FILE: modules\texts.ts
  *********************/

  modules.set('./modules/texts', {
    hash: 2413657298,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ModuleTexts = void 0;

      var _events = require("../utils/events/events");

      var _singleCall = require("../utils/execution-control/single-call/single-call");

      var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      /*bundle*/


      class ModuleTexts extends _events.Events {
        #beyond;
        #id;

        get id() {
          return this.#id;
        }

        #multilanguage;

        get multilanguage() {
          return this.#multilanguage;
        }

        #value;

        get value() {
          return this.#value;
        }

        #pkg;
        #enabled = false;

        get enabled() {
          return this.#enabled;
        }

        set enabled(value) {
          this.#enabled = !!value;
          value && this.load().catch(exc => console.error(exc.stack));
        }

        #loaded = false;

        get loaded() {
          return this.#loaded;
        } // The language being load


        #loading;

        get loading() {
          return this.#loading;
        }

        get ready() {
          if (this.#loading) return false;
          this.load().catch(exc => console.log(exc.stack));
          return !this.#loading && this.#loaded;
        }

        #language;

        get language() {
          return this.#language;
        } // HMR updates


        #update = () => {
          const {
            bundle
          } = this.#pkg;
          this.#value = bundle.package(this.#language).exports.values.texts;
          this.trigger('change');
        };
        #import = async () => {
          const beyond = this.#beyond;

          const resource = (() => {
            const bundle = this.#id.split('/').pop();
            const transversal = bundle === 'txt-menu';
            const pathname = (transversal ? bundle : this.#id) + (this.#multilanguage ? `.${this.#loading}` : '');
            return {
              bundle,
              pathname
            };
          })();

          await beyond.import(resource.pathname);
          const bundle = beyond.bundles.get(this.#id);
          const pkg = this.#pkg = bundle.package(this.#multilanguage ? this.#loading : void 0);
          pkg.hmr.on('change:txt', this.#update);
          this.#value = pkg.exports.values.txt;
        };
        #change = () => {
          if (!this.#enabled) return;
          this.load().catch(exc => console.error(exc.stack));
        };
        /**
         * Module texts constructor
         *
         * @param {Module} module The module that holds the texts bundle
         * @param {string} bundle The bundle name
         * @param {boolean=true} multilanguage
         */

        constructor(module, bundle, multilanguage = true) {
          super();
          this.#id = `${module.id}/${bundle}`;
          this.#multilanguage = multilanguage;
          this.#beyond = require('../beyond').beyond;
          this.#beyond.languages.on('change', this.#change);
        }

        async load() {
          this.#enabled = true;
          const {
            current
          } = this.#beyond.languages;
          if (this.#language === current) return;
          this.#loading = current;
          this.trigger('change');
          await this.#import(); // Check if language changed while loading

          if (this.#loading !== this.#beyond.languages.current) {
            await this.load();
            return;
          }

          this.#loading = void 0;
          this.#loaded = true;
          this.#language = current;
          this.trigger('change');
        }

        destroy() {
          this.#pkg?.hmr.off('change:txt', this.#update);
          this.#beyond.languages.off('change', this.#change);
        }

      }

      exports.ModuleTexts = ModuleTexts;

      __decorate([_singleCall.SingleCall], ModuleTexts.prototype, "load", null);
    }
  });
  /********************
  FILE: package\data.ts
  ********************/

  modules.set('./package/data', {
    hash: 97481503,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.PackageData = void 0;

      class PackageData {
        #id;

        get id() {
          return this.#id;
        }

        #scope;

        get scope() {
          return this.#scope;
        }

        #name;

        get name() {
          return this.#name;
        }
        /**
         * Package data constructor
         *
         * @param {string} id The id of the application, library or module
         */


        constructor(id) {
          if (!id) throw new Error('Package id not set');
          const split = id.split('/');

          if (split[0].startsWith('@')) {
            if (split.length < 2) throw new Error(`Package id "${id}" is invalid`);
            this.#scope = split.shift();
            this.#name = split.shift();
          } else {
            this.#name = split.shift();
          }

          this.#id = (this.#scope ? `${this.#scope}/` : '') + this.#name;
        }

      }

      exports.PackageData = PackageData;
    }
  });
  /*************************
  FILE: packages\packages.ts
  *************************/

  modules.set('./packages/packages', {
    hash: 4081984463,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Packages = void 0; // The registered packages

      class Packages extends Set {
        register(pkg, path) {
          const paths = {};
          path = typeof path === 'string' ? path : `packages/${pkg}`;
          path = path ? path : '.';
          paths[pkg] = path;
          typeof amd_require === 'function' && amd_require.config({
            paths
          });
          this.add(pkg);
        }

      }

      exports.Packages = Packages;
    }
  });
  /**********************
  FILE: service\action.ts
  **********************/

  modules.set('./service/action', {
    hash: 3551768847,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Action = void 0;

      var _pendingPromise = require("../utils/pending-promise/pending-promise");

      var _executionError = require("./execution-error");

      let autoincrement = 0;

      class Action {
        #module;
        #request;
        #path;

        get path() {
          return this.#path;
        }

        #params;

        get params() {
          return this.#params;
        }

        constructor(module, path, params) {
          this.#module = module;
          this.#path = path;
          this.#params = params;
          this.#request = {
            id: this.#id,
            container: {
              id: module.container.id,
              version: module.container.version
            },
            module: module.id,
            action: path,
            params: params
          };
        }

        #id = ++autoincrement;

        get id() {
          return this.#id;
        }

        #channel = `response-v2-${this.#id}`;

        get channel() {
          return this.#channel;
        }

        #executed = false;

        get executed() {
          return this.#executed;
        }

        #executing = false;

        get executing() {
          return this.#executing;
        }

        #error = false;

        get error() {
          return this.#error;
        }

        #timer;
        #attempts = 0;
        #promise = new _pendingPromise.PendingPromise();
        #send = socket => {
          this.#attempts ? console.log(`Retrying [${this.#attempts}] to execute action "${this.#path}"`) : null;
          this.#attempts++;

          try {
            socket.emit('rpc-v2', this.#request);
          } catch (exc) {
            this.#executing = false;
            this.#executed = true;
            this.#error = true;
            this.#promise.reject(exc);
          }
        };

        execute() {
          if (this.#executing || this.#executed) return this.#promise;
          this.#module.socket.then(socket => {
            const beyond = require('../beyond').beyond;

            if (!socket) {
              const container = this.#module.container;
              const message = `Socket not found on module "${this.#module.id}". ` + `Check the backend configuration on ${container.is} "${container.package.id}"`;
              this.#promise.reject(new Error(message));
              return;
            }

            const onresponse = response => {
              this.#executed = true;
              this.#executing = false;
              clearTimeout(this.#timer);
              beyond.removeMessage('rpc-retrying-connection');
              socket.off(this.#channel, onresponse);
              const {
                error,
                message,
                source,
                processingTime
              } = response;
              void source; // source can be 'server' or 'cache'

              void processingTime;
              error ? this.#promise.reject(new _executionError.ExecutionError(error.message, error.stack)) : this.#promise.resolve(message);
            };

            socket.on(this.#channel, onresponse);
            this.#send(socket);
          }).catch(exc => this.#promise.reject(exc));
          return this.#promise;
        }

      }

      exports.Action = Action;
    }
  });
  /******************************
  FILE: service\actions-bridge.ts
  ******************************/

  modules.set('./service/actions-bridge', {
    hash: 706181349,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ActionsBridge = void 0;
      /*bundle*/

      class ActionsBridge {
        #module;

        constructor(module) {
          this.#module = module;
        }

        execute(action, ...params) {
          return this.#module.execute(action, params);
        }

      }

      exports.ActionsBridge = ActionsBridge;
    }
  });
  /*******************************
  FILE: service\execution-error.ts
  *******************************/

  modules.set('./service/execution-error', {
    hash: 3138069225,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ExecutionError = void 0;
      const ExecutionError = class {
        #message;

        get message() {
          return this.#message;
        }

        #stack;

        get stack() {
          return this.#stack;
        }

        constructor(message, stack) {
          this.#message = message;
          this.#stack = stack;
        }

      };
      exports.ExecutionError = ExecutionError;
    }
  });
  /*************************
  FILE: service\initiator.ts
  *************************/

  modules.set('./service/initiator', {
    hash: 3627028890,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Initiator = void 0;

      var _events = require("../utils/events/events");

      var _pendingPromise = require("../utils/pending-promise/pending-promise");
      /**
       * Service launcher required only in local development environment
       */


      class Initiator {
        #service;
        #local;

        constructor(service) {
          this.#service = service;
        }

        #promise;
        #initialise = async () => {
          if (this.#promise) {
            await this.#promise;
            return;
          }

          this.#promise = new _pendingPromise.PendingPromise();

          const beyond = require('../beyond').beyond;

          if (!beyond.local || this.#local) return;
          this.#local = (await beyond.import('@beyond-js/local/main/ts')).local;
          this.#promise.resolve();
        };

        async check() {
          await this.#initialise();
          if (!this.#local) return;
          const service = this.#local.services.get(this.#service.host);
          const status = await service.status;
          status !== 'running' && (await service.start());
          await new Promise(resolve => setTimeout(resolve, 2000));
        }

      }

      exports.Initiator = Initiator;
    }
  });
  /******************
  FILE: service\io.ts
  ******************/

  modules.set('./service/io', {
    hash: 2941830475,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ServiceIOConfiguration = void 0;

      class ServiceIOConfiguration {
        querystring;
      }

      exports.ServiceIOConfiguration = ServiceIOConfiguration;
    }
  });
  /***********************
  FILE: service\service.ts
  ***********************/

  modules.set('./service/service', {
    hash: 1986389264,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Service = void 0;

      var _singleCall = require("../utils/execution-control/single-call/single-call");

      var _io = require("./io");

      var _initiator = require("./initiator");

      var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };

      class Service {
        #initiator = new _initiator.Initiator(this);
        #io = new _io.ServiceIOConfiguration();

        get io() {
          return this.#io;
        }

        #connect;

        get connect() {
          return this.#connect;
        }

        #host;

        get host() {
          return this.#host;
        } // Property local is only available in a local environment and it is required by the beyond-local library


        #local;

        get local() {
          return this.#local;
        }

        #socket;

        async getSocket() {
          const beyond = require('../beyond').beyond;

          if (!this.#connect) return;
          if (this.#socket) return this.#socket; // Check that the service is running, and initiate it if it is not

          this.package.id !== '@beyond-js/local' && (await this.#initiator.check());
          const sio = beyond.mode === 'cjs' ? 'socket.io-client' : 'socket.io';
          const io = await beyond.require(sio);
          let query = this.#io.querystring && (await this.#io.querystring());
          const host = this.#host;
          this.#socket = io(host, {
            transports: ['websocket'],
            'query': query
          });
          this.#socket.on('error', error => console.error('Socket error:', this.package.id, host, error));
          this.#socket.on('connect_error', error => console.error('Socket connection error:', this.package.id, host, error));
          this.#socket.on('connect_timeout', error => console.error('Socket connection timeout:', this.package.id, host, error));
          return this.#socket;
        }

        get socket() {
          return this.getSocket();
        }

        setup(config) {
          this.#connect = !!config.connect;
          this.#host = config.host;
          this.#local = config.local;
        }

      }

      exports.Service = Service;

      __decorate([_singleCall.SingleCall], Service.prototype, "getSocket", null);
    }
  });
  /**********************
  FILE: toast\messages.ts
  **********************/

  modules.set('./toast/messages', {
    hash: 2124002787,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Messages = exports.MessageType = void 0;
      var MessageType;
      exports.MessageType = MessageType;

      (function (MessageType) {
        MessageType[MessageType["GeneralMessage"] = 0] = "GeneralMessage";
        MessageType[MessageType["GeneralError"] = 1] = "GeneralError";
        MessageType[MessageType["ConnectionError"] = 2] = "ConnectionError";
        MessageType[MessageType["Warning"] = 3] = "Warning";
      })(MessageType || (exports.MessageType = MessageType = {}));

      class Messages {
        #map = new Map();
        #ordered = [];

        get keys() {
          return this.#ordered.slice();
        }

        get first() {
          return this.#map.get(this.#ordered[0]);
        }

        set(message) {
          if (typeof message !== 'object') {
            console.log(message);
            throw new Error('Message parameter is invalid');
          }

          let id = message.id;

          if (typeof id !== 'string') {
            console.log(message);
            throw new Error('Invalid message id');
          }

          this.#map.set(id, message);
          let index = this.#ordered.indexOf(id);

          if (index !== -1) {
            this.#ordered.splice(index, 1);
          }

          this.#ordered.push(id);
        }

        has = id => this.#map.has(id);
        get = id => this.#map.get(id);

        typeExists(type) {
          let exists = false;
          this.#map.forEach(message => {
            if (exists) return;
            if (message.type === type) exists = true;
          });
          return exists;
        }

        delete(message) {
          const id = typeof message === 'object' ? message.id : message;

          if (typeof id !== 'string') {
            throw new Error('Message id is invalid');
          }

          this.#map.delete(id);
          const index = this.#ordered.indexOf(id);

          if (index !== -1) {
            this.#ordered.splice(index, 1);
          }
        }

      }

      exports.Messages = Messages;
    }
  });
  /*******************
  FILE: toast\toast.ts
  *******************/

  modules.set('./toast/toast', {
    hash: 2486824719,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Toast = void 0;

      var _events = require("../utils/events/events");

      var _messages = require("./messages");

      class Toast extends _events.Events {
        get MessageType() {
          return _messages.MessageType;
        }

        #DURATION_DEFAULT = 3000;
        #messages = new _messages.Messages();
        #autoincrement = 0;

        showMessage(specs, duration) {
          // Check parameters
          if (typeof specs === 'string') {
            specs = {
              type: _messages.MessageType.GeneralMessage,
              text: specs,
              duration: duration
            };
          }

          if (typeof specs !== 'object') throw new Error('Invalid parameters');

          if (!specs.type) {
            specs.type = _messages.MessageType.GeneralMessage;
          }

          if (specs.retry && typeof specs.retry !== 'function') {
            throw new Error('Invalid parameters, retry must be a function');
          }

          let id = specs.id;

          if (!id) {
            this.#autoincrement++;
            id = 'message-' + this.#autoincrement;
          }

          if (specs.type === _messages.MessageType.ConnectionError) {
            if (!specs.retry) {
              throw new Error('Invalid parameters, retry was expected');
            }

            this.#messages.set({
              id: id,
              type: _messages.MessageType.ConnectionError,
              retry: specs.retry,
              duration: 0 // Infinity

            });
          } else if (specs.type === _messages.MessageType.GeneralError) {
            if (!specs.text) {
              throw new Error('Invalid parameters, text was expected');
            }

            if (specs.retry) {
              duration = 0; // Infinity
            } else if (typeof specs.duration === 'number') {
              duration = specs.duration;
            } else {
              duration = this.#DURATION_DEFAULT;
            }

            this.#messages.set({
              id: id,
              type: _messages.MessageType.GeneralError,
              text: specs.text,
              retry: specs.retry,
              duration: duration
            });
          } else if (specs.type === _messages.MessageType.GeneralMessage) {
            if (!specs.text) throw new Error('Invalid parameters, text was expected');
            this.#messages.set({
              id: id,
              type: _messages.MessageType.GeneralMessage,
              text: specs.text,
              close: !!specs.close,
              duration: typeof specs.duration === 'number' ? specs.duration : this.#DURATION_DEFAULT
            });
          } else if (specs.type === _messages.MessageType.Warning) {
            if (!specs.text) {
              throw new Error('Invalid parameters, message was expected');
            }

            this.#messages.set({
              id: id,
              type: _messages.MessageType.Warning,
              text: specs.text,
              close: !!specs.close,
              duration: typeof specs.duration === 'number' ? specs.duration : this.#DURATION_DEFAULT
            });
          } else {
            throw new Error('Invalid parameters, message type is invalid');
          }

          this.trigger('change');
          return id;
        }

        removeMessage(id) {
          this.#messages.delete(id);
          this.trigger('change');
        }

        retry() {
          if (!this.#messages.typeExists(_messages.MessageType.ConnectionError) && !this.#messages.first) {
            console.error('Retry method was called, but there is no active message');
            return;
          }

          if (this.#messages.typeExists(_messages.MessageType.ConnectionError)) {
            let remove = [];

            for (let index in this.#messages.keys) {
              const id = this.#messages.keys[index];
              const message = this.#messages.get(id);

              if (message.type === _messages.MessageType.ConnectionError) {
                message.retry();
                remove.push(id);
              }
            }

            for (let index in remove) {
              const id = remove[index];
              this.#messages.delete(id);
            }
          } else {
            const message = this.#messages.first;
            typeof message.retry === 'function' ? message.retry() : console.error('Message retry function not set');
            this.#messages.delete(message);
          }

          setTimeout(() => this.trigger('change'), 500);
        }

        close() {
          let message = this.#messages.first;
          if (!message) return;

          if (message.type === _messages.MessageType.ConnectionError) {
            console.error('Connection error message type cannot be closed', message);
            return;
          }

          this.#messages.delete(message);
          this.trigger('change');
        }

      }

      exports.Toast = Toast;
    }
  });
  /***************************
  FILE: transversals\bundle.ts
  ***************************/

  modules.set('./transversals/bundle', {
    hash: 2302121073,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TransversalBundle = void 0;

      var _instances = require("../bundles/instances/instances");

      class TransversalBundle {
        #transversal;

        get transversal() {
          return this.#transversal;
        }

        #id;

        get id() {
          return this.#id;
        }

        #hash;

        get hash() {
          return this.#hash;
        }

        #specs;

        get specs() {
          return this.#specs;
        }

        #creator;
        #created = false;

        get created() {
          return this.#created;
        }

        #create = () => {
          if (this.#created) throw new Error(`Transversal bundle "${this.#id}" already created`);
          const {
            multilanguage,
            language
          } = this.#transversal;

          const bundle = _instances.instances.obtain(this.#id, multilanguage, this.#specs);

          const pkg = bundle.package(language);
          const ims = this.#creator(this.#transversal, bundle, pkg);
          pkg.initialise(ims);
          this.#created = true;
        };

        initialise() {
          !this.#created && this.#create();
        }

        constructor(transversal, id, hash, specs, creator) {
          this.#transversal = transversal;
          this.#id = id;
          this.#hash = hash;
          this.#specs = specs;
          this.#creator = creator;
        }

      }

      exports.TransversalBundle = TransversalBundle;
    }
  });
  /****************************
  FILE: transversals\bundles.ts
  ****************************/

  modules.set('./transversals/bundles', {
    hash: 3175251770,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Bundles = void 0;

      var _bundle = require("./bundle");

      class Bundles extends Map {
        #transversal;

        constructor(transversal) {
          super();
          this.#transversal = transversal;
        }

        #register = (id, hash, specs, creator) => {
          const bundle = new _bundle.TransversalBundle(this.#transversal, id, hash, specs, creator);
          this.set(bundle.id, bundle);
        };

        initialise(bundles) {
          bundles.forEach(({
            creator,
            specs,
            hash
          }, id) => this.#register(id, hash, specs, creator));
          this.forEach(bundle => bundle.initialise());
        }

      }

      exports.Bundles = Bundles;
    }
  });
  /********************************
  FILE: transversals\transversal.ts
  ********************************/

  modules.set('./transversals/transversal', {
    hash: 3498812795,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Transversal = void 0;

      var _bundles = require("./bundles");

      class Transversal {
        #name;

        get name() {
          return this.#name;
        }

        #language;

        get language() {
          return this.#language;
        }

        get multilanguage() {
          return !!this.#language;
        }

        #bundles;

        get bundles() {
          return this.#bundles;
        }

        #dependencies;

        get dependencies() {
          return this.#dependencies;
        }

        constructor(name, language, dependencies) {
          this.#name = name;
          this.#language = language;
          this.#dependencies = dependencies ? dependencies : new Map();
          this.#bundles = new _bundles.Bundles(this);
        }

        #initialised = false;

        initialise(bundles) {
          if (this.#initialised) throw new Error(`Transversal "${this.#name}" already initialised`);
          this.#initialised = true;
          this.#bundles.initialise(bundles);
        }

      }

      exports.Transversal = Transversal;
    }
  });
  /*********************************
  FILE: transversals\transversals.ts
  *********************************/

  modules.set('./transversals/transversals', {
    hash: 1820130836,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.transversals = void 0;

      var _transversal = require("./transversal");

      var _dependencies = require("../bundles/instances/dependencies");

      const transversals = new class {
        #transversals = new Map();

        has(name, language) {
          const key = `${name}/${language}`;
          return this.#transversals.has(key);
        }

        obtain(name, language, deps) {
          const key = `${name}/${language}`;
          if (this.#transversals.has(key)) return this.#transversals.get(key);
          deps && _dependencies.dependencies.register(deps);
          const transversal = new _transversal.Transversal(name, language, deps);
          this.#transversals.set(key, transversal);
          return transversal;
        }

      }();
      exports.transversals = transversals;
    }
  });
  /***********************************
  FILE: utils\collection\collection.ts
  ***********************************/

  modules.set('./utils/collection/collection', {
    hash: 2736578347,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Collection = void 0;
      /*bundle*/

      /**
       * Custom collection
       */

      class Collection {
        #map;

        get map() {
          return this.#map;
        }

        get entries() {
          return this.#map.entries();
        }

        get keys() {
          return this.#map.keys();
        }

        get values() {
          return this.#map.values();
        }

        get size() {
          return this.#map.size;
        }

        has = key => this.#map.has(key);
        get = key => this.#map.get(key);
        forEach = callback => this.#map.forEach(callback);
        bind = child => {
          child[Symbol.iterator] = () => this.#map[Symbol.iterator]();

          Object.defineProperty(child, 'entries', {
            'get': () => this.#map.entries()
          });
          Object.defineProperty(child, 'keys', {
            'get': () => this.#map.keys()
          });
          Object.defineProperty(child, 'values', {
            'get': () => this.#map.values()
          });
          Object.defineProperty(child, 'size', {
            'get': () => this.#map.size
          });

          child.has = key => this.#map.has(key);

          child.get = key => this.#map.get(key);

          child.forEach = callback => this.#map.forEach(callback);
        };
        /**
         * Constructor
         * @param {any} child The child instance
         * @param {any[]} entries The initial entries of the collection
         */

        constructor(child, entries) {
          entries = entries && !(entries instanceof Array) ? Object.entries(entries) : entries;
          this.#map = new Map(entries);
          child && this.bind(child);
        }

        set = (key, value) => this.#map.set(key, value);
        delete = key => this.#map.delete(key);
        replace = map => this.#map = map;
        clean = () => this.#map = new Map();
      }

      exports.Collection = Collection;
      globalThis.Collection = Collection;
    }
  });
  /***************************
  FILE: utils\events\events.ts
  ***************************/

  modules.set('./utils/events/events', {
    hash: 1237370484,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Events = void 0;
      /*bundle*/

      class Events {
        #specs;
        #listeners = new Map();
        #destroyed = false;

        get destroyed() {
          return this.#destroyed;
        }

        constructor(specs) {
          specs = specs ? specs : {};
          if (specs.supported && !(specs.supported instanceof Array)) throw new Error('Invalid parameters');
          this.#specs = specs;

          if (specs.bind) {
            specs.bind.bind = (event, listener, priority) => this.on(event, listener, priority);

            specs.bind.unbind = (event, listener) => this.off(event, listener);
          }
        }
        /**
         * Binds an event handler to an event name
         *
         * @param {string} event
         * @param {ListenerFunction} listener
         * @param {number} priority
         * @returns {this}
         */


        on(event, listener, priority) {
          if (this.#destroyed) {
            throw new Error('Events object is destroyed');
          }

          if (this.#specs.supported && !this.#specs.supported.includes(event)) {
            throw new Error(`Event "${event}" is not defined`);
          }

          if (typeof listener !== 'function') {
            throw new Error('Listener is not a function');
          }

          this.off(event, listener); // Just in case the listener is already registered

          const l = this.#listeners.has(event) ? this.#listeners.get(event) : [];
          this.#listeners.set(event, l);
          l.push({
            listener: listener,
            priority: priority ? priority : 0
          });
          return this;
        }

        bind = (event, listener, priority) => this.on(event, listener, priority);
        /**
         * Unbind an event listener
         *
         * @param {string} event
         * @param {ListenerFunction} listener
         * @param {number} force
         * @returns {this}
         */

        off(event, listener, force) {
          if (this.#destroyed) {
            throw new Error('Events object is destroyed');
          }

          if (!event) {
            throw new Error(`Event name not specified`);
          }

          if (this.#specs.supported && !this.#specs.supported.includes(event)) {
            throw new Error(`Event "${event}" is not defined`);
          }

          if (!listener) {
            if (!force) throw new Error('Listener function not set');
            this.#listeners.delete(event);
            return this;
          }

          if (!this.#listeners.has(event)) {
            return this;
          }

          const e = this.#listeners.get(event);
          const filtered = e.filter(item => item.listener !== listener);
          this.#listeners.set(event, filtered);
          return this;
        }

        unbind = (event, listener, force) => this.off(event, listener, force);
        /**
         * Triggers an event
         *
         * @param {Trigger} event
         * @param {any} rest
         * @returns {Promise<any>}
         */

        trigger(event, ...rest) {
          if (this.#destroyed) {
            throw new Error('Events object is destroyed');
          }

          event = typeof event === 'string' ? {
            'name': event
          } : event;
          if (typeof event !== 'object') throw new Error('Invalid parameters');
          if (typeof event.name !== 'string') throw new Error('Invalid event name');

          if (this.#specs.supported && !this.#specs.supported.includes(event.name)) {
            throw new Error(`Event "${event.name}" is not defined`);
          }

          let args = [...arguments];
          args.shift(); // Remove the event name from the list of arguments

          if (!this.#listeners.has(event.name)) return;
          let l = this.#listeners.get(event.name); // Sort by priority

          l.sort((a, b) => b.priority - a.priority);

          if (event.async) {
            const trigger = async function () {
              const promises = [];

              for (let listener of l) {
                promises.push(listener.listener(...args));
              }

              await Promise.all(promises);
            };

            return trigger.call(this, ...args).catch(exc => console.error(exc.stack));
          } else {
            for (let listener of l) {
              listener.listener(...args);
            }
          }
        }

        destroy() {
          this.#destroyed = true;
          this.#listeners.clear();
        }

      }

      exports.Events = Events;
      globalThis.Events = Events;
    }
  });
  /**************************
  FILE: utils\events\types.ts
  **************************/

  modules.set('./utils/events/types', {
    hash: 1632705009,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
    }
  });
  /*********************************************************************
  FILE: utils\execution-control\cancellation-token\cancellation-token.ts
  *********************************************************************/

  modules.set('./utils/execution-control/cancellation-token/cancellation-token', {
    hash: 4200323006,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.CancellationToken = void 0;
      /*bundle*/

      class CancellationToken {
        #id = 0;

        get current() {
          return this.#id;
        }

        reset = () => ++this.#id;
        check = id => id === this.#id;
      }

      exports.CancellationToken = CancellationToken;
    }
  });
  /*******************************************************
  FILE: utils\execution-control\single-call\single-call.ts
  *******************************************************/

  modules.set('./utils/execution-control/single-call/single-call', {
    hash: 783668127,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.SingleCall = SingleCall;
      /*bundle*/

      function SingleCall(target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        let promises = new WeakMap();

        descriptor.value = function (...args) {
          if (promises.has(this)) return promises.get(this);
          const promise = originalMethod.apply(this, args);
          promises.set(this, promise);

          const clean = () => promises.delete(this);

          promise.then(clean).catch(clean);
          return promise;
        };

        return descriptor;
      }
    }
  });
  /*********************************************
  FILE: utils\pending-promise\pending-promise.ts
  *********************************************/

  modules.set('./utils/pending-promise/pending-promise', {
    hash: 3725650226,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.PendingPromise = void 0;
      /*bundle*/

      class PendingPromise extends Promise {
        resolve;
        reject;

        constructor(executor) {
          // needed for PendingPromise.race/all ecc
          if (executor instanceof Function) {
            super(executor);
            return;
          }

          let resolve = undefined;
          let reject = undefined;
          super((a, b) => {
            resolve = a;
            reject = b;
          });
          this.resolve = resolve;
          this.reject = reject;
        }

      } // For backward compatibility


      exports.PendingPromise = PendingPromise;
      typeof window === 'object' && (window.PendingPromise = PendingPromise);
    }
  });
  /*******************************
  FILE: widgets\controller\base.ts
  *******************************/

  modules.set('./widgets/controller/base', {
    hash: 2341052564,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.BeyondWidgetControllerBase = void 0;

      var _beyond = require("../../beyond");
      /*bundle*/


      class BeyondWidgetControllerBase {
        #specs;
        #bundle;

        get bundle() {
          return this.#bundle;
        }

        get element() {
          return this.#specs.name;
        }

        get is() {
          return this.#specs.is;
        }

        get route() {
          return this.#specs.route;
        }

        get layout() {
          return this.#specs.layout;
        }

        constructor(specs) {
          this.#specs = specs;

          if (!_beyond.beyond.bundles.has(specs.id)) {
            throw new Error(`Bundle "${specs.id}" not found on "${specs.name}" widget`);
          }

          this.#bundle = _beyond.beyond.bundles.get(specs.id);
        }

      }

      exports.BeyondWidgetControllerBase = BeyondWidgetControllerBase;
    }
  });
  /*************************************
  FILE: widgets\controller\controller.ts
  *************************************/

  modules.set('./widgets/controller/controller', {
    hash: 722357762,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.BeyondWidgetController = void 0;

      var _instances = require("../../bundles/instances/instances");

      var _base = require("./base");
      /*bundle*/

      /**
       * The client widget react controller
       */


      class BeyondWidgetController extends _base.BeyondWidgetControllerBase {
        #component;

        get component() {
          return this.#component;
        }

        get node() {
          return this.#component.node;
        }

        #body;

        get body() {
          return this.#body;
        }

        constructor(specs, component) {
          super(specs);
          this.#component = component;
        }

        #hmrStylesChanged = styles => {
          const {
            shadowRoot
          } = this.component;
          const previous = shadowRoot.querySelectorAll(`:scope > [bundle="${styles.id}"]`)[0];
          previous && shadowRoot.removeChild(previous);
          const css = styles.css();
          css && shadowRoot.appendChild(css);
        };

        #setStyles() {
          // Append styles and setup styles HMR
          const append = styles => {
            const css = styles.css();
            if (!css) return;
            this.component.shadowRoot.appendChild(css);
            styles.on('change', this.#hmrStylesChanged);
          };

          const recursive = bundle => bundle.dependencies.forEach(resource => {
            if (!_instances.instances.has(resource)) return;

            const dependency = _instances.instances.get(resource);

            append(dependency.styles);
            recursive(dependency);
          });

          append(this.bundle.styles);
          recursive(this.bundle); // Append the global styles

          const global = document.createElement('link');

          const {
            beyond
          } = require('../../beyond');

          const {
            baseUrl
          } = beyond;
          global.type = 'text/css';
          global.href = `${baseUrl}global.css`;
          global.rel = 'stylesheet';
          this.component.shadowRoot.appendChild(global);
        }

        mount(Widget) {
          void Widget;
        }

        unmount() {}

        render() {
          this.#body = document.createElement('span');
          this.component.shadowRoot.appendChild(this.#body);
          const {
            Widget
          } = this.bundle.package().exports.values;

          if (!Widget) {
            const message = `Widget "${this.element}" does not export a Widget class`;
            console.error(message);
            return;
          }

          this.mount(Widget);
        }

        refresh() {
          this.unmount();
          this.#body?.remove();
          this.render();
        }

        #refresh = () => this.refresh();

        initialise() {
          this.#setStyles();
          this.render();
          this.bundle.package().hmr.on('change', this.#refresh);
        }

      }

      exports.BeyondWidgetController = BeyondWidgetController;
    }
  });
  /******************************
  FILE: widgets\controller\ssr.ts
  ******************************/

  modules.set('./widgets/controller/ssr', {
    hash: 257661608,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.BeyondWidgetControllerSSR = void 0;

      var _base = require("./base");
      /*bundle*/

      /**
       * The SSR widget react controller
       */


      class BeyondWidgetControllerSSR extends _base.BeyondWidgetControllerBase {}

      exports.BeyondWidgetControllerSSR = BeyondWidgetControllerSSR;
    }
  });
  /***********************************
  FILE: widgets\instances\instances.ts
  ***********************************/

  modules.set('./widgets/instances/instances', {
    hash: 1432891200,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.instances = void 0;

      var _node = require("./node"); // To identify which element a shadow root belongs to


      const roots = new Map(); // Maintains a tree of widget instances
      // NodeWidget is an object with a tree structure (parent, children)

      const instances = new class extends Map {
        register(widget) {
          if (!widget.shadowRoot) throw new Error('Shadow root is not attached'); // Register the shadowRoot belonging to the widget that is being registered,
          // as it will be required to identify this widget as the parent of the future child widgets

          roots.set(widget.shadowRoot, widget); // The root node of the current widget is the shadowRoot of the parent widget
          // that should have been registered previously

          const root = widget.getRootNode(); // If the root node is the page document, the widget has no parent
          // If the root is not found, the widget is inside a non BeyondJS web component

          if (root === document || !roots.has(root)) {
            const node = new _node.NodeWidget(widget);
            this.set(widget, node);
            return node;
          } // Now the parent widget has been identified


          const parent = roots.get(root);
          const node = new _node.NodeWidget(widget, this.get(parent));
          this.get(parent).children.add(node);
          this.set(widget, node);
          return node;
        }

      }();
      exports.instances = instances;
    }
  });
  /******************************
  FILE: widgets\instances\node.ts
  ******************************/

  modules.set('./widgets/instances/node', {
    hash: 2505773292,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.NodeWidget = void 0;
      /*bundle*/

      class NodeWidget {
        #widget;

        get widget() {
          return this.#widget;
        }

        get is() {
          return this.#widget.is;
        }

        get route() {
          return this.#widget.route;
        }

        get layout() {
          return this.#widget.layout;
        }

        #parent;

        get parent() {
          return this.#parent;
        }

        #children;

        get children() {
          return this.#children;
        }

        constructor(widget, parent) {
          this.#widget = widget;
          this.#parent = parent;
          this.#children = new Set();
        }

      }

      exports.NodeWidget = NodeWidget;
    }
  });
  /**********************
  FILE: widgets\widget.ts
  **********************/

  modules.set('./widgets/widget', {
    hash: 359381524,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.BeyondWidget = void 0;

      var _instances = require("./instances/instances");

      const Element = typeof HTMLElement === 'undefined' ? null : HTMLElement;

      class BeyondWidget extends Element {
        #specs;

        get is() {
          return this.#specs.is;
        }

        get route() {
          return this.#specs.route;
        }

        get layout() {
          return this.#specs.layout;
        }

        #bundle;

        get bundle() {
          return this.#bundle;
        } // To identify where the widget is in the widgets tree


        #node;

        get node() {
          return this.#node;
        }

        #controller;

        get controller() {
          return this.#controller;
        }

        #error;

        get error() {
          return this.#error;
        }

        #id;

        get id() {
          return this.#id;
        }

        #loading = false;

        get loading() {
          return this.#loading;
        }

        #loaded = false;

        get loaded() {
          return this.#loaded;
        }

        #holders = new Set(['connected', 'loaded']);
        #initialise = () => {
          const {
            beyond
          } = require('../beyond');

          beyond.import(this.#id).then(bundle => {
            this.#bundle = bundle;
            this.#loading = false;
            this.#loaded = true;
            this.#holders.delete('loaded');
            this.#render();
            const event = new CustomEvent('bundle.loaded', {
              bubbles: true,
              composed: true
            });
            this.dispatchEvent(event);
          }).catch(exc => {
            console.log(`Error loading widget "${this.#id}"`, exc.stack);
            this.#error = exc.message;
            this.#loading = false;
          });
        };

        constructor(specs) {
          super();
          this.#specs = specs;
          this.attachShadow({
            mode: 'open'
          });

          const widgets = require('./widgets').widgets;

          if (!widgets.has(this.localName)) throw new Error(`Widget name "${this.localName}" is not registered`);
          this.#id = widgets.get(this.localName).id;
          this.#initialise();
        }

        #render = () => {
          // Render the widget once the connectedCallback is called and the bundle was imported
          if (this.#holders.size) return;
          const {
            Controller
          } = this.#bundle;

          if (!Controller || typeof Controller !== 'function') {
            const message = `Widget "${this.localName}" does not export its Controller`;
            console.error(message);
            this.#error = message;
            return;
          }

          this.#controller = new Controller(this.#specs, this, this.#bundle);
          this.#controller.initialise();
        };

        connectedCallback() {
          this.#holders.delete('connected'); // Register the widget in the instances registry after connectedCallback is done

          this.#node = _instances.instances.register(this);
          this.#render();
        }

      }

      exports.BeyondWidget = BeyondWidget;
    }
  });
  /***********************
  FILE: widgets\widgets.ts
  ***********************/

  modules.set('./widgets/widgets', {
    hash: 903879976,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.widgets = void 0;

      var _widget = require("./widget");

      var _instances = require("./instances/instances");
      /*bundle*/


      const widgets = new class BeyondWidgets extends Map {
        get instances() {
          return new Set(_instances.instances.values());
        }

        register(specs) {
          specs.forEach(specs => {
            const {
              name,
              id
            } = specs;

            if (this.has(name)) {
              console.warn(`Widget name "${name}" is registered both by "${id}" ` + `and "${this.get(name).id}"`);
              return;
            }

            this.set(name, specs);
            'customElements' in globalThis && customElements.define(name, class extends _widget.BeyondWidget {
              constructor() {
                super(specs);
              }

            });
          });
        }

      }();
      exports.widgets = widgets;
    }
  });
  let beyond, Bundle, BundleStyles, Module, ModuleTexts, ActionsBridge, Collection, Events, ListenerFunction, CancellationToken, SingleCall, PendingPromise, BeyondWidgetControllerBase, BeyondWidgetController, IWidgetRendered, BeyondWidgetControllerSSR, NodeWidget, WidgetSpecs, widgets;
  _exports2.widgets = widgets;
  _exports2.WidgetSpecs = WidgetSpecs;
  _exports2.NodeWidget = NodeWidget;
  _exports2.BeyondWidgetControllerSSR = BeyondWidgetControllerSSR;
  _exports2.IWidgetRendered = IWidgetRendered;
  _exports2.BeyondWidgetController = BeyondWidgetController;
  _exports2.BeyondWidgetControllerBase = BeyondWidgetControllerBase;
  _exports2.PendingPromise = PendingPromise;
  _exports2.SingleCall = SingleCall;
  _exports2.CancellationToken = CancellationToken;
  _exports2.ListenerFunction = ListenerFunction;
  _exports2.Events = Events;
  _exports2.Collection = Collection;
  _exports2.ActionsBridge = ActionsBridge;
  _exports2.ModuleTexts = ModuleTexts;
  _exports2.Module = Module;
  _exports2.BundleStyles = BundleStyles;
  _exports2.Bundle = Bundle;
  _exports2.beyond = beyond;

  __pkg.exports.process = function (require, _exports) {
    _exports2.beyond = beyond = _exports.beyond = require('./beyond').beyond;
    _exports2.Bundle = Bundle = _exports.Bundle = require('./bundles/bundle').Bundle;
    _exports2.BundleStyles = BundleStyles = _exports.BundleStyles = require('./bundles/styles/styles').BundleStyles;
    _exports2.Module = Module = _exports.Module = require('./modules/module').Module;
    _exports2.ModuleTexts = ModuleTexts = _exports.ModuleTexts = require('./modules/texts').ModuleTexts;
    _exports2.ActionsBridge = ActionsBridge = _exports.ActionsBridge = require('./service/actions-bridge').ActionsBridge;
    _exports2.Collection = Collection = _exports.Collection = require('./utils/collection/collection').Collection;
    _exports2.Events = Events = _exports.Events = require('./utils/events/events').Events;
    _exports2.ListenerFunction = ListenerFunction = _exports.ListenerFunction = require('./utils/events/types').ListenerFunction;
    _exports2.CancellationToken = CancellationToken = _exports.CancellationToken = require('./utils/execution-control/cancellation-token/cancellation-token').CancellationToken;
    _exports2.SingleCall = SingleCall = _exports.SingleCall = require('./utils/execution-control/single-call/single-call').SingleCall;
    _exports2.PendingPromise = PendingPromise = _exports.PendingPromise = require('./utils/pending-promise/pending-promise').PendingPromise;
    _exports2.BeyondWidgetControllerBase = BeyondWidgetControllerBase = _exports.BeyondWidgetControllerBase = require('./widgets/controller/base').BeyondWidgetControllerBase;
    _exports2.BeyondWidgetController = BeyondWidgetController = _exports.BeyondWidgetController = require('./widgets/controller/controller').BeyondWidgetController;
    _exports2.IWidgetRendered = IWidgetRendered = _exports.IWidgetRendered = require('./widgets/controller/ssr').IWidgetRendered;
    _exports2.BeyondWidgetControllerSSR = BeyondWidgetControllerSSR = _exports.BeyondWidgetControllerSSR = require('./widgets/controller/ssr').BeyondWidgetControllerSSR;
    _exports2.NodeWidget = NodeWidget = _exports.NodeWidget = require('./widgets/instances/node').NodeWidget;
    _exports2.WidgetSpecs = WidgetSpecs = _exports.WidgetSpecs = require('./widgets/widgets').WidgetSpecs;
    _exports2.widgets = widgets = _exports.widgets = require('./widgets/widgets').widgets;
  };

  const __bp = {};
  modules.get('./base/package').creator(() => 0, __bp);
  __pkg = new __bp.BeyondPackage(__pkg.exports);

  __pkg.initialise(modules);
});