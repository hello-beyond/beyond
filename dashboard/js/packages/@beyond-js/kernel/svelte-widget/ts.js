define(["exports", "@beyond-js/kernel/core/ts"], function (_exports2, dependency_0) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.SvelteWidgetController = void 0;
  const dependencies = new Map();
  dependencies.set('@beyond-js/kernel/core/ts', dependency_0);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/kernel/svelte-widget/ts', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const modules = new Map();
  /******************
  FILE: controller.ts
  ******************/

  modules.set('./controller', {
    hash: 314379806,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.SvelteWidgetController = void 0;

      var _ts = require("@beyond-js/kernel/core/ts");
      /*bundle*/


      class SvelteWidgetController extends _ts.BeyondWidgetController {
        #styles;
        #hmrStylesChanged = styles => {
          const {
            shadowRoot
          } = this.component;
          const previous = shadowRoot.querySelectorAll(`:scope > [bundle="${styles.id}"]`)[0];
          previous && shadowRoot.removeChild(previous);
          styles.css && shadowRoot.appendChild(styles.css);
        };
        #body;

        render() {
          this.#body?.remove();
          this.#body = document.createElement('span');
          this.component.shadowRoot.appendChild(this.#body);
          const {
            Widget
          } = this.bundle.package().exports.values;

          if (!Widget) {
            const message = `Widget "${this.element}" does not export a Widget class`;
            console.error(message);
            return;
          }

          new Widget({
            target: this.#body
          });
        }

        mount() {
          this.render();
          this.bundle.dependencies.forEach(resource => {
            if (!_ts.beyond.bundles.has(resource)) return;

            const dependency = _ts.beyond.bundles.get(resource);

            const {
              styles
            } = dependency;
            if (styles.appended || !styles.css) return;
            const css = styles.css;
            this.component.shadowRoot.appendChild(css);
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

      exports.SvelteWidgetController = SvelteWidgetController;
    }
  });
  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;
  let SvelteWidgetController;
  _exports2.SvelteWidgetController = SvelteWidgetController;

  __pkg.exports.process = function (require, _exports) {
    _exports2.SvelteWidgetController = SvelteWidgetController = _exports.SvelteWidgetController = require('./controller').SvelteWidgetController;
  };

  __pkg.initialise(modules);
});