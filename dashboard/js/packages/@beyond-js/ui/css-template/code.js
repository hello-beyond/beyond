define(["exports"], function (_exports2) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.CSSTemplate = CSSTemplate;
  _exports2.hmr = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/css-template/code', false, {});
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: code.js
  ************/


  function CSSTemplate() {
    return bundle.styles;
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = 'h2{background:red;color:#000}';
  const modules = new Map(); // Exports managed by beyond bundle objects

  __pkg.exports.managed = function (require, _exports) {}; // Module exports


  __pkg.exports.process = function (require) {};

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;

  __pkg.initialise(modules);
});