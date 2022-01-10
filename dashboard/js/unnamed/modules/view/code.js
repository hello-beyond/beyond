define(["exports", "react", "react-dom", "@beyond-js/ui/spinner/code", "@beyond-js/ui/form/code", "@beyond-js/dashboard/core-components/code", "@beyond-js/dashboard/ds-contexts/code", "@beyond-js/dashboard/hooks/code"], function (_exports, React, ReactDOM, _code, _code2, _code3, _code4, _code5) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.ModuleBoard = ModuleBoard;
  //Beyond ui
  //Ds components
  //WORKSPACE CONTEXT AND MODELS
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/modules/view/code', false, {
    "txt": {
      "multilanguage": false
    }
  });
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /************
  JSX PROCESSOR
  ************/

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
      key: item
    }, item));
    return /*#__PURE__*/React.createElement(_code3.BeyondAlert, {
      type: type
    }, /*#__PURE__*/React.createElement("h4", null, title), /*#__PURE__*/React.createElement("ul", {
      className: "alert-list"
    }, output));
  }
  /*********************
  alerts\diagnostics.jsx
  *********************/


  function Diagnostics() {
    const {
      model
    } = useModuleContext();
    const output = Array.from(model.bundles.values()).map(bundle => /*#__PURE__*/React.createElement(BundleDiagnostics, {
      bundle: bundle,
      key: bundle.id
    }));
    return /*#__PURE__*/React.createElement(React.Fragment, null, output);
  }
  /****************************
  alerts\diagnostics\bundle.jsx
  ****************************/


  function BundleDiagnostics({
    bundle
  }) {
    const {
      texts
    } = useModuleContext();
    const [diagnostics, setDiagnostics] = React.useState(bundle?.compiler?.diagnostics ?? {});
    const {
      general,
      files,
      overwrites,
      dependencies
    } = diagnostics;
    (0, _code5.useBinder)([bundle], () => setDiagnostics({ ...bundle.compiler.diagnostics
    }));

    if (!general?.length && !files?.size && !overwrites?.size && !dependencies?.size) {
      return null;
    }

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", null, texts.diagnostics.title, /*#__PURE__*/React.createElement("span", {
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
    } = (0, _code4.useDSWorkspaceContext)();
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
    return /*#__PURE__*/React.createElement(_code3.BeyondAlert, {
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
    const output = data.map((item, i) => /*#__PURE__*/React.createElement("li", {
      key: item.id
    }, item.message));
    return /*#__PURE__*/React.createElement(_code3.BeyondAlert, {
      type: "danger"
    }, /*#__PURE__*/React.createElement("h5", null, "Errores generales"), /*#__PURE__*/React.createElement("ul", null, output));
  };
  /************************
  alerts\general-alerts.jsx
  ************************/


  function GeneralAlerts() {
    const {
      model
    } = useModuleContext();
    const total = model.alerts.total; // let output = [];

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
    }));
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
      workspace: {
        application
      },
      navigateModule,
      panel
    } = (0, _code4.useDSWorkspaceContext)();
    const {
      moduleManager
    } = application;
    const [model, setModel] = React.useState(moduleManager.active);
    const [ready, setReady] = React.useState(module.texts?.ready);
    (0, _code5.useBinder)([module.texts], () => setReady(module.texts.ready));
    React.useEffect(() => {
      (async () => {
        if ([undefined, null].includes(specs?.moduleId)) return;
        const model = await moduleManager.load(specs.moduleId);
        window.module = model;
        setModel(model);
        panel.setTabName(specs.moduleId, model.name);
      })();
    }, [specs.moduleId]);
    if (!specs.moduleId && !moduleManager.active || !ready || !model?.ready || specs.moduleId !== model.id) return null;
    const texts = module.texts.value;
    return /*#__PURE__*/React.createElement(ModuleContext.Provider, {
      value: {
        model,
        application,
        texts,
        navigateModule
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ds-module-view__detail"
    }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(Cards, null), /*#__PURE__*/React.createElement("div", {
      className: "module__alerts-section"
    }, /*#__PURE__*/React.createElement(GeneralAlerts, null), /*#__PURE__*/React.createElement(Diagnostics, null)), /*#__PURE__*/React.createElement(Description, null), /*#__PURE__*/React.createElement(Consumers, null)));
  }
  /********
  cards.jsx
  ********/


  function Cards() {
    const {
      model,
      texts
    } = useModuleContext();
    if (!model.am?.tree.landed) return null;
    const {
      am
    } = model;
    return /*#__PURE__*/React.createElement("div", {
      className: "container-cards"
    }, /*#__PURE__*/React.createElement(_code3.SmallCard, {
      icon: "file.consumer",
      header: texts.labels.consumers,
      content: 5
    }), /*#__PURE__*/React.createElement(_code3.SmallCard, {
      icon: "file.dependency",
      header: texts.labels.dependencies,
      content: 5
    }), /*#__PURE__*/React.createElement(_code3.SmallCard, {
      icon: "fileCode",
      header: texts.labels.totalFiles,
      content: model.totalFiles
    }), /*#__PURE__*/React.createElement(_code3.SmallCard, {
      icon: "bundle.default",
      header: texts.labels.bundles,
      content: am.bundles.size
    }));
  }
  /************
  consumers.jsx
  ************/


  function Consumers() {
    const {
      model,
      texts
    } = useModuleContext();
    const {
      bundlesManager: bundles
    } = model;
    const [items, setItems] = React.useState(bundles?.consumers ? bundles?.consumers : []);
    return null;
    if (!bundles) return null;
    (0, _code5.useBinder)([bundles], () => {
      // console.log(8)
      setItems(items => bundles.consumers);
    }, []); // console.log(9, items, bundles.consumers);

    return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h3", null, texts.labels.consumers), /*#__PURE__*/React.createElement("ul", null, items.map(module => {
      return /*#__PURE__*/React.createElement("li", {
        key: module.id,
        className: "board__item"
      }, module.name, /*#__PURE__*/React.createElement("div", {
        className: "item__actions"
      }, /*#__PURE__*/React.createElement(_code3.DSIconButton, {
        className: "sm circle primary",
        icon: "refresh"
      }), /*#__PURE__*/React.createElement(_code3.DSIconButton, {
        className: "sm circle primary",
        icon: "arrowRight"
      })));
    })));
  }
  /**************
  description.jsx
  **************/


  function Description() {
    return /*#__PURE__*/React.createElement("section", {
      className: "columns-container two-columns"
    }, /*#__PURE__*/React.createElement(EditField, {
      field: "name"
    }), /*#__PURE__*/React.createElement(EditField, {
      field: "description"
    }));
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
      }), /*#__PURE__*/React.createElement(_code3.FadeIn, null, /*#__PURE__*/React.createElement("div", {
        className: "form__actions"
      }, /*#__PURE__*/React.createElement(_code2.BeyondButton, {
        className: "btn primary",
        type: "submit"
      }, "Guardar"), /*#__PURE__*/React.createElement(_code2.BeyondButton, {
        className: "secondary rbtn btn-secondary",
        onClick: toggleEdit,
        type: "button"
      }, "Cerrar")))));
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "item-information"
    }, /*#__PURE__*/React.createElement("div", null, label), /*#__PURE__*/React.createElement("div", {
      className: "description-item"
    }, /*#__PURE__*/React.createElement("p", {
      className: "p1 p-0"
    }, fieldValue), /*#__PURE__*/React.createElement(_code3.DSIconButton, {
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
    }, /*#__PURE__*/React.createElement(_code3.DsSpinner, {
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
    const items = [...model.bundles.keys()].map(item => /*#__PURE__*/React.createElement("span", {
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
      application,
      navigateModule
    } = useModuleContext();
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
      navigateModule({
        url: link,
        route: am.route
      });
    };

    return /*#__PURE__*/React.createElement("header", {
      className: "am__header"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-container"
    }, /*#__PURE__*/React.createElement("span", null, texts.labels.bundles, ":"), /*#__PURE__*/React.createElement(BundlesTags, null), /*#__PURE__*/React.createElement(_code2.BeyondSwitch, {
      onChange: changeProperty,
      name: "hmr",
      className: "small",
      value: am.hmr
    }), /*#__PURE__*/React.createElement("label", null, texts.hmr)), /*#__PURE__*/React.createElement("div", {
      className: "mt-15 flex-container flex-space"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col"
    }, /*#__PURE__*/React.createElement("span", {
      className: "primary-accent"
    }, /*#__PURE__*/React.createElement("strong", null, texts.path), " ", am.module?.path)), /*#__PURE__*/React.createElement("div", {
      className: "col"
    }, am.route && /*#__PURE__*/React.createElement("a", {
      onClick: open,
      target: "_blank",
      className: "link primary-color lower"
    }, link))));
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
    return /*#__PURE__*/React.createElement(_code3.DSCard, {
      header: texts.title
    }, /*#__PURE__*/React.createElement(React.Fragment, null, hasBackend ? /*#__PURE__*/React.createElement("p", {
      className: "success--message"
    }, texts.created) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, texts.empty.description), /*#__PURE__*/React.createElement("div", {
      className: "card__actions"
    }, /*#__PURE__*/React.createElement(_code2.BeyondButton, {
      className: "primary",
      onClick: onCreate
    }, fetching ? /*#__PURE__*/React.createElement(React.Fragment, null, texts.empty.fetching, /*#__PURE__*/React.createElement(_code.BeyondSpinner, {
      className: "on-primary"
    }), " ") : texts.empty.action)))));
  }
  /**********
  preload.jsx
  **********/


  function Preload() {
    return /*#__PURE__*/React.createElement("div", {
      className: "content-centering"
    }, /*#__PURE__*/React.createElement(_code3.DsSpinner, {
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
    }, "Files ", module.dependencies?.files?.length, /*#__PURE__*/React.createElement(_code3.DSIconButton, {
      onClick: toggleContent,
      className: "circle expand-icon",
      icon: "expandMore"
    }))), /*#__PURE__*/React.createElement("div", {
      className: cls
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
      className: "p2 primary-color bundle-processor_title"
    }, texts.subtitle, /*#__PURE__*/React.createElement("div", {
      className: "pull-right"
    }, /*#__PURE__*/React.createElement(_code3.DSIconButton, {
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
      }, /*#__PURE__*/React.createElement(_code3.DSIcon, {
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
    }, texts.actions.declarations), "Files ", processor.files.items.length, /*#__PURE__*/React.createElement(_code3.DSIconButton, {
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
    return /*#__PURE__*/React.createElement(_code3.DSCard, {
      header: texts.title
    }, /*#__PURE__*/React.createElement(React.Fragment, null, hasBackend ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
      className: "success--message"
    }, texts.created)) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, texts.empty.description), /*#__PURE__*/React.createElement("div", {
      className: "card__actions"
    }, /*#__PURE__*/React.createElement(_code2.BeyondButton, {
      className: "primary",
      onClick: onCreate
    }, fetching ? /*#__PURE__*/React.createElement(React.Fragment, null, texts.empty.fetching, /*#__PURE__*/React.createElement(_code.BeyondSpinner, {
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

    const files = module?.texts.value?.processors.get('txt')?.files;
    return /*#__PURE__*/React.createElement("article", {
      className: "bundle_processor-container"
    }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("div", {
      className: "col col-left"
    }, /*#__PURE__*/React.createElement("h6", {
      className: "upper primary-color no-pd"
    }, texts.title)), /*#__PURE__*/React.createElement("div", {
      className: "col-right"
    }, /*#__PURE__*/React.createElement(_code3.DSIconButton, {
      onClick: toggleContent,
      className: "circle expand-icon",
      icon: "expandMore"
    }))), /*#__PURE__*/React.createElement("div", {
      className: cls
    }, !module.texts.has ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, texts.empty.title), /*#__PURE__*/React.createElement("p", null, texts.empty.description)) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ProcessorAlerts, {
      processor: module.texts.value
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


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.ds-module__alerts-section{margin:15px 0;display:flex;gap:15px;align-items:stretch;justify-content:stretch}.ds-module__alerts-section .beyond-alert{flex-basis:max-content;width:100%}@media (max-width:600px){.ds-module__alerts-section{flex-direction:column}}.module__alerts-section h3 .diagnostics__bundle__title{color:#ff8056}.module__alerts-section .beyond-alert{padding-bottom:0}.module__alerts-section h5{text-transform:uppercase;font-weight:700;padding:0;margin-bottom:15px}.module__alerts-section ul{display:grid;margin:0;padding:0}.module__alerts-section ul li{margin:0 -15px;padding:8px 15px;transition:all .2s ease-in}.module__alerts-section ul li h6{margin:0;padding:0;font-size:1.3rem}.module__alerts-section ul li .item__data{display:flex;grid-gap:15px;color:#e4e5dc}.module__alerts-section ul li:hover{background:#121f36;cursor:pointer}.board__item{border:1px solid #121f36;padding:.5rem;list-style:none}.container-cards{display:grid;grid-gap:15px;grid-template-columns:repeat(4,1fr)}.cards-information{margin:15px 0;display:flex;grid-template-columns:1fr 1fr 1fr;grid-gap:15px}@media (max-width:700px){.cards-information{grid-template-columns:1fr 1fr}}.cards-information .card-detail{padding:30px;display:flex;flex-direction:column;background:#050910;border-radius:5px;max-width:300px;align-items:center;min-height:250px;justify-content:center;transition:all .2s ease-in;cursor:pointer}.cards-information .card-detail:hover{box-shadow:0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23);background:#0c1423}.cards-information .card-detail header{font-size:1.2rem;text-align:center;color:#ffa789;margin-bottom:15px}.cards-information .card-detail .card__actions{display:flex;justify-content:center;margin-top:30px}.cards-information .card-detail .card__actions .beyond-button{width:60%}.ds-module-view__detail .module__header h4,.ds-module-view__detail .module__header h5{padding:2px 0}.ds-module-view__detail .module__header .flex-container{display:flex;align-items:center}.ds-module-view__detail .module__header .flex-container.flex-space{justify-content:space-between}.ds-module-view__detail .item-information{display:grid;grid-gap:8px;align-items:center;margin-top:15px}.ds-module-view__detail .item-information .description-item{background:#333;padding:5px 15px;display:flex;justify-content:space-between;transition:all .2s ease-in;cursor:pointer}.ds-module-view__detail .item-information .description-item:hover{background:#262626}.ds-module-view__detail .item-information .description-item:hover .beyond-icon-button{opacity:1}.ds-module-view__detail .item-information .description-item .beyond-icon-button{opacity:.3;transition:all .2s ease-in}.ds-module-view__detail .item-information .description-item .beyond-icon-button svg{transition:all .2s ease-in;fill:#FFFFFF}.ds-module-view__detail .item-information.item-information--edit .form-group{display:grid;grid-template-columns:1fr;grid-gap:5px;width:100%}.ds-module-view__detail .item-information.item-information--edit .form-group input{background:#333;outline:0!important;color:#fff;border:1px solid #f0f0f0;padding:15px;font-size:16px}.ds-module-view__detail .item-information.item-information--edit .form-group input:hover{border-color:#e4e5dc}.ds-module-view__detail .item-information.item-information--edit .form-group .form__actions{margin:15px;display:flex;gap:8px;justify-content:flex-end}.ds-module-view__detail .bundle_processor-container{padding-bottom:20px}.ds-module-view__detail .bundle_processor-container header{background-image:linear-gradient(to right,#f0f0f0 0,#82837f 100%);padding:8px;display:flex;border-top-right-radius:15px;align-items:center}.ds-module-view__detail .bundle_processor-container header .col-left,.ds-module-view__detail .bundle_processor-container header .col-right{display:flex;align-items:center}.ds-module-view__detail .bundle_processor-container header .expand-icon{height:25px;width:25px}.ds-module-view__detail .bundle_processor-container header .expand-icon svg{fill:#121F36}.ds-module-view__detail .bundle_processor-container .bundle-processor_title,.ds-module-view__detail .bundle_processor-container .separator{border-bottom:1px solid #e4e5dc}.ds-module-view__detail .bundle_processor-container .bundle-processor_title{display:flex;justify-content:space-between;align-items:center}.ds-module-view__detail .bundle_processor-container .bundle-processor_title .beyond-icon-button{background:#e4e5dc}.ds-module-view__detail .bundle_processor-container .processor_block-data.hide-block{display:none!important;transition:.3s ease-in-out}.ds-module-view__detail .bundle_processor-container .processor_block-data.two-columns{display:grid;grid-template-columns:1fr 1fr;grid-gap:15px}.ds-module-view__detail{background:#000;width:100%;height:100%;padding:20px}.ds-module-view__detail .content-centering{min-height:100px;display:flex;align-items:center;justify-content:center}.ds-module-view__detail .icon-error{fill:#D2281E}.ds-module-view__detail .icon-warning{fill:#F7D994}.ds-module-view__detail .list-icon{padding:0}.ds-module-view__detail .list-icon li{display:grid;grid-template-columns:auto 1fr;grid-gap:8px;margin-bottom:8px}.ds-module-view__detail .list-icon li svg{margin-top:4px;height:14px;width:14px}.ds-module-view__detail .module_fetching-block{position:absolute;top:0;left:0;bottom:0;right:0;background:rgba(255,255,255,.5);transition:all .2s ease-in;height:0;display:none}.ds-module-view__detail .module_fetching-block.show{height:100%;transition:all .2s ease-in;display:flex;align-items:center;justify-content:center;align-content:center;display:flex}.beyond-element-switch.small .switch{position:relative;display:inline-block;width:40px;height:19px}.beyond-element-switch.small .switch .slider{border-radius:8px}.beyond-element-switch.small .switch .slider:before{top:2.3px;left:2px;bottom:0;right:0;overflow:hidden;content:"";height:13px;width:13px}.beyond-element-switch.small .switch input:checked+.slider:before{left:-4px}';
  bundle.styles.appendToDOM();
});