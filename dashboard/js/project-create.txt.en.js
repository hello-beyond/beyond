define(["exports", "@beyond-js/kernel/bundle"], function (_exports, dependency_0) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.txt = _exports.hmr = void 0;
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/dashboard/project-create",
    "multibundle": true,
    "bundle": "txt"
  }).package('en');

  ;
  externals.register(new Map([]));
  const {
    module
  } = __pkg.bundle;
  const ims = new Map();
  /*********************
  INTERNAL MODULE: ./txt
  *********************/

  ims.set('./txt', {
    hash: 4109612028,
    creator: function (require, exports) {
      exports.txt = {
        "subtitle": "Select what you want to do",
        "actions": {
          "submit": "Create"
        },
        "created": "Application created",
        "form": {
          "scope": {
            "label": "Project scope",
            "info": "The scope is used to group projects, it follows the npm standard"
          },
          "name": {
            "label": "Project name",
            "info": "The name is the identifier of your project and is used to access its modules"
          },
          "title": {
            "label": "Add a title to your new project",
            "info": "Commercial or user friendly name for the project"
          },
          "description": {
            "label": "Description",
            "info": "Here you can explain the purpose of your project (useful if you will publish it to NPM)"
          },
          "ports": {
            "navigate": {
              "label": "Port",
              "info": "Port to navigate your project"
            },
            "inspect": {
              "label": "Inspect Port",
              "info": "Port to inspect the project with devtools"
            },
            "error": "Port isn't available",
            "success": "Port checked and available",
            "tooltip": "Check port"
          },
          "types": {
            "titles": {
              "empty": "Blank projects",
              "templates": "Templates"
            },
            "empty": {
              "description": "A configured and blank project is created so that you can define what you consider necessary from scratch."
            },
            "node": {
              "title": "Node Project",
              "description": "Project that will be compiled to be executed in a Node.js environment."
            },
            "backend": {
              "title": "Backend",
              "description": "Node.js project that exposes communication interfaces to be consumed by both web clients and other backends"
            },
            "web": {
              "title": "Web",
              "description": "Web, Android, iOS project. Both the client code and the backend code coexist in the same  project."
            },
            "express": {
              "title": "Express template",
              "description": "Create an express server in the simplest way possible"
            },
            "library": {
              "title": "Library",
              "description": " Container of client and server modules to be consumed by other projects.."
            },
            "web-backend": {
              "title": "Web con Backend",
              "description": "Web App with backend."
            },
            "board": {
              "title": "Board template",
              "description": "Template with Trello style to start coding."
            },
            "react": {
              "title": "React starter app",
              "description": "React configured and ready to use."
            },
            "svelte": {
              "title": "Svelte",
              "description": "Svelte configured and ready to use."
            },
            "vue": {
              "title": "Vue App",
              "description": "Svelte configured and ready to use."
            },
            "web-backend-app": {
              "title": "Template Web-Backend App",
              "description": "Web App template with backend."
            }
          },
          "npm": "Install npm dependencies?",
          "actions": {
            "submit": "Create"
          }
        },
        "errors": {
          "title": "An error has ocurred",
          "APP_EXISTS": "A folder with this name already exists in your directory"
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