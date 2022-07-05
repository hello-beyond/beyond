define(["exports", "@beyond-js/ui/toolbar", "@beyond-js/ui/picture", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _toolbar, _picture, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  _exports.hmr = void 0;
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/ui/unnamed/picture/page",
    "bundle": "page"
  }).package();

  ;
  externals.register(new Map([["react", dependency_1], ["react-dom", dependency_2]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /**************
  jsx\control.jsx
  **************/

  class Control extends React.Component {
    constructor(props) {
      super(props);
      this.setImage = this.setImage.bind(this);
    }

    setImage(event) {
      this.props.picture.capture('gallery');
    }

    render() {
      return /*#__PURE__*/React.createElement("button", {
        onClick: event => this.setImage(event)
      }, "set image");
    }

  }
  /***********
  JS PROCESSOR
  ***********/

  /***************
  FILE: js\page.js
  ***************/


  function Page() {
    this.render = function () {
      let picture = new _picture.BeyondPictureModel();
      const wrapper = document.createElement('span');
      const specs = {
        'picture': picture
      };
      ReactDOM.render(React.createElement(Control, specs), wrapper);
      this.container.id = 'beyond-elements-overlay-page';
      this.container.appendChild(wrapper);
    };
  }

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