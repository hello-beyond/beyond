define(["exports", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.hmr = void 0;
  _exports.useBinder = useBinder;
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/dashboard/hooks",
    "bundle": "code"
  }).package();

  ;
  externals.register(new Map([["react", dependency_1], ["react-dom", dependency_2]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /*****************
  jsx\use-binder.jsx
  *****************/

  /***
   * Executes a useEffect hook binging the event defined in all
   * objects passed
   *
   * @param {array} objects Objects to bind
   * @param {function} onBinder function to be executed when the event is fired
   * @param {string} event the event to be listened, by default is event change
   */

  function useBinder(objects, onBinder, event = 'change') {
    React.useEffect(() => {
      objects.forEach(object => {
        if (!object) {
          return;
        }

        if (object && object.on) object.on(event, onBinder);
        if (object && object.bind) object.bind(event, onBinder);
      });
      return () => objects.forEach(object => {
        if (!object) return;
        object && object.off && object.off(event, onBinder);
        object && object.unbind && object.unbind(event, onBinder);
      });
    }, [objects]);
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