define(["exports", "@beyond-js/kernel/core/ts"], function (_exports2, dependency_0) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.VueWidgetController = void 0;
  const dependencies = new Map();
  dependencies.set('@beyond-js/kernel/core/ts', dependency_0);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/kernel/vue-widget/ts', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const modules = new Map(); // FILE: controller.ts

  modules.set('./controller', {
    hash: 2301514893,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.VueWidgetController = void 0;

      const ts_1 = require("@beyond-js/kernel/core/ts");

      class VueWidgetController extends ts_1.BeyondWidgetController {
        mount(Widget) {
          // Render the widget
          Widget.$mount(this.body);
        }

      }

      exports.VueWidgetController = VueWidgetController;
    }
  });
  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;
  let VueWidgetController;
  _exports2.VueWidgetController = VueWidgetController;

  __pkg.exports.process = function (require, _exports) {
    _exports2.VueWidgetController = VueWidgetController = _exports.VueWidgetController = require('./controller').VueWidgetController;
  };

  __pkg.initialise(modules);
});