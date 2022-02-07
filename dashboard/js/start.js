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
    "vdir": false
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
    "vdir": false
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
    "route": "/test",
    "bundle": "unnamed/test/page.js",
    "vdir": false,
    "layout": "default"
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
    hash: 3653106571,
    specs: {},
    creator: function (transversal, bundle, __pkg) {
      const modules = new Map();
      /*************
      FILE: start.ts
      *************/

      modules.set('./start', {
        hash: 1365629960,
        creator: function (require, exports) {
          "use strict";

          bundle.container.io.querystring = async () => ({
            monitor: beyond.params.monitor
          });
        }
      });
      return modules;
    }
  });
  /************************************
  MODULE: packages/@beyond-js/ui/popper
  ************************************/

  bundles.set('@beyond-js/ui/popper/start', {
    hash: 1619635500,
    specs: {},
    creator: function (transversal, bundle, __pkg) {
      const modules = new Map();
      /*************
      FILE: start.ts
      *************/

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
      return modules;
    }
  });
  /***********************************
  MODULE: packages/@beyond-js/ui/tippy
  ***********************************/

  bundles.set('@beyond-js/ui/tippy/start', {
    hash: 3142512697,
    specs: {},
    creator: function (transversal, bundle, __pkg) {
      const modules = new Map();
      /*************
      FILE: start.ts
      *************/

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
      return modules;
    }
  });
  /***********************************
  MODULE: packages/@beyond-js/ui/waves
  ***********************************/

  bundles.set('@beyond-js/ui/waves/start', {
    hash: 3036137145,
    specs: {},
    creator: function (transversal, bundle, __pkg) {
      const modules = new Map();
      /*************
      FILE: start.ts
      *************/

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
      return modules;
    }
  });
  /***********************************************
  MODULE: packages/@beyond-js/dashboard-lib/models
  ***********************************************/

  bundles.set('@beyond-js/dashboard-lib/models/start', {
    hash: 3259047581,
    specs: {},
    creator: function (transversal, bundle, __pkg) {
      const modules = new Map();
      /*****************
      FILE: bees-logs.ts
      *****************/

      modules.set('./bees-logs', {
        hash: 3637047693,
        creator: function (require, exports) {
          "use strict";

          var _beyond_context = require("beyond_context");

          (async () => {
            const socket = await _beyond_context.bundle.container.socket;
            socket.on('bees.log', message => {
              console.log('BEE log message received:', message);
            });
          })().catch(exc => console.error(exc.stack));
        }
      });
      return modules;
    }
  });
  /*********************
  MODULE: unnamed/boards
  *********************/

  bundles.set('@beyond-js/dashboard/unnamed/boards/start', {
    hash: 378809316,
    specs: {},
    creator: function (transversal, bundle, __pkg) {
      const modules = new Map();
      /*************
      FILE: start.ts
      *************/

      modules.set('./start', {
        hash: 1508892331,
        creator: function (require, exports) {
          "use strict";

          Object.defineProperty(exports, "__esModule", {
            value: true
          });
          exports.DSBoards = void 0;

          var _ts = require("@beyond-js/kernel/core/ts");
          /*bundle*/


          const DSBoards = new class extends _ts.Events {
            #items = new Map();

            get items() {
              return this.#items;
            }

            add(identifier, specs) {
              this.items.set(identifier, specs);
              this.trigger('board.added');
            }

          }();
          exports.DSBoards = DSBoards;
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
    hash: 2622836200,
    specs: {},
    creator: function (transversal, bundle, __pkg) {
      const modules = new Map();
      /*************
      FILE: start.ts
      *************/

      modules.set('./start', {
        hash: 516721164,
        creator: function (require, exports) {
          "use strict";

          var _ts = require("@beyond-js/kernel/core/ts");

          (function (config) {
            const path = `monaco/static/${!_ts.beyond.local ? 'min' : 'dev'}/vs`;
            config({
              paths: {
                vs: path
              }
            });
          })(requirejs.config);
        }
      });
      return modules;
    }
  });
  transversal.initialise(bundles);
  routing.setUp(
  /*routing mode is by "pathname"*/
  1);
});