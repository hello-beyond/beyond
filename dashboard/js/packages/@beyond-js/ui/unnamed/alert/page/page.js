define(["exports", "@beyond-js/ui/alert/code", "@beyond-js/ui/import/code", "react", "react-dom"], function (_exports, _code, _code2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  _exports.hmr = void 0;

  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/ui/unnamed/alert/page/page").package();

  externals.register(new Map([["react", dependency_0], ["react-dom", dependency_1]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /**********
  control.jsx
  **********/

  class Control extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return /*#__PURE__*/React.createElement("main", {
        ref: "main"
      }, /*#__PURE__*/React.createElement("h2", null, "Alerts"), /*#__PURE__*/React.createElement(_code2.BeyondImport, {
        name: "BeyondAlert",
        route: "/libraries/beyond-ui/alert/code.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<BeyondAlert className="danger" title="default" message="mensage de notificaciones"/>'), /*#__PURE__*/React.createElement(_code.BeyondAlert, {
        title: "default",
        message: "mensage de notificaciones"
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Add class danger:"), /*#__PURE__*/React.createElement(_code.BeyondAlert, {
        className: "danger",
        title: "default",
        message: "mensage de notificaciones"
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Add class success:"), /*#__PURE__*/React.createElement(_code.BeyondAlert, {
        className: "success",
        title: "default",
        message: "mensage de notificaciones"
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Add class warning:"), /*#__PURE__*/React.createElement(_code.BeyondAlert, {
        className: "warning",
        title: "default",
        message: "mensage de notificaciones"
      }));
    }

  }
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: page.js
  ************/


  function Page() {
    this.render = function () {
      const wrapper = document.createElement('span');
      const specs = {};
      ReactDOM.render(React.createElement(Control, specs), wrapper);
      this.container.id = 'beyond-element-icons-page';
      this.container.appendChild(wrapper);
    };
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