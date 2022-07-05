define(["exports", "/libraries/beyond-ui/spinner", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _spinner, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.BeyondLoading = BeyondLoading;
  _exports.hmr = void 0;
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/ui/loading",
    "bundle": "code"
  }).package();

  ;
  externals.register(new Map([["react", dependency_1], ["react-dom", dependency_2]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /**********
  loading.jsx
  **********/

  function BeyondLoading({
    className
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: `beyond-element-loading-view ${className ? className : ''}`
    }, /*#__PURE__*/React.createElement("h3", null, "Cargando..."), /*#__PURE__*/React.createElement(_spinner.BeyondSpinner, {
      fetching: true
    }));
  }
  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/loading', '.beyond-element-loading-view{height:100%;display:flex;align-items:center;background:var(--beyond-background-color);justify-content:center;flex-direction:column;z-index:100;text-align:center}.beyond-element-loading-view .beyond-element-spinner div{border-color:var(--beyond-element-primary-background-color) transparent transparent transparent}.beyond-element-loading-view h3{font-size:18px;color:var(--beyond-text-color)}.beyond-element-loading-view.alternative{background:var(--beyond-background-color)}.beyond-element-loading-view.alternative .beyond-element-spinner div{border-color:var(--beyond-primary-accent-color) transparent transparent transparent}.beyond-element-loading-view.alternative .content h3{color:var(--beyond-text-color)}');
  legacyStyles.appendToDOM();
  const ims = new Map(); // Module exports

  __pkg.exports.process = function ({
    require,
    prop,
    value
  }) {};

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports.hmr = hmr;

  __pkg.initialise(ims);
});