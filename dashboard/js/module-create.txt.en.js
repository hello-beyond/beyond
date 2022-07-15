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
    hash: 102144276,
    creator: function (require, exports) {
      exports.txt = {
        "title": "Create a new module",
        "subtitle": "What kind of module do you need?",
        "additionalFeatures": "Additional Configuration",
        "types": {
          "bundles": {
            "title": "Blank module",
            "description": "Empty module to start from nothing."
          },
          "templates": {
            "title": "Basic template",
            "description": "Choose one of the base templates of the module types so that you can guide yourself and advance in a simple way"
          }
        },
        "actions": {
          "changeModuleType": "Change module type"
        },
        "templates": {
          "title": "Template",
          "options": [{
            "id": "page",
            "title": "Blank page",
            "description": "Blank page for web projects",
            "icon": "web"
          }, {
            "id": "server_page",
            "title": "Module with node service",
            "description": "Page with service and WebSocket connection implemented",
            "icon": "server"
          }, {
            "id": "mobile_login",
            "title": "Mobile login",
            "description": "Basic design for mobile projects",
            "icon": "mobile"
          }]
        },
        "bundles": {
          "title": "Bundle type",
          "options": [{
            "id": "page",
            "title": "Página",
            "description": "A module that can be accessed via a URL"
          }, {
            "id": "widget",
            "title": "Widget",
            "description": "Exports a web component that allows working under micro-frontends or Islands architectures."
          }, {
            "id": "layout",
            "title": "Layout",
            "description": "Permite definir la estructura general de varias páginas y compartir elementos en común de la aplicación"
          }, {
            "id": "code",
            "title": "Code",
            "description": "Multipurpose. You can be a logic module or with a graphical interface."
          }, {
            "id": "bridge",
            "title": "Bridge",
            "description": "Modules that allow to integrate backend logic with the client through websockets automatically"
          }, {
            "id": "ts",
            "title": "Typescript",
            "description": "Ideal for implementing any type of logic that only requires typescript code and no other processors."
          }, {
            "id": "ts",
            "title": "Start",
            "description": "They allow you to add logic that must be executed at the beginning of the application."
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
        "processors": "Processors",
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