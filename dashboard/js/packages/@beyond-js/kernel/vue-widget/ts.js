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
    hash: 3618066497,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.VueWidgetController = void 0;

      const ts_1 = require("@beyond-js/kernel/core/ts");

      class VueWidgetController extends ts_1.BeyondWidgetController {
        #styles;
        #hmrStylesChanged = styles => {
          const {
            shadowRoot
          } = this.component;
          const previous = shadowRoot.querySelectorAll(`:scope > [bundle="${styles.id}"]`)[0];
          previous && shadowRoot.removeChild(previous);
          styles.css && shadowRoot.appendChild(styles.css);
        };

        render() {}

        mount() {
          this.render();
          this.bundle.dependencies.forEach(resource => {
            if (!ts_1.beyond.bundles.has(resource)) return;
            const dependency = ts_1.beyond.bundles.get(resource);
            const {
              styles
            } = dependency;
            if (styles.dom || !styles.css) return;
            this.component.shadowRoot.appendChild(styles.css);
            styles.on('change', this.#hmrStylesChanged);
          }); // Append styles and setup styles HMR

          this.#styles = this.bundle.styles;
          const {
            css
          } = this.#styles;
          css && this.component.shadowRoot.appendChild(css);
          this.#styles.on('change', this.#hmrStylesChanged);
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