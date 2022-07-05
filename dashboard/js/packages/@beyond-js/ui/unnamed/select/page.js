define(["exports", "/libraries/beyond-ui/select", "/libraries/beyond-ui/import", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _select, _import, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.MainComponent = void 0;
  _exports.Page = Page;
  _exports.hmr = void 0;
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/ui/unnamed/select/page",
    "bundle": "page"
  }).package();

  ;
  externals.register(new Map([["react", dependency_1], ["react-dom", dependency_2]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: page.js
  ************/

  function Page() {
    'use strict';

    ReactDOM.render(React.createElement(MainComponent, {}), this.container);
    this.container.id = 'beyond-elements-select-page';
  }
  /**********
  control.jsx
  **********/


  class MainComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      const options = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 5', 'option 5', 'option 5', 'option 5', 'option 6'];
      const options2 = [{
        'id': 5,
        'cedula': 1,
        'nombre': 'Pepito 1',
        'sexo': 'm',
        'age': 20
      }, {
        'id': 7,
        'cedula': 2,
        'nombre': 'Pepito 1',
        'sexo': 'm',
        'age': 31
      }, {
        'id': 8,
        'cedula': 3,
        'nombre': 'Pepito 1',
        'sexo': 'm',
        'age': 40
      }, {
        'id': 9,
        'cedula': 5,
        'nombre': 'Pepito 1',
        'sexo': 'm',
        'age': 55
      }, {
        'id': 10,
        'cedula': 4,
        'nombre': 'Pepito 1',
        'sexo': 'm',
        'age': 17
      }];
      return /*#__PURE__*/React.createElement("div", {
        className: "container-select"
      }, /*#__PURE__*/React.createElement("h2", null, "Select "), /*#__PURE__*/React.createElement(_import.BeyondImport, {
        name: "BeyondSelect",
        route: "/libraries/beyond-ui/select.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<BeyondSelect identifier="nombre" options={options} value={options[3]} pk=\'cedula\'></BeyondSelect>'), /*#__PURE__*/React.createElement(_select.BeyondSelect, {
        identifier: "nombre",
        options: options2,
        value: options[3],
        pk: "cedula"
      }), /*#__PURE__*/React.createElement("h2", null, "Simple Select"), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<select name="carrera"> <option value="1">Informática</option><option value="2">Administración</option><option value="3">Comercio</option></select>'), /*#__PURE__*/React.createElement("select", {
        name: "carrera"
      }, /*#__PURE__*/React.createElement("option", {
        value: "1"
      }, "Inform\xE1tica"), /*#__PURE__*/React.createElement("option", {
        value: "2"
      }, "Administraci\xF3n"), /*#__PURE__*/React.createElement("option", {
        value: "3"
      }, "Comercio")));
    }

  }
  /**********
  SCSS STYLES
  **********/


  _exports.MainComponent = MainComponent;
  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/unnamed/select/page', '#beyond-elements-select-page select{width:50%}#beyond-elements-select-page .select-options{border:solid 1px #fff}#beyond-elements-select-page .select-options svg{fill:white}');
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