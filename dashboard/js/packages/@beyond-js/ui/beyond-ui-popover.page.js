define(["exports", "/libraries/beyond-ui/popover", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _popover, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  _exports.hmr = _exports.View = void 0;
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/ui/beyond-ui-popover",
    "multibundle": true,
    "bundle": "page"
  }).package();

  ;
  externals.register(new Map([["react", dependency_1], ["react-dom", dependency_2]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /***********
  JS PROCESSOR
  ***********/

  /***************
  FILE: js\page.js
  ***************/

  function Page() {
    this.container.classList.add('beyond-ui-page');
    ReactDOM.render(React.createElement(View), this.container);
  }
  /*******
  view.jsx
  *******/


  class View extends React.Component {
    render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
        className: "page-header"
      }, "Beyond Pop Over."), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Ele1"), /*#__PURE__*/React.createElement("li", null, "Ele2"), /*#__PURE__*/React.createElement("li", null, "Ele3")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Ele1"), /*#__PURE__*/React.createElement("li", null, "Ele2"), /*#__PURE__*/React.createElement("li", null, "Ele3")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Ele1"), /*#__PURE__*/React.createElement("li", null, "Ele2"), /*#__PURE__*/React.createElement("li", null, "Ele3")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Ele1"), /*#__PURE__*/React.createElement("li", null, "Ele2"), /*#__PURE__*/React.createElement("li", null, "Ele3")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Ele1"), /*#__PURE__*/React.createElement("li", null, "Ele2"), /*#__PURE__*/React.createElement("li", null, "Ele3")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Ele1"), /*#__PURE__*/React.createElement("li", null, "Ele2"), /*#__PURE__*/React.createElement("li", null, "Ele3")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Ele1"), /*#__PURE__*/React.createElement("li", null, "Ele2"), /*#__PURE__*/React.createElement("li", null, "Ele3")), /*#__PURE__*/React.createElement(_popover.BeyondPopover, {
        target: /*#__PURE__*/React.createElement("button", null, "Open")
      }, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("p", null, "caracas"), /*#__PURE__*/React.createElement("p", null, "caracas2"), /*#__PURE__*/React.createElement("p", null, "caracas3"))), /*#__PURE__*/React.createElement("button", null, "Otro boton"));
    }

  }
  /**********
  SCSS STYLES
  **********/


  _exports.View = View;
  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/beyond-ui-popover.page', '.app-page-container{padding:15px;display:flex;animation:expand-right .8s ease forwards}.app-page-container .app__lists-container{margin-top:30px;flex-flow:row;display:flex;align-items:flex-start;min-width:1024px;gap:15px}.app-page-container.right-hidden{animation:hidden-right .8s ease forwards}@keyframes expand{0%{transform:translateX(1400px)}100%{transform:translateX(0)}}@keyframes hidden-right{0%{transform:translateX(0)}99%{transform:translateX(-1400px)}100%{display:none;transform:none}}');
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