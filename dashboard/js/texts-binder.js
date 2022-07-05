define(["exports", "@beyond-js/kernel/texts", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _texts, dependency_0, dependency_1, dependency_2) {
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
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/dashboard/texts-binder",
    "bundle": "code"
  }).package();

  ;
  externals.register(new Map([["react", dependency_1], ["react-dom", dependency_2]]));
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
      const currentText = new _texts.CurrentTexts(module, true);

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