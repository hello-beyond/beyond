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
    hash: 3249674105,
    creator: function (require, exports) {
      exports.txt = {
        "form": {
          "steps": {
            "first": "Datos Generales",
            "second": "Detalles del módulo"
          },
          "name": "Nombre del modulo",
          "description": "Descripción",
          "title": "Titulo",
          "developer": "Desarrollador",
          "webcomponent": "Nombre del Web Component",
          "multilanguage": "¿Archivo de texto?",
          "server": "¿Código servidor?",
          "styles": "¿Hojas de estilo?",
          "url": "URL",
          "button": "CREAR",
          "errors": {
            "route": "Ya existe un modulo con esta ruta definida:",
            "element": "El nombre del web component debe tener dos palabras separadas por '-'"
          }
        },
        "placeholder": {
          "name": "Define un nombre con la caracteristica principal de tu modulo",
          "title": "Mi modulo con beyondJS",
          "description": "Este modulo tiene potencial",
          "developer": "Tu nombre de desarrollador",
          "webcomponent": "web-component",
          "button": "button"
        },
        "help": {
          "name": "El nombre del modulo define el nombre de la carpeta.",
          "description": "Una descripción de que hace el modulo",
          "title": "Titulo a utilizar",
          "developer": "El desarrollador es el autor, es necesario agregarlo para poder utilizarlo como dependencia en otro modulo.",
          "url": "Define un nombre para tu ruta por defecto",
          "styles": "Las hojas de estilo, por defecto se manejan con sass.",
          "webcomponent": "Es el nombre de la etiqueta HTML que se utilizará para incluirlo. Debe estar en minúsculas y con dos palabras separadas por '-'",
          "titles": {
            "text": "Definicion en el module.json para archivos de textos",
            "server": "Definicion en el module.json para backend del modulo",
            "styles": "Definicion en el module.json para hojas de estilo con sass"
          }
        },
        "title": "Creación de un nuevo módulo",
        "subtitle": "Indica que tipo de modulo desea crear",
        "additionalFeatures": "Configuración adicional",
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
          "title": "Tipo de modulo",
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
              "placeholder": "Seleccione."
            }
          }
        },
        "processors": "Procesadores"
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