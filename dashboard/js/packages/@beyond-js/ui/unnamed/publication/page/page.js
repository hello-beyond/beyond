define(["exports", "react", "react-dom", "/libraries/beyond-ui/publication/code"], function (_exports, React, ReactDOM, _code) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/publication/page/page', false, {});
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /************
  JSX PROCESSOR
  ************/

  /**************
  jsx\control.jsx
  **************/


  class Control extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const asset = {
        loaded: true,
        picture: {
          src: 'https://via.placeholder.com/150'
        },
        owner: {
          name: 'Alejandro',
          lastname: 'Gomez'
        },
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pellentesque interdum odio, eu placerat quam.'
      };
      return /*#__PURE__*/React.createElement("main", {
        ref: "main"
      }, /*#__PURE__*/React.createElement(_code.BeyondPublication, {
        asset: asset
      }));
    }

  }
  /***********
  JS PROCESSOR
  ***********/

  /***************
  FILE: js\page.js
  ***************/


  function Page() {
    this.render = function () {
      const wrapper = document.createElement('span');
      const specs = {};
      ReactDOM.render(React.createElement(Control, specs), wrapper);
      this.container.id = 'graphs-elements-overlay-page';
      this.container.appendChild(wrapper);
    };
  }
});