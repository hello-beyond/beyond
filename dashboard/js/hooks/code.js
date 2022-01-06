define(["exports", "react", "react-dom"], function (_exports, React, ReactDOM) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.useBinder = useBinder;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/hooks/code', false, {});
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /************
  JSX PROCESSOR
  ************/

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
          throw new Error(`object is not valid in useBinder ${object}`);
        }

        object.bind(event, onBinder);
      });
      return () => objects.forEach(object => object.unbind(event, onBinder));
    }, []);
  }
});