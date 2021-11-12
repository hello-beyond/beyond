define(["exports", "react", "react-dom"], function (_exports, React, ReactDOM) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.BeyondTooltip = BeyondTooltip;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/components/tooltip/code', false, {});
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /***********
  JS PROCESSOR
  ***********/

  /************
  JSX PROCESSOR
  ************/

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

    const close = () => {
      document.removeEventListener('click', close);
      unmount(false);
    };

    React.useEffect(() => {
      const body = document.querySelector('body');
      document.addEventListener('click', close);
      body.appendChild(container);
      return () => container.remove();
    }, []);
    const styles = {
      position: 'absolute',
      top: `${specs.y}px`,
      left: `${specs.x}px`
    };
    return ReactDOM.createPortal( /*#__PURE__*/React.createElement("div", {
      style: styles,
      className: className
    }, children), container);
  }
});