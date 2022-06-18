define(["exports", "@beyond-js/ui/image/code", "@beyond-js/ui/layout/toolbar/code", "@beyond-js/ui/layout/footer/code", "@beyond-js/ui/layout/sidenav/code", "@beyond-js/ui/perfect-scrollbar/code", "react", "react-dom"], function (_exports, _code, _code2, _code3, _code4, _code5, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Layout = Layout;
  _exports.hmr = void 0;

  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/ui/unnamed/layout/layout/layout").package();

  externals.register(new Map([["react", dependency_0], ["react-dom", dependency_1]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /*********
  layout.jsx
  *********/

  class Control extends React.Component {
    constructor(props) {
      super(props);
      this.container = React.createRef();
      this.props.parent.bind('change', () => this.setState({}));
    }

    componentDidMount() {
      this.props.parent.rendered();
    }

    render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "layout-container"
      }, /*#__PURE__*/React.createElement(_code2.Toolbar, null), /*#__PURE__*/React.createElement("div", {
        className: "container-content"
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_code4.Sidenav, null)), /*#__PURE__*/React.createElement("div", {
        className: "content",
        ref: this.container
      })), /*#__PURE__*/React.createElement(_code3.Footer, null));
    }

  }
  /***********
  JS PROCESSOR
  ***********/

  /**************
  FILE: layout.js
  **************/


  function Layout() {
    this.control = ReactDOM.render(React.createElement(Control, {
      'parent': this
    }), this.container);
    this.container.classList.add('beyond-ui-layout');
  }
  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/unnamed/layout/layout/layout', '.layout-container{background:#1e2d42;color:#fff}.layout-container .container-content{padding:45px;display:grid;grid-template-columns:200px 1fr;grid-gap:20px;min-height:600px}.layout-container .container-content .content{overflow-x:hidden;padding:1px}.layout-container .container-content pre{margin:20px 0;padding:15px;position:relative;transition:all .1s ease-in-out;cursor:pointer}.layout-container .container-content pre:hover{background:#ff8056;color:#fff;transition:all .1s ease-in}.layout-container .container-content pre:before{content:"Copy";position:absolute;padding:15px 20px;top:0;right:0;background:#333;color:#e4e5dc}');
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