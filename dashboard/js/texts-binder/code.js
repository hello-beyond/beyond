define(["exports", "@beyond-js/kernel/texts/ts", "react", "react-dom"], function (_exports, _ts, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.hmr = void 0;
  _exports.useTextsBinder = useTextsBinder;

  //  @beyond-js Texts
  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/dashboard/texts-binder/code").package();

  externals.register(new Map([["react", dependency_0], ["react-dom", dependency_1]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /*******************
  use-texts-binder.jsx
  *******************/

  /**
   *
   * @param {array} module module name
   **/

  function useTextsBinder(module) {
    const [ready, setReady] = React.useState(false);
    const [texts, setTexts] = React.useState({});
    React.useEffect(() => {
      const currentText = new _ts.CurrentTexts(module, true);

      const binder = () => {
        setTexts(currentText.value);
        setReady(currentText.ready);
      };

      currentText.bind('change', binder);
      binder();
      return () => currentText.unbind('change', binder);
    }, []);
    return [ready, texts];
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