define(["exports", "@beyond-js/ui/empty/code", "@beyond-js/ui/form/code", "@beyond-js/ui/import/code", "@beyond-js/ui/preload/code", "react", "react-dom"], function (_exports, _code, _code2, _code3, _code4, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/preload/page/page', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
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
      }, /*#__PURE__*/React.createElement("h2", null, "Preload"), /*#__PURE__*/React.createElement(_code3.BeyondImport, {
        name: "BeyondPreloadText",
        route: "/libraries/beyond-ui/preload-text/code.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Default Example "), /*#__PURE__*/React.createElement("pre", null, '<BeyondPreload/>'), /*#__PURE__*/React.createElement(_code4.BeyondPreload, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Changing Color "), /*#__PURE__*/React.createElement("pre", null, '<BeyondPreload color="#6f6c6c"/>'), /*#__PURE__*/React.createElement(_code4.BeyondPreload, {
        color: "#6f6c6c"
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Changing Height And Width "), /*#__PURE__*/React.createElement("pre", null, '<BeyondPreload width="50%" height="30px"/>'), /*#__PURE__*/React.createElement(_code4.BeyondPreload, {
        width: "50%",
        height: "30px"
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Change Radius "), /*#__PURE__*/React.createElement("pre", null, '<BeyondPreload width="50%" height="30px" radio="50px"/>'), /*#__PURE__*/React.createElement(_code4.BeyondPreload, {
        width: "50%",
        height: "30px",
        radio: "50px"
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Change Properties To Simulate Structures "), /*#__PURE__*/React.createElement("pre", null, '<BeyondPreload width="50px" height="50px" radio="50px"  color="#6f6c6c"/>'), /*#__PURE__*/React.createElement(_code4.BeyondPreload, {
        width: "50px",
        height: "50px",
        radio: "50px",
        color: "#6f6c6c"
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("pre", null, '<BeyondPreload width="100px" height="100px" radio="0"  color="#6f6c6c"/>'), /*#__PURE__*/React.createElement(_code4.BeyondPreload, {
        width: "100px",
        height: "100px",
        radio: "0",
        color: "#6f6c6c"
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("pre", null, '<BeyondPreload width="50%" height="20px" radio="50%"  color="#6f6c6c"/>'), /*#__PURE__*/React.createElement(_code4.BeyondPreload, {
        width: "50%",
        height: "20px",
        radio: "50%",
        color: "#6f6c6c"
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Remove Animation"), /*#__PURE__*/React.createElement("pre", null, '<BeyondPreload stopAnimation={true}/>'), /*#__PURE__*/React.createElement(_code4.BeyondPreload, {
        stopAnimation: true
      }), /*#__PURE__*/React.createElement("hr", null));
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

  __pkg.initialise();
});