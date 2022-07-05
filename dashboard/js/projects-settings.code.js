define(["exports", "@beyond-js/dashboard-lib/models.ts", "@beyond-js/dashboard-lib/models.legacy", "@beyond-js/ui/spinner", "@beyond-js/ui/form", "@beyond-js/ui/preload-text", "@beyond-js/dashboard/ds-select", "@beyond-js/ui/modal", "@beyond-js/dashboard/hooks", "@beyond-js/dashboard/core-components", "@beyond-js/dashboard/ds-contexts", "@beyond-js/dashboard/project-distributions.code", "@beyond-js/kernel/texts", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _models, _models2, _spinner, _form, _preloadText, _dsSelect, _modal, _hooks, _coreComponents, _dsContexts, _projectDistributions, _texts, dependency_0, dependency_1, dependency_2) {
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
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/dashboard/projects-settings",
    "multibundle": true,
    "bundle": "code"
  }).package();

  ;
  externals.register(new Map([["react", dependency_1], ["react-dom", dependency_2]]));
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
    } = (0, _dsContexts.useDSWorkspaceContext)();

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
    }, /*#__PURE__*/React.createElement(_dsSelect.DSSelect, {
      options: options,
      value: selected?.id,
      onSelect: handleChange
    }), fetching && /*#__PURE__*/React.createElement(_spinner.BeyondSpinner, {
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
    } = (0, _dsContexts.useDSWorkspaceContext)();
    const [ready, setReady] = React.useState(controller.ready);
    (0, _hooks.useBinder)([controller], () => setReady(controller.ready));
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
    }, /*#__PURE__*/React.createElement(ApplicationsSelect, null), selected && /*#__PURE__*/React.createElement(_projectDistributions.AppDistributions, {
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


  const controller = new class Controller extends _models2.ReactiveModel {
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
      this.#model = _models.Dashboard;
      this.#model.bind('change', this.triggerEvent);
      const module = __pkg.bundle.module.resource;
      this.#texts = new _texts.CurrentTexts(module, true);
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