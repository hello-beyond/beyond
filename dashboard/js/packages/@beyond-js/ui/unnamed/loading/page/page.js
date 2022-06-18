define(["exports", "@beyond-js/ui/loading/code", "@beyond-js/ui/import/code", "react", "react-dom"], function (_exports, _code, _code2, dependency_0, dependency_1) {
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

  const __pkg = new __Bundle("@beyond-js/ui/unnamed/loading/page/page").package();

  externals.register(new Map([["react", dependency_0], ["react-dom", dependency_1]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /*******
  view.jsx
  *******/

  class View extends React.Component {
    render() {
      return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("h2", null, "Loading"), /*#__PURE__*/React.createElement(_code2.BeyondImport, {
        name: "BeyondLoading",
        route: "/libraries/beyond-ui/loading/code.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<BeyondLoading fetching={true}/>'), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "The fetching parameter indicates when the spinner should be active or not: "), /*#__PURE__*/React.createElement(_code.BeyondLoading, null));
    }

  }
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: page.js
  ************/


  function Page() {
    const specs = {};
    ReactDOM.render(React.createElement(View, specs), this.container);
    this.container.id = 'beyond-element-icon-button-page';
  }
  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/unnamed/loading/page/page', '#beyond-element-icon-button-page{display:grid;width:100%;height:100%}#beyond-element-icon-button-page .beyond-element-loading-view{height:25%}');
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