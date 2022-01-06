define(["exports", "react", "react-dom", "@beyond-js/ui/icon/code"], function (_exports, React, ReactDOM, _code) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.BeyondEmpty = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/empty/code', false, {});
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /************
  JSX PROCESSOR
  ************/

  /********
  empty.jsx
  ********/


  class BeyondEmpty extends React.Component {
    render() {
      const text = this.props.text ? this.props.text : 'No hay registros';
      return /*#__PURE__*/React.createElement("div", {
        className: "beyond-element-empty"
      }, /*#__PURE__*/React.createElement("div", {
        className: "content"
      }, this.props.icon ? this.props.icon : /*#__PURE__*/React.createElement(_code.BeyondIcon, {
        icon: "icon"
      }), /*#__PURE__*/React.createElement("h3", null, text), this.props.additionalElement ? this.props.additionalElement : null, this.props.children ? this.props.children : null));
    }

  }
  /**********
  SCSS STYLES
  **********/


  _exports.BeyondEmpty = BeyondEmpty;
  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.beyond-element-empty{text-align:center;color:var(--beyond-gray-light-color);padding:15px 15%;display:flex;flex-flow:row;justify-items:center;align-items:center;height:100%}.beyond-element-empty .content{justify-items:center;display:flex;margin:auto;flex-flow:column}.beyond-element-empty h3{margin:15px 0;font-size:18px;text-transform:lowercase}.beyond-element-empty h3:first-letter{text-transform:uppercase}.beyond-element-empty a{color:var(--beyond-gray-light-color);font-size:18px}.beyond-element-empty a:hover{text-decoration:none;cursor:pointer}.beyond-element-empty svg{width:45px;height:45px;display:grid;margin:auto;fill:var(--beyond-gray-light-color)}';
  bundle.styles.appendToDOM();
});