define(["exports", "react", "react-dom"], function (_exports2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.DsHeaderBar = DsHeaderBar;
  _exports2.FooterBar = FooterBar;
  _exports2.Page = Page;
  _exports2.hmr = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/layout/header-bar/code', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
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


  bundle.styles.processor = 'scss';
  bundle.styles.value = '.ds-header-bar{background:var(--beyond-secondary-dark-color);width:100%}.ds-header-bar .p1,.ds-header-bar h1,.ds-header-bar h2,.ds-header-bar h3,.ds-header-bar h4{padding:5px 0}.ds-header-bar .title-col h1,.ds-header-bar .title-col h2{font-size:1.5rem}';
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