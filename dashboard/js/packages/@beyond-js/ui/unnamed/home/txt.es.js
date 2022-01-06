define([], function () {
  "use strict";

  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/home/txt', true, {
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
    "title": "Beyond Components",
    "description": "Beyond ofrece una gran variedad de Componentes, los cuales permiten construir rápidamente la interfaz de usuario para su aplicación.  Estos componentes vienen incluidos para poder ser usados en cualquier momento."
  };

  __pkg.initialise();
});