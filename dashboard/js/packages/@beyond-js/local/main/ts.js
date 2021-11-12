define(["exports", "@beyond-js/kernel/core/ts"], function (_exports2, dependency_0) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.services = _exports2.local = void 0;
  const dependencies = new Map();
  dependencies.set('@beyond-js/kernel/core/ts', dependency_0);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/local/main/ts', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const modules = new Map(); // FILE: application-styles.ts

  modules.set('./application-styles', {
    hash: 1572300719,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const beyond_context_1 = require("beyond_context");

      new class ApplicationStyles {
        /**
         * The application styles has changed, therefore it must be updated
         */
        #update = () => {
          document.getElementById('beyond-application-styles').setAttribute('href', `/styles.css?updated=${Date.now()}`);
        };
        #subscribe = async () => {
          const socket = await beyond_context_1.module.socket;
          socket.on('application-styles', this.#update);
        };

        constructor() {
          this.#subscribe().catch(exc => console.error(exc.stack));
        }

      }();
    }
  }); // FILE: local.ts

  modules.set('./local', {
    hash: 3536584647,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.local = void 0;

      const beyond_context_1 = require("beyond_context");

      const ts_1 = require("@beyond-js/kernel/core/ts");

      const services_1 = require("./services/services");

      class BeyondLocal extends ts_1.Events {
        #onchange = message => {
          this.trigger(`change:${message.bundle}`, message.processor);
        };

        get services() {
          return services_1.services;
        }

        #subscribe = async () => {
          const socket = await beyond_context_1.module.socket;
          socket.on('processor/change', this.#onchange);
        };

        constructor() {
          super();
          this.#subscribe().catch(exc => console.error(exc.stack));
        }

      }

      exports.local = new BeyondLocal();
    }
  }); // FILE: services\service.ts

  modules.set('./services/service', {
    hash: 624765756,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ManagedService = void 0;

      const beyond_context_1 = require("beyond_context");

      const ts_1 = require("@beyond-js/kernel/core/ts");

      class ManagedService extends ts_1.Events {
        #service;
        #id;

        constructor(service) {
          super();
          this.#service = service;
          this.#id = (service.is === 'library' ? 'library' : 'application') + `/${service.local.id}`;
        }

        #params() {
          const legacies = ['@beyond-js/local', '@beyond-js/dashboard-lib'];
          const kind = legacies.includes(this.#service.package.id) ? 'legacy' : 'backend';
          return {
            id: this.#id,
            kind
          };
        }

        #status = async () => {
          if (this.#service.package.id === '@beyond-js/local') {
            throw new Error('Cannot check the status of beyond-local, ' + 'as beyond-local is the service used to check the status of the services');
          }

          return await beyond_context_1.module.execute('libraries/status', this.#params());
        };

        get status() {
          return this.#status();
        }

        async start() {
          await beyond_context_1.module.execute('libraries/start', this.#params());
        }

        async stop() {
          await beyond_context_1.module.execute('libraries/stop', this.#params());
        }

      }

      exports.ManagedService = ManagedService;
    }
  }); // FILE: services\services.ts

  modules.set('./services/services', {
    hash: 793868436,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.services = void 0;

      const ts_1 = require("@beyond-js/kernel/core/ts");

      const service_1 = require("./service");

      exports.services = new class extends Map {
        constructor() {
          super();

          const add = service => service.connect && this.set(service.host, new service_1.ManagedService(service));

          add(ts_1.beyond.application);
          ts_1.beyond.libraries.forEach(library => add(library));
        }

      }();
    }
  });
  let local, services;
  _exports2.services = services;
  _exports2.local = local;

  __pkg.exports.process = function (require, _exports) {
    _exports2.local = local = _exports.local = require('./local').local;
    _exports2.services = services = _exports.services = require('./services/services').services;
  };

  __pkg.initialise(modules);
});