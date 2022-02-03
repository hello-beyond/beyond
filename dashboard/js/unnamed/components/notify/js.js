define(["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.NotifyManager = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/components/notify/js', false, {});
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /***********
  JS PROCESSOR
  ***********/

  /**************
  FILE: notify.js
  **************/


  function Notify() {
    this.events = new Events({
      bind: this
    });
    let value;
    Object.defineProperty(this, 'value', {
      get: () => value
    });

    const set = (msj, type) => {
      value = {
        message: msj,
        type: type
      };
      this.events.trigger('change');
    };

    this.info = message => set(message, 'info');

    this.error = message => set(message, 'error');

    this.success = message => set(message, 'success');

    this.warning = message => set(message, 'warning');
  }

  const NotifyManager = new Notify();
  _exports.NotifyManager = NotifyManager;

  __pkg.initialise();
});