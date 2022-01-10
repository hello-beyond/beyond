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

  const __pkg = bundle.package('en');

  __pkg.exports.process = (require, _exports) => _exports.txt = {
    "actions": {
      "navigate": "Navigate",
      "compile": "Compile",
      "editDescription": "Edit description",
      "generatingDeclarations": "generating...",
      "publish": "Publish",
      "update": "Update dependencies",
      "declarations": "Generate declarations",
      "start": "Play",
      "stop": "Stop",
      "restart": "Restart",
      "scanAll": "Scan all",
      "scan": "Scan"
    },
    "scanner": {
      "title": "scanned modules"
    },
    "application": {
      "info": {
        "description": "Description",
        "title": "Title",
        "name": "Name",
        "empty": {
          "description": "The application does not have a description",
          "title": "Add a title",
          "name": "Add a name"
        }
      },
      "actions": {
        "save": "Save",
        "close": "Close"
      },
      "error404": "Application not found"
    },
    "modules": {
      "actions": {
        "add": "Create module",
        "navigate": "Navigate"
      },
      "empty": {
        "new": {
          "title": "Good! your project has already been created",
          "description": "All in BeyondJS is about modules. Let's create the first one."
        },
        "application": {
          "title": "There are no modules in your application yet ",
          "description": "Let's start with the first step"
        },
        "filter": {
          "title": "The project does not have modules for this type of bundle",
          "description": "Create a module"
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
      "searcher": "What are you looking for?"
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