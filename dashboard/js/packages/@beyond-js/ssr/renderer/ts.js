define(["exports", "@beyond-js/kernel/core/ts", "@beyond-js/kernel/react-widget/ts", "@beyond-js/kernel/routing/ts"], function (_exports2, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.renderer = _exports2.hmr = void 0;
  const dependencies = new Map();
  dependencies.set('@beyond-js/kernel/core/ts', dependency_0);
  dependencies.set('@beyond-js/kernel/react-widget/ts', dependency_1);
  dependencies.set('@beyond-js/kernel/routing/ts', dependency_2);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ssr/renderer/ts', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const modules = new Map();
  /****************
  FILE: renderer.ts
  ****************/

  modules.set('./renderer', {
    hash: 1056602364,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.renderer = void 0;

      var _ts = require("@beyond-js/kernel/core/ts");

      var _ts2 = require("@beyond-js/kernel/routing/ts");
      /*bundle*/


      const renderer = new class {
        async render(_uri) {
          const {
            page,
            error,
            redirected,
            uri
          } = await _ts2.routing.page(_uri);
          if (redirected) return {
            redirected
          };
          if (error) return {
            errors: [error]
          };
          const {
            element
          } = page;

          if (!_ts.beyond.widgets.has(element)) {
            return {
              errors: [`Widget element "${element}" is not registered`]
            };
          }

          const specs = _ts.beyond.widgets.get(element);

          const bundle = await _ts.beyond.import(specs.id);
          const {
            Controller
          } = bundle;

          if (!Controller || typeof Controller !== 'function') {
            return {
              errors: [`Widget "${element}" does not export its Controller`]
            };
          }

          try {
            const controller = new Controller(specs, uri);
            const {
              html,
              errors
            } = controller.render();
            return {
              html,
              errors
            };
          } catch (exc) {
            return {
              exception: exc.stack
            };
          }
        }

      }();
      exports.renderer = renderer;
    }
  });
  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;
  let renderer;
  _exports2.renderer = renderer;

  __pkg.exports.process = function (require, _exports) {
    _exports2.renderer = renderer = _exports.renderer = require('./renderer').renderer;
  };

  __pkg.initialise(modules);
});