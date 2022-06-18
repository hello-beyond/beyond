define(["exports", "@beyond-js/ui/modal/code", "@beyond-js/ui/spinner/code", "@beyond-js/ui/form/code", "@beyond-js/ui/perfect-scrollbar/code", "@beyond-js/dashboard-lib/models/js", "@beyond-js/dashboard/ds-contexts/code", "@beyond-js/dashboard/ds-select/code", "@beyond-js/dashboard/workspace-tree/code", "@beyond-js/dashboard/core-components/code", "@beyond-js/dashboard/unnamed/workspace/components/favorites/code", "@beyond-js/dashboard/hooks/code", "@beyond-js/kernel/texts/ts", "react", "react-dom"], function (_exports, _code, _code2, _code3, _code4, _js, _code5, _code6, _code7, _code8, _code9, _code10, _ts, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.ModuleTree = ModuleTree;
  _exports.WorspaceAside = WorspaceAside;
  _exports.hmr = void 0;

  //BEYOND UI
  //LIBRARIES
  //CONTEXT AND WORKSPACE OBJECTS
  //  @beyond-js Texts
  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/dashboard/aside/code").package();

  externals.register(new Map([["react", dependency_0], ["react-dom", dependency_1]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /***********
  JS PROCESSOR
  ***********/

  /******************
  FILE: controller.js
  ******************/

  class Controller extends _js.ReactiveModel {
    get ready() {
      return this.#texts.ready;
    }

    #texts;

    get texts() {
      return this.#texts?.value;
    }

    #workspace;

    get workspace() {
      return this.#workspace;
    }

    get application() {
      return this.#workspace?.active;
    }

    get moduleManager() {
      return this.workspace?.active?.moduleManager;
    }

    get modules() {
      return this.workspace?.active?.modules;
    }

    constructor(workspace) {
      super();
      this.#workspace = workspace;
      workspace.bind('change', this.triggerEvent);
      const module = __pkg.bundle.module.resource;
      this.#texts = new _ts.CurrentTexts(module, true);
      this.#texts.bind('change', this.triggerEvent);
    }

    clean() {
      this.#texts.unbind('change', this.triggerEvent);
    }

  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }
  /********
  aside.jsx
  ********/


  function Aside() {
    const {
      panel
    } = (0, _code5.useDSAsideContext)();
    if (!panel) return null;
    const objectPanels = {
      application: ProjectTree,
      module: ModuleTree,
      template: TemplateRootTree,
      statics: StaticsRootTree,
      favorites: _code9.AsideFavorites
    };
    const Control = objectPanels[panel]; // const tree = (panel === 'application') ? modules : moduleManager.active?.bundles;

    const clsDetail = `ds__aside__detail`;
    return /*#__PURE__*/React.createElement("aside", null, /*#__PURE__*/React.createElement(_code4.BeyondScrollContainer, {
      className: clsDetail
    }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_code2.BeyondSpinner, {
      active: true
    }), /*#__PURE__*/React.createElement(Control, null))));
  }
  /**************
  aside\empty.jsx
  **************/


  function Empty() {
    const {
      texts
    } = (0, _code5.useDSAsideContext)();
    return /*#__PURE__*/React.createElement("div", {
      className: "ds-aside__empty"
    }, /*#__PURE__*/React.createElement(_code8.DSIcon, {
      icon: "project"
    }), texts.empty);
  }
  /***************
  aside\module.jsx
  ***************/

  /**
   * Render the module tree
   * @param module ModuleModel, is optional only is passed if the tree will be showed into the application tree.
   * @param hideTitle
   * @returns {JSX.Element}
   * @constructor
   */


  function ModuleTree({
    module,
    hideTitle = false
  }) {
    let {
      application: {
        moduleManager: {
          active
        }
      }
    } = (0, _code5.useDSAsideContext)();
    let {
      texts: {
        tree: texts
      }
    } = (0, _code5.useDSAsideContext)();
    const model = module ?? active;

    if (!model || !model?.bundles) {
      return /*#__PURE__*/React.createElement("div", {
        className: "ds__aside__detail"
      }, /*#__PURE__*/React.createElement("div", {
        className: "alert alert-info"
      }, /*#__PURE__*/React.createElement("h3", null, texts.module.empty.title), /*#__PURE__*/React.createElement("span", null, texts.module.empty.description)));
    }

    const {
      bundlesTree,
      static: staticFiles
    } = model;
    const specs = {};
    if (!hideTitle) specs.title = model.name;
    return /*#__PURE__*/React.createElement(React.Fragment, null, bundlesTree && /*#__PURE__*/React.createElement(_code7.DSTree, _extends({}, specs, {
      tree: bundlesTree
    })), staticFiles && /*#__PURE__*/React.createElement(_code7.DSTree, {
      title: texts.static.title,
      tree: staticFiles
    }));
  }
  /****************
  aside\project.jsx
  ****************/

  /**
   * Renders the application tree
  
   * @param tree
   * @returns {JSX.Element}
   * @constructor
   */


  function ProjectTree({
    tree
  }) {
    let {
      application,
      texts
    } = (0, _code5.useDSAsideContext)();
    const {
      workspace
    } = (0, _code5.useDSWorkspaceContext)();
    const toPrint = [];
    texts = texts.tree;
    if (!application) return null;
    toPrint.push( /*#__PURE__*/React.createElement(_code7.DSTree, {
      title: texts.modules,
      tree: application.modulesTree,
      key: "application"
    }));
    application.libraries.forEach(library => {
      const modules = application.itemsByContainer(library.id);
      if (!modules.length) return;
      toPrint.push( /*#__PURE__*/React.createElement(_code7.DSTree, {
        key: "modules",
        title: library.library.name,
        tree: modules
      }));
    });

    const openInfo = event => {
      event.stopPropagation();
      event.preventDefault();
      workspace.openApp(application?.application?.id);
    };

    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("header", {
      className: "ds-aside__header flex-row flex-space"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "row"
    }, application.application.name ?? application.id)), /*#__PURE__*/React.createElement("div", {
      className: "aside__link",
      onClick: openInfo
    }, /*#__PURE__*/React.createElement(_code8.DSIcon, {
      icon: "info"
    }), /*#__PURE__*/React.createElement("span", null, " Information ")), toPrint);
  }
  /***************
  aside\static.jsx
  ***************/


  function StaticsRootTree() {
    const {
      workspace: {
        application
      }
    } = (0, _code5.useDSWorkspaceContext)();
    const {
      texts
    } = (0, _code5.useDSAsideContext)();
    if (!application.application) return null;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
      className: "ds-aside__header"
    }, /*#__PURE__*/React.createElement("h3", null, texts.static.title)), /*#__PURE__*/React.createElement(_code7.DSTree, {
      title: texts.static.title,
      object: application.application,
      tree: application.static
    }));
  }
  /*****************
  aside\template.jsx
  *****************/


  function TemplateRootTree() {
    let {
      workspace
    } = (0, _code5.useDSWorkspaceContext)();
    const {
      texts: {
        tree: {
          template: texts
        }
      }
    } = (0, _code5.useDSAsideContext)();
    const {
      application,
      global,
      processors
    } = workspace?.application?.template;
    const output = [];

    const getTree = (obj, key, title) => /*#__PURE__*/React.createElement(_code7.DSTree, {
      key: key,
      title: title,
      tree: obj
    });

    output.push(getTree(application, 'app', texts.application));
    output.push(getTree(global, 'globals', texts.global));
    processors.forEach((processor, key) => output.push(getTree(processor, key, key)));
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
      className: "ds-aside__header"
    }, /*#__PURE__*/React.createElement("h3", null, texts.title)), output);
  }
  /************
  container.jsx
  ************/


  function WorspaceAside() {
    const {
      panels,
      workspace
    } = (0, _code5.useDSWorkspaceContext)();
    const {
      aside
    } = workspace;
    /**
     * @var panel {string} Represents the aside panel, is the control name.
     */

    const [state, setState] = React.useState({
      panel: aside.panel
    });
    let cls = `ds__aside ${state?.panel ? '' : 'hide-detail'}`;
    const ref = React.useRef(null);
    (0, _code10.useBinder)([aside], () => setState(state => ({ ...state,
      panel: aside.panel,
      application: workspace?.application,
      moduleManager: workspace?.application?.moduleManager,
      modules: workspace?.application?.modules
    })));
    React.useEffect(() => {
      const controller = new Controller(workspace);

      const onChange = () => setState({ ...state,
        controller,
        modules: controller?.modules,
        application: workspace?.application,
        texts: controller?.texts,
        ready: controller?.ready,
        setActiveAside: workspace.aside.setActive,
        panel: aside.panel,
        moduleManager: workspace?.application?.moduleManager
      });

      onChange();
      controller.bind('change', onChange);
      return () => controller.unbind('change', onChange);
    }, []);
    if (!state.ready) return /*#__PURE__*/React.createElement(AsidePreload, null);
    return /*#__PURE__*/React.createElement(_code5.DSAsideContext.Provider, {
      value: { ...state,
        panels
      }
    }, /*#__PURE__*/React.createElement("aside", {
      className: cls,
      ref: ref
    }, /*#__PURE__*/React.createElement(PreAside, null), /*#__PURE__*/React.createElement(Aside, null)));
  }
  /*************************
  preaside\pre-aside-tab.jsx
  *************************/

  /**
   * Represents a preaside option element.
   *
   * @param name
   * @param setActive
   * @param tab
   * @param active
   * @returns {JSX.Element}
   * @constructor
   */


  function PreAsideTab({
    name,
    tab
  }) {
    const {
      activePreAside: active
    } = (0, _code5.useDSAsideContext)();
    const cls = name === active ? 'active' : '';

    const onClick = event => {
      event.stopPropagation();
      tab.action(name);
    };

    const datas = {};
    if (tab.tippy) datas.tippy = tab.tippy;
    return /*#__PURE__*/React.createElement("li", {
      className: cls
    }, /*#__PURE__*/React.createElement(_code8.DSIconButton, _extends({
      title: tab.title,
      icon: tab.icon
    }, datas, {
      onClick: onClick
    })));
  }
  /*********************
  preaside\pre-aside.jsx
  *********************/


  function PreAside() {
    const bottomNav = [];
    const topNav = [];
    const [items, setItems] = React.useState({
      top: _code5.DSPreAside.top,
      bottom: _code5.DSPreAside.bottom
    });
    items.top.forEach((item, name) => topNav.push( /*#__PURE__*/React.createElement(PreAsideTab, {
      key: name,
      name: name,
      tab: item
    })));
    items.bottom.forEach((item, name) => bottomNav.push( /*#__PURE__*/React.createElement(PreAsideTab, {
      key: name,
      name: name,
      tab: item
    })));
    (0, _code10.useBinder)([_code5.DSPreAside], () => setItems({
      top: _code5.DSPreAside.top,
      bottom: _code5.DSPreAside.bottom
    }), 'item.added');
    return /*#__PURE__*/React.createElement("section", {
      className: "ds__pre-aside"
    }, /*#__PURE__*/React.createElement("ul", {
      className: "start-list"
    }, topNav), /*#__PURE__*/React.createElement("ul", {
      className: "end-list"
    }, bottomNav));
  }
  /**********
  preload.jsx
  **********/


  function AsidePreload() {
    return /*#__PURE__*/React.createElement("aside", {
      className: "ds__aside hide-detail"
    }, /*#__PURE__*/React.createElement("section", {
      className: "ds__pre-aside"
    }, /*#__PURE__*/React.createElement("ul", {
      className: "start-list"
    }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(_code8.DSIconButton, {
      icon: "folder"
    }))), /*#__PURE__*/React.createElement("ul", {
      className: "end-list"
    }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(_code8.DSIconButton, {
      icon: "add",
      disabled: true
    })), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(_code8.DSIconButton, {
      icon: "add",
      disabled: true
    })), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(_code8.DSIconButton, {
      icon: "add",
      disabled: true
    })), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(_code8.DSIconButton, {
      icon: "folder",
      disabled: true
    })), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(_code8.DSIconButton, {
      icon: "settings",
      disabled: true
    })))), /*#__PURE__*/React.createElement("div", {
      className: "ds__aside__detail"
    }, /*#__PURE__*/React.createElement("div", null)));
  }
  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/dashboard/aside/code', '.ds__aside{display:flex;flex-direction:row;position:relative;align-items:start;background:var(--ds-aside-bg);transition:all .2s linear;height:calc(100vh - 81px)}.ds__aside.hide-detail .ds__aside__detail{width:0;display:none;transition:all .3s linear}.ds__aside .aside__link{padding:8px 15px;border-bottom:1px solid #050910;cursor:pointer;transition:.2s all ease-in}.ds__aside .aside__link:hover{background:#050910}.ds__aside .aside__link .beyond-icon{margin:0;fill:red;height:16px;width:16px;font-size:13px}.ds__aside .ds__aside__detail{padding:0;z-index:2;min-width:220px;max-width:220px;position:sticky;align-items:start;top:50px;height:calc(100vh - 81px);overflow:hidden;width:100%;transition:all .3s linear}.ds__aside .ds__aside__detail>.beyond-element-spinner{display:none}.ds__aside .ds__aside__detail.is-fetching{opacity:.3}.ds__aside .ds__aside__detail.is-fetching .ds-aside__header .beyond-icon{display:none}.ds__aside .ds__aside__detail.is-fetching>.beyond-element-spinner{display:flex;position:absolute;top:15px;right:15px}.ds__aside .ds__aside__detail .ds-tree{position:relative}.ds-aside__header{align-items:center;padding:0 0 0 15px;height:34px;border-bottom:2px solid var(--beyond-secondary-light-color);display:flex;justify-content:space-between}.ds-aside__header.flex-row{display:flex}.ds-aside__header.flex-space{justify-content:space-between}.ds-aside__header .beyond-icon{fill:var(--beyond-gray-lighter-color)}.ds-aside__header h3{margin:0;font-size:14px;padding:0}.ds-aside__header .inline__actions .beyond-icon-button{margin:0;height:30px;width:30px}.ds__pre-aside ul li{border-left:4px solid transparent}.ds__pre-aside ul li .beyond-icon-button{opacity:.7;cursor:not-allowed}.ds__pre-aside ul li.disabled{opacity:.7;cursor:none}.ds__pre-aside ul li .beyond-icon-button{height:50px;width:50px;fill:var(--beyond-text-on-secondary);transition:all 150ms linear}.ds__pre-aside ul li .beyond-icon-button svg{height:20px;width:20px}.ds__pre-aside ul li.active,.ds__pre-aside ul li:active,.ds__pre-aside ul li:hover{border-left-color:var(--beyond-primary-dark-color);background:rgba(255,255,255,.1)}.ds__pre-aside ul li.active .beyond-icon-button,.ds__pre-aside ul li:active .beyond-icon-button,.ds__pre-aside ul li:hover .beyond-icon-button{opacity:1}.ds__pre-aside{display:flex;flex-direction:column;align-items:start;position:sticky;top:50px;justify-content:space-between;height:calc(100vh - 80px);border-right:.5px solid var(--beyond-secondary-dark-color);background:var(--ds-aside-secondary-bg)}.ds__pre-aside .end-list{border-top:1px solid #fff;background:var(--ds-preaside-bg)}.ds__pre-aside ul{list-style:none;padding:0;margin:0}');
  legacyStyles.appendToDOM();
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