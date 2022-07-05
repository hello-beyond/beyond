define(["exports", "@beyond-js/dashboard/core-components", "@beyond-js/dashboard/tooltip", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _coreComponents, _tooltip, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.DSContextMenu = DSContextMenu;
  _exports.ItemMenu = ItemMenu;
  _exports.hmr = void 0;
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/dashboard/context-menu",
    "bundle": "code"
  }).package();

  ;
  externals.register(new Map([["react", dependency_1], ["react-dom", dependency_2]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /***************
  context-menu.jsx
  ***************/

  function DSContextMenu({
    specs,
    unmount,
    children
  }) {
    return /*#__PURE__*/React.createElement(_tooltip.BeyondTooltip, {
      specs: specs,
      unmount: unmount,
      className: "ds-context-menu item-actions"
    }, children);
  }
  /************
  item-menu.jsx
  ************/


  function ItemMenu({
    onClick,
    icon,
    label
  }) {
    return /*#__PURE__*/React.createElement("li", {
      onClick: onClick
    }, icon ? /*#__PURE__*/React.createElement(_coreComponents.DSIcon, {
      icon: icon
    }) : /*#__PURE__*/React.createElement("span", null), label);
  }
  /***********
  JS PROCESSOR
  ***********/

  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/dashboard/context-menu', '.ds-context-menu{padding:0;background:#141414;border-radius:3px;z-index:1000;box-shadow:0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23);min-width:200px;cursor:pointer}.ds-context-menu svg{fill:#fff;height:14px;width:14px}.ds-context-menu ul{list-style:none;padding:0;display:grid;margin:0;align-items:center}.ds-context-menu ul li{padding:5px 15px;align-items:center;display:flex;gap:5px}.ds-context-menu ul li:first-child{border-top-left-radius:3px;border-top-right-radius:3px}.ds-context-menu ul li:last-child{border-bottom-left-radius:3px;border-bottom-right-radius:3px}.ds-context-menu ul li:hover{background:#333}');
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