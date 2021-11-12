define([], function () {
  "use strict";

  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/workspace/txt', true, {
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
    "panels": {
      "tab": {
        "actions": {
          "splitRight": "Split Right",
          "splitDown": "Split Down",
          "close": "Close"
        }
      }
    },
    "footer": {
      "path": "pathname",
      "project": "Project",
      "projectEmpty": "No projects selected"
    },
    "early": {
      "title2": "Introduzca su nombre y código de acceso para que empieces con nosotros",
      "title": "Bienvenido a BeyondJS",
      "label": "Ingresa tu código de acceso temprano",
      "action": "Empezar",
      "error": "Código invalido, verifiquelo por favor",
      "message": "BeyondJS esta siento lanzado en etapas. Actualmente estamos ofreciendo un accceso temprano a aquellos que esten interesados en probarlo y brindarnos retroalimentación. "
    }
  };

  __pkg.initialise();
});