define([], function () {
  "use strict";

  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/components/breadcrumb/txt', true, {
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
    "index": "Index",
    "application": "Application",
    "library": "Library",
    "module": "Module"
  };

  __pkg.initialise();
});