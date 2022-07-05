define(["exports", "@beyond-js/ui/empty", "@beyond-js/ui/import", "@beyond-js/ui/icon", "@beyond-js/ui/ripple", "@beyond-js/ui/tabs", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _empty, _import, _icon, _ripple, _tabs, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  _exports.hmr = void 0;
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/ui/unnamed/tabs/page",
    "bundle": "page"
  }).package();

  ;
  externals.register(new Map([["react", dependency_1], ["react-dom", dependency_2]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /**************
  jsx\control.jsx
  **************/

  class Control extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "page-control"
      }, /*#__PURE__*/React.createElement("h2", null, "Tabs"), /*#__PURE__*/React.createElement(_import.BeyondImport, {
        name: "BeyondTab",
        route: "/libraries/beyond-ui/tabs.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<BeyondTab orientation="horizontal"/>'), /*#__PURE__*/React.createElement("div", {
        className: "container-test"
      }, /*#__PURE__*/React.createElement(_tabs.TabsContextProvider, {
        orientation: "horizontal"
      }, /*#__PURE__*/React.createElement(_tabs.Tabs, null, /*#__PURE__*/React.createElement(_icon.BeyondIcon, {
        icon: "play"
      }), /*#__PURE__*/React.createElement(_icon.BeyondIcon, {
        icon: "user"
      }), /*#__PURE__*/React.createElement(_icon.BeyondIcon, {
        icon: "settings"
      }), /*#__PURE__*/React.createElement(_icon.BeyondIcon, {
        icon: "user"
      })), /*#__PURE__*/React.createElement(_tabs.TabsContent, null, /*#__PURE__*/React.createElement("h1", null, "test 1"), /*#__PURE__*/React.createElement("h1", null, "test 2"), /*#__PURE__*/React.createElement("h1", null, "test 3"), /*#__PURE__*/React.createElement("h1", null, "test 4")))), /*#__PURE__*/React.createElement("hr", null));
    }

  }
  /***********
  JS PROCESSOR
  ***********/

  /***************
  FILE: js\page.js
  ***************/


  function Page() {
    const wrapper = document.createElement('span');
    const specs = {};
    ReactDOM.render(React.createElement(Control, specs), wrapper);
    this.container.id = 'graphs-tabs-page';
    this.container.appendChild(wrapper);
  }
  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/unnamed/tabs/page', '#graphs-tabs-page .container-test{margin:auto;position:relative;background:#fff;width:300px;height:350px}');
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