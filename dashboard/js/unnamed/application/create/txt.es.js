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
    "title": "Creemos tu aplicación",
    "subtitle": "Indique que tipo de aplicación desea crear",
    "form": {
      "port": {
        "label": "Puerto",
        "error": "El puerto agregado no esta disponible",
        "success": "Validamos el puerto y está disponible"
      },
      "types": {
        "empty": {
          "title": "Aplicaciones en blanco",
          "description": "Se crea una aplicación configurada y en blanco para que puedas definir lo que consideres necesario desde cero."
        },
        "basic": {
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
          "description": "Se crea una aplicación configurada y en blanco para que puedas definir lo que consideres necesario desde cero."
        }
      },
      "name": "Nombre de tu aplicacion",
      "title": "Titulo de tu aplicacion",
      "actions": {
        "submit": "Crear"
      },
      "description": "Descripcion"
    }
  };

  __pkg.initialise();
});