define(["exports", "react", "react-dom"], function (_exports, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.BeyondNavigate = BeyondNavigate;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/navigate/code', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
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

  __pkg.initialise();
});