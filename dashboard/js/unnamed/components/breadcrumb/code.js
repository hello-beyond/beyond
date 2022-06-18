define(["exports", "react", "react-dom"], function (_exports, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.DsBreadcrumb = DsBreadcrumb;
  _exports.hmr = void 0;

  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/dashboard/unnamed/components/breadcrumb/code").package();

  externals.register(new Map([["react", dependency_0], ["react-dom", dependency_1]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }
  /**********
  control.jsx
  **********/


  function DsBreadcrumb({
    items
  }) {
    const onClick = event => {
      const target = event.currentTarget;
      event.stopPropagation();
      event.preventDefault();
      beyond.navigate(target.dataset.link);
    };

    const output = items.map(([label, action = onClick], key) => {
      const attrs = {
        onClick: action
      };
      return /*#__PURE__*/React.createElement("li", _extends({
        key: key
      }, attrs), label);
    });
    return /*#__PURE__*/React.createElement("ul", {
      className: "ds-breadcrumb"
    }, output);
  }
  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/dashboard/unnamed/components/breadcrumb/code', '.ds-breadcrumb{list-style:none;display:flex;gap:8px;margin:0;padding:0}.ds-breadcrumb li{cursor:pointer;transition:all .3s ease-in}.ds-breadcrumb li:hover{color:var(--beyond-primary-accent-color);transition:all .3s ease-in}.ds-breadcrumb li:after{padding:0 5px;content:":"}.ds-breadcrumb li:last-child:after{content:""}');
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