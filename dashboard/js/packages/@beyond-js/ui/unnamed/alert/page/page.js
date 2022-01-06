define(["exports", "react", "react-dom", "@beyond-js/ui/alert/code", "@beyond-js/ui/import/code"], function (_exports, React, ReactDOM, _code, _code2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/alert/page/page', false, {});
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /************
  JSX PROCESSOR
  ************/

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
});