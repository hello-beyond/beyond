define(["exports", "react", "react-dom", "@beyond-js/ui/empty/code", "@beyond-js/ui/form/code", "@beyond-js/ui/import/code"], function (_exports, React, ReactDOM, _code, _code2, _code3) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/empty/page/page', false, {});
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /************
  JSX PROCESSOR
  ************/

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
});