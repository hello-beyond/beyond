define([], function () {
  "use strict";

  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/application/create/txt', true, {
    "txt": {
      "multilanguage": true
    }
  });
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package('es');

  __pkg.exports.process = (require, _exports) => _exports.txt = {
    "subtitle": "Indique que tipo de aplicación desea crear",
    "actions": {
      "submit": "Crear"
    },
    "form": {
      "name": "Nombre de tu aplicacion",
      "title": "Titulo de tu aplicacion",
      "description": "Descripcion",
      "port": {
        "label": "Puerto",
        "error": "El puerto agregado no esta disponible",
        "success": "Validamos el puerto y está disponible"
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
          "description": "Crea un servicio node que pueda ser consumido por aplicaciones via websocket"
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
          "description": "Contenedor de módulos cliente y servidor para ser consumidos por otras aplicaciones."
        },
        "board": {
          "title": "Plantillas Basicas",
          "description": "Plantilla básica optimizada para enfocarte en empezar a trabar en los modulos de tu SPA."
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
      "actions": {
        "submit": "Crear"
      }
    }
  };

  __pkg.initialise();
});