define(["exports", "react", "react-dom"], function (_exports2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.BeyondPreload = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/preload/code', false, {}, dependencies);
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

  class BeyondPreload extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      const {
        width,
        height,
        color,
        stopAnimation,
        radio
      } = this.props;
      return /*#__PURE__*/React.createElement("span", {
        className: "preload",
        style: {
          width: width || "100%",
          height: height || "14px",
          background: color || "",
          borderRadius: radio || ""
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          display: stopAnimation ? "none" : "block"
        }
      }));
    }

  }
  /**********
  SCSS STYLES
  **********/


  _exports2.BeyondPreload = BeyondPreload;
  bundle.styles.processor = 'scss';
  bundle.styles.value = '.preload{display:inline-block;background:var(--background,#eee);width:100%;height:14px;overflow:hidden;border-radius:3px}@keyframes movement{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}.preload span{height:100%;display:block;animation-duration:2s;animation-iteration-count:infinite;animation-name:movement}.preload span:after{content:" ";width:50%;min-width:40px;height:100%;display:block;background:linear-gradient(90deg,rgba(255,255,255,0) 0,var(--spinner-background,gray) 50%,rgba(255,255,255,0) 100%);background-size:100%}';
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