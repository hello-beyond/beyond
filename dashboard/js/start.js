requirejs.config({
  baseUrl: '/',
  paths: {
  "@beyond-js/kernel": "packages/@beyond-js/kernel",
  "react": "packages/react",
  "react-dom": "packages/react-dom"
}});


define(["@beyond-js/kernel/core/ts", "@beyond-js/kernel/routing/ts"], function (dependency_0, dependency_1) {
  "use strict";

  const dependencies = new Map();
  dependencies.set('@beyond-js/kernel/core/ts', dependency_0);
  dependencies.set('@beyond-js/kernel/routing/ts', dependency_1);
  const transversal = beyond.transversals.obtain('start', '', dependencies);
  /************************
  APPLICATION CONFIGURATION
  ************************/

  (() => {
    const config = {
      "local": false,
      "environment": "production",
      "mode": "amd",
      "baseUrl": "/",
      "packages": [["socket.io", {
        "filename": "socket.io"
      }], ["react", {
        "filename": "react.production.min"
      }], ["react-dom", {
        "filename": "react-dom.production.min"
      }]]
    };
    beyond.setup(config);
    beyond.application.setup({
      "package": "@beyond-js/dashboard",
      "version": "1",
      "languages": {
        "default": "en",
        "supported": ["en", "es"]
      },
      "connect": false,
      "params": {
        "application": {
          "name": "BeyondJS - DEV",
          "id": "58ac31343331342f43ddb303",
          "key": "2c123deb9ad91f25a26fafa2a0376acf"
        },
        "auth": {
          "facebook": {
            "appId": "",
            "version": "v5.0"
          }
        },
        "cloudDomain": "beyondjs.com",
        "sandbox": {
          "tokenizationKey": "sandbox_q74w7s9t_prxg5w2dzb24dn87"
        }
      }
    });
    beyond.libraries.register([{
      "package": "@beyond-js/plm",
      "version": "1",
      "connect": false
    }, {
      "package": "@beyond-js/ui",
      "version": "1",
      "connect": false
    }, {
      "package": "@beyond-js/dashboard-lib",
      "version": "1",
      "connect": true,
      "host": "##beyond-host-namespace-[beyond-js/dashboard-lib]##"
    }, {
      "package": "@beyond-js/kernel",
      "version": "1.0"
    }, {
      "package": "@beyond-js/backend",
      "version": "1.0"
    }]);
  })();
  /*************
  BUNDLE: WIDGET
  *************/


  beyond.widgets.register([{
    "name": "beyond-layout-children",
    "id": "@beyond-js/kernel/unnamed/widgets/beyond-layout-children/widget"
  }]);
  /***********
  BUNDLE: PAGE
  ***********/

  routing.config.pages.register([{
    "route": "/indexdb",
    "bundle": "packages/@beyond-js/plm/unnamed/cache/indexeddb/tests/page/page.js",
    "vdir": false,
    "layout": "default"
  }, {
    "route": "/indexed/plm",
    "bundle": "packages/@beyond-js/plm/unnamed/cache/indexeddb/tests/plm/page.js",
    "vdir": false,
    "layout": "default"
  }, {
    "route": "/beyond/ui/alerts",
    "bundle": "packages/@beyond-js/ui/unnamed/alert/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/code",
    "bundle": "packages/@beyond-js/ui/unnamed/code/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/template",
    "bundle": "packages/@beyond-js/ui/unnamed/css-template/page/page.js",
    "vdir": false,
    "layout": "default"
  }, {
    "route": "/beyond/ui/empty",
    "bundle": "packages/@beyond-js/ui/unnamed/empty/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/form",
    "bundle": "packages/@beyond-js/ui/unnamed/form/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui",
    "bundle": "packages/@beyond-js/ui/unnamed/home/page.js",
    "vdir": true,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/icons/buttons",
    "bundle": "packages/@beyond-js/ui/unnamed/icon/pages/buttons/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/icons",
    "bundle": "packages/@beyond-js/ui/unnamed/icon/pages/icons/page.js",
    "vdir": false,
    "layout": "editor"
  }, {
    "route": "/beyond/ui/image",
    "bundle": "packages/@beyond-js/ui/unnamed/image/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/import",
    "bundle": "packages/@beyond-js/ui/unnamed/import/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/instruction",
    "bundle": "packages/@beyond-js/ui/unnamed/instruction/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/popper",
    "bundle": "packages/@beyond-js/ui/unnamed/libs/popper/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/tippy",
    "bundle": "packages/@beyond-js/ui/unnamed/libs/tippy/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/list",
    "bundle": "packages/@beyond-js/ui/unnamed/list/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/loading",
    "bundle": "packages/@beyond-js/ui/unnamed/loading/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/modals",
    "bundle": "packages/@beyond-js/ui/unnamed/modal/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/overlay",
    "bundle": "packages/@beyond-js/ui/unnamed/overlay/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/scroll",
    "bundle": "packages/@beyond-js/ui/unnamed/perfect-scrollbar/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/picture",
    "bundle": "packages/@beyond-js/ui/unnamed/picture/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/popover",
    "bundle": "packages/@beyond-js/ui/beyond-ui-popover/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/preloadText",
    "bundle": "packages/@beyond-js/ui/unnamed/preload-text/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/preload",
    "bundle": "packages/@beyond-js/ui/unnamed/preload/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/publication",
    "bundle": "packages/@beyond-js/ui/unnamed/publication/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/ripple",
    "bundle": "packages/@beyond-js/ui/unnamed/ripple/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/select",
    "bundle": "packages/@beyond-js/ui/unnamed/select/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/spinner",
    "bundle": "packages/@beyond-js/ui/unnamed/spinner/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/swiper",
    "bundle": "packages/@beyond-js/ui/unnamed/swiper/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/tabs",
    "bundle": "packages/@beyond-js/ui/unnamed/tabs/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/toast",
    "bundle": "packages/@beyond-js/ui/unnamed/toast/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/toolbar",
    "bundle": "packages/@beyond-js/ui/unnamed/toolbar/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/waves",
    "bundle": "packages/@beyond-js/ui/unnamed/waves/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/application/create",
    "bundle": "unnamed/application/create/page/page.js",
    "vdir": false,
    "layout": "dashboard"
  }, {
    "route": "/beyond/dashboard/icons",
    "bundle": "unnamed/components/core/page/page.js",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/empty",
    "bundle": "unnamed/components/empty/page.js",
    "vdir": false
  }, {
    "route": "/beyond/uploader",
    "bundle": "unnamed/components/uploader/page/page.js",
    "vdir": false,
    "layout": "dashboard"
  }, {
    "route": "/beyond-icons",
    "bundle": "unnamed/icons/page.js",
    "vdir": true,
    "layout": "dashboard"
  }, {
    "route": "/layout",
    "bundle": "unnamed/layout-test/page.js",
    "vdir": true,
    "layout": "dashboard"
  }, {
    "route": "/library/compile",
    "bundle": "unnamed/library/compile/page.js",
    "vdir": true,
    "layout": "dashboard"
  }, {
    "route": "/library/modules",
    "bundle": "unnamed/library/modules/page.js",
    "vdir": true,
    "layout": "dashboard"
  }, {
    "route": "/library",
    "bundle": "unnamed/library/view/page.js",
    "vdir": true,
    "layout": "dashboard"
  }, {
    "route": "/indexdb",
    "bundle": "unnamed/models/indexeddb/tests/page/page.js",
    "vdir": false,
    "layout": "default"
  }, {
    "route": "/indexed/plm",
    "bundle": "unnamed/models/indexeddb/tests/plm/page.js",
    "vdir": false,
    "layout": "default"
  }, {
    "route": "/services/compile",
    "bundle": "unnamed/services/compile/page.js",
    "vdir": true,
    "layout": "dashboard"
  }, {
    "route": "/",
    "bundle": "unnamed/workspace/page.js",
    "vdir": true,
    "layout": "dashboard"
  }]);
  /*************
  BUNDLE: LAYOUT
  *************/

  routing.config.layouts.register([{
    "name": "beyond-ui",
    "bundle": "packages/@beyond-js/ui/unnamed/layout/layout/layout.js"
  }, {
    "name": "dashboard",
    "bundle": "unnamed/layout/dashboard/layout.js"
  }, {
    "name": "editor",
    "bundle": "unnamed/layout/editor/layout.js"
  }]);
  const bundles = new Map();
  /*********************
  LIBRARY: dashboard-lib
  *********************/

  bundles.set('@beyond-js/dashboard-lib/start', {
    hash: 1129964304,
    specs: {},
    creator: function (transversal, bundle, __pkg) {
      const modules = new Map(); // FILE: start.ts

      modules.set('./start', {
        hash: 1365629960,
        creator: function (require, exports) {
          "use strict";

          bundle.container.io.querystring = async () => ({
            monitor: beyond.params.monitor
          });
        }
      });

      __pkg.exports.process = function (require, _exports) {};

      return modules;
    }
  });
  /************************************
  MODULE: packages/@beyond-js/ui/popper
  ************************************/

  bundles.set('@beyond-js/ui/popper/start', {
    hash: 4109790525,
    specs: {},
    creator: function (transversal, bundle, __pkg) {
      const modules = new Map(); // FILE: start.ts

      modules.set('./start', {
        hash: 2840507579,
        creator: function (require, exports) {
          "use strict";

          ((config, vendorPath) => {
            const paths = {
              '@popperjs/core': `${vendorPath}/popper.min`
            };
            config({
              paths
            });
          })(requirejs.config, `packages/@beyond-js/ui/popper/static/vendor`);
        }
      });

      __pkg.exports.process = function (require, _exports) {};

      return modules;
    }
  });
  /***********************************
  MODULE: packages/@beyond-js/ui/tippy
  ***********************************/

  bundles.set('@beyond-js/ui/tippy/start', {
    hash: 1332395753,
    specs: {},
    creator: function (transversal, bundle, __pkg) {
      const modules = new Map(); // FILE: start.ts

      modules.set('./start', {
        hash: 4247971240,
        creator: function (require, exports) {
          "use strict";

          ((config, vendorPath) => {
            const paths = {
              'tippy': `${vendorPath}/tippy.umd`
            };
            config({
              paths
            });
          })(requirejs.config, `packages/@beyond-js/ui/tippy/static/vendor`);
        }
      });

      __pkg.exports.process = function (require, _exports) {};

      return modules;
    }
  });
  /***********************************
  MODULE: packages/@beyond-js/ui/waves
  ***********************************/

  bundles.set('@beyond-js/ui/waves/start', {
    hash: 2099431977,
    specs: {},
    creator: function (transversal, bundle, __pkg) {
      const modules = new Map(); // FILE: start.ts

      modules.set('./start', {
        hash: 2501068193,
        creator: function (require, exports) {
          "use strict";

          ((config, vendorPath) => {
            const paths = {
              'waves': `${vendorPath}/waves.min`
            };
            config({
              paths
            });
          })(requirejs.config, `packages/@beyond-js/ui/waves/static/vendor`);
        }
      });

      __pkg.exports.process = function (require, _exports) {};

      return modules;
    }
  });
  /********************************
  MODULE: unnamed/application/board
  ********************************/

  bundles.set('@beyond-js/dashboard/unnamed/application/board/start', {
    hash: 2151585183,
    specs: {
      "txt": {
        "multilanguage": true
      }
    },
    creator: function (transversal, bundle, __pkg) {
      const modules = new Map(); // FILE: start.ts

      modules.set('./start', {
        hash: 1105747064,
        creator: function (require, exports) {
          "use strict"; // import {DSBoards} from 'beyond_modules/application/boards/start';

          function test() {// console.log("ESTOY EN TEARING");
          }

          test();
        }
      });

      __pkg.exports.process = function (require, _exports) {};

      return modules;
    }
  });
  /*********************
  MODULE: unnamed/boards
  *********************/

  bundles.set('@beyond-js/dashboard/unnamed/boards/start', {
    hash: 3933229423,
    specs: {},
    creator: function (transversal, bundle, __pkg) {
      const modules = new Map(); // FILE: start.ts

      modules.set('./start', {
        hash: 1508892331,
        creator: function (require, exports) {
          "use strict";

          Object.defineProperty(exports, "__esModule", {
            value: true
          });
          exports.DSBoards = void 0;

          const ts_1 = require("@beyond-js/kernel/core/ts");

          exports.DSBoards = new class extends ts_1.Events {
            #items = new Map();

            get items() {
              return this.#items;
            }

            add(identifier, specs) {
              this.items.set(identifier, specs);
              this.trigger('board.added');
            }

          }();
        }
      });

      __pkg.exports.process = function (require, _exports) {
        _exports.DSBoards = require('./start').DSBoards;
      };

      return modules;
    }
  });
  /*************
  MODULE: monaco
  *************/

  bundles.set('@beyond-js/dashboard/monaco/start', {
    hash: 2640767696,
    specs: {},
    creator: function (transversal, bundle, __pkg) {
      const modules = new Map(); // FILE: start.ts

      modules.set('./start', {
        hash: 516721164,
        creator: function (require, exports) {
          "use strict";

          Object.defineProperty(exports, "__esModule", {
            value: true
          });

          const ts_1 = require("@beyond-js/kernel/core/ts");

          (function (config) {
            const path = `monaco/static/${!ts_1.beyond.local ? 'min' : 'dev'}/vs`;
            config({
              paths: {
                vs: path
              }
            });
          })(requirejs.config);
        }
      });

      __pkg.exports.process = function (require, _exports) {};

      return modules;
    }
  });
  transversal.initialise(bundles);
  routing.setUp(
  /*routing mode is by "pathname"*/
  1);
});