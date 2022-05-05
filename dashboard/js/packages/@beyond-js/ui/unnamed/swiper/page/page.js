define(["exports", "@beyond-js/ui/swiper/code", "@beyond-js/ui/image/code", "@beyond-js/ui/import/code", "react", "react-dom"], function (_exports2, _code, _code2, _code3, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.Page = Page;
  _exports2.hmr = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/swiper/page/page', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
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


  bundle.styles.processor = 'scss';
  bundle.styles.value = '#beyond-ui-swiper-page .swiper-container,#beyond-ui-swiper-page .swiper-images{position:relative;min-height:200px}#beyond-ui-swiper-page p{color:#000}';
  bundle.styles.appendToDOM();
  const modules = new Map(); // Exports managed by beyond bundle objects

  __pkg.exports.managed = function (require, _exports) {}; // Module exports


  __pkg.exports.process = function (require) {};

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;

  __pkg.initialise(modules);
});