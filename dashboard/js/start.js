define(["@beyond-js/kernel/bundle", "@beyond-js/kernel/transversals", "@beyond-js/kernel/core", "@beyond-js/kernel/routing", "@beyond-js/widgets/render", "@beyond-js/backend/client"], function (dependency_0, dependency_1, dependency_2, dependency_3, dependency_4, dependency_5) {
  "use strict";

  const {
    Transversal
  } = require('@beyond-js/kernel/transversals');

  const transversal = new Transversal('start', '');
  /***********
  BUNDLE: PAGE
  ***********/

  routing.config.pages.register([{
    "route": "/indexdb",
    "bundle": "@beyond-js/plm/unnamed/cache/indexeddb/tests/page",
    "vdir": false,
    "layout": "default"
  }, {
    "route": "/indexed/plm",
    "bundle": "@beyond-js/plm/unnamed/cache/indexeddb/tests/plm",
    "vdir": false,
    "layout": "default"
  }, {
    "route": "/beyond/ui/alerts",
    "bundle": "@beyond-js/ui/unnamed/alert/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/code",
    "bundle": "@beyond-js/ui/unnamed/code/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/template",
    "bundle": "@beyond-js/ui/unnamed/css-template/page",
    "vdir": false,
    "layout": "default"
  }, {
    "route": "/beyond/ui/empty",
    "bundle": "@beyond-js/ui/unnamed/empty/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/form",
    "bundle": "@beyond-js/ui/unnamed/form/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui",
    "bundle": "@beyond-js/ui/unnamed/home.page",
    "vdir": true,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/icons/buttons",
    "bundle": "@beyond-js/ui/unnamed/icon/pages/buttons",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/icons",
    "bundle": "@beyond-js/ui/unnamed/icon/pages/icons",
    "vdir": false,
    "layout": "editor"
  }, {
    "route": "/beyond/ui/image",
    "bundle": "@beyond-js/ui/unnamed/image/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/import",
    "bundle": "@beyond-js/ui/unnamed/import/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/instruction",
    "bundle": "@beyond-js/ui/unnamed/instruction/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/popper",
    "bundle": "@beyond-js/ui/unnamed/libs/popper/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/tippy",
    "bundle": "@beyond-js/ui/unnamed/libs/tippy/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/list",
    "bundle": "@beyond-js/ui/unnamed/list/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/loading",
    "bundle": "@beyond-js/ui/unnamed/loading/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/modals",
    "bundle": "@beyond-js/ui/unnamed/modal/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/overlay",
    "bundle": "@beyond-js/ui/unnamed/overlay/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/scroll",
    "bundle": "@beyond-js/ui/unnamed/perfect-scrollbar/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/picture",
    "bundle": "@beyond-js/ui/unnamed/picture/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/popover",
    "bundle": "@beyond-js/ui/beyond-ui-popover.page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/preloadText",
    "bundle": "@beyond-js/ui/unnamed/preload-text/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/preload",
    "bundle": "@beyond-js/ui/unnamed/preload/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/publication",
    "bundle": "@beyond-js/ui/unnamed/publication/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/ripple",
    "bundle": "@beyond-js/ui/unnamed/ripple/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/select",
    "bundle": "@beyond-js/ui/unnamed/select/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/spinner",
    "bundle": "@beyond-js/ui/unnamed/spinner/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/swiper",
    "bundle": "@beyond-js/ui/unnamed/swiper/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/tabs",
    "bundle": "@beyond-js/ui/unnamed/tabs/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/toast",
    "bundle": "@beyond-js/ui/unnamed/toast/page",
    "vdir": false
  }, {
    "route": "/beyond/ui/toolbar",
    "bundle": "@beyond-js/ui/unnamed/toolbar/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/waves",
    "bundle": "@beyond-js/ui/unnamed/waves/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/dashboard/icons",
    "bundle": "@beyond-js/dashboard/unnamed/components/core/page",
    "vdir": false
  }, {
    "route": "/empty",
    "bundle": "@beyond-js/dashboard/unnamed/components/empty",
    "vdir": false
  }, {
    "route": "/beyond/uploader",
    "bundle": "@beyond-js/dashboard/unnamed/components/uploader/page",
    "vdir": false,
    "layout": "dashboard"
  }, {
    "route": "/library/compile",
    "bundle": "@beyond-js/dashboard/unnamed/library/compile",
    "vdir": true,
    "layout": "dashboard"
  }, {
    "route": "/library/modules",
    "bundle": "@beyond-js/dashboard/unnamed/library/modules",
    "vdir": true,
    "layout": "dashboard"
  }, {
    "route": "/library",
    "bundle": "@beyond-js/dashboard/unnamed/library/view.page",
    "vdir": true,
    "layout": "dashboard"
  }, {
    "route": "/indexdb",
    "bundle": "@beyond-js/dashboard/unnamed/models/indexeddb/tests/page",
    "vdir": false,
    "layout": "default"
  }, {
    "route": "/indexed/plm",
    "bundle": "@beyond-js/dashboard/unnamed/models/indexeddb/tests/plm",
    "vdir": false,
    "layout": "default"
  }, {
    "route": "/application/create",
    "bundle": "@beyond-js/dashboard/unnamed/project/create/page",
    "vdir": false,
    "layout": "dashboard"
  }, {
    "route": "/test",
    "bundle": "@beyond-js/dashboard/unnamed/test",
    "vdir": false,
    "layout": "default"
  }, {
    "route": "/",
    "bundle": "@beyond-js/dashboard/workspace.page",
    "vdir": true,
    "layout": "dashboard"
  }]);
  /*************
  BUNDLE: LAYOUT
  *************/

  routing.config.layouts.register([{
    "name": "beyond-ui",
    "bundle": "@beyond-js/ui/layout-main"
  }, {
    "name": "dashboard",
    "bundle": "@beyond-js/dashboard/unnamed/layout/dashboard"
  }, {
    "name": "editor",
    "bundle": "@beyond-js/dashboard/unnamed/layout/editor"
  }]);
  const bundles = new Map();
  /************************************
  MODULE: packages/@beyond-js/ui/popper
  ************************************/

  bundles.set({
    "module": "@beyond-js/ui/popper",
    "bundle": "start"
  }, function (ims, exports) {
    /***********************
    INTERNAL MODULE: ./start
    ***********************/
    ims.set('./start', {
      hash: 2470748061,
      creator: function (require, exports) {
        "use strict";

        var _core = require("@beyond-js/kernel/core");

        ((config, vendorPath) => {
          const paths = {
            '@popperjs/core': `${_core.beyond.baseUrl}/${vendorPath}/popper.min`
          };
          config({
            paths
          });
        })(requirejs.config, `packages/@beyond-js/ui/popper/vendor`);
      }
    });
  });
  /***********************************
  MODULE: packages/@beyond-js/ui/tippy
  ***********************************/

  bundles.set({
    "module": "@beyond-js/ui/tippy",
    "multibundle": true,
    "bundle": "start"
  }, function (ims, exports) {
    /***********************
    INTERNAL MODULE: ./start
    ***********************/
    ims.set('./start', {
      hash: 1327198957,
      creator: function (require, exports) {
        "use strict";

        var _core = require("@beyond-js/kernel/core");

        ((config, vendorPath) => {
          const paths = {
            'tippy': `${_core.beyond.baseUrl}/${vendorPath}/tippy.umd`
          };
          config({
            paths
          });
        })(requirejs.config, `packages/@beyond-js/ui/tippy/vendor`);
      }
    });
  });
  /***********************************
  MODULE: packages/@beyond-js/ui/waves
  ***********************************/

  bundles.set({
    "module": "@beyond-js/ui/waves",
    "bundle": "start"
  }, function (ims, exports) {
    /***********************
    INTERNAL MODULE: ./start
    ***********************/
    ims.set('./start', {
      hash: 1898716482,
      creator: function (require, exports) {
        "use strict";

        var _core = require("@beyond-js/kernel/core");

        ((config, vendorPath) => {
          const paths = {
            'waves': `${_core.beyond.baseUrl}/${vendorPath}/waves.min`
          };
          config({
            paths
          });
        })(requirejs.config, `packages/@beyond-js/ui/waves/vendor`);
      }
    });
  });
  /***********************************************
  MODULE: packages/@beyond-js/dashboard-lib/models
  ***********************************************/

  bundles.set({
    "module": "@beyond-js/dashboard-lib/models",
    "multibundle": true,
    "bundle": "start"
  }, function (ims, exports) {
    /***************************
    INTERNAL MODULE: ./bees-logs
    ***************************/
    ims.set('./bees-logs', {
      hash: 3179367567,
      creator: function (require, exports) {
        "use strict";

        var _client = require("@beyond-js/backend/client");

        (async () => {
          const socket = await _client.backends.get('@beyond-js/dashboard-lib/legacy').socket;
          socket.on('bees.log', message => {
            console.log('BEE log message received:', message);
          });
        })().catch(exc => console.error(exc.stack));
      }
    });
  });
  /*************
  MODULE: boards
  *************/

  bundles.set({
    "module": "@beyond-js/dashboard/boards",
    "bundle": "start"
  }, function (ims, exports) {
    /***********************
    INTERNAL MODULE: ./start
    ***********************/
    ims.set('./start', {
      hash: 3864758461,
      creator: function (require, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.DSBoards = void 0;

        var _core = require("@beyond-js/kernel/core");
        /*bundle*/


        const DSBoards = new class extends _core.Events {
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
    exports.descriptor = [{
      "im": "./start",
      "from": "DSBoards",
      "name": "DSBoards"
    }];
  });
  /*************
  MODULE: monaco
  *************/

  bundles.set({
    "module": "@beyond-js/dashboard/monaco",
    "bundle": "start"
  }, function (ims, exports) {
    /***********************
    INTERNAL MODULE: ./start
    ***********************/
    ims.set('./start', {
      hash: 1725469985,
      creator: function (require, exports) {
        "use strict";

        var _core = require("@beyond-js/kernel/core");

        (function (config) {
          const path = `${_core.beyond.baseUrl}/monaco/${!_core.beyond.local ? 'min' : 'dev'}/vs`;
          config({
            paths: {
              vs: path
            }
          });
        })(requirejs.config);
      }
    });
  });
  transversal.initialise(bundles);
  routing.setup(1);
});