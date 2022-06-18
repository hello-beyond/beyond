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

  const __pkg = new __Bundle("@beyond-js/dashboard/ds-editor/txt").package('es');

  externals.register(new Map([]));
  const {
    module
  } = __pkg.bundle;
  const ims = new Map();
  /*********************
  INTERNAL MODULE: ./txt
  *********************/

  ims.set('./txt', {
    hash: 962902549,
    creator: function (require, exports) {
      exports.txt = {
        "tree": {
          "createFile": "Crear archivo",
          "delete": "Eliminar",
          "rename": "Renombrar"
        },
        "modal": {
          "title": "Crear elemento",
          "action": "Crear",
          "label": "Nombre",
          "errors": {
            "PROCESSOR": "¡Ups! Al parecer estas intentando crear que no es de tipo",
            "INVALID": "La estructura del nombre de archivo no es correcta",
            "PROCESSOR_NOT_FOUND": "El procesador sobre el que se está intentando trabajar, no existe."
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