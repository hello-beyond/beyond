define([], function () {
  "use strict";

  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/workspace/components/editor/txt', true, {
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
    "tree": {
      "createFile": "Crear archivo",
      "delete": "Eliminar",
      "rename": "Renombrar"
    },
    "modal": {
      "title": "Crear elemento",
      "action": "Crear",
      "label": "Nombre",
      "errors": {
        "PROCESSOR": "¡Ups! Al parecer estas intentando crear que no es de tipo",
        "INVALID": "La estructura del nombre de archivo no es correcta",
        "PROCESSOR_NOT_FOUND": "El procesador sobre el que se está intentando trabajar, no existe."
      }
    }
  };

  __pkg.initialise();
});