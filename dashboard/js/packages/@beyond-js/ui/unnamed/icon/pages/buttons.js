define(["exports", "@beyond-js/ui/icon", "@beyond-js/ui/import", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _icon, _import, dependency_0, dependency_1, dependency_2) {
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
    "module": "@beyond-js/ui/unnamed/icon/pages/buttons",
    "bundle": "page"
  }).package();

  ;
  externals.register(new Map([["react", dependency_1], ["react-dom", dependency_2]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /**********
  control.jsx
  **********/

  class Control extends React.Component {
    render() {
      const iconsList = _icon.BEYOND_ICONS;
      const iconsName = Object.keys(iconsList);
      return /*#__PURE__*/React.createElement("div", {
        className: "icon-buttons-container"
      }, /*#__PURE__*/React.createElement("h2", null, "Icon buttons"), /*#__PURE__*/React.createElement(_import.BeyondImport, {
        name: "BeyondIconButton",
        route: "/libraries/beyond-ui/icon.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<BeyondIconButton className="cls" icon="Nombre del ícono"/>'), /*#__PURE__*/React.createElement("div", {
        className: "container-icon-list"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("div", {
        className: "class-container"
      }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(_icon.BeyondIconButton, {
        icon: "user",
        title: "icon button title"
      }), /*#__PURE__*/React.createElement(_icon.BeyondIconButton, {
        icon: "user"
      }), /*#__PURE__*/React.createElement(_icon.BeyondIconButton, {
        icon: "user"
      })), /*#__PURE__*/React.createElement("pre", null, `<BeyondIconButton icon="user"/>`)), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
        className: "class-container"
      }, /*#__PURE__*/React.createElement("h2", null, "useful classes"), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Examples: "), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(_icon.BeyondIconButton, {
        className: "primary circle",
        icon: "user"
      }), /*#__PURE__*/React.createElement(_icon.BeyondIconButton, {
        className: "circle",
        icon: "user"
      })), /*#__PURE__*/React.createElement("pre", null, ".circle")), /*#__PURE__*/React.createElement("div", {
        className: "class-container"
      }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(_icon.BeyondIconButton, {
        className: "primary",
        icon: "user"
      }), /*#__PURE__*/React.createElement(_icon.BeyondIconButton, {
        className: "primary",
        icon: "user"
      }), /*#__PURE__*/React.createElement(_icon.BeyondIconButton, {
        className: "primary",
        icon: "user"
      })), /*#__PURE__*/React.createElement("pre", null, ".primary")), /*#__PURE__*/React.createElement("div", {
        className: "class-container"
      }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(_icon.BeyondIconButton, {
        className: "circle primary",
        icon: "user"
      }), /*#__PURE__*/React.createElement(_icon.BeyondIconButton, {
        className: "circle primary",
        icon: "user"
      }), /*#__PURE__*/React.createElement(_icon.BeyondIconButton, {
        className: "circle primary",
        icon: "user"
      })), /*#__PURE__*/React.createElement("pre", null, ".primary.circle")), /*#__PURE__*/React.createElement("div", {
        className: "class-container"
      }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(_icon.BeyondIconButton, {
        className: "secondary",
        icon: "user"
      }), /*#__PURE__*/React.createElement(_icon.BeyondIconButton, {
        className: "secondary",
        icon: "user"
      }), /*#__PURE__*/React.createElement(_icon.BeyondIconButton, {
        className: "secondary",
        icon: "user"
      })), /*#__PURE__*/React.createElement("pre", null, ".secondary")), /*#__PURE__*/React.createElement("div", {
        className: "class-container"
      }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(_icon.BeyondIconButton, {
        className: "circle secondary",
        icon: "user"
      }), /*#__PURE__*/React.createElement(_icon.BeyondIconButton, {
        className: "circle secondary",
        icon: "user"
      }), /*#__PURE__*/React.createElement(_icon.BeyondIconButton, {
        className: "circle secondary",
        icon: "user"
      })), /*#__PURE__*/React.createElement("pre", null, ".secondary.circle"))));
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
      this.container.id = 'beyond-element-icons-buttons-page';
      this.container.appendChild(wrapper);
    };
  }
  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/unnamed/icon/pages/buttons', '#beyond-element-icons-buttons-page .class-container{display:grid;grid-template-columns:20% 1fr;grid-gap:15px;margin-bottom:30px;align-items:center}#beyond-element-icons-buttons-page .container-icon-list{text-align:left}#beyond-element-icons-buttons-page button{margin-right:5px}');
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