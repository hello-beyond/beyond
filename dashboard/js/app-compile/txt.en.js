define([], function () {
  "use strict";

  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/app-compile/txt', true, {
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
    "name": "Distribution name",
    "platform": {
      "label": "Platform",
      "options": {
        "web": "Web",
        "backend": "Backend",
        "android": "Android",
        "ios": "iOS",
        "ssr": "SSR",
        "node": "Node"
      },
      "environment": "Environment",
      "port": {
        "label": "Port",
        "error": "Port isn't available",
        "success": "Port checked and available",
        "tooltip": "Check port"
      }
    },
    "ts": "TS",
    "default": "default",
    "checkType": "Check types",
    "ssr": "SSR",
    "titleModal": "Let's add a new distribution",
    "compress": "Compress",
    "add": "Add",
    "title": "Distributions",
    "environments": {
      "dev": "Development",
      "prod": "Production"
    }
  };

  __pkg.initialise();
});