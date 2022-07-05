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
    "module": "@beyond-js/dashboard/projects-board",
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
    hash: 2224261874,
    creator: function (require, exports) {
      exports.txt = {
        "empty": {
          "title": "Bienvenido a BeyondJS",
          "subtitle": "Crea tu primera aplicación",
          "info": "¿Que es esto?"
        },
        "header": {
          "title": "Proyectos",
          "projectsTitle": "Proyectos",
          "applications": "Proyectos",
          "elements": "Elementos",
          "titleHeader": "El nombre del proyecto va aquí",
          "showApps": "Información del proyecto",
          "filtersTitle": "Filtro",
          "selectView": "Vista",
          "welcome": "Bienvenido:",
          "logIn": "Inicio de sesion:"
        },
        "application": {
          "description": "No posee descripcion"
        },
        "actions": {
          "play": "Arrancar",
          "stop": "Detener",
          "restart": "Reiniciar",
          "details": "Detaalles",
          "compile": "Compilar",
          "publish": "Publicar",
          "create": "Crear proyecto",
          "download": "Descargar"
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