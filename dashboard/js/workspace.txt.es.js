define(["exports", "@beyond-js/kernel/bundle"], function (_exports, dependency_0) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.txt = _exports.hmr = void 0;
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/dashboard/workspace",
    "multibundle": true,
    "bundle": "txt"
  }).package('es');

  ;
  externals.register(new Map([]));
  const {
    module
  } = __pkg.bundle;
  const ims = new Map();
  /*********************
  INTERNAL MODULE: ./txt
  *********************/

  ims.set('./txt', {
    hash: 3318765320,
    creator: function (require, exports) {
      exports.txt = {
        "panels": {
          "tab": {
            "actions": {
              "splitRight": "Split Right",
              "splitDown": "Split Down",
              "close": "Close",
              "closeAll": "Cerrar las otras pestañas"
            },
            "labels": {
              "apps": "Proyectos",
              "navigator": "Navegador",
              "compile": "Compilador",
              "static": "Estaticos",
              "app": "Aplicación",
              "appConfig": "Configuración",
              "module": "Modulo",
              "settings": "Preferencias"
            }
          }
        },
        "footer": {
          "path": "pathname",
          "project": "Project",
          "projectEmpty": "No projects selected"
        },
        "early": {
          "title2": "Introduzca su nombre y código de acceso para que empieces con nosotros",
          "title": "Bienvenido a BeyondJS",
          "label": "Ingresa tu código de acceso temprano",
          "action": "Empezar",
          "error": "Código invalido, verifiquelo por favor",
          "message": "BeyondJS esta siento lanzado en etapas. Actualmente estamos ofreciendo un accceso temprano a aquellos que esten interesados en probarlo y brindarnos retroalimentación. ",
          "inputs": {
            "name": "Tú nombre",
            "code": "Código"
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