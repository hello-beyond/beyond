define(["exports", "@beyond-js/ui/empty", "@beyond-js/ui/form", "@beyond-js/ui/import", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _empty, _form, _import, dependency_0, dependency_1, dependency_2) {
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
    "module": "@beyond-js/ui/unnamed/empty/page",
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
      const myElement = /*#__PURE__*/React.createElement(_form.BeyondButton, null, "My Element");
      return /*#__PURE__*/React.createElement("div", {
        className: "page-control"
      }, /*#__PURE__*/React.createElement("h2", null, "Empty"), /*#__PURE__*/React.createElement(_import.BeyondImport, {
        name: "BeyondEmpty",
        route: "@beyond-js/ui/empty"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<BeyondEmpty/>'), /*#__PURE__*/React.createElement(_empty.BeyondEmpty, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("h2", null, "Empty with added text"), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Add custom text to display on empty. Example:"), /*#__PURE__*/React.createElement("pre", null, '<BeyondEmpty text="añadir texto personalizado a mostrar en el empty"/>'), /*#__PURE__*/React.createElement(_empty.BeyondEmpty, {
        text: "a\xF1adir texto personalizado a mostrar en el empty"
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("h2", null, "Empty with added elements"), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, " You can add custom elements to empty in order to give it more functionalities.Example: "), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Element:  <BeyondButton>My Element</BeyondButton>"), /*#__PURE__*/React.createElement("pre", null, '<BeyondEmpty additionalElement={myElement}/>'), /*#__PURE__*/React.createElement(_empty.BeyondEmpty, {
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