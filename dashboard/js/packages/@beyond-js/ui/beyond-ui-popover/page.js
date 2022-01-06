define(["exports", "react", "react-dom", "/libraries/beyond-ui/popover/code"], function (_exports, React, ReactDOM, _code) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  _exports.View = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/beyond-ui-popover/page', false, {
    "txt": {
      "multilanguage": true
    }
  });
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /***********
  JS PROCESSOR
  ***********/

  /***************
  FILE: js\page.js
  ***************/


  function Page() {
    this.container.classList.add('beyond-ui-page');
    ReactDOM.render(React.createElement(View), this.container);
  }
  /************
  JSX PROCESSOR
  ************/

  /*******
  view.jsx
  *******/


  class View extends React.Component {
    render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
        className: "page-header"
      }, "Beyond Pop Over."), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Ele1"), /*#__PURE__*/React.createElement("li", null, "Ele2"), /*#__PURE__*/React.createElement("li", null, "Ele3")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Ele1"), /*#__PURE__*/React.createElement("li", null, "Ele2"), /*#__PURE__*/React.createElement("li", null, "Ele3")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Ele1"), /*#__PURE__*/React.createElement("li", null, "Ele2"), /*#__PURE__*/React.createElement("li", null, "Ele3")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Ele1"), /*#__PURE__*/React.createElement("li", null, "Ele2"), /*#__PURE__*/React.createElement("li", null, "Ele3")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Ele1"), /*#__PURE__*/React.createElement("li", null, "Ele2"), /*#__PURE__*/React.createElement("li", null, "Ele3")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Ele1"), /*#__PURE__*/React.createElement("li", null, "Ele2"), /*#__PURE__*/React.createElement("li", null, "Ele3")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Ele1"), /*#__PURE__*/React.createElement("li", null, "Ele2"), /*#__PURE__*/React.createElement("li", null, "Ele3")), /*#__PURE__*/React.createElement(_code.BeyondPopover, {
        target: /*#__PURE__*/React.createElement("button", null, "Open")
      }, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("p", null, "caracas"), /*#__PURE__*/React.createElement("p", null, "caracas2"), /*#__PURE__*/React.createElement("p", null, "caracas3"))), /*#__PURE__*/React.createElement("button", null, "Otro boton"));
    }

  }
  /**********
  SCSS STYLES
  **********/


  _exports.View = View;
  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.app-page-container{padding:15px;display:flex;animation:expand-right .8s ease forwards}.app-page-container .app__lists-container{margin-top:30px;flex-flow:row;display:flex;align-items:flex-start;min-width:1024px;gap:15px}.app-page-container.right-hidden{animation:hidden-right .8s ease forwards}@keyframes expand{0%{transform:translateX(1400px)}100%{transform:translateX(0)}}@keyframes hidden-right{0%{transform:translateX(0)}99%{transform:translateX(-1400px)}100%{display:none;transform:none}}';
  bundle.styles.appendToDOM();
});