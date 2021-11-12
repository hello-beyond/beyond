define(["exports", "react", "react-dom", "@beyond-js/ui/image/code", "@beyond-js/ui/import/code"], function (_exports, React, ReactDOM, _code, _code2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/image/page/page', false, {});
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
      this.image = React.createRef();
    }

    render() {
      return /*#__PURE__*/React.createElement("main", {
        ref: "main"
      }, /*#__PURE__*/React.createElement("h2", null, "Image"), /*#__PURE__*/React.createElement(_code2.BeyondImport, {
        name: "BeyondImage",
        route: "/libraries/beyond-ui/image/code.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<BeyondImage src="https://via.placeholder.com/150"/>'), /*#__PURE__*/React.createElement(_code.BeyondImage, {
        src: "https://via.placeholder.com/150"
      }), /*#__PURE__*/React.createElement("hr", null));
    }

  }
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: page.js
  ************/


  function Page() {
    this.render = function () {
      const wrapper = document.createElement('span');
      const specs = {};
      ReactDOM.render(React.createElement(Control, specs), wrapper);
      this.container.id = 'beyond-ui-element-icons-page';
      this.container.appendChild(wrapper);
    };
  }
});