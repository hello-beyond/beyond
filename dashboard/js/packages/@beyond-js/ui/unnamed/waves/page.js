define(["exports", "@beyond-js/ui/empty", "@beyond-js/ui/form", "@beyond-js/ui/import", "@beyond-js/ui/ripple", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _empty, _form, _import, _ripple, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  _exports.hmr = void 0;
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/ui/unnamed/waves/page",
    "bundle": "page"
  }).package();

  ;
  externals.register(new Map([["react", dependency_1], ["react-dom", dependency_2]]));
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
      }, /*#__PURE__*/React.createElement("h2", null, "Waves"), /*#__PURE__*/React.createElement(_import.BeyondImport, {
        name: "BeyondWaves",
        route: "/libraries/beyond-ui/waves.js"
      }), /*#__PURE__*/React.createElement("pre", null, '<BeyondWaves/>'), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "To use the wave it is only necessary that it is inside the container to which you want to add the effect, this container must have a relative position"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("div", {
        className: "container-wave"
      }, /*#__PURE__*/React.createElement(_ripple.BeyondWaves, null)));
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
  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/unnamed/waves/page', '.page-control .container-wave{width:100%;height:200px;position:relative;background:gray}');
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