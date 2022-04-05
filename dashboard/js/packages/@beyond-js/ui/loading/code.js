define(["exports", "/libraries/beyond-ui/spinner/code", "react", "react-dom"], function (_exports2, _code, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.BeyondLoading = BeyondLoading;
  _exports2.hmr = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/loading/code', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /**********
  loading.jsx
  **********/

  function BeyondLoading({
    className
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: `beyond-element-loading-view ${className ? className : ''}`
    }, /*#__PURE__*/React.createElement("h3", null, "Cargando..."), /*#__PURE__*/React.createElement(_code.BeyondSpinner, {
      fetching: true
    }));
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '.beyond-element-loading-view{height:100%;display:flex;align-items:center;background:var(--beyond-background-color);justify-content:center;flex-direction:column;z-index:100;text-align:center}.beyond-element-loading-view .beyond-element-spinner div{border-color:var(--beyond-element-primary-background-color) transparent transparent transparent}.beyond-element-loading-view h3{font-size:18px;color:var(--beyond-text-color)}.beyond-element-loading-view.alternative{background:var(--beyond-background-color)}.beyond-element-loading-view.alternative .beyond-element-spinner div{border-color:var(--beyond-primary-accent-color) transparent transparent transparent}.beyond-element-loading-view.alternative .content h3{color:var(--beyond-text-color)}';
  bundle.styles.appendToDOM();
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