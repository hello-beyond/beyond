define(["exports", "@beyond-js/backend/client/ts", "@beyond-js/kernel/core/ts", "socket.io-client", "@beyond-js/kernel/bundle/ts"], function (_exports, dependency_0, dependency_1, dependency_2, dependency_3) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.local = _exports.bees = void 0;

  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/local/main/ts").package();

  externals.register(new Map([["socket.io-client", dependency_2]]));
  const {
    module
  } = __pkg.bundle;
  const ims = new Map();
  /************************************
  INTERNAL MODULE: ./application-styles
  ************************************/

  ims.set('./application-styles', {
    hash: 1279319461,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/backend/client/ts");

      var _ts2 = require("@beyond-js/kernel/core/ts");

      typeof window === 'object' && new class ApplicationStyles extends _ts2.Events {
        /**
         * The application styles has changed, therefore it must be updated
         */
        #update = is => {
          const resource = is === 'application' ? 'styles' : 'global';
          document.getElementById(`beyond-${is}-styles`).setAttribute('href', `/${resource}.css?updated=${Date.now()}`);
          this.trigger(`${is}:change`);
        };
        #subscribe = async () => {
          const backend = _ts.backends.get('@beyond-js/local/legacy');

          const socket = await backend.socket;
          socket.on('application-styles', () => this.#update('application'));
          socket.on('global-styles', () => this.#update('global'));
        };

        constructor() {
          super();
          if (typeof window === 'undefined') return;
          this.#subscribe().catch(exc => console.error(exc.stack));
        }

      }();
    }
  });
  /*********************
  INTERNAL MODULE: ./bee
  *********************/

  ims.set('./bee', {
    hash: 925623868,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.BEE = void 0;

      var _beyond_context = require("beyond_context");

      var _ts = require("@beyond-js/kernel/core/ts");

      class BEE extends _ts.Events {
        #id;

        constructor(id) {
          super();
          this.#id = id;
        }

        #status = async () => {
          return await _beyond_context.module.execute('bees/status', {
            id: this.#id
          });
        };

        get status() {
          return this.#status();
        }

        async start() {
          await _beyond_context.module.execute('bees/start', {
            id: this.#id
          });
        }

        async stop() {
          await _beyond_context.module.execute('bees/stop', {
            id: this.#id
          });
        }

      }

      exports.BEE = BEE;
    }
  });
  /**********************
  INTERNAL MODULE: ./bees
  **********************/

  ims.set('./bees', {
    hash: 485698370,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.bees = void 0;

      var _bee = require("./bee");
      /*bundle*/


      const bees = new class {
        #bees = new Map();

        get(id) {
          if (this.#bees.has(id)) return this.#bees.get(id);
          const bee = new _bee.BEE(id);
          this.#bees.set(id, bee);
          return bee;
        }

      }();
      exports.bees = bees;
    }
  });
  /*********************
  INTERNAL MODULE: ./hmr
  *********************/

  ims.set('./hmr', {
    hash: 1756668102,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/kernel/core/ts");

      var _ts2 = require("@beyond-js/kernel/bundle/ts");

      var _ts3 = require("@beyond-js/backend/client/ts");

      new class {
        #changes = new Map();

        async #js(bundle, language) {
          if (!_ts2.instances.has(bundle)) return;

          const pkg = _ts2.instances.get(bundle).package(language !== '.' ? language : '');

          const change = (() => {
            !this.#changes.has(bundle) && this.#changes.set(bundle, 0);
            const change = this.#changes.get(bundle);
            this.#changes.set(bundle, change + 1);
            return change;
          })(); // Note: in AMD mode, the querystring is not allowed (it is used require.undef by the beyond.reload method)


          const url = _ts.beyond.mode === 'amd' ? `${pkg.id}.hmr` : `${pkg.id}?hmr=${change}`;

          try {
            await _ts.beyond.reload(url, change);
          } catch (exc) {
            console.log(`Error loading hmr of bundle "${pkg.bundle.id}"`, exc.stack);
          }
        }

        async #css(bundle) {
          if (typeof window !== 'object') return;
          const {
            styles
          } = await _ts.beyond.import('@beyond-js/kernel/styles/ts');
          if (!styles.has(bundle)) return;
          styles.get(bundle).change();
        }

        async #onchange({
          bundle,
          language,
          extname
        }) {
          if (extname === '.js') return await this.#js(bundle, language);
          if (extname === '.css') return await this.#css(bundle);
        }

        #subscribe = async () => {
          const backend = _ts3.backends.get('@beyond-js/local/legacy');

          const socket = await backend.socket;
          socket.on('bundle/change', message => this.#onchange(message).catch(exc => console.log(exc.stack)));
        };

        constructor() {
          this.#subscribe().catch(exc => console.error(exc.stack));
        }

      }();
    }
  });
  /***********************
  INTERNAL MODULE: ./local
  ***********************/

  ims.set('./local', {
    hash: 2561836581,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.local = void 0;

      require("./hmr");

      var _bees = require("./bees");
      /*bundle*/


      const local = new class BeyondLocal {
        get bees() {
          return _bees.bees;
        }

      }();
      exports.local = local;
    }
  });
  __pkg.exports.descriptor = [{
    "im": "./bees",
    "from": "bees",
    "name": "bees"
  }, {
    "im": "./local",
    "from": "local",
    "name": "local"
  }];
  let bees, local; // Module exports

  _exports.local = local;
  _exports.bees = bees;

  __pkg.exports.process = function ({
    require,
    prop,
    value
  }) {
    (require || prop === 'bees') && (_exports.bees = bees = require ? require('./bees').bees : value);
    (require || prop === 'local') && (_exports.local = local = require ? require('./local').local : value);
  };

  __pkg.initialise(ims);
});