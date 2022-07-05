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
    "module": "@beyond-js/dashboard/module-create",
    "multibundle": true,
    "bundle": "txt"
  }).package('en');

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
    hash: 397197191,
    creator: function (require, exports) {
      exports.txt = {
        "form": {
          "steps": {
            "first": "General data",
            "second": "Module details"
          },
          "name": "Module name",
          "description": "Description",
          "title": "Title",
          "multilanguage": "translations?",
          "webcomponent": "Web Component name",
          "server": "Server code",
          "styles": "Styles",
          "url": "URL",
          "button": "Create",
          "errors": {
            "route": "There is already a module with this defined path:",
            "element": "The web component name must have two words separated by '-'"
          }
        },
        "placeholder": {
          "name": "Define a semantic name for your module",
          "title": "My beyondJs module",
          "description": "Add a description of your module",
          "button": "button",
          "webcomponent": "web-component"
        },
        "help": {
          "name": "The module name defines the folder name and the import path.",
          "description": "A description of what the module does",
          "title": "A title to use",
          "url": "The URL to navigate to your module in the app",
          "styles": "The style sheets, by default, are handled with sass.",
          "webcomponent": "Is the name of the HTML tag which going to be used to include it. Must be in lowercase and with two words separated by '-'",
          "titles": {
            "text": "Definicion en el module.json para archivos de textos",
            "server": "Definicion en el module.json para backend del modulo",
            "styles": "Definicion en el module.json para hojas de estilo con sass"
          }
        },
        "title": "Creación de un nuevo módulo",
        "subtitle": "Indica que tipo de modulo desea crear",
        "additionalFeatures": "Additional Configuration",
        "types": {
          "bundles": {
            "title": "Modulo en blanco",
            "description": "Se crea una aplicación configurada y en blanco para que puedas definir lo que consideres necesario desde cero."
          },
          "templates": {
            "title": "Basic template",
            "description": "Elige una de las plantillas bases de los tipos de modulo para que puedas guiarte y avanzar de manera simple"
          }
        },
        "actions": {
          "changeModuleType": "Cambiar tipo de modulo"
        },
        "templates": {
          "title": "Plantilla",
          "options": [{
            "id": "page",
            "title": "Página en blanco",
            "description": "Módulo de página basico para web",
            "icon": "web"
          }, {
            "id": "server_page",
            "title": "Módulo con servicio node",
            "description": "Página con servicio y conexión webSocket implementada",
            "icon": "server"
          }, {
            "id": "mobile_login",
            "title": "Mobile login",
            "description": "Pagina con diseño login para aplicación de telefonos",
            "icon": "mobile"
          }]
        },
        "bundles": {
          "title": "Bundle type",
          "options": [{
            "id": "page",
            "title": "Página",
            "description": "Un modulo que puede ser accedigo por medio de una URL."
          }, {
            "id": "widget",
            "title": "Widget",
            "description": "Texto para widget"
          }, {
            "id": "layout",
            "title": "Layout",
            "description": "Permite definir la estructura general de varias páginas y compartir elementos en común de la aplicación"
          }, {
            "id": "code",
            "title": "Código",
            "description": "Tiene multiples funciones. Puede ser un componente react que será utilizado en múltiples páginas y modulos, o puede ser código para manejo de modelos y lógica."
          }, {
            "id": "bridge",
            "title": "Bridge",
            "description": "Texto para bridges"
          }, {
            "id": "ts",
            "title": "Typescript",
            "description": "Texto para typecript"
          }]
        },
        "page": {
          "layout": "Layout",
          "input": {
            "layout": {
              "placeholder": "Select."
            }
          }
        },
        "processors": "Processors"
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