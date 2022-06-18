define(["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.txt = _exports.hmr = void 0;

  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/dashboard/applications-board/txt").package('en');

  externals.register(new Map([]));
  const {
    module
  } = __pkg.bundle;
  const ims = new Map();
  /*********************
  INTERNAL MODULE: ./txt
  *********************/

  ims.set('./txt', {
    hash: 1560692901,
    creator: function (require, exports) {
      exports.txt = {
        "empty": {
          "title": "Welcome to BeyondJS",
          "subtitle": "Let's start with your first project",
          "info": "What's that?"
        },
        "header": {
          "title": "Projects",
          "projectsTitle": "Projects",
          "applications": "Projects",
          "libraries": "Libraries",
          "elements": "Elements",
          "titleHeader": "Project name goes here title",
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
          "description": "Does not have description"
        },
        "actions": {
          "play": "Play",
          "stop": "Stop",
          "restart": "Restart",
          "details": "Details",
          "compile": "Compile",
          "publish": "Publish",
          "create": "Create project",
          "download": "Download"
        }
      };
    }
  });
  __pkg.exports.descriptor = [{
    "im": "./txt",
    "from": "txt",
    "name": "txt"
  }];
  let txt; // Module exports

  _exports.txt = txt;

  __pkg.exports.process = function ({
    require,
    prop,
    value
  }) {
    (require || prop === 'txt') && (_exports.txt = txt = require ? require('./txt').txt : value);
  };

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports.hmr = hmr;

  __pkg.initialise(ims);
});