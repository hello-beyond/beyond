define(["exports", "react", "react-dom", "/libraries/beyond-ui/select/code", "/libraries/beyond-ui/import/code"], function (_exports, React, ReactDOM, _code, _code2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.MainComponent = void 0;
  _exports.Page = Page;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/select/page/page', false, {});
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
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
  /************
  JSX PROCESSOR
  ************/

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
      }, /*#__PURE__*/React.createElement("h2", null, "Select "), /*#__PURE__*/React.createElement(_code2.BeyondImport, {
        name: "BeyondSelect",
        route: "/libraries/beyond-ui/select/code.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<BeyondSelect identifier="nombre" options={options} value={options[3]} pk=\'cedula\'></BeyondSelect>'), /*#__PURE__*/React.createElement(_code.BeyondSelect, {
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
  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}#beyond-elements-select-page select{width:50%}#beyond-elements-select-page .select-options{border:solid 1px #fff}#beyond-elements-select-page .select-options svg{fill:white}';
  bundle.styles.appendToDOM();
});