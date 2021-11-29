define([], function () {
  "use strict";

  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/settings/txt', true, {
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
    "title": "Editor",
    "controls": {
      "theme": {
        "label": "Theme"
      },
      "fontSize": {
        "label": "Font size",
        "placeholder": "12"
      },
      "wordWrap": {
        "label": "Wordwrap"
      }
    },
    "tabs": {
      "general": "General",
      "apps": "Applications"
    },
    "distribution": {
      "name": "Nombre",
      "platform": "Plataforma",
      "environment": "Ambiente",
      "port": "Puerto",
      "ts": "TS",
      "default": "default",
      "ssr": "ssr",
      "titleModal": "Creememos Una nueva distribucion",
      "modalHeader": "Elige la configuracion para la distribucion",
      "compress": "Comprimir",
      "add": "Añadir",
      "title": "Distribuciones"
    },
    "actions": {
      "save": "Save"
    },
    "applications": {
      "select": "Applicacion"
    }
  };

  __pkg.initialise();
});