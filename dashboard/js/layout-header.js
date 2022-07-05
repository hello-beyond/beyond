define(["exports", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.DsHeaderBar = DsHeaderBar;
  _exports.FooterBar = FooterBar;
  _exports.Page = Page;
  _exports.hmr = void 0;
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/dashboard/layout-header",
    "bundle": "code"
  }).package();

  ;
  externals.register(new Map([["react", dependency_1], ["react-dom", dependency_2]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /******
  bar.jsx
  ******/

  function DsHeaderBar({
    children,
    className
  }) {
    const cls = `ds-header-bar${className ? ` ${className}` : ''}`;
    return /*#__PURE__*/React.createElement("header", {
      className: cls
    }, /*#__PURE__*/React.createElement("div", {
      className: "ds-container"
    }, children));
  }
  /***********
  foot-bar.jsx
  ***********/


  function FooterBar({
    props
  }) {
    return /*#__PURE__*/React.createElement("footer", {
      className: "ds-footbar"
    }, props);
  }
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: page.js
  ************/


  function Page() {
    ReactDOM.render(React.createElement(DsHeaderBar, {
      texts: module.texts
    }), this.container);
    this.container.id = 'app-headr=bar-page';
    this.container.classList.add('page');
  }
  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/dashboard/layout-header', '.ds-header-bar{background:var(--beyond-secondary-dark-color);width:100%}.ds-header-bar .p1,.ds-header-bar h1,.ds-header-bar h2,.ds-header-bar h3,.ds-header-bar h4{padding:5px 0}.ds-header-bar .title-col h1,.ds-header-bar .title-col h2{font-size:1.5rem}');
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