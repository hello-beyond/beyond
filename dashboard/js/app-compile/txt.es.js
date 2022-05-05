define(["exports"], function (_exports2) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.txt = _exports2.hmr = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/app-compile/txt', true, {
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
    hash: 348666820,
    creator: function (require, exports) {
      exports.txt = {
        "title": "Compilación",
        "start": {
          "title": "Selecciona una distribución"
        },
        "actions": {
          "compile": "Compilar",
          "addDistribution": "Agregar distribución",
          "new": "Nueva compilación",
          "add": "Agregar distribución"
        },
        "log": {
          "title": "Estado de la compilación",
          "errorLog": "Resumen de errores obtenidos en el proceso de compilación"
        },
        "finished": {
          "error": "Compilacion generada con errores",
          "success": "Compilación generada exitosamente",
          "directory": "Directorio de ubicación"
        },
        "name": "Distribution name",
        "platform": {
          "label": "Platform",
          "options": {
            "web": "Web",
            "backend": "Backend",
            "android": "Android",
            "ios": "iOS",
            "ssr": "SSR",
            "node": "Node"
          },
          "environment": "Environment",
          "port": {
            "label": "Port",
            "error": "Port isn't available",
            "success": "Port checked and available",
            "tooltip": "Check port"
          }
        },
        "ts": "TS",
        "default": "default",
        "checkType": "Check types",
        "ssr": "SSR",
        "titleModal": "Let's add a new distribution",
        "compress": "Compress",
        "add": "Add",
        "environments": {
          "dev": "Development",
          "prod": "Production"
        }
      };
    }
  }); // Exports managed by beyond bundle objects

  __pkg.exports.managed = function (require, _exports) {
    _exports.txt = require('./txt').txt;
  };

  let txt; // Module exports

  _exports2.txt = txt;

  __pkg.exports.process = function (require) {
    _exports2.txt = txt = require('./txt').txt;
  };

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;

  __pkg.initialise(modules);
});