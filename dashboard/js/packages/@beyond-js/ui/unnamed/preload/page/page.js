define(["exports", "@beyond-js/ui/empty/code", "@beyond-js/ui/form/code", "@beyond-js/ui/import/code", "react", "react-dom"], function (_exports, _code, _code2, _code3, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  _exports.hmr = void 0;
  `import {BeyondPreload} from '@beyond-js/ui/preload/code';`;

  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/ui/unnamed/preload/page/page").package();

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
      return /*#__PURE__*/React.createElement("div", {
        className: "page-control"
      }, /*#__PURE__*/React.createElement("h2", null, "Preload"), /*#__PURE__*/React.createElement(_code3.BeyondImport, {
        name: "BeyondPreloadText",
        route: "/libraries/beyond-ui/preload-text/code.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Default Example "), /*#__PURE__*/React.createElement("pre", null, '<BeyondPreload/>'), /*#__PURE__*/React.createElement(BeyondPreload, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Changing Color "), /*#__PURE__*/React.createElement("pre", null, '<BeyondPreload color="#6f6c6c"/>'), /*#__PURE__*/React.createElement(BeyondPreload, {
        color: "#6f6c6c"
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Changing Height And Width "), /*#__PURE__*/React.createElement("pre", null, '<BeyondPreload width="50%" height="30px"/>'), /*#__PURE__*/React.createElement(BeyondPreload, {
        width: "50%",
        height: "30px"
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Change Radius "), /*#__PURE__*/React.createElement("pre", null, '<BeyondPreload width="50%" height="30px" radio="50px"/>'), /*#__PURE__*/React.createElement(BeyondPreload, {
        width: "50%",
        height: "30px",
        radio: "50px"
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Change Properties To Simulate Structures "), /*#__PURE__*/React.createElement("pre", null, '<BeyondPreload width="50px" height="50px" radio="50px"  color="#6f6c6c"/>'), /*#__PURE__*/React.createElement(BeyondPreload, {
        width: "50px",
        height: "50px",
        radio: "50px",
        color: "#6f6c6c"
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("pre", null, '<BeyondPreload width="100px" height="100px" radio="0"  color="#6f6c6c"/>'), /*#__PURE__*/React.createElement(BeyondPreload, {
        width: "100px",
        height: "100px",
        radio: "0",
        color: "#6f6c6c"
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("pre", null, '<BeyondPreload width="50%" height="20px" radio="50%"  color="#6f6c6c"/>'), /*#__PURE__*/React.createElement(BeyondPreload, {
        width: "50%",
        height: "20px",
        radio: "50%",
        color: "#6f6c6c"
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Remove Animation"), /*#__PURE__*/React.createElement("pre", null, '<BeyondPreload stopAnimation={true}/>'), /*#__PURE__*/React.createElement(BeyondPreload, {
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