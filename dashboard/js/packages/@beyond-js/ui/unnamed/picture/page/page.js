define(["exports", "react", "react-dom", "@beyond-js/ui/toolbar/code", "@beyond-js/ui/picture/code"], function (_exports, React, ReactDOM, _code, _code2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/picture/page/page', false, {});
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
      this.setImage = this.setImage.bind(this);
    }

    setImage(event) {
      this.props.picture.capture('gallery');
    }

    render() {
      return /*#__PURE__*/React.createElement("button", {
        onClick: event => this.setImage(event)
      }, "set image");
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
      let picture = new _code2.BeyondPictureModel();
      const wrapper = document.createElement('span');
      const specs = {
        'picture': picture
      };
      ReactDOM.render(React.createElement(Control, specs), wrapper);
      this.container.id = 'beyond-elements-overlay-page';
      this.container.appendChild(wrapper);
    };
  }
});