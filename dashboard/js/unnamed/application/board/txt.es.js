define([], function () {
  "use strict";

  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/application/board/txt', true, {
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
    "actions": {
      "navigate": "Navegar",
      "compile": "Compilar",
      "editDescription": "Edit description",
      "generatingDeclarations": "Generando...",
      "publish": "Publish",
      "update": "Update dependencies",
      "declarations": "Generar declaraciones",
      "start": "Play",
      "stop": "Stop",
      "restart": "Restart",
      "scanAll": "Scan all",
      "scan": "Scan"
    },
    "scanner": {
      "title": "modulos analizados"
    },
    "application": {
      "info": {
        "description": "Descripción",
        "title": "Titulo",
        "name": "Nombre",
        "empty": {
          "description": "La aplicación no posee descripción",
          "title": "Agrega un titulo para tu aplicación",
          "name": "Agrega un nombre para tu aplicación"
        }
      },
      "actions": {
        "save": "Guardar",
        "close": "Cerrar"
      },
      "error404": "Application not found"
    },
    "modules": {
      "actions": {
        "add": "Crear modulo",
        "navigate": "Navegar"
      },
      "empty": {
        "new": {
          "title": "¡Excelente! Ya creamos tu aplicación",
          "description": "En <b class=\"primary-color\">BeyondJS</b> todo se maneja con modulos. Avancemos creando el primero."
        },
        "application": {
          "title": "Aun no existen módulos en tu aplicación",
          "description": "Demos el primer paso"
        },
        "filter": {
          "title": "No posees módulos para este tipo bundle",
          "description": "Crea el primero"
        }
      }
    },
    "compilation": "Compilación",
    "transpilation": "Transpilación",
    "alerts": {
      "title": "Alertas y warnings de la aplicación",
      "subtitle": "Resumen"
    },
    "header": {
      "searcher": "¿Que buscas?"
    },
    "titles": {
      "modules": "Modules",
      "pages": "Pages",
      "routes": "routes",
      "statics": "Statics",
      "static": "Static",
      "templates": "Templates",
      "excluded": "Excluided files",
      "path": "path",
      "host": "host",
      "errors": "Errors:",
      "warnings": "Warnings:"
    },
    "navigate": "Navegar",
    "items": {
      "title": "Add new title",
      "description": "Module description",
      "icon": "pen",
      "btnDetails": "Details",
      "btnEdit": "Edit",
      "update": "Update dependencies"
    },
    "search": "Search",
    "empty": {
      "primary": "We are just beginning",
      "secondary": "click and create your first module"
    },
    "info": {
      "route": "URL"
    },
    "processors": {
      "alerts": "Errors and Warnings",
      "jsx": "JSX Code",
      "js": "JS / Javascript Code",
      "scss": "SCSS / Stylesheets",
      "ts": "TS / Typescript code",
      "less": "LESS / Stylesheets",
      "txt": "TXT / TEXTS"
    }
  };

  __pkg.initialise();
});