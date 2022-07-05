define(["exports", "@beyond-js/dashboard/core-components", "@beyond-js/ui/image", "@beyond-js/ui/icon", "@beyond-js/dashboard/notify", "@beyond-js/dashboard/hooks", "@beyond-js/ui/modal", "@beyond-js/ui/spinner", "@beyond-js/ui/form", "@beyond-js/dashboard-lib/models.legacy", "@beyond-js/kernel/texts", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _coreComponents, _image, _icon, _notify, _hooks, _modal, _spinner, _form, _models, _texts, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.ApplicationCreate = void 0;
  _exports.IconInfo = IconInfo;
  _exports.hmr = void 0;
  //  APP
  //  Library Beyond-UI
  //  Library beyond-Dashboard
  //  @beyond-js Texts
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/dashboard/project-create",
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

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
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
  /**********
  context.jsx
  **********/


  const CreateAppContext = React.createContext();

  const useCreateAppContext = () => React.useContext(CreateAppContext);
  /**************
  form\detail.jsx
  **************/


  function DetailApp() {
    const {
      texts: {
        errors,
        form: texts,
        actions
      },
      model,
      fetching
    } = useCreateAppContext();
    const [state, setState] = React.useState({});
    const btnAttrs = {};

    const handleName = event => handleChange(event, / /g);

    const inputsAttrs = {};
    if (fetching) inputsAttrs.disabled = true;

    const handleChange = (event, pattern) => {
      const target = event.target;
      let {
        name,
        value
      } = target;
      if (pattern) value = value.replace(pattern, '-');
      model[name] = value;
      setState({ ...state,
        ...{
          [name]: model[name]
        }
      });
    };

    const toggleRadio = event => {
      const target = event.currentTarget;
      if (target.name === 'inspectPortSwitch') model.useInspectPort = target.checked;else model[target.name] = target.checked;
      setState({ ...state,
        ...{
          useInspectPort: target.checked
        }
      });
    };

    if (!model.valid || fetching) btnAttrs.disabled = true;
    return /*#__PURE__*/React.createElement("div", {
      className: "ds-create-app__fields"
    }, model.error && /*#__PURE__*/React.createElement(_coreComponents.BeyondAlert, {
      title: errors.title,
      type: "error"
    }, "Mensaje de error ", errors[model.error]), /*#__PURE__*/React.createElement("div", {
      className: "item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "section-group"
    }, /*#__PURE__*/React.createElement(_form.BeyondInput, _extends({}, inputsAttrs, {
      name: "scope",
      label: texts.scope.label,
      placeholder: texts.scope.label,
      value: state.scope,
      onChange: handleName
    })), /*#__PURE__*/React.createElement(IconInfo, {
      msg: texts.name.info
    })), /*#__PURE__*/React.createElement("div", {
      className: "section-group"
    }, /*#__PURE__*/React.createElement(_form.BeyondInput, _extends({}, inputsAttrs, {
      name: "name",
      label: texts.name.label,
      placeholder: texts.name.label,
      required: true,
      value: state.name,
      onChange: handleName
    })), /*#__PURE__*/React.createElement(IconInfo, {
      msg: texts.name.info
    })), /*#__PURE__*/React.createElement("div", {
      className: "section-group"
    }, /*#__PURE__*/React.createElement(_form.BeyondInput, _extends({}, inputsAttrs, {
      name: "title",
      label: texts.title.label,
      placeholder: texts.title.label,
      value: state.title,
      onChange: handleChange
    })), /*#__PURE__*/React.createElement(IconInfo, {
      msg: texts.title.info
    })), /*#__PURE__*/React.createElement("div", {
      className: "switch-option"
    }, /*#__PURE__*/React.createElement(_form.BeyondSwitch, {
      name: "inspectPortSwitch",
      onChange: toggleRadio,
      checked: model.useInspectPort,
      value: model.useInspectPort
    }), /*#__PURE__*/React.createElement("label", null, "Backend?")), /*#__PURE__*/React.createElement("div", {
      className: "flex-container"
    }, model.useNavigatePort && /*#__PURE__*/React.createElement(PortField, {
      identifier: "navigate",
      name: "navigatePort"
    }), model.useInspectPort && /*#__PURE__*/React.createElement(PortField, {
      identifier: "inspect",
      name: "inspectPort"
    })), /*#__PURE__*/React.createElement("div", {
      className: "section-group"
    }, /*#__PURE__*/React.createElement(_form.BeyondInput, _extends({}, inputsAttrs, {
      value: state.description,
      placeholder: texts.description.label,
      name: "description",
      label: texts.description.label,
      onChange: handleChange
    })), /*#__PURE__*/React.createElement(IconInfo, {
      msg: texts.description.info
    })), /*#__PURE__*/React.createElement("div", {
      className: "switch-option"
    }, /*#__PURE__*/React.createElement(_form.BeyondSwitch, {
      name: "npm",
      checked: model.npm,
      value: model.npm,
      onChange: toggleRadio
    }), /*#__PURE__*/React.createElement("label", null, texts.npm))), /*#__PURE__*/React.createElement("footer", {
      className: "footer ds-modal__actions"
    }, /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, /*#__PURE__*/React.createElement(_form.BeyondButton, _extends({}, btnAttrs, {
      className: "btn-large btn primary",
      type: "submit"
    }), fetching ? /*#__PURE__*/React.createElement(_spinner.BeyondSpinner, {
      className: "on-primary",
      fetching: true
    }) : actions.submit))));
  }
  /************
  form\form.jsx
  ************/


  function Form() {
    const {
      type,
      setType,
      model,
      texts: {
        form: texts
      }
    } = useCreateAppContext();

    const onSubmit = event => {
      event.preventDefault();
      model.create();
    };

    const typeIcon = type === 'empty' ? 'appTemplate' : 'newApp';
    return /*#__PURE__*/React.createElement("div", {
      className: "ds-modal_content form-content"
    }, /*#__PURE__*/React.createElement(_form.BeyondForm, {
      onSubmit: onSubmit
    }, !type ? /*#__PURE__*/React.createElement(ProjectTypes, null) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "block-types__selected",
      onClick: () => setType(undefined)
    }, /*#__PURE__*/React.createElement(_coreComponents.DSIcon, {
      icon: typeIcon
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, texts.types[type].title), /*#__PURE__*/React.createElement("p", null, texts.types[type].description))), /*#__PURE__*/React.createElement(DetailApp, {
      type: type
    }))));
  }
  /*****************
  form\icon-info.jsx
  *****************/


  function IconInfo({
    msg
  }) {
    return /*#__PURE__*/React.createElement(_icon.BeyondIcon, {
      tabIndex: "-1",
      className: "form__info",
      icon: "info",
      title: msg,
      "data-placement": "top"
    });
  }
  /******************
  form\port-field.jsx
  ******************/


  function PortField({
    name,
    identifier
  }) {
    const {
      texts: {
        form: texts
      },
      model
    } = useCreateAppContext();
    const [valid, setValid] = React.useState();
    const clsPortLabel = `fade-in ${valid === 'success' ? 'form__text-success' : 'form__text-error'}`;

    const handleChange = (event, pattern) => {
      const target = event.target;
      let {
        name,
        value
      } = target;
      if (pattern) value = value.replace(pattern, '-');
      model[name] = value;

      if (value.length === 4) {
        checkPort();
      }
    };

    const checkPort = async () => {
      const port = model[name];
      if (!port) return;
      const isValid = await model.checkPort(port);
      setValid(isValid ? 'success' : 'error');
    };

    return /*#__PURE__*/React.createElement(_form.BeyondInput, {
      name: name,
      label: texts.ports[identifier].label,
      className: "icon-right form__field-port",
      type: "text",
      placeholder: texts.ports[identifier].label,
      maxLength: 4,
      value: model[name],
      onChange: handleChange
    }, /*#__PURE__*/React.createElement(_coreComponents.DSIconButton, {
      tabIndex: "-1",
      icon: "refresh",
      className: "primary",
      title: texts.ports.tooltip
    }), valid && /*#__PURE__*/React.createElement("span", {
      className: clsPortLabel
    }, texts.ports[valid]));
  }
  /*********
  header.jsx
  *********/


  const Header = React.memo(() => {
    const {
      texts
    } = useCreateAppContext();
    return /*#__PURE__*/React.createElement("header", {
      className: "ds-modal_header"
    }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h4", null, texts.title), /*#__PURE__*/React.createElement("h5", {
      className: "primary-color"
    }, texts.subtitle)));
  });
  /***************
  options\item.jsx
  ***************/

  function Item({
    name,
    is
  }) {
    const {
      setType,
      model,
      texts: {
        form: texts
      }
    } = useCreateAppContext();

    const selectType = event => {
      const target = event.currentTarget;
      const name = target.dataset.name;
      model.type = name;
      model.is = is;
      setType(name);
    };

    const src = `/images/logos/${name}.png`;
    return /*#__PURE__*/React.createElement("li", {
      onClick: selectType,
      "data-name": name,
      className: "list__item"
    }, /*#__PURE__*/React.createElement(_image.BeyondImage, {
      src: src
    }), /*#__PURE__*/React.createElement("div", {
      className: "content"
    }, /*#__PURE__*/React.createElement("h4", null, texts.types[name].title), /*#__PURE__*/React.createElement("p", null, texts.types[name].description)));
  }
  /****************
  options\types.jsx
  ****************/


  function ProjectTypes() {
    const {
      texts: {
        form: texts
      },
      model: {
        TYPES,
        templates
      }
    } = useCreateAppContext();
    const outputItems = TYPES.map(item => /*#__PURE__*/React.createElement(Item, {
      is: "type",
      key: item.name,
      name: item.name
    }));
    const outputTemplates = templates.map(item => /*#__PURE__*/React.createElement(Item, {
      is: "template",
      key: item.name,
      name: item.name
    }));
    return /*#__PURE__*/React.createElement("div", {
      className: "projects__types"
    }, /*#__PURE__*/React.createElement("h4", {
      className: ""
    }, texts.types.titles.empty), /*#__PURE__*/React.createElement("ul", {
      className: "items__list"
    }, outputItems), /*#__PURE__*/React.createElement("h4", {
      className: "block_types-title"
    }, texts.types.titles.templates), /*#__PURE__*/React.createElement("ul", null, outputTemplates));
  }
  /*******
  view.jsx
  *******/


  const ApplicationCreate = function ({
    closeModal
  }) {
    const [state, setState] = React.useState({});
    const [type, setType] = React.useState(undefined);
    const notify = _notify.NotifyManager;
    const model = createController.model;
    const spinner = React.useRef();
    const {
      fetching,
      error
    } = state;
    (0, _hooks.useBinder)([createController], () => {
      const fetching = model.fetching || model.application?.fetching;

      if (model.created) {
        closeModal();
        notify.success(texts?.created);
        window.setTimeout(model.clean(), 100);
        return;
      }

      setState(() => ({ ...state,
        fetching: model.fetching,
        error: model.error
      }));
    });
    React.useEffect(() => {
      if (fetching) {
        window.setTimeout(() => spinner.current?.classList.toggle('container-hidden'), 100);
      }
    }, [fetching]);
    const output = [];

    if (createController.ready) {
      output.push( /*#__PURE__*/React.createElement(React.Fragment, {
        key: "content"
      }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(Form, null)));
    }

    const texts = createController.texts;
    const cls = `${model.fetching ? ' is' : ''}`;
    return /*#__PURE__*/React.createElement(CreateAppContext.Provider, {
      value: {
        type,
        setType,
        model,
        texts,
        error,
        fetching
      }
    }, /*#__PURE__*/React.createElement(_modal.BeyondModal, {
      show: true,
      onClose: closeModal,
      className: "md ds-modal ds-app-create_modal"
    }, /*#__PURE__*/React.createElement("div", {
      className: cls
    }, output, fetching && /*#__PURE__*/React.createElement(_coreComponents.DSSpinner, {
      ref: spinner,
      active: true,
      className: "absolute-container container-hidden"
    }))));
  };
  /***********
  JS PROCESSOR
  ***********/

  /******************
  FILE: controller.js
  ******************/


  _exports.ApplicationCreate = ApplicationCreate;
  const createController = new class Controller extends _models.ReactiveModel {
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
      const model = new _models.ApplicationBuilder();
      this.#model = model;
      model.bind('change', this.triggerEvent);
      const module = __pkg.bundle.module.resource;
      this.#texts = new _texts.CurrentTexts(module, true);
      this.#texts.bind('change', this.triggerEvent);
    }

  }();
  /**********
  SCSS STYLES
  **********/

  const legacyStyles = beyondLegacyStyles.register('@beyond-js/dashboard/project-create.code', '.ds-modal.ds-app-create_modal .ds-create-app__fields{padding:20px 60px}.ds-app-create_modal .block-selected{display:flex;align-items:center;background:var(--beyond-primary-light-color);transition:.2s all ease-in;cursor:pointer}.ds-app-create_modal .block-selected:hover{background:var(--beyond-primary-dark-color)}.ds-app-create_modal .block-selected svg{padding:30px;height:120px;width:120px}.ds-app-create_modal .switch-option{display:flex;align-items:center;grid-gap:8px}.ds-app-create_modal .form__field-port{margin-bottom:10px}.ds-app-create_modal .form__field-port span{position:absolute;bottom:-10px}.ds-app-create_modal .form__field-port .item{margin-top:15px}.ds-app-create_modal .form__field-port .item.two-columns{display:grid;grid-template-columns:1fr 1fr}.section-group{position:relative}.section-group svg{fill:var(--beyond-gray-dark-color);cursor:pointer}.section-group .beyond-icon.form__info{position:absolute;right:0;top:15px}.ds-app-create_modal .projects__types{padding:20px}.ds-app-create_modal .projects__types>h4{padding:15px}.ds-app-create_modal .projects__types ul{list-style:none;padding:0;margin-top:15px;grid-template-columns:1fr 1fr 1fr;display:grid;flex-wrap:wrap}.ds-app-create_modal .projects__types ul li{padding:10px 15px 10px;display:grid;width:300px;grid-template-columns:auto 1fr;align-items:center;justify-items:left;grid-gap:15px;transition:.2s all ease-in;cursor:pointer}.ds-app-create_modal .projects__types ul li.disabled{opacity:.3}.ds-app-create_modal .projects__types ul li h4{padding:0;font-size:1.1rem;margin-bottom:5px}.ds-app-create_modal .projects__types ul li p{margin:0;font-size:.9rem}.ds-app-create_modal .projects__types ul li .beyond-element-image,.ds-app-create_modal .projects__types ul li .beyond-element-image img{height:30px!important;aspect-ratio:1/1;object-fit:cover}.ds-app-create_modal .projects__types ul li:hover:not(.disabled){background:#f0f0f0}');
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