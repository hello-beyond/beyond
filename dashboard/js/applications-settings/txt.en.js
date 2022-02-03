define([], function () {
  "use strict";

  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/applications-settings/txt', true, {
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
    "errors": {
      "noSelected": "the application selected does not has distributions",
      "ALREADY_EXISTS": "A distribution with this configuration already exists",
      "PORT_USED": "There is already a distribution with the indicated port"
    },
    "name": "Distribution name",
    "platform": {
      "applications": {
        "select": "Project"
      },
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
    "modalHeader": "Configure",
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