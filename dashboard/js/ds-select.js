define(["exports", "@beyond-js/ui/icon", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _icon, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.DSSelect = DSSelect;
  _exports.hmr = void 0;
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/dashboard/ds-select",
    "bundle": "code"
  }).package();

  ;
  externals.register(new Map([["react", dependency_1], ["react-dom", dependency_2]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /*********
  select.jsx
  *********/

  function DSSelect({
    options,
    value,
    name,
    label,
    onSelect
  }) {
    const [opened, toggle] = React.useState();
    const [labelText, setValue] = React.useState(value ? value : label);
    const icon = opened ? 'arrowDropUp' : 'arrowDropDown';
    const map = new Map();

    const onClick = event => {
      event.preventDefault();
      toggle(!opened);
    };

    const select = event => {
      event.stopPropagation();
      event.preventDefault();
      toggle(!opened);
      const target = event.currentTarget;
      const ele = map.get(target.dataset.value);
      setValue(ele.label);
      ele.target = {
        name,
        value: ele.value
      };
      if (onSelect) onSelect(ele);
    };

    const items = options.map(item => {
      map.set(item.value, item);
      return /*#__PURE__*/React.createElement("div", {
        key: item.value,
        onClick: select,
        "data-value": item.value,
        className: "option"
      }, item.label);
    });
    const cls = `form__select ${opened ? ' opened' : ''}`;
    return /*#__PURE__*/React.createElement("div", {
      tabIndex: "0",
      className: cls,
      onClick: onClick,
      onFocus: onClick
    }, /*#__PURE__*/React.createElement("div", {
      className: "label"
    }, /*#__PURE__*/React.createElement("span", null, labelText), /*#__PURE__*/React.createElement(_icon.BeyondIcon, {
      icon: icon
    })), /*#__PURE__*/React.createElement("div", {
      className: "form__select__options"
    }, items));
  }
  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/dashboard/ds-select', '.form__select{padding:8px 12px;border-radius:1px;border:1px solid #dee2e6;position:relative;cursor:pointer}.form__select .beyond-icon{position:absolute;right:15px;fill:var(--beyond-text-on-primary)}.form__select .form__select__options{position:absolute;left:0;right:0;margin-top:16px;display:none}.form__select .label{padding-right:40px}.form__select .label:first-letter{text-transform:uppercase}.form__select.opened .form__select__options{display:grid;background:var(--beyond-background-color);border:1px solid var(--beyond-secondary-dark-color);box-shadow:0 5px 5px -5px #333;z-index:10}.form__select.opened .form__select__options .option{padding:8px;color:var(--beyond-text-on-primary)}.form__select.opened .form__select__options .option:hover{background:var(--beyond-facebook-accent-color)}.form__select.opened .form__select__options .option:not(:first-child){border-top:1px solid #dee2e6}');
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