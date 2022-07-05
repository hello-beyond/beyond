define(["exports", "@beyond-js/dashboard/core-components", "@beyond-js/ui/icon", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _coreComponents, _icon, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  _exports.hmr = void 0;

  function A(b) {
    b.items.forEach(item => {
      item.ejecutar(() => console.log(item.name));
    });
  }

  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/dashboard/unnamed/components/core/page",
    "bundle": "page"
  }).package();

  ;
  externals.register(new Map([["react", dependency_1], ["react-dom", dependency_2]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /************
  dashboard.jsx
  ************/

  function IconsList({
    icons
  }) {
    const [filterText, setFilterText] = React.useState("");
    const [labelIcon, setLabelIcon] = React.useState('Nombre del ícono');
    const codeCopy = React.useRef();

    const filter = event => setFilterText(event.currentTarget.value);

    icons = icons.filter(item => item.includes(filterText));

    const setName = ({
      currentTarget: target
    }) => setLabelIcon(target.dataset.name);

    const copy = event => {
      /* Select the text field */
      const copyText = codeCopy.current;
      /* Copy the text inside the text field */

      navigator.clipboard.writeText(copyText.innerText);
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", {
      className: "input__search",
      type: "text",
      onChange: filter
    }), /*#__PURE__*/React.createElement("pre", {
      ref: codeCopy,
      onClick: copy
    }, `<DSIcon  icon="${labelIcon}"/>`), /*#__PURE__*/React.createElement("div", {
      className: "icon-list"
    }, icons.map((iconName, index) => {
      return /*#__PURE__*/React.createElement("div", {
        key: iconName,
        className: "icon-element",
        "data-name": iconName,
        onClick: setName
      }, iconName, /*#__PURE__*/React.createElement(_coreComponents.DSIcon, {
        className: "",
        icon: iconName
      }));
    })));
  }
  /*******
  view.jsx
  *******/


  function View() {
    const ICONS = {
      dashboard: {
        title: 'Dashboard Icons',
        icons: _coreComponents.DS_ICONS
      },
      beyondui: {
        title: 'Beyond Icons',
        icons: _icon.BEYOND_ICONS
      }
    };
    const [selected, setSelected] = React.useState(ICONS.dashboard);
    const iconsList = Object.keys(selected.icons).sort((a, b) => a.localeCompare(b));

    const changeIcons = event => {
      event.preventDefault();
      const target = event.currentTarget;
      setSelected(ICONS[target.dataset.icons]);
      target.closest('aside').querySelectorAll('div').forEach(item => item.classList.remove('active'));
      target.classList.add('active');
    };

    return /*#__PURE__*/React.createElement("div", {
      className: "page__icons-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "page__content"
    }, /*#__PURE__*/React.createElement("aside", null, /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("div", {
      "data-icons": "dashboard",
      onClick: changeIcons
    }, "Dashboard"), /*#__PURE__*/React.createElement("div", {
      "data-icons": "beyondui",
      onClick: changeIcons
    }, "Beyond"))), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("h1", null, selected.title)), /*#__PURE__*/React.createElement(IconsList, {
      icons: iconsList
    }))));
  }
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: page.js
  ************/


  function Page() {
    const specs = {};
    ReactDOM.render(React.createElement(View, specs), this.container);
    this.container.id = 'beyond-element-icons-page';
  }
  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/dashboard/unnamed/components/core/page', '.page__icons-container .page__content nav{display:flex;flex-direction:column;grid-gap:8px;position:sticky;top:30px}.page__icons-container .page__content nav div{padding:15px 20px;cursor:pointer;background:var(--beyond-secondary-dark-color);transition:.3s all ease-in}.page__icons-container .page__content nav div.active,.page__icons-container .page__content nav div:hover{background:var(--beyond-primary-accent-color)}.page__icons-container{text-align:center;padding:30px}.page__icons-container header{display:flex;align-content:flex-start}.page__icons-container .page__content{display:grid;grid-template-columns:auto 1fr;gap:15px}.page__icons-container .input__search{width:100%;background:0 0;border:1px solid #fff;margin:0 0 15px 0;padding:8px;color:#fff}.page__icons-container svg{fill:white}.page__icons-container pre{display:block;padding:9.5px 20px;margin:0 0 10px;font-size:13px;text-align:left;line-height:1.42857143;color:#333;word-break:break-all;word-wrap:break-word;background-color:#f5f5f5;border:1px solid #ccc;border-radius:4px;cursor:pointer;transition:.3s all ease-in}.page__icons-container pre:hover{background:#e4e5dc}.page__icons-container .icon-list{margin-top:20px;display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr}.page__icons-container .icon-list .icon-element{text-align:center;padding:20px;font-size:16px;display:grid;grid-gap:10px;transition:250ms background-color;cursor:pointer;border:1px solid var(--beyond-secondary-dark-color)}.page__icons-container .icon-list .icon-element:hover{background:#263145;color:var(--beyond-text-on-secondary);fill:var(--beyond-text-on-secondary)}.page__icons-container .icon-list .icon-element .beyond-icon{margin:auto}');
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