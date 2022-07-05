define(["exports", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.BeyondPreloadText = BeyondPreloadText;
  _exports.hmr = void 0;
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/ui/preload-text",
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
  control.jsx
  **********/

  function BeyondPreloadText({
    className,
    width = "100%",
    height = "100%",
    color
  }) {
    const styles = {
      width,
      height
    };
    if (color) styles.background = color;
    const cls = `preload-text${className ? ` ${className}` : ''}`;
    return /*#__PURE__*/React.createElement("span", {
      className: cls,
      style: styles
    }, /*#__PURE__*/React.createElement("span", null));
  }
  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/preload-text', '.preload-text{display:inline-block;background:var(--beyond-preload-color,#e4e5dc);width:100%;height:14px;overflow:hidden;border-radius:3px;--color-shadow:var(--beyond-secondary-color);--second-shadow-color:var(--beyond-secondary-dark-color)}@keyframes movement{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}.preload-text.primary{--color-shadow:var(--beyond-primary-color);--second-shadow-color:var(--beyond-primary-dark-color);background:var(--beyond-primary-dark-color)}.preload-text span{height:100%;display:block;animation-duration:2s;animation-iteration-count:infinite;animation-name:movement}.preload-text span:after{content:" ";width:50%;min-width:40px;height:100%;display:block;background:linear-gradient(90deg,rgba(255,255,255,0) 0,var(--color-shadow) 50%,var(--second-shadow-color) 100%);background-size:100%}');
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