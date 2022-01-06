define(["exports", "react", "react-dom", "/components/core/code"], function (_exports, React, ReactDOM, _code) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/components/core/page/page', false, {});
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
      const iconsList = _code.DS_ICONS;
      const iconsName = Object.keys(iconsList);
      return /*#__PURE__*/React.createElement("div", {
        className: "icon-container"
      }, /*#__PURE__*/React.createElement("h1", null, "Icons"), /*#__PURE__*/React.createElement("pre", null, '<DSIcon  icon="Nombre del ícono"/>'), /*#__PURE__*/React.createElement("div", {
        className: "icon-list"
      }, iconsName.map((iconName, index) => {
        return /*#__PURE__*/React.createElement("div", {
          className: "icon-element",
          key: index
        }, iconName, /*#__PURE__*/React.createElement(_code.DSIcon, {
          className: "",
          icon: iconName
        }));
      })));
    }

  }
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: page.js
  ************/


  function Page() {
    const specs = {};
    ReactDOM.render(React.createElement(View, specs), this.container);
    this.container.id = 'beyond-element-icons-page';
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}body{overflow-y:auto!important}.icon-container{text-align:center;padding:30px}.icon-container pre{display:block;padding:9.5px;margin:0 0 10px;font-size:13px;line-height:1.42857143;color:#333;word-break:break-all;word-wrap:break-word;background-color:#f5f5f5;border:1px solid #ccc;border-radius:4px}.icon-container .icon-list{margin-top:20px;display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr}.icon-container .icon-list .icon-element{text-align:center;padding:20px;font-size:16px;display:grid;grid-gap:10px;transition:250ms background-color;cursor:pointer}.icon-container .icon-list .icon-element:hover{background:#263145;color:#fff;fill:#FFFFFF}.icon-container .icon-list .icon-element .beyond-icon{margin:auto}';
  bundle.styles.appendToDOM();
});