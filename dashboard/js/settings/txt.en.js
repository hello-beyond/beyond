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

  const __pkg = bundle.package('en');

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
      "name": "NAme",
      "platform": "Platform",
      "environment": "Environment",
      "port": "Port",
      "ts": "TS",
      "default": "default",
      "ssr": "SSR",
      "titleModal": "Let's add a new distribution",
      "modalHeader": "Configure",
      "compress": "Compress",
      "add": "Add",
      "title": "Distributions"
    },
    "actions": {
      "save": "Save"
    },
    "applications": {
      "select": "Application"
    }
  };

  __pkg.initialise();
});