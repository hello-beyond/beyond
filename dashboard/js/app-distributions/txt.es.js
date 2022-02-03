define([], function () {
  "use strict";

  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/app-distributions/txt', true, {
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
    "errors": {
      "noSelected": "the application selected does not has distributions",
      "ALREADY_EXISTS": "Ya existe una distribución con esta configuración",
      "PORT_USED": "Ya existe una distribución con el puerto indicado"
    },
    "name": "Nombre",
    "platform": {
      "label": "Plataforma",
      "options": {
        "web": "Web",
        "backend": "Backend",
        "android": "Android",
        "ios": "iOS",
        "ssr": "SSR",
        "node": "Node"
      },
      "environment": "Entorno",
      "checkType": "Comprobación de tipos",
      "port": {
        "label": "Puerto",
        "error": "El puerto no está disponible",
        "success": "Puerto disponible",
        "tooltip": "Check port"
      },
      "ts": "TS",
      "default": "default",
      "ssr": "ssr",
      "titleModal": "Creememos Una nueva distribucion",
      "modalHeader": "Elige la configuracion para la distribucion",
      "compress": "Comprimir",
      "add": "Añadir",
      "title": "Distribuciones",
      "environments": {
        "dev": "Development",
        "prod": "Production"
      },
      "applications": {
        "select": "Proyecto"
      }
    }
  };

  __pkg.initialise();
});