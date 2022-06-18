define(["exports", "@beyond-js/ui/icon/code", "react", "react-dom"], function (_exports, _code, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.hmr = _exports.BeyondEmpty = void 0;

  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/ui/empty/code").package();

  externals.register(new Map([["react", dependency_0], ["react-dom", dependency_1]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /********
  empty.jsx
  ********/

  class BeyondEmpty extends React.Component {
    render() {
      const text = this.props.text ? this.props.text : 'No hay registros';
      return /*#__PURE__*/React.createElement("div", {
        className: "beyond-element-empty"
      }, /*#__PURE__*/React.createElement("div", {
        className: "content"
      }, this.props.icon ? this.props.icon : /*#__PURE__*/React.createElement(_code.BeyondIcon, {
        icon: "icon"
      }), /*#__PURE__*/React.createElement("h3", null, text), this.props.additionalElement ? this.props.additionalElement : null, this.props.children ? this.props.children : null));
    }

  }
  /**********
  SCSS STYLES
  **********/


  _exports.BeyondEmpty = BeyondEmpty;
  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/empty/code', '.beyond-element-empty{text-align:center;color:var(--beyond-gray-light-color);padding:15px 15%;display:flex;flex-flow:row;justify-items:center;align-items:center;height:100%}.beyond-element-empty .content{justify-items:center;display:flex;margin:auto;flex-flow:column}.beyond-element-empty h3{margin:15px 0;font-size:18px;text-transform:lowercase}.beyond-element-empty h3:first-letter{text-transform:uppercase}.beyond-element-empty a{color:var(--beyond-gray-light-color);font-size:18px}.beyond-element-empty a:hover{text-decoration:none;cursor:pointer}.beyond-element-empty svg{width:45px;height:45px;display:grid;margin:auto;fill:var(--beyond-gray-light-color)}');
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