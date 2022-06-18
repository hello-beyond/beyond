define(["exports", "@beyond-js/dashboard-lib/models/ts", "@beyond-js/dashboard-lib/models/js", "@beyond-js/ui/spinner/code", "@beyond-js/ui/form/code", "@beyond-js/ui/preload-text/code", "@beyond-js/dashboard/ds-select/code", "@beyond-js/ui/modal/code", "@beyond-js/dashboard/hooks/code", "@beyond-js/dashboard/core-components/code", "@beyond-js/dashboard/ds-contexts/code", "@beyond-js/dashboard/app-distributions/code", "@beyond-js/kernel/texts/ts", "react", "react-dom"], function (_exports, _ts, _js, _code, _code2, _code3, _code4, _code5, _code6, _code7, _code8, _code9, _ts2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.ApplicationsSettings = ApplicationsSettings;
  _exports.hmr = void 0;

  //WORKSPACE CONTEXT
  //  @beyond-js Texts
  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/dashboard/applications-settings/code").package();

  externals.register(new Map([["react", dependency_0], ["react-dom", dependency_1]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
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

    #texts;

    get texts() {
      return this.#texts?.value;
    }

    get ready() {
      return this.#texts.ready && this.#model.ready;
    }

    constructor(props) {
      super(props);
      this.#model = _ts.Dashboard;
      this.#model.bind('change', this.triggerEvent);
      const module = __pkg.bundle.module.resource;
      this.#texts = new _ts2.CurrentTexts(module, true);
      this.#texts.bind('change', this.triggerEvent);
    }

  }();
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