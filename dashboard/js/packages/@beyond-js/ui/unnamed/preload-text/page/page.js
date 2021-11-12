define(["exports", "react", "react-dom", "/libraries/beyond-ui/empty/code", "/libraries/beyond-ui/form/code", "/libraries/beyond-ui/import/code", "/libraries/beyond-ui/preload-text/code"], function (_exports, React, ReactDOM, _code, _code2, _code3, _code4) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/preload-text/page/page', false, {});
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
      return /*#__PURE__*/React.createElement("div", {
        className: "page-control"
      }, /*#__PURE__*/React.createElement("h2", null, "Preload Text"), /*#__PURE__*/React.createElement(_code3.BeyondImport, {
        name: "BeyondPreloadText",
        route: "/libraries/beyond-ui/preload-text/code.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<BeyondPreloadText/>'), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(_code4.BeyondPreloadText, null), /*#__PURE__*/React.createElement("hr", null));
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