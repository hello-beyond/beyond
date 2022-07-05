define(["exports", "@beyond-js/kernel/bundle"], function (_exports, dependency_0) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.hmr = _exports.NotifyManager = void 0;
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/dashboard/notify",
    "bundle": "js"
  }).package();

  ;
  externals.register(new Map([]));
  const {
    module
  } = __pkg.bundle;
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