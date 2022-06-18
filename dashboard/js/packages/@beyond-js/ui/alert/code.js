define(["exports", "react", "react-dom"], function (_exports, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.BeyondAlert = BeyondAlert;
  _exports.hmr = void 0;

  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/ui/alert/code").package();

  externals.register(new Map([["react", dependency_0], ["react-dom", dependency_1]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /********
  alert.jsx
  ********/

  function BeyondAlert(props) {
    const types = Object.freeze({
      success: 'alert-success',
      warning: 'alert-warning',
      error: 'alert-error',
      danger: 'alert-danger',
      info: 'alert-info'
    });
    const [closed, setClosed] = React.useState(false);
    let {
      type,
      title,
      message,
      className,
      icon,
      align,
      close,
      onClose
    } = props;

    const onClickClose = event => {
      const target = event.currentTarget;
      const parent = target.closest('.beyond-alert');
      parent.classList.add('hiding-component');
      window.setTimeout(() => {
        if (onClose) onClose();
        setClosed(true);
      }, 400);
    };

    if (!type) type = 'info';
    let cls = className ? `beyond-alert ${className}` : 'beyond-alert';
    cls += types.hasOwnProperty(type) ? ` ${types[type]}` : '';
    if (icon) cls += ' alert-icon';
    if (align) cls += ` alert-icon-${align}`;
    const output = [];
    if (title) output.push( /*#__PURE__*/React.createElement("h3", {
      key: "title"
    }, title));
    if (message) output.push( /*#__PURE__*/React.createElement("div", {
      key: "message"
    }, message));
    if (closed) return null;
    return /*#__PURE__*/React.createElement("div", {
      className: cls
    }, icon && !align && /*#__PURE__*/React.createElement(DashboardIcon, {
      className: "alert-icon",
      name: icon
    }), /*#__PURE__*/React.createElement("div", {
      className: "beyond-alert_content"
    }, output, props.children), icon && align === 'right' && /*#__PURE__*/React.createElement(DashboardIcon, {
      className: "alert-icon",
      name: icon
    }), close && /*#__PURE__*/React.createElement(DSIconButton, {
      onClick: onClickClose,
      className: "beyond-alert__close-icon xs",
      icon: "close"
    }));
  }
  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/alert/code', '.beyondalert{padding:15px;color:#fff;margin:10px 0;margin-bottom:20px;display:grid;align-items:center;align-content:center;border-radius:2px;box-shadow:0 10px 13px -7px #000,0 2px 11px 3px transparent}.beyondalert.alert-icon,.beyondalert.alert-icon-left{grid-template-columns:auto 1fr}.beyondalert.alert-icon-right{grid-template-columns:1fr auto}._beyond-alert{border-radius:5px;margin:10px 0;padding:10px}._beyond-alert .alert-icon{padding:0 10px;display:flex}._beyond-alert h3{margin:0;text-transform:uppercase}._beyond-alert p{margin:0;text-transform:uppercase}._beyond-alert.info{background-color:gray}._beyond-alert.success{background:green}._beyond-alert.danger,._beyond-alert.error{background:red}._beyond-alert.warning{background:#ff0}');
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