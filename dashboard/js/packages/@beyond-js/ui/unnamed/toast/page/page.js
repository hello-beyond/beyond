define(["exports", "@beyond-js/ui/form/code", "@beyond-js/ui/icon/code", "@beyond-js/ui/toast/code", "react", "react-dom"], function (_exports, _code, _code2, _code3, dependency_0, dependency_1) {
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

  const __pkg = new __Bundle("@beyond-js/ui/unnamed/toast/page/page").package();

  externals.register(new Map([["react", dependency_0], ["react-dom", dependency_1]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: page.js
  ************/

  function Page() {
    ReactDOM.render(React.createElement(View, {}), this.container);
    this.container.classList.add('beyond-ui-toast-page');
  }
  /***************
  button-class.jsx
  ***************/


  class Button extends React.Component {
    onClick() {
      this.context.add({
        message: 'toast info!',
        type: 'info'
      });
      this.context.add({
        message: 'toast error!',
        type: 'error'
      });
      this.context.add({
        message: 'toast success!',
        type: 'success'
      });
      this.context.add({
        message: 'toast warning!',
        type: 'warning'
      });
    }

    render() {
      return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("blockquote", null, "Prueba de toast utilizando", /*#__PURE__*/React.createElement("code", null, "React.context"), "en un componente de tipo clase"), /*#__PURE__*/React.createElement(_code.BeyondButton, {
        onClick: this.onClick.bind(this)
      }, "Mostrar"));
    }

  }

  Button.contextType = _code3.ToastContext;
  /********
  hooks.jsx
  ********/

  const Hooks = () => {
    const {
      add
    } = (0, _code3.useToastContext)();

    const onClick = () => add({
      message: 'hook toast'
    });

    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("blockquote", null, "Implementaci\xF3n del context para uso de toast por medio de", /*#__PURE__*/React.createElement("code", null, "hooks")), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(_code.BeyondButton, {
      onClick: onClick
    }, " Crear toast"));
  };
  /*******
  view.jsx
  *******/


  const View = () => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("h2", null, "Toast")), /*#__PURE__*/React.createElement("span", {
      className: "text-muted"
    }, "Example: "), /*#__PURE__*/React.createElement(_code3.ToastContextProvider, null, /*#__PURE__*/React.createElement(Button, null), /*#__PURE__*/React.createElement(Hooks, null)));
  };
  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/unnamed/toast/page/page', '.beyond-ui-toast-page{color:#fff}');
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