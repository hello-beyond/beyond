define([], function () {
  "use strict";

  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/applications/txt', false, {
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
    "empty": {
      "title": "Bienvenido a BeyondJS",
      "subtitle": "Crea tu primera aplicación",
      "info": "¿Que es esto?"
    },
    "header": {
      "title": "Projects",
      "projectsTitle": "Projects",
      "applications": "Applications",
      "libraries": "Libraries",
      "elements": "Elements",
      "titleHeader": "Application name goes here title",
      "showApps": "Show APP Information",
      "filtersTitle": "Filters Bundles",
      "selectView": "Select View",
      "welcome": "Welcome:",
      "logIn": "Log In:"
    },
    "applications": {
      "libraries": "Libraries",
      "libAssoc": "Associated libraries",
      "modules": "Modules",
      "modAssoc": "Associated modules"
    },
    "application": {
      "description": "No posee descripcion"
    },
    "actions": {
      "play": "Play",
      "stop": "Stop",
      "details": "Details",
      "compile": "Compile",
      "publish": "Publish",
      "create": "Create New App",
      "download": "Download"
    }
  };

  __pkg.initialise();
});