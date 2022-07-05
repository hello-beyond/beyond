define(["exports", "/libraries/beyond-ui/instruction", "/libraries/beyond-ui/import", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _instruction, _import, dependency_0, dependency_1, dependency_2) {
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
    "module": "@beyond-js/ui/unnamed/instruction/page",
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
    constructor(props) {
      super(props);
    }

    render() {
      let texts = {
        title: 'Hola Mundo',
        detail: 'Bienvenidos ciudadanos de Santadilla',
        buttonText: 'Cerrar'
      };
      return /*#__PURE__*/React.createElement("main", {
        ref: "main"
      }, /*#__PURE__*/React.createElement("h2", null, "Instruction"), /*#__PURE__*/React.createElement(_import.BeyondImport, {
        name: "BeyondInstruction",
        route: "/libraries/beyond-ui/instruction.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<BeyondInstruction texts={texts}/>'), /*#__PURE__*/React.createElement(_instruction.BeyondInstruction, {
        texts: texts
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "The text parameter is an object which contains title: 'Hola Mundo', detail: 'Bienvenidos ciudadanos de Santadilla', buttonText: 'Cerrar'"));
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
      this.container.id = 'beyond-ui-element-instruction-page';
      this.container.appendChild(wrapper);
    };
  }

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