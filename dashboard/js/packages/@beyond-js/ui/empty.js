define(["exports", "@beyond-js/ui/icon", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _icon, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.hmr = _exports.BeyondEmpty = void 0;
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/ui/empty",
    "bundle": "code"
  }).package();

  ;
  externals.register(new Map([["react", dependency_1], ["react-dom", dependency_2]]));
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
      }, this.props.icon ? this.props.icon : /*#__PURE__*/React.createElement(_icon.BeyondIcon, {
        icon: "icon"
      }), /*#__PURE__*/React.createElement("h3", null, text), this.props.additionalElement ? this.props.additionalElement : null, this.props.children ? this.props.children : null));
    }

  }
  /**********
  SCSS STYLES
  **********/


  _exports.BeyondEmpty = BeyondEmpty;
  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/empty', '.beyond-element-empty{text-align:center;color:var(--beyond-gray-light-color);padding:15px 15%;display:flex;flex-flow:row;justify-items:center;align-items:center;height:100%}.beyond-element-empty .content{justify-items:center;display:flex;margin:auto;flex-flow:column}.beyond-element-empty h3{margin:15px 0;font-size:18px;text-transform:lowercase}.beyond-element-empty h3:first-letter{text-transform:uppercase}.beyond-element-empty a{color:var(--beyond-gray-light-color);font-size:18px}.beyond-element-empty a:hover{text-decoration:none;cursor:pointer}.beyond-element-empty svg{width:45px;height:45px;display:grid;margin:auto;fill:var(--beyond-gray-light-color)}');
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