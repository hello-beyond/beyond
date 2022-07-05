define(["exports", "@beyond-js/ui/spinner", "@beyond-js/ui/import", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _spinner, _import, dependency_0, dependency_1, dependency_2) {
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
    "module": "@beyond-js/ui/unnamed/spinner/page",
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
      return /*#__PURE__*/React.createElement("main", {
        className: "beyond-ui-spinner-page",
        ref: "main"
      }, /*#__PURE__*/React.createElement("h2", null, "Spinner"), /*#__PURE__*/React.createElement(_import.BeyondImport, {
        name: "BeyondSpinner",
        route: "/libraries/beyond-ui/spinner.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<BeyondSpinner fetching={true}/>'), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "The fetching parameter indicates when the spinner should be active or not: "), /*#__PURE__*/React.createElement("h4", null, "Ejemplos:"), /*#__PURE__*/React.createElement("div", {
        className: "spinners-container"
      }, /*#__PURE__*/React.createElement(_spinner.BeyondSpinner, {
        className: "primary",
        fetching: true
      }), /*#__PURE__*/React.createElement(_spinner.BeyondSpinner, {
        className: "secondary",
        fetching: true
      }), /*#__PURE__*/React.createElement(_spinner.BeyondSpinner, {
        className: "accent",
        fetching: true
      }), /*#__PURE__*/React.createElement(_spinner.BeyondSpinner, {
        color: "yellow",
        fetching: true
      }), /*#__PURE__*/React.createElement(_spinner.BeyondSpinner, {
        color: "green",
        fetching: true
      }), /*#__PURE__*/React.createElement(_spinner.BeyondSpinner, {
        color: "white",
        fetching: true
      }), /*#__PURE__*/React.createElement(_spinner.BeyondSpinner, {
        size: "50px",
        fetching: true
      })), /*#__PURE__*/React.createElement("h3", null, "Propiedades"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "color"), " Permite definir un color, el cual puede ser pasado en formato CSS."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "size"), " Permite especificar un tama\xF1o especifico para el spinner"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "fetching"), " Es la propiedad que activa el spinner, sino se pasa el spinner no es visible, por defecto es false"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "className"), " clase css a aplicar, si se pasa \"primary\", \"secondary\" o \"accent\" el spinner aplicara estilos asociados al template de manera autom\xE1tica.")), /*#__PURE__*/React.createElement("blockqoute", null, "Este componente puede recibir cualquier atributo html adicional."));
    }

  }
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: page.js
  ************/


  function Page() {
    const wrapper = document.createElement('span');
    const specs = {};
    ReactDOM.render(React.createElement(Control, specs), wrapper);
    this.container.id = 'beyond-ui-element-spinner-page';
    this.container.appendChild(wrapper);
  }
  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/unnamed/spinner/page', '.beyond-ui-spinner-page .spinners-container{padding:30px;display:flex;gap:15px;align-items:center;justify-content:center}');
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