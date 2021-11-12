define(["exports", "react", "react-dom", "/application/create/code"], function (_exports, React, ReactDOM, _code) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/application/create/page/page', false, {});
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /************
  JSX PROCESSOR
  ************/

  /*******
  view.jsx
  *******/


  function View() {
    return /*#__PURE__*/React.createElement(_code.ApplicationCreate, null);
  }
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: page.js
  ************/


  function Page() {
    'use strict';

    ReactDOM.render(React.createElement(View, {}), this.container);
  }
});