define(["exports", "@beyond-js/ui/ripple/code", "@beyond-js/ui/icon/code", "@beyond-js/ui/import/code", "@beyond-js/ui/form/code", "react", "react-dom"], function (_exports, _code, _code2, _code3, _code4, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  _exports.hmr = void 0;

  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/ui/unnamed/ripple/page/page").package();

  externals.register(new Map([["react", dependency_0], ["react-dom", dependency_1]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: page.js
  ************/

  function Page() {
    'use strict';

    const ripple = new _code.BeyondRipple();
    const wrapper = document.createElement('div');
    const specs = {};
    ReactDOM.render(React.createElement(MainComponent, specs), wrapper);
    const styles = document.createElement('style');
    styles.textContent = bundle.styles.value;
    this.container.id = 'beyond-element-ripple-page';
    this.container.appendChild(styles);
    this.container.appendChild(wrapper);
    ripple.init(document.querySelectorAll('button'));
  }
  /*******
  main.jsx
  *******/


  class MainComponent extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "main-container"
      }, /*#__PURE__*/React.createElement("h2", null, "Ripple"), /*#__PURE__*/React.createElement(_code3.BeyondImport, {
        name: "BeyondRipple",
        route: "/libraries/beyond-ui/ripple/code.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, 'const ripple = new BeyondRipple();' + '    ripple.init(document.querySelectorAll(\'button\'));\n'), /*#__PURE__*/React.createElement(_code4.BeyondButton, {
        type: "button primary"
      }, " CLICK ME"), /*#__PURE__*/React.createElement("hr", null));
    }

  }
  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/unnamed/ripple/page/page', '#beyond-element-ripple-page{height:100%;overflow:auto;transform:scale(.9) translate3d(0,0,0);transition:transform .4s ease,opacity .4s ease}#beyond-element-ripple-page.show{opacity:1;transform:none}');
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