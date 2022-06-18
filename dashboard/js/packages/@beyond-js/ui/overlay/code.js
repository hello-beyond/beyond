define(["exports", "@beyond-js/ui/icon/code", "react", "react-dom"], function (_exports, _code, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.BeyondOverlay = void 0;
  _exports.Overlay = Overlay;
  _exports.hmr = void 0;

  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/ui/overlay/code").package();

  externals.register(new Map([["react", dependency_0], ["react-dom", dependency_1]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /***********
  JS PROCESSOR
  ***********/

  /***************
  FILE: overlay.js
  ***************/

  function Overlay(config) {
    if (!config) {
      throw new Error('config modal params is necessary');
    }

    this.open = create;
    this.close = destroy;

    function destroy() {
      const body = document.querySelector('body');
      const exist = document.querySelector('#__graphs-overlay');
      body.setAttribute('style', '');
      if (exist) body.removeChild(exist);
    }

    function create() {
      const body = document.querySelector('body');
      const exist = document.querySelector('#__graphs-overlay');
      if (exist) exist.remove();
      const wrapper = document.createElement('div');
      wrapper.id = '__graphs-overlay';
      body.setAttribute('style', 'overflow:hidden');
      body.appendChild(wrapper);
      ReactDOM.render(React.createElement(BeyondOverlay, {
        'config': config
      }), wrapper);
    }
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }
  /**********
  options.jsx
  **********/


  class Options extends React.Component {
    render() {
      const {
        item
      } = this.props;
      let properties = {};
      if (item.data) properties.data = item.data;
      return /*#__PURE__*/React.createElement("div", {
        className: "item"
      }, /*#__PURE__*/React.createElement(_code.BeyondIconButton, _extends({
        onClick: item.action,
        icon: item.icon
      }, properties)), /*#__PURE__*/React.createElement("h5", null, item.text));
    }

  }
  /**********
  overlay.jsx
  **********/


  class BeyondOverlay extends React.Component {
    componentDidMount() {
      this.refs.overlay.addEventListener('click', event => this.hideOverlay(event));
    }

    componentWillUnmount() {
      this.refs.overlay.removeEventListener('click', event => this.hideOverlay(event));
    }

    hideOverlay(event) {
      if (event.target !== this.refs.overlay) return;
      event.stopPropagation();
      this.props.config.handler();
    }

    render() {
      const config = this.props.config;
      const {
        title,
        options
      } = config;
      const properties = Object.keys(options);
      const overlayStyle = {
        'gridTemplateColumns': `repeat(${properties.length},1fr)`
      };
      let output = [];
      properties.map(entry => output.push( /*#__PURE__*/React.createElement(Options, {
        key: entry,
        item: options[entry]
      })));
      return /*#__PURE__*/React.createElement("div", {
        className: "beyond-overlay",
        ref: "overlay"
      }, /*#__PURE__*/React.createElement("div", {
        className: "overlay-content"
      }, /*#__PURE__*/React.createElement("div", {
        className: "overlay-header"
      }, /*#__PURE__*/React.createElement("span", {
        className: "title"
      }, title)), /*#__PURE__*/React.createElement("div", {
        className: "overlay-main",
        style: overlayStyle
      }, output)));
    }

  }
  /**********
  SCSS STYLES
  **********/


  _exports.BeyondOverlay = BeyondOverlay;
  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/overlay/code', '.beyond-overlay{position:absolute;top:0;left:0;bottom:0;right:0;display:block;width:100%;height:100%;background-color:rgba(0,0,0,.5);z-index:100}.beyond-overlay .overlay-content{position:absolute;bottom:0;left:0;right:0;height:227px;display:grid;grid-template-rows:50px 1fr;background:var(--beyond-background-color)}.beyond-overlay .overlay-content .overlay-header{padding:15px 15px 0;text-align:left}.beyond-overlay .overlay-content .overlay-header .title{font-size:16px;font-weight:500;letter-spacing:.15px;color:var(--beyond-text-color)}.beyond-overlay .overlay-content .overlay-actions-link,.beyond-overlay .overlay-content .overlay-main{text-align:center;display:grid;padding:30px 15px;grid-auto-flow:column}.beyond-overlay .overlay-content .overlay-actions-link .item,.beyond-overlay .overlay-content .overlay-main .item{display:grid;grid-template-rows:min-content min-content;grid-gap:10px;align-self:center}.beyond-overlay .overlay-content .overlay-actions-link .item h5,.beyond-overlay .overlay-content .overlay-main .item h5{margin:0}.beyond-overlay .overlay-content .overlay-actions-link .item button,.beyond-overlay .overlay-content .overlay-main .item button{background-color:var(--beyond-background-variant-color);border-radius:50%;margin:auto;fill:var(--beyond-text-color);padding:16px;height:60px;width:60px}.beyond-overlay .overlay-content .overlay-add-link{display:grid;padding:0 15px;grid-row-gap:15px}.beyond-overlay .overlay-content .overlay-add-link input{padding:7px 0}.beyond-overlay .overlay-content .overlay-add-link button{text-align:center;background-color:var(--beyond-background-variant-color);width:80%;margin:auto;letter-spacing:5px}');
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