define(["exports", "@beyond-js/ui/spinner", "@beyond-js/ui/form", "dayjs", "@beyond-js/dashboard/core-components", "@beyond-js/dashboard/hooks", "@beyond-js/dashboard/texts-binder", "@beyond-js/dashboard/ds-contexts", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _spinner, _form, dayjs, _coreComponents, _hooks, _textsBinder, _dsContexts, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.AlertsSection = AlertsSection;
  _exports.ModuleBoard = ModuleBoard;
  _exports.hmr = void 0;
  //Beyond ui
  //Ds components
  //WORKSPACE CONTEXT AND MODELS
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/dashboard/module-view",
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
  /*******************
  alerts\alert-box.jsx
  *******************/

  function AlertBox({
    title,
    type,
    elements
  }) {
    if (!elements.length) return null;
    const output = elements.map(item => /*#__PURE__*/React.createElement("li", {
      key: item.id
    }, item.message));
    return /*#__PURE__*/React.createElement(_coreComponents.BeyondAlert, {
      type: type
    }, /*#__PURE__*/React.createElement("h4", null, title), /*#__PURE__*/React.createElement("ul", {
      className: "alert-list"
    }, output));
  }
  /*********************
  alerts\diagnostics.jsx
  *********************/

  /*
   * Returns a string with the corresponding formatted time
   * @param int $timestamp timestamp to be parsed
   * @return string
   */


  function Diagnostics() {
    const {
      model,
      model: {
        bundles: {
          compilers
        }
      },
      texts
    } = useModuleContext();
    const [fetching, setFetching] = React.useState(compilers?.fetching);
    const [ready, setReady] = React.useState(false);
    React.useEffect(() => {
      compilers.load();
    }, []);
    (0, _hooks.useBinder)([compilers], () => {
      setFetching(compilers.fetching);
      setReady(dayjs.default());
    });

    if (!ready || compilers.fetching) {
      return /*#__PURE__*/React.createElement("div", {
        className: "flex-container flex-space"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "text-info"
      }, texts.diagnostics.fetching), /*#__PURE__*/React.createElement(_spinner.BeyondSpinner, {
        active: true
      }));
    }

    const output = Array.from(model.bundles.items.values()).map(bundle => {
      return /*#__PURE__*/React.createElement(BundleDiagnostics, {
        bundle: bundle,
        key: bundle.id
      });
    });
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "beyond-alert alert-info flex-container flex-space"
    }, /*#__PURE__*/React.createElement("h5", null, texts.diagnostics.ready, ": ", ready?.format('YYYY/MM/DD'), " ")), output);
  }
  /****************************
  alerts\diagnostics\bundle.jsx
  ****************************/


  function BundleDiagnostics({
    bundle,
    className
  }) {
    const {
      texts
    } = useModuleContext();
    const [diagnostics, setDiagnostics] = React.useState(bundle.compiler?.diagnostics ?? {});
    const {
      general,
      files,
      overwrites,
      dependencies
    } = diagnostics;
    (0, _hooks.useBinder)([bundle], () => setDiagnostics({ ...bundle.compiler.diagnostics
    }));

    if (!general?.length && !files?.size && !overwrites?.size && !dependencies?.size) {
      return null;
    }

    const attrs = {};
    if (className) attrs.className = 'connections-item__errors';
    return /*#__PURE__*/React.createElement("section", attrs, /*#__PURE__*/React.createElement("h3", null, texts.diagnostics.title, /*#__PURE__*/React.createElement("span", {
      className: "diagnostics__bundle__title"
    }, bundle.name)), /*#__PURE__*/React.createElement(GeneralDiagnostics, {
      data: diagnostics.general
    }), /*#__PURE__*/React.createElement(FilesDiagnostics, {
      name: "files",
      bundle: bundle,
      data: diagnostics.files
    }), /*#__PURE__*/React.createElement(FilesDiagnostics, {
      name: "overwrites",
      bundle: bundle,
      data: diagnostics.overwrites
    }), /*#__PURE__*/React.createElement(FilesDiagnostics, {
      name: "dependencies",
      bundle: bundle,
      data: diagnostics.dependencies
    }));
  }
  /***************************
  alerts\diagnostics\files.jsx
  ***************************/


  function FilesDiagnostics({
    bundle,
    data,
    name
  }) {
    const {
      texts,
      model
    } = useModuleContext();
    const {
      workspace
    } = (0, _dsContexts.useDSWorkspaceContext)();
    let output = [];
    const title = texts.diagnostics[name];
    if (!data.size) return null;

    const onClick = async event => {
      event.preventDefault();
      const target = event.currentTarget;
      let {
        lineNumber,
        column
      } = target.dataset;
      lineNumber = parseInt(lineNumber);
      column = parseInt(column);
      const source = await bundle.getFile(target.dataset.file, 'ts');
      const position = {
        lineNumber,
        column
      };
      workspace.openFile({
        source: source,
        path: source.relative.file,
        processor: 'ts',
        position: position,
        module: model
      });
    };

    data.forEach((item, id) => {
      output = output.concat(item.map((item, k) => {
        return /*#__PURE__*/React.createElement("li", {
          key: `${id}.${k}`
        }, /*#__PURE__*/React.createElement("h6", null, item.message), /*#__PURE__*/React.createElement("div", {
          className: "item__data"
        }, /*#__PURE__*/React.createElement("strong", null, "File"), /*#__PURE__*/React.createElement("span", {
          "data-file": item.file,
          "data-column": item.character,
          "data-line-number": item.line,
          onClick: onClick
        }, item.file)), /*#__PURE__*/React.createElement("div", {
          className: "item__data"
        }, /*#__PURE__*/React.createElement("strong", null, "Line"), /*#__PURE__*/React.createElement("span", null, item.line)));
      }));
    });
    return /*#__PURE__*/React.createElement(_coreComponents.BeyondAlert, {
      type: "danger"
    }, /*#__PURE__*/React.createElement("h5", null, title), /*#__PURE__*/React.createElement("ul", null, output));
  }
  /*****************************
  alerts\diagnostics\general.jsx
  *****************************/


  const GeneralDiagnostics = ({
    data
  }) => {
    if (!data.length) return null;
    const {
      model,
      model: {
        compilers,
        module
      },
      texts
    } = useModuleContext();
    const output = data.map((item, i) => /*#__PURE__*/React.createElement("li", {
      key: item.id
    }, item.message));
    return /*#__PURE__*/React.createElement(_coreComponents.BeyondAlert, {
      type: "danger"
    }, /*#__PURE__*/React.createElement("h5", null, texts.diagnostics.generalTitle), /*#__PURE__*/React.createElement("ul", null, output));
  };
  /************************
  alerts\general-alerts.jsx
  ************************/


  function GeneralAlerts() {
    const {
      model
    } = useModuleContext(); // let output = [];

    const [total, setTotal] = React.useState(model.bundles.alerts.total + model.alerts.total);
    (0, _hooks.useBinder)([model], () => setTotal(model.alerts.total));
    (0, _hooks.useBinder)([model.bundles], () => setTotal(model.bundles.alerts.total + model.alerts.total));
    if (total < 1) return null;
    return /*#__PURE__*/React.createElement("div", {
      className: "ds-module__alerts-section"
    }, /*#__PURE__*/React.createElement(AlertBox, {
      title: "Errors",
      elements: model.errors,
      type: "error"
    }), /*#__PURE__*/React.createElement(AlertBox, {
      title: "Warnings",
      elements: model.warnings,
      type: "warning"
    }), /*#__PURE__*/React.createElement(AlertBox, {
      title: "Errors",
      elements: model.bundles.errors,
      type: "error"
    }), /*#__PURE__*/React.createElement(AlertBox, {
      title: "Warnings",
      elements: model.bundles.warnings,
      type: "warning"
    }));
  }
  /***************
  alerts\index.jsx
  ***************/


  function AlertsSection() {
    return /*#__PURE__*/React.createElement("div", {
      className: "module__alerts-section"
    }, /*#__PURE__*/React.createElement(GeneralAlerts, null), /*#__PURE__*/React.createElement(Diagnostics, null));
  }
  /**************
  alerts\item.jsx
  **************/


  function AlertItem({
    item
  }) {
    return /*#__PURE__*/React.createElement("li", null, item);
  }
  /********
  board.jsx
  ********/


  const ModuleContext = React.createContext();

  const useModuleContext = () => React.useContext(ModuleContext);

  function ModuleBoard(props) {
    const {
      specs
    } = props;
    let {
      workspace,
      navigateModule,
      panel
    } = (0, _dsContexts.useDSWorkspaceContext)();
    const [model, setModel] = React.useState();
    const [project, setProject] = React.useState();
    const module = __pkg.bundle.module.resource;
    const [textsReady, texts] = (0, _textsBinder.useTextsBinder)(module);
    React.useEffect(() => {
      const project = workspace.getProject(specs.projectId);
      setProject(project);

      const set = module => {
        setModel(module);
      };

      workspace.getModuleManager(specs.projectId, specs.moduleId).then(set);
    }, [specs.projectId]);
    React.useEffect(() => {
      if ([undefined, null].includes(specs?.moduleId)) return;
      moduleManager.load(specs.moduleId).then(model => {
        setModel(model);
        window.module = model;
        panel.setTabName(specs.moduleId, model.name);
      });
    }, [specs.moduleId]);

    if (!specs.moduleId || !textsReady || !model?.ready || specs.moduleId !== model.id) {
      return /*#__PURE__*/React.createElement(_coreComponents.DSSpinner, null);
    }

    return /*#__PURE__*/React.createElement(ModuleContext.Provider, {
      value: {
        model,
        navigateModule,
        texts,
        application: project,
        project
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ds-module-view__detail ds__board"
    }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement("div", {
      className: "board__container"
    }, /*#__PURE__*/React.createElement(Description, null), /*#__PURE__*/React.createElement(Cards, null), /*#__PURE__*/React.createElement(AlertsSection, null), /*#__PURE__*/React.createElement(Consumers, null), /*#__PURE__*/React.createElement(ListDependencies, null))));
  }
  /********
  cards.jsx
  ********/


  function Cards() {
    const {
      model,
      texts
    } = useModuleContext();
    const [total, setTotal] = React.useState({
      consumers: model?.bundles?.consumers?.length ?? 0,
      dependencies: model?.bundles?.dependencies?.length ?? 0,
      files: model.totalFiles,
      bundles: model?.am.size ?? 0
    });
    if (!model.am?.tree.landed) return null;
    (0, _hooks.useBinder)([model.bundles], () => {
      setTotal({
        consumers: model.bundles.consumers.length,
        dependencies: model.bundles.dependencies.length,
        files: model.totalFiles,
        bundles: model.bundles.items.size
      });
    });
    const {
      consumers,
      dependencies,
      files,
      bundles
    } = total;
    return /*#__PURE__*/React.createElement("div", {
      className: "container-cards"
    }, /*#__PURE__*/React.createElement(_coreComponents.SmallCard, {
      icon: "file.consumer",
      header: texts.labels.consumers,
      content: consumers
    }), /*#__PURE__*/React.createElement(_coreComponents.SmallCard, {
      icon: "file.dependency",
      header: texts.labels.dependencies,
      content: dependencies
    }), /*#__PURE__*/React.createElement(_coreComponents.SmallCard, {
      icon: "fileCode",
      header: texts.labels.totalFiles,
      content: files
    }), /*#__PURE__*/React.createElement(_coreComponents.SmallCard, {
      icon: "bundle.default",
      header: texts.labels.bundles,
      content: bundles
    }));
  }
  /**************
  description.jsx
  **************/


  function Description() {
    return /*#__PURE__*/React.createElement("section", {
      className: "columns-container"
    }, /*#__PURE__*/React.createElement(EditField, {
      field: "description"
    }));
  }
  /*******************
  detail\consumers.jsx
  *******************/


  function Consumers() {
    const {
      model,
      texts
    } = useModuleContext();
    const {
      bundlesManager: bundles
    } = model;
    const [items, setItems] = React.useState(bundles?.consumers ? bundles?.consumers : []);
    const [fetching, setFetching] = React.useState(bundles.consumers.fetching);
    const [toggle, setToggle] = React.useState(false);
    const icon = toggle ? 'arrowDropDown' : 'arrowDropUp';
    const [played, setPlayed] = React.useState(false);
    (0, _hooks.useBinder)([bundles], () => {
      setItems(items => bundles.consumers);
      setFetching(bundles.consumers.fetching);
    });
    let output = bundles.consumers.map(item => {
      return /*#__PURE__*/React.createElement(DetailItem, {
        type: "consumers",
        bundles: bundles,
        key: item.id,
        item: item
      });
    });

    const onLoad = async event => {
      setFetching(true);
      event.stopPropagation();
      await bundles.loadConsumers();
      setPlayed(true);
      setToggle(true);
      setFetching(false);
    };

    const analyzerIcon = !played ? "play" : "refresh";
    return /*#__PURE__*/React.createElement("article", {
      className: "board-box"
    }, /*#__PURE__*/React.createElement("header", {
      className: "flex-container flex-space-x",
      onClick: () => setToggle(!toggle)
    }, /*#__PURE__*/React.createElement("h3", null, texts.labels.consumers), /*#__PURE__*/React.createElement("div", {
      className: "board__header__actions flex-container flex-center-y"
    }, !!!output.length && /*#__PURE__*/React.createElement("span", null, texts.labels.empty), fetching ? /*#__PURE__*/React.createElement(_coreComponents.DSIconButton, null, " ", /*#__PURE__*/React.createElement(_spinner.BeyondSpinner, {
      active: true,
      className: "on-primary"
    }), " ") : /*#__PURE__*/React.createElement(_coreComponents.DSIconButton, {
      className: "circle secondary",
      icon: analyzerIcon,
      onClick: onLoad
    }), output.length > 0 && /*#__PURE__*/React.createElement(_coreComponents.DSIconButton, {
      className: "circle secondary",
      icon: icon
    }))), toggle && !!output.length && /*#__PURE__*/React.createElement("ul", {
      className: "ds-item__list-detail"
    }, output));
  }
  /**********************
  detail\dependencies.jsx
  **********************/


  function ListDependencies() {
    const {
      model,
      texts
    } = useModuleContext();
    const {
      bundles
    } = model;
    const [items, setItems] = React.useState(bundles?.dependencies ? bundles?.dependencies : []);
    const [fetching, setFetching] = React.useState(false);
    const [toggle, setToggle] = React.useState(false);
    const [played, setPlayed] = React.useState(false);
    const icon = toggle ? 'arrowDropDown' : 'arrowDropUp';
    const analyzerIcon = !played ? "play" : "refresh";
    (0, _hooks.useBinder)([bundles], () => setItems(items => bundles.dependencies));
    if (!bundles.dependencies) return null;
    let output = bundles.dependencies.map(item => /*#__PURE__*/React.createElement(DetailItem, {
      bundles: bundles,
      type: "dependencies",
      key: item.id,
      item: item
    }));

    const onLoad = async event => {
      setFetching(true);
      event.stopPropagation();
      await bundles.loadDependencies();
      setFetching(false);
      setToggle(true);
      setPlayed(true);
    };

    return /*#__PURE__*/React.createElement("article", {
      className: "board-box"
    }, /*#__PURE__*/React.createElement("header", {
      className: "flex-container flex-space-x",
      onClick: () => setToggle(!toggle)
    }, /*#__PURE__*/React.createElement("h3", null, texts.labels.dependencies), /*#__PURE__*/React.createElement("div", {
      className: "board__header__actions"
    }, !!!output.length && /*#__PURE__*/React.createElement("span", null, texts.labels.empty), fetching ? /*#__PURE__*/React.createElement(_coreComponents.DSIconButton, null, " ", /*#__PURE__*/React.createElement(_spinner.BeyondSpinner, {
      active: true,
      className: "on-primary"
    }), " ") : /*#__PURE__*/React.createElement(_coreComponents.DSIconButton, {
      className: "circle secondary",
      icon: analyzerIcon,
      onClick: onLoad
    }), output.length > 0 && /*#__PURE__*/React.createElement(_coreComponents.DSIconButton, {
      className: "circle secondary",
      icon: icon
    }))), toggle && !!output.length && /*#__PURE__*/React.createElement("ul", {
      className: "ds-item__list-detail"
    }, output));
  }
  /**************
  detail\item.jsx
  **************/


  function DetailItem({
    item,
    type
  }) {
    const {
      workspace
    } = (0, _dsContexts.useDSWorkspaceContext)();
    const {
      project,
      model
    } = useModuleContext();
    const [object, setObject] = React.useState(item);
    let output = [];

    if (item.loaded) {
      const {
        bundle,
        module: model
      } = item;
      const connection = model.bundles?.items?.get(bundle.name);
      output.push( /*#__PURE__*/React.createElement(BundleDiagnostics, {
        className: "interface-item__errors",
        bundle: connection,
        key: bundle.id
      }));
    }

    const openBoard = event => {
      workspace.openBoard('module', {
        label: item.module.name,
        moduleId: item.module.id,
        projectId: project.application.id
      });
    };

    const onCheck = async event => {
      event.stopPropagation();
      model.bundles.load(type, item.module.id, item.id);
    };

    return /*#__PURE__*/React.createElement("li", {
      className: "board__item"
    }, /*#__PURE__*/React.createElement("header", null, item.name, item.module && /*#__PURE__*/React.createElement("div", {
      className: "item__actions board__header__actions"
    }, /*#__PURE__*/React.createElement(_coreComponents.DSIconButton, {
      onClick: onCheck,
      className: "sm circle secondary",
      icon: "play"
    }), /*#__PURE__*/React.createElement(_coreComponents.DSIconButton, {
      onClick: openBoard,
      className: "sm circle secondary",
      icon: "arrowForward"
    }))), output);
  }
  /*******
  edit.jsx
  *******/


  function EditField({
    field
  }) {
    const [edit, setEdit] = React.useState(false);
    const {
      model: {
        module
      },
      texts
    } = useModuleContext();
    const [value, setValue] = React.useState(module[field] ?? '');
    const label = texts[field];
    const fieldValue = module[field] ?? texts.empty[field];

    const toggleEdit = () => setEdit(!edit);

    const onSubmit = event => {
      event.preventDefault();
      module[field] = value;
      module.saveField(field, value);
      setEdit(!edit);
    };

    const onEdit = event => {
      const target = event.currentTarget;
      setValue(target.value);
    };

    if (edit) {
      return /*#__PURE__*/React.createElement("div", {
        className: "item-information item-information--edit"
      }, /*#__PURE__*/React.createElement("div", null, label, " "), /*#__PURE__*/React.createElement("form", {
        onSubmit: onSubmit,
        className: "form-group"
      }, /*#__PURE__*/React.createElement("input", {
        autoComplete: "off",
        onChange: onEdit,
        name: field,
        defaultValue: value
      }), /*#__PURE__*/React.createElement("div", {
        className: "form__actions"
      }, /*#__PURE__*/React.createElement(_coreComponents.DSIconButton, {
        className: "btn primary",
        type: "submit",
        icon: "save"
      }), /*#__PURE__*/React.createElement(_coreComponents.DSIconButton, {
        className: "circle secondary btn btn-secondary",
        onClick: toggleEdit,
        type: "button",
        icon: "close"
      }))));
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "item-information"
    }, /*#__PURE__*/React.createElement("div", null, label), /*#__PURE__*/React.createElement("div", {
      className: "description-item"
    }, /*#__PURE__*/React.createElement("p", {
      className: "p1 p-0"
    }, fieldValue), /*#__PURE__*/React.createElement(_coreComponents.DSIconButton, {
      onClick: toggleEdit,
      icon: "edit"
    })));
  }
  /***********
  fetching.jsx
  ***********/


  function Fetching() {
    return /*#__PURE__*/React.createElement("div", {
      className: "module_fetching-block content-centering show"
    }, /*#__PURE__*/React.createElement(_coreComponents.DSSpinner, {
      fetching: true
    }));
  }
  /*****************
  header\bundles.jsx
  *****************/


  function BundlesTags() {
    const {
      model
    } = useModuleContext();
    const items = [...model.bundles.items.keys()].map(item => /*#__PURE__*/React.createElement("span", {
      key: `p-${item}`,
      className: "badge-item"
    }, item));
    return /*#__PURE__*/React.createElement("div", {
      className: "badge-list"
    }, items);
  }
  /****************
  header\header.jsx
  ****************/


  function Header() {
    const {
      model,
      texts,
      application
    } = useModuleContext();
    const {
      workspace
    } = (0, _dsContexts.useDSWorkspaceContext)();
    const {
      am
    } = model;
    const link = am.route ? `${application.application.url}${am.route.toLowerCase()}` : '';

    const changeProperty = event => {
      const target = event.currentTarget;
      am.saveField(target.name, target.checked);
    };

    const open = event => {
      event.preventDefault();
      workspace.openNavigator(application.id, link);
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
      className: "board__header am__header"
    }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", null, model.am.name), /*#__PURE__*/React.createElement("div", null, "ID: ", am.id, " "), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, texts.path, ":"), " ", am.module?.path), /*#__PURE__*/React.createElement("div", null, am.route && /*#__PURE__*/React.createElement("a", {
      onClick: open,
      target: "_blank",
      className: "link lower"
    }, link))), /*#__PURE__*/React.createElement("div", {
      className: ""
    }, /*#__PURE__*/React.createElement("span", null, texts.labels.bundles), /*#__PURE__*/React.createElement(BundlesTags, null))));
  }
  /*************
  overwrites.jsx
  *************/


  function Overwrites() {
    const {
      model: {
        module
      }
    } = useModuleContext();
    let {
      texts
    } = useModuleContext();
    const [open, setOpen] = React.useState(true);
    const [hasBackend, setHasBackend] = React.useState(module.backend);
    const [fetching, setFetching] = React.useState(false);

    const onCreate = event => {
      setFetching(true);
      module.createBackend();
      window.setTimeout(() => {
        setHasBackend(true);
        setFetching(false);
      }, 2000);
    };

    texts = texts.overwrites;
    const cls = `processor_block-data ${!open ? ' hide-block' : ''}`;
    return /*#__PURE__*/React.createElement(_coreComponents.DSCard, {
      header: texts.title
    }, /*#__PURE__*/React.createElement(React.Fragment, null, hasBackend ? /*#__PURE__*/React.createElement("p", {
      className: "success--message"
    }, texts.created) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, texts.empty.description), /*#__PURE__*/React.createElement("div", {
      className: "card__actions"
    }, /*#__PURE__*/React.createElement(_form.BeyondButton, {
      className: "primary",
      onClick: onCreate
    }, fetching ? /*#__PURE__*/React.createElement(React.Fragment, null, texts.empty.fetching, /*#__PURE__*/React.createElement(_spinner.BeyondSpinner, {
      className: "on-primary"
    }), " ") : texts.empty.action)))));
  }
  /**********
  preload.jsx
  **********/


  function Preload() {
    return /*#__PURE__*/React.createElement("div", {
      className: "content-centering"
    }, /*#__PURE__*/React.createElement(_coreComponents.DSSpinner, {
      fetching: true
    }));
  }
  /***************************
  processsors\dependencies.jsx
  ***************************/


  function Dependencies({
    processor
  }) {
    const {
      module,
      model
    } = useModuleContext();
    let {
      texts
    } = useModuleContext();
    const [open, setOpen] = React.useState(true);
    if (!model.bundle?.hasProcessor('ts')) return null;
    texts = texts.dependencies;

    const update = event => model.updateDependencies();

    const toggleContent = event => setOpen(!open);

    const cls = `processor_block-data two-columns ${!open ? ' hide-block' : ''}`;
    const files = module.dependencies?.files?.map(file => /*#__PURE__*/React.createElement("li", {
      key: file
    }, file));
    return /*#__PURE__*/React.createElement("article", {
      className: "bundle_processor-container"
    }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("div", {
      className: "col col-left"
    }, /*#__PURE__*/React.createElement("h6", {
      className: "upper primary-color no-pd"
    }, texts.title)), /*#__PURE__*/React.createElement("div", {
      className: "col-right"
    }, "Files ", module.dependencies?.files?.length, /*#__PURE__*/React.createElement(_coreComponents.DSIconButton, {
      onClick: toggleContent,
      className: "circle expand-icon",
      icon: "expandMore"
    }))), /*#__PURE__*/React.createElement("div", {
      className: cls
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
      className: "p2 primary-color bundle-processor_title"
    }, texts.subtitle, /*#__PURE__*/React.createElement("div", {
      className: "pull-right"
    }, /*#__PURE__*/React.createElement(_coreComponents.DSIconButton, {
      onClick: update,
      icon: "refresh",
      className: "circle small-icon"
    }))), module.dependencies.files?.length ? /*#__PURE__*/React.createElement("ul", null, files, " ") : /*#__PURE__*/React.createElement("div", null, texts.empty))));
  }
  /*******************************
  processsors\processor\alerts.jsx
  *******************************/


  function ProcessorAlerts({
    warnings,
    errors
  }) {
    if (!warnings || !errors) return null;
    let alerts = [];
    const {
      texts
    } = useModuleContext();

    const print = (item, key, type, identifier = undefined) => {
      return /*#__PURE__*/React.createElement("li", {
        key: `module-${key}-${type}`
      }, /*#__PURE__*/React.createElement(_coreComponents.DSIcon, {
        className: `icon-${type}`,
        name: type
      }), /*#__PURE__*/React.createElement("div", {
        className: "content"
      }, identifier && /*#__PURE__*/React.createElement("strong", null, identifier, " "), /*#__PURE__*/React.createElement("span", null, item)));
    };

    const showAlerts = (warnings, errors, key) => {
      const wmessages = warnings.map((warning, id) => print(warning, `${key}-${id}`, 'warning'));
      const emessages = errors.map((errors, id) => print(errors, `${key}-${id}`, 'error'));
      alerts = alerts.concat(wmessages, emessages);
    };

    showAlerts(errors.processor, warnings.processor, "processor");
    showAlerts(errors.files, warnings.files, "files");
    showAlerts(errors.overwrites, warnings.overwrites, "overwrites");
    if (!alerts.length) return null;
    return /*#__PURE__*/React.createElement("div", {
      className: "processor_block-data separator  "
    }, /*#__PURE__*/React.createElement("h4", {
      className: "p2 primary-color"
    }, texts.processors.alerts), /*#__PURE__*/React.createElement("ul", {
      className: "list-icon list-unstyled grid-center-y"
    }, alerts));
  }
  /*******************************
  processsors\processor\header.jsx
  *******************************/


  function ProcessorHeader({
    toggleContent,
    processor
  }) {
    const {
      texts,
      module
    } = useModuleContext(); //TODO: @julio check declarations

    const declarations = event => {
      if (module.declarations) {
        module.declarations.update();
      }
    };

    return /*#__PURE__*/React.createElement("header", {
      className: "ds-info__header"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col col-left"
    }, /*#__PURE__*/React.createElement("h6", {
      className: "upper primary-color no-pd"
    }, texts.processors[processor.name])), /*#__PURE__*/React.createElement("div", {
      className: "col-right"
    }, processor.name === 'ts' && /*#__PURE__*/React.createElement("span", {
      className: "btn link",
      onClick: declarations
    }, texts.actions.declarations), "Files ", processor.files.items.length, /*#__PURE__*/React.createElement(_coreComponents.DSIconButton, {
      onClick: toggleContent,
      className: "circle expand-icon",
      icon: "expandMore"
    })));
  }
  /*****************************
  processsors\processor\list.jsx
  *****************************/


  function List({
    list,
    title,
    processor
  }) {
    const {
      closeModal,
      application,
      model: {
        bundle,
        moduleId
      }
    } = useModuleContext();
    const output = list?.items.map((file, i) => {
      let specs = {
        applicationId: application.id,
        moduleId: moduleId,
        bundle: bundle.name,
        file: file.filename,
        processor: processor
      };
      const qs = new URLSearchParams(specs).toString();

      const navigate = event => {
        event.preventDefault();
        beyond.pushState(`/editor?${qs}`); //the boolean is used to avoid beyond.back fires by default
        // in the closeModal method.

        closeModal(false);
      };

      return /*#__PURE__*/React.createElement("li", {
        key: `${file.filename}-${i}`
      }, /*#__PURE__*/React.createElement("a", {
        href: "#",
        onClick: navigate
      }, file.filename));
    });
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
      className: "p2 primary-color bundle-processor_title"
    }, title), list?.items?.length ? /*#__PURE__*/React.createElement("ul", null, output) : /*#__PURE__*/React.createElement("div", null, "No hay archivos"));
  }
  /**********************************
  processsors\processor\processor.jsx
  **********************************/


  function Processor({
    processor
  }) {
    const [open, setOpen] = React.useState(true);

    const toggleContent = event => setOpen(!open);

    const cls = `processor_block-data two-columns ${!open ? ' hide-block' : ''}`;
    return /*#__PURE__*/React.createElement("article", {
      className: "bundle_processor-container",
      key: processor.id
    }, /*#__PURE__*/React.createElement(ProcessorHeader, {
      toggleContent: toggleContent,
      processor: processor
    }), /*#__PURE__*/React.createElement(ProcessorAlerts, {
      processor: processor
    }), /*#__PURE__*/React.createElement("div", {
      className: cls
    }, /*#__PURE__*/React.createElement(List, {
      list: processor.files,
      title: "Files",
      processor: processor.name
    }), /*#__PURE__*/React.createElement(List, {
      list: processor.overwrites,
      title: "overwrites",
      processor: processor.name
    })));
  }
  /*************************
  processsors\processors.jsx
  *************************/


  function Processors() {
    const {
      model
    } = useModuleContext();
    const {
      bundle: {
        processors
      }
    } = model;
    const output = [];
    processors.forEach(processor => output.push( /*#__PURE__*/React.createElement(Processor, {
      processor: processor,
      key: processor.id
    })));
    return /*#__PURE__*/React.createElement(React.Fragment, null, output);
  }
  /************************
  processsors\use-model.jsx
  ************************/


  function useModel(specs) {
    const [model, setModel] = React.useState(moduleManager.active);
    const module = __pkg.bundle.module.resource;
    const [textsReady] = (0, _textsBinder.useTextsBinder)(module);
    const {
      panel
    } = (0, _dsContexts.useDSWorkspaceContext)();
    React.useEffect(() => {
      let model;

      (async () => {
        if ([undefined, null].includes(specs?.moduleId)) return;
        model = await moduleManager.load(specs.moduleId);
        setModel(model);
        window.module = model;
        model.bind('change', onChange);
        panel.setTabName(specs.moduleId, model.name);
      })();

      return () => model?.unbind('change', onChange);
    }, [specs.moduleId]);
    return [textsReady, model];
  }
  /*********
  server.jsx
  *********/


  function Server() {
    const {
      model: {
        module
      }
    } = useModuleContext();
    let {
      texts
    } = useModuleContext();
    const [hasBackend, setHasBackend] = React.useState(module.backend);
    const [fetching, setFetching] = React.useState();

    const onCreate = event => {
      setFetching(true);
      module.createBackend();
      window.setTimeout(() => {
        setHasBackend(true);
        setFetching(false);
      }, 2000);
    };

    texts = texts.server;
    return /*#__PURE__*/React.createElement(_coreComponents.DSCard, {
      header: texts.title
    }, /*#__PURE__*/React.createElement(React.Fragment, null, hasBackend ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
      className: "success--message"
    }, texts.created)) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, texts.empty.description), /*#__PURE__*/React.createElement("div", {
      className: "card__actions"
    }, /*#__PURE__*/React.createElement(_form.BeyondButton, {
      className: "primary",
      onClick: onCreate
    }, fetching ? /*#__PURE__*/React.createElement(React.Fragment, null, texts.empty.fetching, /*#__PURE__*/React.createElement(_spinner.BeyondSpinner, {
      className: "on-primary"
    }), " ") : texts.empty.action)))));
  }
  /********
  texts.jsx
  ********/


  function Texts() {
    const {
      module,
      model
    } = useModuleContext();
    let {
      texts
    } = useModuleContext();
    console.warn('texts', texts);
    const [open, setOpen] = React.useState(true);
    texts = texts.txt;

    const update = event => model.updateDependencies();

    const toggleContent = event => setOpen(!open);

    const cls = `processor_block-data two-columns ${!open ? ' hide-block' : ''}`;
    /**
     * The texts property represents a bundle in beyond and contains a txt processor,
     * Is necessary to access to the bundle object that is available into the value property.
     * Later we need to get the processor to loop the files.
     *
     * @type {*}
     */

    const files = texts[processors.get('txt')]?.files;
    return /*#__PURE__*/React.createElement("article", {
      className: "bundle_processor-container"
    }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("div", {
      className: "col col-left"
    }, /*#__PURE__*/React.createElement("h6", {
      className: "upper primary-color no-pd"
    }, texts.title)), /*#__PURE__*/React.createElement("div", {
      className: "col-right"
    }, /*#__PURE__*/React.createElement(_coreComponents.DSIconButton, {
      onClick: toggleContent,
      className: "circle expand-icon",
      icon: "expandMore"
    }))), /*#__PURE__*/React.createElement("div", {
      className: cls
    }, !module.texts.has ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, texts.empty.title), /*#__PURE__*/React.createElement("p", null, texts.empty.description)) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ProcessorAlerts, {
      processor: texts
    }), /*#__PURE__*/React.createElement("div", {
      className: cls
    }, /*#__PURE__*/React.createElement(List, {
      list: files,
      title: "Files"
    })))));
  }
  /***********
  JS PROCESSOR
  ***********/

  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/dashboard/module-view.code', '.ds-module__alerts-section{margin:15px 0}.ds-module__alerts-section .beyond-alert{flex-basis:max-content;width:100%}@media (max-width:600px){.ds-module__alerts-section{flex-direction:column}}.module__alerts-section h3 .diagnostics__bundle__title{color:var(--beyond-primary-color)}.module__alerts-section .beyond-alert{padding-bottom:0}.module__alerts-section h5{text-transform:uppercase;font-weight:700;padding:0;margin-bottom:15px}.module__alerts-section ul{display:grid;margin:0;padding:0}.module__alerts-section ul li{margin:0 -15px;padding:8px 15px;transition:all .2s ease-in}.module__alerts-section ul li h6{margin:0;padding:0;font-size:1.3rem}.module__alerts-section ul li .item__data{display:flex;grid-gap:15px;color:#e4e5dc}.module__alerts-section ul li:hover{background:var(--beyond-secondary-color);cursor:pointer}.board-box{display:grid;grid-gap:1rem;margin:1rem 0}.board-box>header{padding:.5rem 1rem .5rem 0;border-bottom:1px solid var(--beyond-secondary-color)}.ds-item__list-detail{padding:0;display:grid;grid-gap:5px}.ds-item__list-detail .board__item{background:rgba(18,31,54,.1);border:0;padding:1rem;list-style:none;display:grid;grid-gap:1rem;grid-template-columns:1fr}.ds-item__list-detail .board__item>header{display:flex;justify-content:space-between;align-items:center}.ds-item__list-detail .board__item .item__actions{display:flex;gap:.5rem}.container-cards{display:grid;grid-gap:15px;grid-template-columns:repeat(4,1fr)}.cards-information{margin:15px 0;display:flex;grid-template-columns:1fr 1fr 1fr;grid-gap:15px}@media (max-width:700px){.cards-information{grid-template-columns:1fr 1fr}}.cards-information .card-detail{padding:30px;display:flex;flex-direction:column;background:var(--beyond-secondary-dark-color);border-radius:5px;max-width:300px;align-items:center;min-height:250px;justify-content:center;transition:all .2s ease-in;cursor:pointer}.cards-information .card-detail:hover{box-shadow:0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23);background:#0c1423}.cards-information .card-detail header{font-size:1.2rem;text-align:center;color:var(--beyond-primary-light-color);margin-bottom:15px}.cards-information .card-detail .card__actions{display:flex;justify-content:center;margin-top:30px}.cards-information .card-detail .card__actions .beyond-button{width:60%}.ds-module-view__detail .module__header h4,.ds-module-view__detail .module__header h5{padding:2px 0}.ds-module-view__detail .item-information{display:grid;grid-gap:8px;align-items:center;margin-top:15px}.ds-module-view__detail .item-information .description-item{background:#333;padding:5px 15px;display:flex;justify-content:space-between;transition:all .2s ease-in;cursor:pointer}.ds-module-view__detail .item-information .description-item:hover{background:#262626}.ds-module-view__detail .item-information .description-item:hover .beyond-icon-button{opacity:1}.ds-module-view__detail .item-information .description-item .beyond-icon-button{opacity:.3;transition:all .2s ease-in}.ds-module-view__detail .item-information .description-item .beyond-icon-button svg{transition:all .2s ease-in;fill:var(--beyond-text-on-secondary)}.ds-module-view__detail .item-information.item-information--edit .form-group{display:grid;grid-template-columns:1fr;grid-gap:5px;position:relative;width:100%}.ds-module-view__detail .item-information.item-information--edit .form-group input{background:#333;outline:0!important;color:var(--beyond-text-on-secondary);border:0;padding:15px;font-size:16px}.ds-module-view__detail .item-information.item-information--edit .form-group input:hover{border-color:#e4e5dc}.ds-module-view__detail .item-information.item-information--edit .form-group .form__actions{display:flex;position:absolute;right:10px;top:5px;gap:8px;justify-content:flex-end}.ds-module-view__detail .bundle_processor-container{padding-bottom:20px}.ds-module-view__detail .bundle_processor-container header{background-image:linear-gradient(to right,#f0f0f0 0,#82837f 100%);padding:8px;display:flex;border-top-right-radius:15px;align-items:center}.ds-module-view__detail .bundle_processor-container header .col-left,.ds-module-view__detail .bundle_processor-container header .col-right{display:flex;align-items:center}.ds-module-view__detail .bundle_processor-container header .expand-icon{height:25px;width:25px}.ds-module-view__detail .bundle_processor-container header .expand-icon svg{fill:var(--beyond-secondary-color)}.ds-module-view__detail .bundle_processor-container .bundle-processor_title,.ds-module-view__detail .bundle_processor-container .separator{border-bottom:1px solid #e4e5dc}.ds-module-view__detail .bundle_processor-container .bundle-processor_title{display:flex;justify-content:space-between;align-items:center}.ds-module-view__detail .bundle_processor-container .bundle-processor_title .beyond-icon-button{background:#e4e5dc}.ds-module-view__detail .bundle_processor-container .processor_block-data.hide-block{display:none!important;transition:.3s ease-in-out}.ds-module-view__detail .bundle_processor-container .processor_block-data.two-columns{display:grid;grid-template-columns:1fr 1fr;grid-gap:15px}.ds-module-view__detail{background:#000;width:100%;height:100%}.ds-module-view__detail .content-centering{min-height:100px;display:flex;align-items:center;justify-content:center}.ds-module-view__detail .icon-error{fill:#D2281E}.ds-module-view__detail .icon-warning{fill:#F7D994}.ds-module-view__detail .list-icon{padding:0}.ds-module-view__detail .list-icon li{display:grid;grid-template-columns:auto 1fr;grid-gap:8px;margin-bottom:8px}.ds-module-view__detail .list-icon li svg{margin-top:4px;height:14px;width:14px}.ds-module-view__detail .module_fetching-block{position:absolute;top:0;left:0;bottom:0;right:0;background:rgba(255,255,255,.5);transition:all .2s ease-in;height:0;display:none}.ds-module-view__detail .module_fetching-block.show{height:100%;transition:all .2s ease-in;display:flex;align-items:center;justify-content:center;align-content:center;display:flex}.beyond-element-switch.small .switch{position:relative;display:inline-block;width:40px;height:19px}.beyond-element-switch.small .switch .slider{border-radius:8px}.beyond-element-switch.small .switch .slider:before{top:2.3px;left:2px;bottom:0;right:0;overflow:hidden;content:"";height:13px;width:13px}.beyond-element-switch.small .switch input:checked+.slider:before{left:-4px}');
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