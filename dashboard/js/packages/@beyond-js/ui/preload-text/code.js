define(["exports", "react", "react-dom"], function (_exports2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.BeyondPreloadText = BeyondPreloadText;
  _exports2.hmr = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/preload-text/code', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
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


  bundle.styles.processor = 'scss';
  bundle.styles.value = '.preload-text{display:inline-block;background:var(--beyond-preload-color,#e4e5dc);width:100%;height:14px;overflow:hidden;border-radius:3px;--color-shadow:var(--beyond-secondary-color);--second-shadow-color:var(--beyond-secondary-dark-color)}@keyframes movement{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}.preload-text.primary{--color-shadow:var(--beyond-primary-color);--second-shadow-color:var(--beyond-primary-dark-color);background:var(--beyond-primary-dark-color)}.preload-text span{height:100%;display:block;animation-duration:2s;animation-iteration-count:infinite;animation-name:movement}.preload-text span:after{content:" ";width:50%;min-width:40px;height:100%;display:block;background:linear-gradient(90deg,rgba(255,255,255,0) 0,var(--color-shadow) 50%,var(--second-shadow-color) 100%);background-size:100%}';
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