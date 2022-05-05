define(["exports"], function (_exports2) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.txt = _exports2.hmr = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/project-create/txt', true, {
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
    hash: 2661475568,
    creator: function (require, exports) {
      exports.txt = {
        "subtitle": "Indique que tipo de aplicación desea crear",
        "created": "Aplicación creada",
        "actions": {
          "submit": "Crear"
        },
        "form": {
          "scope": {
            "label": "Scope",
            "info": "El ámbito se utiliza para agrupar proyectos, sigue el estándar npm"
          },
          "name": {
            "label": "Nombre identificador",
            "info": "El nombre es el identificador de su proyecto y se utiliza para acceder a sus módulos."
          },
          "title": {
            "label": "Titulo",
            "info": "Nombre comercial para tu proyecto"
          },
          "description": {
            "label": "Descripción",
            "info": "Aquí puede explicar el propósito de su proyecto (útil si lo publicará en NPM)"
          },
          "ports": {
            "navigate": {
              "label": "Port",
              "info": "Puerto para navegar tu proyecto"
            },
            "inspect": {
              "label": "Inspect Port",
              "info": "Puerto para inspeccionar el proyecto con devtools"
            },
            "error": "Port isn't available",
            "success": "Port checked and available",
            "tooltip": "Check port"
          },
          "types": {
            "titles": {
              "empty": "Aplicaciones en blanco",
              "templates": "Templates"
            },
            "empty": {
              "title": "Aplicaciones en blanco",
              "description": "Se crea una aplicación configurada y en blanco para que puedas definir lo que consideres necesario desde cero."
            },
            "node": {
              "title": "Aplicación Node",
              "description": "Aplicación que se compilará para ejecutarse en un entorno Node.js."
            },
            "backend": {
              "title": "Backend",
              "description": "Crea un servicio node que pueda ser consumido por proyectos via websocket"
            },
            "web": {
              "title": "Web",
              "description": "Aplicación web, Android, iOS. Tanto el código de cliente como el código de backend coexisten en la misma aplicación."
            },
            "express": {
              "title": "Express template",
              "description": "Crea un servidor express de la manera mas simple posible"
            },
            "library": {
              "title": "Library",
              "description": "Contenedor de módulos cliente y servidor para ser consumidos por otras proyectos."
            },
            "board": {
              "title": "Plantillas Basicas",
              "description": "Plantilla básica optimizada para enfocarte en empezar a trabar en los modulos de tu SPA."
            },
            "web-backend": {
              "title": "Plantilla Web con Backend",
              "description": "Plantilla básica de app web con conexion backend."
            },
            "list": {
              "title": "Task App",
              "description": "Plantilla básica optimizada para enfocarte en empezar a trabar en los modulos de tu SPA."
            },
            "typescript": {
              "title": "Aplicación typescript",
              "description": "Se crea una aplicación configurada y en blanco para que puedas definir lo que consideres necesario desde cero."
            },
            "react": {
              "title": "Aplicación react",
              "description": "Aplicación básica configurada para crear módulos con React"
            },
            "svelte": {
              "title": "Aplicación Svelte",
              "description": "Se crea una aplicación configurada y en blanco para que puedas definir lo que consideres necesario desde cero."
            },
            "vue": {
              "title": "Aplicación Vue",
              "description": "Se crea una aplicación configurada y en blanco para que puedas definir lo que consideres necesario desde cero."
            }
          },
          "npm": "¿Instalar las dependencias por defecto del proyecto?",
          "actions": {
            "submit": "Crear"
          }
        },
        "errors": {
          "title": "Ha ocurrido un error",
          "APP_EXISTS": "Ya existe una carpeta con ese nombre en su directorio"
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