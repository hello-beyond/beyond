define(["exports", "react", "react-dom", "@beyond-js/ui/image/code", "@beyond-js/ui/icon/code"], function (_exports, React, ReactDOM, _code, _code2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Footer = void 0;
  _exports.Page = Page;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/layout/footer/code', false, {});
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /************
  JSX PROCESSOR
  ************/

  /*********
  footer.jsx
  *********/


  const Footer = () => {
    return /*#__PURE__*/React.createElement("footer", {
      className: "footer-beyond-ui"
    }, /*#__PURE__*/React.createElement(_code.BeyondImage, {
      className: "logo",
      src: "/images/beyondjs.branding.blanco@2x.png",
      alt: ""
    }), /*#__PURE__*/React.createElement("span", null, "Accassuso, Buenos Aires, Argentina . support@beyondjs.com .  +54 9 11 4444.4434"), /*#__PURE__*/React.createElement("div", {
      className: "container-icons"
    }, /*#__PURE__*/React.createElement(_code2.BeyondIcon, {
      className: "icon-social",
      icon: "facebook"
    }), /*#__PURE__*/React.createElement(_code2.BeyondIcon, {
      className: "icon-social",
      icon: "facebook"
    }), /*#__PURE__*/React.createElement(_code2.BeyondIcon, {
      className: "icon-social",
      icon: "facebook"
    })));
  };
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: page.js
  ************/


  _exports.Footer = Footer;

  function Page() {
    ReactDOM.render(React.createElement(AppHome, {
      'texts': module.texts,
      'currency': this.vdir
    }), this.container);
    this.container.id = 'app-footer-page';
    this.container.classList.add('page');

    beyond.require('https://apps.elfsight.com/p/platform.js');
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.footer-beyond-ui{display:grid;grid-template-columns:auto auto auto;padding:25px 45px;color:#82837f;align-items:center;background:#1e2d42}.footer-beyond-ui .logo{width:150px}.footer-beyond-ui .logo img{object-fit:contain}.footer-beyond-ui .container-icons{text-align:right}.footer-beyond-ui .container-icons .icon-social{background:0 0;border-radius:20px;margin-left:5px;cursor:pointer;padding:4px;border:solid 1px}.footer-beyond-ui path{fill:#E4E5DC}';
  bundle.styles.appendToDOM();
});