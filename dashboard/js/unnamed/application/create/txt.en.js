define([], function () {
  "use strict";

  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/application/create/txt', true, {
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
    "subtitle": "Select what you want to do",
    "actions": {
      "submit": "Create"
    },
    "form": {
      "name": "Application name",
      "title": "Add a title to your new app",
      "description": "Description",
      "port": {
        "label": "Port",
        "error": "Port isn't available",
        "success": "Port checked and available"
      },
      "types": {
        "titles": {
          "empty": "Blank applications",
          "templates": "Templates"
        },
        "empty": {
          "description": "A configured and blank application is created so that you can define what you consider necessary from scratch."
        },
        "node": {
          "title": "Node App",
          "description": " Application that will be compiled to be executed in a Node.js environment."
        },
        "backend": {
          "title": "Backend",
          "description": "Node.js application that exposes communication interfaces to be consumed by both web clients and other backends"
        },
        "web": {
          "title": "Web",
          "description": "Web, Android, iOS application. Both the client code and the backend code coexist in the same  application."
        },
        "express": {
          "title": "Express template",
          "description": "Create an express server in the simplest way possible"
        },
        "library": {
          "title": "Library",
          "description": " Container of client and server modules to be consumed by other applications.."
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
        }
      }
    }
  };

  __pkg.initialise();
});