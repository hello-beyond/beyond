define(["exports", "@beyond-js/ui/code/code", "react", "react-dom"], function (_exports, _code, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.hmr = _exports.BeyondImport = void 0;

  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/ui/import/code").package();

  externals.register(new Map([["react", dependency_0], ["react-dom", dependency_1]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
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


  _exports.BeyondImport = BeyondImport;
  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/import/code', '');
  legacyStyles.appendToDOM();
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