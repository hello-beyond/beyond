define(["exports", "@beyond-js/ui/empty/code", "@beyond-js/ui/form/code", "@beyond-js/ui/import/code", "react", "react-dom"], function (_exports, _code, _code2, _code3, dependency_0, dependency_1) {
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

  const __pkg = new __Bundle("@beyond-js/ui/unnamed/empty/page/page").package();

  externals.register(new Map([["react", dependency_0], ["react-dom", dependency_1]]));
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
      const myElement = /*#__PURE__*/React.createElement(_code2.BeyondButton, null, "My Element");
      return /*#__PURE__*/React.createElement("div", {
        className: "page-control"
      }, /*#__PURE__*/React.createElement("h2", null, "Empty"), /*#__PURE__*/React.createElement(_code3.BeyondImport, {
        name: "BeyondEmpty",
        route: "@beyond-js/ui/empty/code"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<BeyondEmpty/>'), /*#__PURE__*/React.createElement(_code.BeyondEmpty, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("h2", null, "Empty with added text"), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Add custom text to display on empty. Example:"), /*#__PURE__*/React.createElement("pre", null, '<BeyondEmpty text="añadir texto personalizado a mostrar en el empty"/>'), /*#__PURE__*/React.createElement(_code.BeyondEmpty, {
        text: "a\xF1adir texto personalizado a mostrar en el empty"
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("h2", null, "Empty with added elements"), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, " You can add custom elements to empty in order to give it more functionalities.Example: "), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Element:  <BeyondButton>My Element</BeyondButton>"), /*#__PURE__*/React.createElement("pre", null, '<BeyondEmpty additionalElement={myElement}/>'), /*#__PURE__*/React.createElement(_code.BeyondEmpty, {
        additionalElement: myElement
      }));
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
    this.container.id = 'graphs-empty-page';
    this.container.appendChild(wrapper);
  }

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