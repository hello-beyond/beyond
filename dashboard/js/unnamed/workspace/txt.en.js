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

  const __pkg = new __Bundle("@beyond-js/dashboard/unnamed/workspace/txt").package('en');

  externals.register(new Map([]));
  const {
    module
  } = __pkg.bundle;
  const ims = new Map();
  /*********************
  INTERNAL MODULE: ./txt
  *********************/

  ims.set('./txt', {
    hash: 2409591377,
    creator: function (require, exports) {
      exports.txt = {
        "panels": {
          "tab": {
            "actions": {
              "splitRight": "Split Right",
              "splitDown": "Split Down",
              "close": "Close",
              "closeAll": "Close other tabs"
            },
            "labels": {
              "apps": "Projects",
              "navigator": "navigator",
              "compile": "Compile app",
              "static": "Static",
              "app": "Application",
              "appConfig": "Application config",
              "module": "Module",
              "settings": "Settings"
            }
          }
        },
        "footer": {
          "path": "pathname",
          "project": "Project",
          "projectEmpty": "No projects selected"
        },
        "early": {
          "title2": "Introduce your name and access code to start with us",
          "title": "The only framework for universal JavaScript",
          "label": "Entry your early code access",
          "action": "Start",
          "error": "The code is invalid, try again",
          "message": "BeyondJS is being launched in stages. We are actually offering early access for those who are interested to try  BeyondJS with us and to help with your appreciated feedback.`",
          "inputs": {
            "name": "Your name",
            "code": "Code",
            "email": "Email"
          }
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