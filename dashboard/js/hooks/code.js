define(["exports", "react", "react-dom"], function (_exports, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.hmr = void 0;
  _exports.useBinder = useBinder;

  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/dashboard/hooks/code").package();

  externals.register(new Map([["react", dependency_0], ["react-dom", dependency_1]]));
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
        // if (!object) {
        //     throw new Error(`object is not valid in useBinder ${object}`);
        // }
        if (object) object.bind(event, onBinder);
      });
      return () => objects.forEach(object => object && object.unbind(event, onBinder));
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