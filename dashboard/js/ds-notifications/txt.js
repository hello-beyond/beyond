define([], function () {
  "use strict";

  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/ds-notifications/txt', false, {
    "txt": {
      "multilanguage": false
    }
  });
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  __pkg.exports.process = (require, _exports) => _exports.txt = {
    "empty": "There is no items",
    "title": "Notifications",
    "projects": {
      "title": "Projects",
      "scanned": "scanned",
      "noName": "unknown project"
    },
    "item": {
      "line": "Line",
      "file": "File"
    }
  };

  __pkg.initialise();
});