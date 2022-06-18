define(["exports", "@beyond-js/ui/spinner/code", "@beyond-js/ui/import/code", "react", "react-dom"], function (_exports, _code, _code2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  _exports.hmr = void 0;

  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/ui/unnamed/spinner/page/page").package();

  externals.register(new Map([["react", dependency_0], ["react-dom", dependency_1]]));
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
      }, /*#__PURE__*/React.createElement("h2", null, "Spinner"), /*#__PURE__*/React.createElement(_code2.BeyondImport, {
        name: "BeyondSpinner",
        route: "/libraries/beyond-ui/spinner/code.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<BeyondSpinner fetching={true}/>'), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "The fetching parameter indicates when the spinner should be active or not: "), /*#__PURE__*/React.createElement("h4", null, "Ejemplos:"), /*#__PURE__*/React.createElement("div", {
        className: "spinners-container"
      }, /*#__PURE__*/React.createElement(_code.BeyondSpinner, {
        className: "primary",
        fetching: true
      }), /*#__PURE__*/React.createElement(_code.BeyondSpinner, {
        className: "secondary",
        fetching: true
      }), /*#__PURE__*/React.createElement(_code.BeyondSpinner, {
        className: "accent",
        fetching: true
      }), /*#__PURE__*/React.createElement(_code.BeyondSpinner, {
        color: "yellow",
        fetching: true
      }), /*#__PURE__*/React.createElement(_code.BeyondSpinner, {
        color: "green",
        fetching: true
      }), /*#__PURE__*/React.createElement(_code.BeyondSpinner, {
        color: "white",
        fetching: true
      }), /*#__PURE__*/React.createElement(_code.BeyondSpinner, {
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


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/unnamed/spinner/page/page', '.beyond-ui-spinner-page .spinners-container{padding:30px;display:flex;gap:15px;align-items:center;justify-content:center}');
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