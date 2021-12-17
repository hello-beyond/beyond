define(["exports", "@beyond-js/kernel/core/ts", "@beyond-js/kernel/routing/ts"], function (_exports2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.Widget = _exports2.Controller = void 0;
  const dependencies = new Map();
  dependencies.set('@beyond-js/kernel/core/ts', dependency_0);
  dependencies.set('@beyond-js/kernel/routing/ts', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/kernel/unnamed/widgets/beyond-layout-children/widget', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const modules = new Map(); // FILE: controller.ts

  modules.set('./controller', {
    hash: 158981409,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Controller = void 0;

      const ts_1 = require("@beyond-js/kernel/core/ts");

      const ts_2 = require("@beyond-js/kernel/routing/ts");

      class Controller extends ts_1.BeyondWidgetController {
        #layout;
        #active;
        #mounted = new Map(); // Identify the layout of the current widget

        #identify = () => {
          // Construct the ascending layouts of the current widget
          let iterate = this.node;
          const layouts = [];

          while (iterate?.parent) {
            const {
              parent
            } = iterate;
            parent.is === 'layout' && layouts.unshift(parent);
            iterate = parent;
          }

          if (!layouts.length || layouts[0].widget.localName === ts_1.beyond.application.layout) {
            this.#layout = ts_2.routing.manager.main;
          }
        }; // Render the layouts and pages of this container

        render = () => this.#layout.children.forEach(child => {
          // Create the HTMLElement of the child if it was not already created
          if (!this.#mounted.has(child.id)) {
            const element = document.createElement(child.element);
            element.setAttribute('data-child-id', child.id);
            this.component.shadowRoot.append(element);
            this.#mounted.set(child.id, element);
          }

          const element = this.#mounted.get(child.id);
          const page = element; // The show and hide methods are defined in the page controller

          if (child.active && element !== this.#active) {
            this.#active = element;

            const show = () => {
              page.removeEventListener('bundle.loaded', show);
              this.#active === element && page.controller.show?.();
            };

            page.controller ? page.controller.show?.() : page.addEventListener('bundle.loaded', show);
          } else if (!element.hidden && !child.active) {
            page.controller?.hide?.();
          }

          element.hidden = !child.active;
        });
        #initialised = false;

        initialise() {
          if (this.#initialised) throw new Error('Already initialised');
          this.#initialised = true;
          this.#identify();
          this.#layout.on('change', this.render);
          this.render();
        }

      }

      exports.Controller = Controller;
    }
  }); // FILE: widget.ts

  modules.set('./widget', {
    hash: 2746090060,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Widget = void 0;

      class Widget {}

      exports.Widget = Widget;
    }
  });
  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;
  let Controller, Widget;
  _exports2.Widget = Widget;
  _exports2.Controller = Controller;

  __pkg.exports.process = function (require, _exports) {
    _exports2.Controller = Controller = _exports.Controller = require('./controller').Controller;
    _exports2.Widget = Widget = _exports.Widget = require('./widget').Widget;
  };

  __pkg.initialise(modules);
});