define(["exports", "@beyond-js/ui/swiper/code", "@beyond-js/ui/image/code", "@beyond-js/ui/import/code", "react", "react-dom"], function (_exports, _code, _code2, _code3, dependency_0, dependency_1) {
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

  const __pkg = new __Bundle("@beyond-js/ui/unnamed/swiper/page/page").package();

  externals.register(new Map([["react", dependency_0], ["react-dom", dependency_1]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /*******
  view.jsx
  *******/

  class View extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Swiper"), /*#__PURE__*/React.createElement(_code3.BeyondImport, {
        name: "BeyondSwiperSlider",
        route: "/libraries/beyond-ui/swiper  /code.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<BeyondSwiperSlider/>'), /*#__PURE__*/React.createElement(_code.BeyondSwiperSlider, {
        className: "swiper-container"
      }, /*#__PURE__*/React.createElement("p", null, "Hola mundo"), /*#__PURE__*/React.createElement("p", null, "Buen Dia"), /*#__PURE__*/React.createElement("p", null, "Hola mundo")), /*#__PURE__*/React.createElement("h2", null, "Images"), /*#__PURE__*/React.createElement(_code.BeyondSwiperSlider, {
        className: "swiper-images"
      }, /*#__PURE__*/React.createElement(_code2.BeyondImage, {
        src: `${module.pathname}/static/images/cr7.jpg`
      }), /*#__PURE__*/React.createElement(_code2.BeyondImage, {
        src: `${module.pathname}/static/images/zidane.jpg`
      }), /*#__PURE__*/React.createElement(_code2.BeyondImage, {
        src: `${module.pathname}/static/images/henry.jpg`
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
    ReactDOM.render(React.createElement(View, {}), this.container);
    this.container.id = 'beyond-ui-swiper-page';
  }
  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/unnamed/swiper/page/page', '#beyond-ui-swiper-page .swiper-container,#beyond-ui-swiper-page .swiper-images{position:relative;min-height:200px}#beyond-ui-swiper-page p{color:#000}');
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