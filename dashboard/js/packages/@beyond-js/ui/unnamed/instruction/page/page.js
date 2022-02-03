define(["exports", "/libraries/beyond-ui/instruction/code", "/libraries/beyond-ui/import/code", "react", "react-dom"], function (_exports, _code, _code2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/instruction/page/page', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
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
      }, /*#__PURE__*/React.createElement("h2", null, "Instruction"), /*#__PURE__*/React.createElement(_code2.BeyondImport, {
        name: "BeyondInstruction",
        route: "/libraries/beyond-ui/instruction/code.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<BeyondInstruction texts={texts}/>'), /*#__PURE__*/React.createElement(_code.BeyondInstruction, {
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

  __pkg.initialise();
});