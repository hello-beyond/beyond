define([], function () {
  "use strict";

  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/beyond-ui-popover/txt', true, {
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
    "title": "Trello list with BeyondJS",
    "list": {
      "placeholder": "Agrega el nombre de la tarjeta",
      "actions": {
        "card": "Agregar tarjeta",
        "save": "Guardar"
      }
    }
  };

  __pkg.initialise();
});