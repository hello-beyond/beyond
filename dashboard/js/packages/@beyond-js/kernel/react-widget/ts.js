define(["exports", "react-dom/server.js", "react", "@beyond-js/kernel/core/ts"], function (_exports2, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.ReactWidgetController = _exports2.PageReactWidgetController = void 0;
  const dependencies = new Map();
  dependencies.set('react-dom/server.js', dependency_0);
  dependencies.set('react', dependency_1);
  dependencies.set('@beyond-js/kernel/core/ts', dependency_2);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/kernel/react-widget/ts', false, {}, dependencies);
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
    hash: 770152333,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ReactWidgetController = void 0;

      var ReactDOMServer = require("react-dom/server.js");

      var React = require("react");

      var _ts = require("@beyond-js/kernel/core/ts");
      /*bundle*/


      class ReactWidgetController extends _ts.BeyondWidgetControllerSSR {
        render(props) {
          const {
            Widget
          } = this.bundle.package().exports.values;

          if (!Widget) {
            return {
              errors: [`Widget "${this.element}" does not export a Widget class`]
            };
          } // Render the widget


          let html;

          try {
            html = ReactDOMServer.renderToString(React.createElement(Widget, props));
          } catch (exc) {
            console.log(exc.stack);
            return {
              errors: [exc.message]
            };
          }

          return {
            html
          };
        }

      }

      exports.ReactWidgetController = ReactWidgetController;
    }
  });
  /************
  FILE: page.ts
  ************/

  modules.set('./page', {
    hash: 1127446281,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.PageReactWidgetController = void 0;

      var _controller = require("./controller");
      /*bundle*/


      class PageReactWidgetController extends _controller.ReactWidgetController {}

      exports.PageReactWidgetController = PageReactWidgetController;
    }
  });
  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;
  let ReactWidgetController, PageReactWidgetController;
  _exports2.PageReactWidgetController = PageReactWidgetController;
  _exports2.ReactWidgetController = ReactWidgetController;

  __pkg.exports.process = function (require, _exports) {
    _exports2.ReactWidgetController = ReactWidgetController = _exports.ReactWidgetController = require('./controller').ReactWidgetController;
    _exports2.PageReactWidgetController = PageReactWidgetController = _exports.PageReactWidgetController = require('./page').PageReactWidgetController;
  };

  __pkg.initialise(modules);
});