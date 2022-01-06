define(["exports", "react", "react-dom", "@beyond-js/ui/form/code", "@beyond-js/ui/icon/code", "@beyond-js/ui/toast/code"], function (_exports, React, ReactDOM, _code, _code2, _code3) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/toast/page/page', false, {});
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
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
  /************
  JSX PROCESSOR
  ************/

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


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.beyond-ui-toast-page{color:#fff}';
  bundle.styles.appendToDOM();
});