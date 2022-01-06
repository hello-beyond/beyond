define([], function () {
  "use strict";

  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/library/view/txt', true, {
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
    "titles": {
      "libraries": "Librerias",
      "modules": "Modules",
      "routes": "routes",
      "statics": "Statics",
      "static": "Static",
      "templates": "Templates",
      "excluded": "Archivos excluidos",
      "path": "path",
      "host": "host"
    },
    "actions": {
      "navigate": "navigate",
      "compile": "compilar",
      "editDescription": "Editar Descripción",
      "filter": "Filters Bundles",
      "selectView": "Select View",
      "show": "Show Library Information"
    },
    "elements": {
      "descriptionText": "Elements",
      "count": "elementos"
    }
  };

  __pkg.initialise();
});