define(["exports", "react", "react-dom"], function (_exports, React, ReactDOM) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/test/page', false, {});
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: page.js
  ************/


  function Page() {
    ReactDOM.render(React.createElement(DSWorkspace, {}), this.container);
  }
  /************
  JSX PROCESSOR
  ************/

  /*******
  view.jsx
  *******/


  function DSWorkspace() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, "Testing Page");
  }
});