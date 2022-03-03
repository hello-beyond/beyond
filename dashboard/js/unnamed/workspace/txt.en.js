define([], function () {
  "use strict";

  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/workspace/txt', true, {
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
    "panels": {
      "tab": {
        "actions": {
          "splitRight": "Split Right",
          "splitDown": "Split Down",
          "close": "Close"
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

  __pkg.initialise();
});