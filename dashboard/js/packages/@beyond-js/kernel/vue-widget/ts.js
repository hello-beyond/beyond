define(["exports", "@beyond-js/kernel/core/ts", "vue", "@beyond-js/kernel/routing/ts"], function (_exports2, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.VueWidgetController = _exports2.PageVueWidgetController = void 0;
  const dependencies = new Map();
  dependencies.set('@beyond-js/kernel/core/ts', dependency_0);
  dependencies.set('vue', dependency_1);
  dependencies.set('@beyond-js/kernel/routing/ts', dependency_2);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/kernel/vue-widget/ts', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const modules = new Map();
  /****************************
  INTERNAL MODULE: ./controller
  ****************************/

  modules.set('./controller', {
    hash: 2004768854,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.VueWidgetController = void 0;

      var _ts = require("@beyond-js/kernel/core/ts");

      var _vue = require("vue");
      /*bundle*/


      class VueWidgetController extends _ts.BeyondWidgetController {
        _mount(props) {
          // const hydrate = this.hydratable;
          (0, _vue.createApp)(this.Widget).mount(this.body);
        }

        mount() {
          this._mount({
            component: this.component,
            store: this.store
          });
        }

        unmount() {}

      }

      exports.VueWidgetController = VueWidgetController;
    }
  });
  /**********************
  INTERNAL MODULE: ./page
  **********************/

  modules.set('./page', {
    hash: 4256937406,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.PageVueWidgetController = void 0;

      var _ts = require("@beyond-js/kernel/routing/ts");

      var _controller = require("./controller");
      /*bundle*/


      class PageVueWidgetController extends _controller.VueWidgetController {
        #uri;

        get uri() {
          return this.#uri;
        }

        show() {}

        hide() {}

        mount() {
          this._mount({
            uri: this.uri,
            component: this.component,
            store: this.store
          });
        }

        unmount() {}

        async initialise() {
          const child = this.component.getAttribute('data-child-id');
          this.#uri = child ? _ts.routing.manager.pages.find(child).uri : void 0;
          await super.initialise();
        }

      }

      exports.PageVueWidgetController = PageVueWidgetController;
    }
  }); // Exports managed by beyond bundle objects

  __pkg.exports.managed = function (require, _exports) {
    _exports.VueWidgetController = require('./controller').VueWidgetController;
    _exports.PageVueWidgetController = require('./page').PageVueWidgetController;
  };

  let VueWidgetController, PageVueWidgetController; // Module exports

  _exports2.PageVueWidgetController = PageVueWidgetController;
  _exports2.VueWidgetController = VueWidgetController;

  __pkg.exports.process = function (require) {
    _exports2.VueWidgetController = VueWidgetController = require('./controller').VueWidgetController;
    _exports2.PageVueWidgetController = PageVueWidgetController = require('./page').PageVueWidgetController;
  };

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;

  __pkg.initialise(modules);
});