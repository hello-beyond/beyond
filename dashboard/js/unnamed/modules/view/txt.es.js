define([], function () {
  "use strict";

  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/modules/view/txt', true, {
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
    "title": "Titulo del modulo",
    "name": "Nombre del modulo",
    "path": "Directorio",
    "description": "Descripción",
    "empty": {
      "title": "This module does not have name, add one",
      "description": "Add a description"
    },
    "hmr": "HMR",
    "labels": {
      "consumers": "Consumidores",
      "dependencies": "Dependencias",
      "totalFiles": "Archivos totales",
      "bundles": "Bundles"
    },
    "diagnostics": {
      "title": "Errors and warnings in bundle ",
      "general": "General",
      "files": "Files",
      "overwrites": "Overwrites",
      "dependencies": "Dependencies"
    },
    "processors": {
      "alerts": "Errors and Warnings",
      "jsx": "JSX Code",
      "js": "JS / Javascript Code",
      "scss": "SCSS / Stylesheets",
      "ts": "TS / Typescript code",
      "less": "LESS / Stylesheets",
      "txt": "TXT / TEXTS"
    },
    "server": {
      "title": "Código Backend",
      "created": "Configurados correctamente",
      "empty": {
        "title": "Este módulo no posee código backend",
        "action": "Crear",
        "fetching": "Creando backend...",
        "description": "El código backend te permite integrar código node con tu modulo cliente de manera simple y eficaz por medio de WebSockets."
      }
    },
    "overwrites": {
      "title": "Overwrites",
      "created": "Configurados correctamente",
      "empty": {
        "title": "Este módulo no posee código backend",
        "action": "Crear",
        "fetching": "Configurando idiomas",
        "description": "Agrega multiples idiomas a tu módulo de manera sencilla"
      }
    }
  };

  __pkg.initialise();
});