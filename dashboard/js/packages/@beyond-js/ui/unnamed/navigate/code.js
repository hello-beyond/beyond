define(["exports", "react", "react-dom"], function (_exports, React, ReactDOM) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.BeyondNavigate = BeyondNavigate;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/navigate/code', false, {});
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /************
  JSX PROCESSOR
  ************/

  /***********
  navigate.jsx
  ***********/


  function BeyondNavigate({
    link,
    children
  }) {
    const navigate = event => {
      event.preventDefault();
      event.stopPropagation();
      beyond.pushState(link);
    };

    return /*#__PURE__*/React.createElement("span", {
      onClick: navigate
    }, children);
  }
});