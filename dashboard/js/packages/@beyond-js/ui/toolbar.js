define(["exports", "@beyond-js/ui/spinner", "@beyond-js/ui/icon", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _spinner, _icon, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.hmr = _exports.BeyondToolbar = void 0;
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/ui/toolbar",
    "bundle": "code"
  }).package();

  ;
  externals.register(new Map([["react", dependency_1], ["react-dom", dependency_2]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /***********
  children.jsx
  ***********/

  function Childs({
    children,
    spinner,
    actions,
    refresh,
    fetching
  }) {
    //0 or 1 child
    if (!children || children && !children.length) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, children, " ", /*#__PURE__*/React.createElement(_spinner.BeyondSpinner, {
        fetching: fetching
      }));
    }

    let output = [];

    if (typeof children === 'object' && children.length) {
      children.map((item, index) => {
        if (spinner && parseInt(spinner) === index) {
          output.push( /*#__PURE__*/React.createElement(_spinner.BeyondSpinner, {
            key: "spinner",
            fetching: fetching
          }));
        }

        if (refresh && parseInt(spinner) === index) {
          if (!actions) console.warn('the action object must be passed to implement refresh button');
          output.push( /*#__PURE__*/React.createElement(_icon.BeyondIconButton, {
            key: "refresh",
            icon: "refresh",
            onClick: actions.refresh
          }));
        }

        output.push(item);
      });
    }

    return output;
  }
  /**********
  toolbar.jsx
  **********/


  class BeyondToolbar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        'back': true
      };
      this.onBack = this.onBack.bind(this);
    }

    onBack() {
      if (!!this.props.backAction) this.props.backAction();else beyond.back();
    }

    render() {
      const {
        props
      } = this;
      const {
        fetching,
        children,
        actions,
        refresh
      } = props;
      const disabled = {};
      if (fetching) disabled.disabled = true;
      const back = props.back === false ? props.back : this.state.back;
      let className = 'beyond-element-toolbar';
      className += !!props.className ? ` ${props.className}` : '';
      className += back ? '' : ' no-back';
      const spinner = props.spinner ? props.spinner : 0;
      return /*#__PURE__*/React.createElement("nav", {
        className: `${className}`
      }, back && /*#__PURE__*/React.createElement(_icon.BeyondIconButton, {
        className: "beyond-back-button circle",
        onClick: this.onBack,
        icon: "backArrow"
      }), /*#__PURE__*/React.createElement(Childs, {
        children: children,
        spinner: spinner,
        actions: actions,
        refresh: refresh,
        fetching: fetching
      }));
    }

  }
  /**********
  SCSS STYLES
  **********/


  _exports.BeyondToolbar = BeyondToolbar;
  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/toolbar', '.beyond-element-toolbar{height:50px;padding:0 15px;background:#ff8056;display:grid;align-items:center;justify-content:left;grid-template-columns:45px 1fr 40px auto;grid-gap:1px;color:#fff;font-weight:500;letter-spacing:.24px;z-index:1}.beyond-element-toolbar.no-back{grid-template-columns:1fr 40px auto}.beyond-element-toolbar .beyond-icon-button{display:grid;justify-content:center;align-items:center}.beyond-element-toolbar button svg,.beyond-element-toolbar svg{display:inline-grid;justify-self:center;fill:#fff}.beyond-element-toolbar span{display:block;justify-self:left;white-space:nowrap;text-overflow:ellipsis;line-height:1;flex:1}');
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