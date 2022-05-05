define(["exports", "@beyond-js/dashboard-lib/models/ts", "@beyond-js/dashboard-lib/models/js", "@beyond-js/ui/spinner/code", "@beyond-js/ui/form/code", "@beyond-js/ui/preload-text/code", "@beyond-js/dashboard/ds-select/code", "@beyond-js/ui/modal/code", "@beyond-js/dashboard/hooks/code", "@beyond-js/dashboard/core-components/code", "@beyond-js/dashboard/ds-contexts/code", "@beyond-js/dashboard/app-distributions/code", "react", "react-dom"], function (_exports2, _ts, _js, _code, _code2, _code3, _code4, _code5, _code6, _code7, _code8, _code9, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.ApplicationsSettings = ApplicationsSettings;
  _exports2.hmr = void 0;
  //WORKSPACE CONTEXT
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/applications-settings/code', false, {
    "txt": {
      "multilanguage": true
    }
  }, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /*********
  select.jsx
  *********/

  function ApplicationsSelect() {
    const {
      setSelected,
      setFetching,
      texts,
      selected,
      fetching
    } = useAppsSettingsContext();
    const {
      workspace,
      workspace: {
        applications: {
          items
        }
      }
    } = (0, _code8.useDSWorkspaceContext)();

    const handleChange = async ele => {
      setFetching(true);
      const application = await workspace.getApplication(ele.value);
      setSelected(application);
      setFetching(false);
    };

    const options = items.map(item => ({
      value: item.id.toString(),
      label: item.name
    }));
    const cls = `flex__column${fetching ? ' is-fetching' : ''}`;
    return /*#__PURE__*/React.createElement("div", {
      className: cls
    }, /*#__PURE__*/React.createElement("label", null, texts.platform.applications.select), /*#__PURE__*/React.createElement("div", {
      className: "relative__container"
    }, /*#__PURE__*/React.createElement(_code4.DSSelect, {
      options: options,
      value: selected?.id,
      onSelect: handleChange
    }), fetching && /*#__PURE__*/React.createElement(_code.BeyondSpinner, {
      active: true,
      className: "primary"
    })));
  }
  /******
  tab.jsx
  ******/


  const AppsSettingsContext = React.createContext();

  const useAppsSettingsContext = () => React.useContext(AppsSettingsContext);

  /*bundle**/
  function ApplicationsSettings() {
    const {
      workspace
    } = (0, _code8.useDSWorkspaceContext)();
    const [ready, setReady] = React.useState(controller.ready);
    (0, _code6.useBinder)([controller], () => setReady(controller.ready));
    const [selected, setSelected] = React.useState(workspace?.application);
    const [fetching, setFetching] = React.useState();
    if (!ready) return null;
    const {
      texts
    } = controller;
    return /*#__PURE__*/React.createElement(AppsSettingsContext.Provider, {
      value: {
        fetching,
        setFetching,
        selected,
        setSelected,
        texts
      }
    }, /*#__PURE__*/React.createElement(ApplicationsSelect, null), selected && /*#__PURE__*/React.createElement(_code9.AppDistributions, {
      texts: texts.distribution,
      application: selected
    }));
  }
  /***********
  JS PROCESSOR
  ***********/

  /******************
  FILE: controller.js
  ******************/


  const controller = new class Controller extends _js.ReactiveModel {
    #model;

    get model() {
      return this.#model;
    }

    get texts() {
      return module.texts.current?.value;
    }

    get ready() {
      return module.texts.current.ready && this.#model.ready;
    }

    constructor(props) {
      super(props);
      this.#model = _ts.Dashboard;
      module.texts.current.bind('change', this.triggerEvent);
      this.#model.bind('change', this.triggerEvent);
    }

  }();
  const modules = new Map(); // Exports managed by beyond bundle objects

  __pkg.exports.managed = function (require, _exports) {}; // Module exports


  __pkg.exports.process = function (require) {};

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;

  __pkg.initialise(modules);
});