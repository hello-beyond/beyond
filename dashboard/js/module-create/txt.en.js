define(["exports"], function (_exports2) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.txt = _exports2.hmr = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/module-create/txt', true, {
    "txt": {
      "multilanguage": true
    }
  });
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package('en');

  const modules = new Map();
  /*********************
  INTERNAL MODULE: ./txt
  *********************/

  modules.set('./txt', {
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
        "title": "Creaci??n de un nuevo m??dulo",
        "subtitle": "Indica que tipo de modulo desea crear",
        "additionalFeatures": "Additional Configuration",
        "types": {
          "bundles": {
            "title": "Modulo en blanco",
            "description": "Se crea una aplicaci??n configurada y en blanco para que puedas definir lo que consideres necesario desde cero."
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
            "title": "P??gina en blanco",
            "description": "M??dulo de p??gina basico para web",
            "icon": "web"
          }, {
            "id": "server_page",
            "title": "M??dulo con servicio node",
            "description": "P??gina con servicio y conexi??n webSocket implementada",
            "icon": "server"
          }, {
            "id": "mobile_login",
            "title": "Mobile login",
            "description": "Pagina con dise??o login para aplicaci??n de telefonos",
            "icon": "mobile"
          }]
        },
        "bundles": {
          "title": "Bundle type",
          "options": [{
            "id": "page",
            "title": "P??gina",
            "description": "Un modulo que puede ser accedigo por medio de una URL."
          }, {
            "id": "widget",
            "title": "Widget",
            "description": "Texto para widget"
          }, {
            "id": "layout",
            "title": "Layout",
            "description": "Permite definir la estructura general de varias p??ginas y compartir elementos en com??n de la aplicaci??n"
          }, {
            "id": "code",
            "title": "C??digo",
            "description": "Tiene multiples funciones. Puede ser un componente react que ser?? utilizado en m??ltiples p??ginas y modulos, o puede ser c??digo para manejo de modelos y l??gica."
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