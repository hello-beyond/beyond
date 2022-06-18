define(["exports", "react", "react-dom"], function (_exports, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.BeyondTooltip = BeyondTooltip;
  _exports.hmr = void 0;

  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/dashboard/unnamed/components/tooltip/code").package();

  externals.register(new Map([["react", dependency_0], ["react-dom", dependency_1]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /***********
  JS PROCESSOR
  ***********/

  /*****************
  beyond-tooltip.jsx
  *****************/

  function BeyondTooltip({
    specs,
    className,
    unmount,
    children
  }) {
    const container = document.createElement('span');
    const ref = React.useRef();
    const [position, setPosition] = React.useState(specs);

    const close = () => {
      document.removeEventListener('click', close);
      unmount(false);
    };

    React.useEffect(() => {
      const body = document.querySelector('body');
      document.addEventListener('click', close);
      body.appendChild(container);
      const {
        offsetWidth,
        offsetHeight
      } = ref.current;
      const tWidth = offsetWidth + specs.x;
      const tHeight = offsetHeight + specs.y;
      const newPosition = {};
      if (tWidth > window.innerWidth) ref.current.style.left = `${position.x - offsetWidth}px`;
      if (tHeight > window.innerHeight) ref.current.style.top = `${position.y - offsetHeight}px`;
      return () => {
        document.removeEventListener('click', close);
        container.remove();
      };
    }, []);
    const styles = {
      position: 'absolute',
      top: `${position.y}px`,
      left: `${position.x}px`
    };
    return ReactDOM.createPortal( /*#__PURE__*/React.createElement("div", {
      style: styles,
      ref: ref,
      className: className
    }, children), container);
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