define(["exports", "@beyond-js/ui/code/code", "react", "react-dom"], function (_exports2, _code, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.BeyondImport = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/import/code', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /*********
  import.jsx
  *********/

  const BeyondImport = ({
    name,
    route
  }) => {
    return /*#__PURE__*/React.createElement("div", {
      className: "beyond-element-import"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-muted"
    }, "Import: "), /*#__PURE__*/React.createElement(_code.BeyondCode, {
      name: name,
      route: route
    }));
  };
  /**********
  SCSS STYLES
  **********/


  _exports2.BeyondImport = BeyondImport;
  bundle.styles.processor = 'scss';
  bundle.styles.value = '';
  bundle.styles.appendToDOM();
  const modules = new Map(); // Exports managed by beyond bundle objects

  __pkg.exports.managed = function (require, _exports) {}; // Module exports


  __pkg.exports.process = function (require) {};

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;

  __pkg.initialise(modules);
});