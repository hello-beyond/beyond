define(["exports"], function (_exports2) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.txt = _exports2.hmr = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/ds-notifications/txt', true, {
    "txt": {
      "multilanguage": true
    }
  });
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package('es');

  const modules = new Map();
  /*********************
  INTERNAL MODULE: ./txt
  *********************/

  modules.set('./txt', {
    hash: 2301818330,
    creator: function (require, exports) {
      exports.txt = {
        "empty": "There is no items",
        "title": "Notificaciones",
        "projects": {
          "title": "Proyectos",
          "scanned": "revisados",
          "noName": "proyecto no reconodido"
        },
        "item": {
          "line": "Línea",
          "file": "Fila",
          "diagnostics": {
            "totalDependencies": "errores en dependencias"
          }
        }
      };
    }
  });
  let txt;
  _exports2.txt = txt;

  __pkg.exports.process = function (require, _exports) {
    _exports2.txt = txt = _exports.txt = require('./txt').txt;
  };

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;

  __pkg.initialise(modules);
});