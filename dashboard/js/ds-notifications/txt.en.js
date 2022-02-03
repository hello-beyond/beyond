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

  const __pkg = bundle.package('en');

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
      "file": "File",
      "diagnostics": {
        "totalDependencies": "errors on dependencies"
      }
    }
  };

  __pkg.initialise();
});