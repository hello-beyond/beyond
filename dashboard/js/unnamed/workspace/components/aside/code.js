define(["exports", "react", "react-dom", "@beyond-js/ui/modal/code", "@beyond-js/ui/spinner/code", "@beyond-js/ui/form/code", "@beyond-js/ui/perfect-scrollbar/code", "@beyond-js/dashboard-lib/models/js", "@beyond-js/dashboard/unnamed/workspace/context/code", "@beyond-js/dashboard/unnamed/components/select/code", "@beyond-js/dashboard/unnamed/workspace/components/tree/code", "@beyond-js/dashboard/unnamed/components/core/code", "@beyond-js/dashboard/unnamed/workspace/components/favorites/code", "@beyond-js/dashboard/unnamed/components/binder/code"], function (_exports, React, ReactDOM, _code, _code2, _code3, _code4, _js, _code5, _code6, _code7, _code8, _code9, _code10) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.ModuleTree = ModuleTree;
  _exports.WorspaceAside = WorspaceAside;
  //BEYOND UI
  //LIBRARIES
  //CONTEXT AND WORKSPACE OBJECTS
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/workspace/components/aside/code', false, {
    "txt": {
      "multilanguage": true
    }
  });
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /***********
  JS PROCESSOR
  ***********/

  /******************
  FILE: controller.js
  ******************/


  class Controller extends _js.ReactiveModel {
    get ready() {
      return module.texts.ready;
    }

    get texts() {
      return module.texts.value ?? {};
    }

    _workspace;

    get workspace() {
      return this._workspace;
    }

    get application() {
      return this._workspace?.active;
    }

    get moduleManager() {
      return this.workspace?.active?.moduleManager;
    }

    get modules() {
      return this.workspace?.active?.modules;
    }

    constructor(workspace) {
      super();
      this._workspace = workspace;
      workspace.bind('change', this.triggerEvent);
      module.texts.bind('change', this.triggerEvent);
    }

    clean() {
      module.texts.unbind('change', this.triggerEvent);
    }

  }
  /************
  JSX PROCESSOR
  ************/


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
      tree,
      panel
    } = (0, _code5.useDSAsideContext)();
    if (!panel) return null;
    const objectPanels = {
      application: ApplicationTree,
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
    }), /*#__PURE__*/React.createElement(Control, {
      tree: tree
    }))));
  }
  /********************
  aside\application.jsx
  ********************/

  /**
   * Renders the application tree
  
   * @param tree
   * @returns {JSX.Element}
   * @constructor
   */


  function ApplicationTree({
    tree
  }) {
    let {
      panels,
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
    }, /*#__PURE__*/React.createElement(_code8.DsIcon, {
      icon: "info"
    }), /*#__PURE__*/React.createElement("span", null, " Information ")), toPrint);
  }
  /*************************
  aside\bundle-form\form.jsx
  *************************/


  function AddBundleForm({
    setShowModal,
    module
  }) {
    const {
      texts: {
        tree: {
          bundle: texts
        }
      }
    } = (0, _code5.useDSAsideContext)();
    const [widget, setWidget] = React.useState(false);
    const [type, setType] = React.useState("widget");
    const [fetching, setFetching] = React.useState(false);
    const [bundle, setBundle] = React.useState(undefined);
    const [submitWithWidget, setSubmitWithWidget] = React.useState({});
    const [widgetChange, setWidgetWidgetChange] = React.useState(false);
    const [formValues, handleChange, reset, route, errorName, setErrorName, errorRute, setErrorRute] = useForm({
      name: '',
      route: ''
    });
    const props = {};
    if (!bundle) props.disabled = true;

    const onClose = () => {
      setBundle(undefined);
      setShowModal(false);
    };

    const onClick = e => {
      e.stopPropagation();
    };

    const onSave = async e => {
      e.preventDefault();
      e.stopPropagation();

      if (widget) {
        setWidgetWidgetChange(true);
        setWidget(false);
        return;
      }

      if (widget && name.length === 0) {
        setErrorName(true);
        return;
      }

      setFetching(true);

      if (widgetChange) {
        if (type === 'page') {
          if (route.length === 0) {
            setErrorRute(true);
            return;
          }

          setSubmitWithWidget({
            name: name,
            type: type,
            route: route
          });
          await module.addBundle({
            bundle: submitWithWidget
          });
        } else {
          setSubmitWithWidget({
            name: name,
            type: type
          });
          await module.addBundle({
            bundle: submitWithWidget
          });
        }

        setFetching(false);
        reset();
        onClose();
        return;
      }

      await module.addBundle({
        bundle: bundle
      });
      setFetching(false);
      reset();
      onClose();
    };

    const onHandleChange = (e, item) => {
      e.stopPropagation();
      const target = e.currentTarget;
      const parent = target.closest('ul');
      setBundle(item);
      parent.querySelectorAll('li.selected').forEach(li => li.classList.remove('selected'));
      e.currentTarget.classList.add('selected');
      setWidget(item === 'widget');
    };

    const items = [];
    ['widget', 'code', 'start', 'backend'].forEach(item => {
      items.push( /*#__PURE__*/React.createElement("li", {
        key: item,
        onClick: e => onHandleChange(e, item)
      }, /*#__PURE__*/React.createElement("span", {
        className: "circle"
      }), /*#__PURE__*/React.createElement("span", null, item)));
    });

    const toReturn = () => {
      setWidgetWidgetChange(false);
      setWidget(false);
    };

    const text = widget ? texts.actions.next : texts.actions.save;
    const CONTROLS = {
      widget: WidgetFields,
      default: WidgetFields
    };
    const Control = widgetChange ? WidgetFields : CONTROLS.default;
    return /*#__PURE__*/React.createElement(_code.BeyondModal, {
      show: true,
      className: "xs ds-modal ds-tree__forms",
      onClose: onClose
    }, /*#__PURE__*/React.createElement("header", {
      onClick: onClick,
      className: "ds-modal_header"
    }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h4", null, widgetChange ? texts.widget.title : texts.title))), /*#__PURE__*/React.createElement("div", {
      onClick: onClick,
      className: "ds-modal__content"
    }, /*#__PURE__*/React.createElement("form", {
      onSubmit: onSave
    }, widgetChange ? /*#__PURE__*/React.createElement(Control, {
      setType: setType,
      type: type,
      fetching: fetching,
      formValues: formValues,
      errorRute: errorRute,
      errorName: errorName,
      handleChange: handleChange
    }) : /*#__PURE__*/React.createElement("ul", {
      className: "selectable__list"
    }, items), /*#__PURE__*/React.createElement("div", {
      className: widgetChange ? 'actions between' : 'actions end'
    }, widgetChange && /*#__PURE__*/React.createElement(_code3.BeyondButton, {
      className: "boton-left",
      onClick: toReturn
    }, "Volver"), /*#__PURE__*/React.createElement(_code3.BeyondButton, _extends({}, props, {
      onClick: onSave,
      className: "primary roundell"
    }), fetching ? /*#__PURE__*/React.createElement(_code2.BeyondSpinner, {
      fetching: true,
      className: "on-primary"
    }) : text)))));
  }
  /**********************************
  aside\bundle-form\widget-fields.jsx
  **********************************/


  function WidgetFields({
    formValues,
    type,
    setType,
    fetching,
    errorRute,
    errorName,
    handleChange
  }) {
    const {
      name,
      route
    } = formValues;

    const handleChangeSelect = ele => setType(ele.value);

    const options = [{
      value: 'page',
      label: 'Page'
    }, {
      value: 'layout',
      label: 'Layout'
    }, {
      value: 'widget',
      label: 'Widget'
    }];
    return /*#__PURE__*/React.createElement("div", {
      className: "group-inputs"
    }, /*#__PURE__*/React.createElement(_code3.BeyondInput, {
      name: "name",
      label: "Nombre",
      placeholder: "Nombre del bundle",
      value: name,
      onChange: handleChange,
      required: true,
      disabled: fetching
    }), errorName && /*#__PURE__*/React.createElement("span", null, "Ingrese un Nombre"), /*#__PURE__*/React.createElement("div", {
      className: "form-select"
    }, /*#__PURE__*/React.createElement("label", null, "Tipo de widget"), /*#__PURE__*/React.createElement(_code6.DSSelect, {
      options: options,
      value: type,
      onSelect: handleChangeSelect
    })), type === 'page' && /*#__PURE__*/React.createElement(_code3.BeyondInput, {
      required: true,
      name: "route",
      value: route,
      label: "Ruta de la P\xE1gina",
      placeholder: "Ruta de la P\xE1gina",
      disabled: fetching,
      onChange: handleChange
    }), errorRute && /*#__PURE__*/React.createElement("span", null, "Ingrese una url"));
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
    }, /*#__PURE__*/React.createElement(_code8.DsIcon, {
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
      texts
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
    }, /*#__PURE__*/React.createElement("h3", null, texts.template.title)), /*#__PURE__*/React.createElement(_code7.DSTree, {
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
      texts
    } = (0, _code5.useDSAsideContext)();
    const {
      application,
      processors
    } = workspace?.application?.template;
    const output = [];

    const getTree = (obj, key, title) => /*#__PURE__*/React.createElement(_code7.DSTree, {
      key: key,
      title: title,
      tree: obj
    });

    output.push(getTree(application, "Aplicacion", "Aplicación"));
    processors.forEach((processor, key) => output.push(getTree(processor, key, key)));
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
      className: "ds-aside__header"
    }, /*#__PURE__*/React.createElement("h3", null, texts.template.title)), output);
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

    const defaultAside = routing.uri.qs.has('aside') ? routing.uri.qs.get('aside') : false;
    const [state, setState] = React.useState({
      panel: defaultAside
    });
    let cls = `ds__aside ${state?.panel ? '' : 'hide-detail'}`;
    const ref = React.useRef(null);
    (0, _code10.useBinder)([aside], () => setState(state => ({ ...state,
      panel: aside.panel,
      application: workspace?.application,
      moduleManager: workspace?.application?.moduleManager,
      modules: workspace?.application?.modules
    })));

    const changeCls = () => {
      ref.current.closest('.ds-application-view-layout').classList.toggle('aside-hidden');
      ref.current.classList.toggle('hide-detail');
    };

    React.useEffect(() => {
      const controller = new Controller(workspace);

      const onChange = () => setState({ ...state,
        controller,
        modules: controller?.modules,
        application: workspace?.application,
        texts: controller?.texts,
        ready: controller?.ready,
        setActiveAside: workspace.aside.setActive,
        panel: controller?.aside,
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
    }, /*#__PURE__*/React.createElement(PreAside, {
      changeCls: changeCls
    }), /*#__PURE__*/React.createElement(Aside, null)));
  } // function useController(Controller) {
  //
  //     const [state, setState] = React.useState({});
  //
  //     React.useEffect(() => {
  //         const control = new Controller();
  //         useBinder([control], () => setState({
  //             ...state,
  //             controller: control,
  //             ready: controller.ready
  //         }));
  //
  //     }, []);
  //     return [state.ready, state.controller];
  // }

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
      activePreAside: active,
      setActiveAside
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
    }, /*#__PURE__*/React.createElement(_code8.DsIconButton, _extends({
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

    _code5.DSPreAside.top.forEach((item, name) => topNav.push( /*#__PURE__*/React.createElement(PreAsideTab, {
      key: name,
      name: name,
      tab: item
    })));

    _code5.DSPreAside.bottom.forEach((item, name) => bottomNav.push( /*#__PURE__*/React.createElement(PreAsideTab, {
      key: name,
      name: name,
      tab: item
    })));

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
    }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(_code8.DsIconButton, {
      icon: "folder"
    }))), /*#__PURE__*/React.createElement("ul", {
      className: "end-list"
    }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(_code8.DsIconButton, {
      icon: "add",
      disabled: true
    })), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(_code8.DsIconButton, {
      icon: "add",
      disabled: true
    })), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(_code8.DsIconButton, {
      icon: "add",
      disabled: true
    })), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(_code8.DsIconButton, {
      icon: "folder",
      disabled: true
    })), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(_code8.DsIconButton, {
      icon: "settings",
      disabled: true
    })))), /*#__PURE__*/React.createElement("div", {
      className: "ds__aside__detail"
    }, /*#__PURE__*/React.createElement("div", null)));
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.ds__aside{display:flex;flex-direction:row;position:relative;align-items:start;background:#121f36;transition:all .2s linear}.ds__aside.hide-detail .ds__aside__detail{width:0;display:none;transition:all .3s linear}.ds__aside .aside__link{padding:8px 15px;border-bottom:1px solid #050910;cursor:pointer;transition:.2s all ease-in}.ds__aside .aside__link:hover{background:#050910}.ds__aside .aside__link .beyond-icon{margin:0;fill:red;height:16px;width:16px;font-size:13px}.ds__aside .ds__aside__detail{padding:0;z-index:999;min-width:220px;max-width:220px;position:sticky;align-items:start;top:50px;height:calc(100vh - 70px);width:100%;transition:all .3s linear}.ds__aside .ds__aside__detail>.beyond-element-spinner{display:none}.ds__aside .ds__aside__detail.is-fetching{opacity:.3}.ds__aside .ds__aside__detail.is-fetching .ds-aside__header .beyond-icon{display:none}.ds__aside .ds__aside__detail.is-fetching>.beyond-element-spinner{display:flex;position:absolute;top:15px;right:15px}.ds__aside .ds__aside__detail .ds-tree{position:relative}.ds-aside__header{align-items:center;padding:0 0 0 15px;height:34px;border-bottom:2px solid #313c50;display:flex;justify-content:space-between}.ds-aside__header.flex-row{display:flex}.ds-aside__header.flex-space{justify-content:space-between}.ds-aside__header .beyond-icon{fill:#F0F0F0}.ds-aside__header h3{margin:0;font-size:14px;padding:0}.ds-aside__header .inline__actions .beyond-icon-button{margin:0;height:30px;width:30px}.ds__pre-aside ul li{border-left:4px solid transparent}.ds__pre-aside ul li .beyond-icon-button{opacity:.7;cursor:not-allowed}.ds__pre-aside ul li.disabled{opacity:.7;cursor:none}.ds__pre-aside ul li .beyond-icon-button{height:50px;width:50px;fill:#FFFFFF;transition:all 150ms linear}.ds__pre-aside ul li .beyond-icon-button svg{height:20px;width:20px}.ds__pre-aside ul li.active,.ds__pre-aside ul li:active,.ds__pre-aside ul li:hover{border-left-color:#e36152;background:rgba(255,255,255,.1)}.ds__pre-aside ul li.active .beyond-icon-button,.ds__pre-aside ul li:active .beyond-icon-button,.ds__pre-aside ul li:hover .beyond-icon-button{opacity:1}.ds__pre-aside{display:flex;flex-direction:column;align-items:start;position:sticky;top:50px;justify-content:space-between;height:calc(100vh - 80px);border-right:.5px solid rgba(5,9,16,.4)}.ds__pre-aside .end-list{border-top:1px solid #fff;background:#050910}.ds__pre-aside ul{list-style:none;padding:0;margin:0}';
  bundle.styles.appendToDOM();
});