define(["exports", "@beyond-js/ui/image/code", "@beyond-js/ui/icon/code", "react", "react-dom"], function (_exports, _code, _code2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Footer = void 0;
  _exports.Page = Page;
  _exports.hmr = void 0;

  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/ui/unnamed/layout/footer/code").package();

  externals.register(new Map([["react", dependency_0], ["react-dom", dependency_1]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
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


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/unnamed/layout/footer/code', '.footer-beyond-ui{display:grid;grid-template-columns:auto auto auto;padding:25px 45px;color:#82837f;align-items:center;background:#1e2d42}.footer-beyond-ui .logo{width:150px}.footer-beyond-ui .logo img{object-fit:contain}.footer-beyond-ui .container-icons{text-align:right}.footer-beyond-ui .container-icons .icon-social{background:0 0;border-radius:20px;margin-left:5px;cursor:pointer;padding:4px;border:solid 1px}.footer-beyond-ui path{fill:#E4E5DC}');
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