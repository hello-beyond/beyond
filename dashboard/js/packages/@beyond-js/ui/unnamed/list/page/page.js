define(["exports", "react", "react-dom", "@beyond-js/ui/import/code", "@beyond-js/ui/list/code"], function (_exports, React, ReactDOM, _code, _code2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/list/page/page', false, {});
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
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "List"), /*#__PURE__*/React.createElement(_code.BeyondImport, {
        name: "BeyondList",
        route: "/libraries/beyond-ui/list/code.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<BeyondList/>'), /*#__PURE__*/React.createElement("hr", null));
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
    this.container.id = 'graphs-list-page';
    this.container.appendChild(wrapper);
  }
});