define(["exports", "react", "react-dom"], function (_exports, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.hmr = _exports.BeyondPreload = void 0;

  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/ui/preload/code").package();

  externals.register(new Map([["react", dependency_0], ["react-dom", dependency_1]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
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


  _exports.BeyondPreload = BeyondPreload;
  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/preload/code', '.preload{display:inline-block;background:var(--background,#eee);width:100%;height:14px;overflow:hidden;border-radius:3px}@keyframes movement{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}.preload span{height:100%;display:block;animation-duration:2s;animation-iteration-count:infinite;animation-name:movement}.preload span:after{content:" ";width:50%;min-width:40px;height:100%;display:block;background:linear-gradient(90deg,rgba(255,255,255,0) 0,var(--spinner-background,gray) 50%,rgba(255,255,255,0) 100%);background-size:100%}');
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