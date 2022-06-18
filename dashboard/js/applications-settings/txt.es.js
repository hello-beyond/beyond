define(["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.txt = _exports.hmr = void 0;

  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/dashboard/applications-settings/txt").package('es');

  externals.register(new Map([]));
  const {
    module
  } = __pkg.bundle;
  const ims = new Map();
  /*********************
  INTERNAL MODULE: ./txt
  *********************/

  ims.set('./txt', {
    hash: 762036597,
    creator: function (require, exports) {
      exports.txt = {
        "errors": {
          "noSelected": "the application selected does not has distributions",
          "ALREADY_EXISTS": "Ya existe una distribución con esta configuración",
          "PORT_USED": "Ya existe una distribución con el puerto indicado"
        },
        "name": "Nombre",
        "platform": {
          "label": "Plataforma",
          "options": {
            "web": "Web",
            "backend": "Backend",
            "android": "Android",
            "ios": "iOS",
            "ssr": "SSR",
            "node": "Node"
          },
          "environment": "Entorno",
          "checkType": "Comprobación de tipos",
          "port": {
            "label": "Puerto",
            "error": "El puerto no está disponible",
            "success": "Puerto disponible",
            "tooltip": "Check port"
          },
          "ts": "TS",
          "default": "default",
          "ssr": "ssr",
          "titleModal": "Creememos Una nueva distribucion",
          "modalHeader": "Elige la configuracion para la distribucion",
          "compress": "Comprimir",
          "add": "Añadir",
          "title": "Distribuciones",
          "environments": {
            "dev": "Development",
            "prod": "Production"
          },
          "applications": {
            "select": "Proyecto"
          }
        }
      };
    }
  });
  __pkg.exports.descriptor = [{
    "im": "./txt",
    "from": "txt",
    "name": "txt"
  }];
  let txt; // Module exports

  _exports.txt = txt;

  __pkg.exports.process = function ({
    require,
    prop,
    value
  }) {
    (require || prop === 'txt') && (_exports.txt = txt = require ? require('./txt').txt : value);
  };

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports.hmr = hmr;

  __pkg.initialise(ims);
});