define(["exports", "/libraries/beyond-ui/perfect-scrollbar/code", "/libraries/beyond-ui/import/code", "react", "react-dom"], function (_exports, _code, _code2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  _exports.hmr = _exports.View = void 0;

  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/ui/unnamed/perfect-scrollbar/page/page").package();

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
    'use strict';

    ReactDOM.render(React.createElement(View, {}), this.container);
    this.container.id = 'beyond-elements-scroll-page';
  }
  /**********
  control.jsx
  **********/


  class View extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      const options = "What is Lorem Ipsum?\n" + "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" + " standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make" + " a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting," + "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" + "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" + "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" + "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" + "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" + "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" + "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" + "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" + "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" + "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" + "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" + "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" + "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" + "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" + "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" + "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" + "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" + "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" + "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" + "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's";
      return /*#__PURE__*/React.createElement("div", {
        className: "container-select"
      }, /*#__PURE__*/React.createElement("h2", null, "Scroll "), /*#__PURE__*/React.createElement(_code2.BeyondImport, {
        name: "BeyondScrollContainer",
        route: "/libraries/beyond-ui/perfect-scrollbar/code.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<BeyondScrollContainer><div>my content</div></BeyondScrollContainer>'), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Wrap your content in the scroll and you will have a more current design that works perfectly without adding styles:"), /*#__PURE__*/React.createElement(_code.BeyondScrollContainer, null, /*#__PURE__*/React.createElement("div", {
        className: "myContent"
      }, options)));
    }

  }
  /**********
  SCSS STYLES
  **********/


  _exports.View = View;
  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/unnamed/perfect-scrollbar/page/page', '#beyond-elements-scroll-page .beyond-perfect-scrollbar{border:solid 1px #fff;border-radius:4px;margin-top:20px}#beyond-elements-scroll-page .myContent{padding:20px;height:200px;text-align:justify;font-size:16px;line-height:30px}');
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