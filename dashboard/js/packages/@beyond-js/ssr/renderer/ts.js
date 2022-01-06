define(["exports", "@beyond-js/kernel/core/ts", "@beyond-js/kernel/routing/ts"], function (_exports2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.ssr = _exports2.hmr = void 0;
  const dependencies = new Map();
  dependencies.set('@beyond-js/kernel/core/ts', dependency_0);
  dependencies.set('@beyond-js/kernel/routing/ts', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ssr/renderer/ts', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const modules = new Map(); // FILE: renderer.ts

  modules.set('./renderer', {
    hash: 3879896924,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ssr = void 0;

      const ts_1 = require("@beyond-js/kernel/core/ts");

      const ts_2 = require("@beyond-js/kernel/routing/ts");

      exports.ssr = new class {
        async render(uri) {
          const {
            page,
            error
          } = await ts_2.routing.page(uri);
          if (error) return {
            errors: [error]
          };
          const {
            name
          } = page;

          if (!ts_1.beyond.widgets.has(name)) {
            return {
              errors: [`Widget name "${name}" is not registered`]
            };
          }

          const specs = ts_1.beyond.widgets.get(name);
          const bundle = await ts_1.beyond.import(specs.id);
          const {
            Controller
          } = bundle;

          if (!Controller || typeof Controller !== 'function') {
            return {
              errors: [`Widget "${name}" does not export its Controller`]
            };
          }

          try {
            const controller = new Controller(specs, this, bundle);
            const {
              html,
              css,
              errors
            } = controller.render();
            return {
              html,
              css,
              errors
            };
          } catch (exc) {
            return {
              exception: exc.stack
            };
          }
        }

      }();
    }
  });
  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;
  let ssr;
  _exports2.ssr = ssr;

  __pkg.exports.process = function (require, _exports) {
    _exports2.ssr = ssr = _exports.ssr = require('./renderer').ssr;
  };

  __pkg.initialise(modules);
});