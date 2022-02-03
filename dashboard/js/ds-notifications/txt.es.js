define([], function () {
  "use strict";

  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/ds-notifications/txt', true, {
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
    "empty": "There is no items",
    "title": "Notificaciones",
    "projects": {
      "title": "Proyectos",
      "scanned": "revisados",
      "noName": "proyecto no reconodido"
    },
    "item": {
      "line": "Línea",
      "file": "Fila",
      "diagnostics": {
        "totalDependencies": "errores en dependencias"
      }
    }
  };

  __pkg.initialise();
});