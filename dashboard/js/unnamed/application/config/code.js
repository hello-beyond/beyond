define(["exports", "react", "react-dom", "@beyond-js/dashboard-lib/models/js", "@beyond-js/dashboard/unnamed/components/select/code", "@beyond-js/dashboard/unnamed/workspace/context/code", "@beyond-js/dashboard/unnamed/workspace/components/editor/code", "@beyond-js/ui/modal/code", "@beyond-js/ui/spinner/code", "@beyond-js/ui/form/code"], function (_exports, React, ReactDOM, _js, _code, _code2, _code3, _code4, _code5, _code6) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.ConfigBoard = ConfigBoard;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/application/config/code', false, {
    "txt": {
      "multilanguage": true
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
  /*********
  config.jsx
  *********/


  const ConfigContext = React.createContext();

  const useConfigContext = () => React.useContext(ConfigContext);

  function ConfigBoard() {
    const [state, setState] = React.useState({});
    const [controller, setController] = React.useState();
    const {
      fetching,
      update
    } = state;
    React.useEffect(() => {
      const controller = new Controller();
      setController(controller);
      setState(state => ({ ...state,
        controller,
        update: performance.now()
      }));

      const onChange = () => setState({ ...state,
        update: performance.now()
      });

      controller.bind('change', onChange);
      return () => controller.unbind('change', onChange);
    }, []);

    const onSave = async event => {
      event.stopPropagation();
      event.preventDefault();
      await controller.model.save();
      setState({ ...state,
        fetching: true
      });
      window.setTimeout(() => setState({ ...state,
        fetching: false
      }), 300);
    };

    if (!update || !controller?.ready) return null;
    const {
      model,
      texts
    } = controller;
    const {
      unpublished
    } = model;
    const attrs = {};
    if (!model.unpublished) attrs.disabled = true;

    const onChange = event => {
      event.stopPropagation();
      const target = event.currentTarget;

      try {
        model[target.name] = target.value;
      } catch (e) {
        console.warn('this is not a configuration property');
      }
    };

    return /*#__PURE__*/React.createElement(ConfigContext.Provider, {
      value: {
        model,
        unpublished,
        texts
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "workspace__board"
    }, /*#__PURE__*/React.createElement("form", {
      className: "form",
      onSubmit: onSave
    }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("h3", null, texts.title, " ")), /*#__PURE__*/React.createElement(Theme, null), /*#__PURE__*/React.createElement("div", {
      className: "settings__item"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: ""
    }, texts.controls.fontSize.label), /*#__PURE__*/React.createElement("input", {
      type: "text",
      onChange: onChange,
      name: "fontSize",
      value: model.fontSize,
      placeholder: texts.controls.fontSize.placeholder
    })), /*#__PURE__*/React.createElement("div", {
      className: "settings-item"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: ""
    }, texts.controls.wordWrap.label), /*#__PURE__*/React.createElement(_code6.BeyondSwitch, {
      name: "wordWrap",
      value: model.wordWrap,
      onChange: onChange
    }))), model.unpublished && /*#__PURE__*/React.createElement("footer", {
      className: "settings__actions"
    }, /*#__PURE__*/React.createElement(_code6.BeyondButton, _extends({}, attrs, {
      onClick: onSave,
      className: "btn primary"
    }), texts.actions.save))), /*#__PURE__*/React.createElement(ListDistributions, {
      texts: texts.distribution
    })));
  }
  /****************************************
  distributions\item-list-distributions.jsx
  ****************************************/


  const ItemListDistreibutions = ({
    data,
    texts
  }) => {
    return /*#__PURE__*/React.createElement("li", {
      className: "item-distribution"
    }, /*#__PURE__*/React.createElement("div", {
      className: "right-box-distributions"
    }, data.name && /*#__PURE__*/React.createElement("h4", null, texts.name, ": ", /*#__PURE__*/React.createElement("span", null, data.name)), /*#__PURE__*/React.createElement("h4", null, texts.platform, ": ", /*#__PURE__*/React.createElement("span", null, data.platform)), /*#__PURE__*/React.createElement("h4", null, texts.environment, ": ", /*#__PURE__*/React.createElement("span", null, data.environment)), /*#__PURE__*/React.createElement("h4", null, texts.port, ": ", /*#__PURE__*/React.createElement("span", null, data.port)), data.ts && /*#__PURE__*/React.createElement("h4", null, texts.ts, ": ", /*#__PURE__*/React.createElement("span", null, data.ts.compiler))), /*#__PURE__*/React.createElement("div", {
      className: "left-box-distributions"
    }, data.default && /*#__PURE__*/React.createElement("span", null, texts.default), data.ssr && /*#__PURE__*/React.createElement("span", null, texts.ssr)));
  };
  /*********************
  distributions\list.jsx
  *********************/


  const ListDistributions = ({
    texts
  }) => {
    const {
      workspace: {
        active: {
          deployment: {
            distributions
          }
        }
      }
    } = (0, _code2.useDSWorkspaceContext)();

    const handleClick = () => setModal(!modal);

    const [modal, setModal] = React.useState(false);
    const output = [];
    distributions.forEach(data => output.push( /*#__PURE__*/React.createElement(ItemListDistreibutions, {
      key: data.id,
      data: data,
      texts: texts
    })));
    return /*#__PURE__*/React.createElement("div", {
      className: "container-distributions"
    }, /*#__PURE__*/React.createElement("div", {
      className: "header-distributions"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "title-list-distributions"
    }, texts.title), /*#__PURE__*/React.createElement(_code6.BeyondButton, {
      onClick: handleClick,
      className: "btn primary beyond-button waves-effect"
    }, texts.add)), /*#__PURE__*/React.createElement("ul", {
      className: "list-distributions"
    }, output.length && output), modal && /*#__PURE__*/React.createElement(ModalDistributions, {
      texts: texts,
      setModal: setModal
    }));
  };
  /**********************
  distributions\modal.jsx
  **********************/


  const ModalDistributions = ({
    setModal,
    texts
  }) => {
    const {
      workspace: {
        active: {
          deployment
        }
      }
    } = (0, _code2.useDSWorkspaceContext)();
    const [formValues, handleChange] = useForm({
      name: '',
      port: '',
      distDefault: '',
      compress: '',
      ssr: '',
      default: '',
      platform: 'web',
      environment: 'development'
    });
    const [bool, setBool] = React.useState({
      compress: false,
      distDefault: false,
      ssr: false,
      checked: false
    });
    const {
      distDefault,
      compress,
      ssr,
      checked
    } = bool;
    const {
      name,
      platform,
      environment
    } = formValues;

    const handleChangeDistDefault = () => setBool({ ...bool,
      distDefault: !distDefault
    });

    const handleChangeCompress = () => setBool({ ...bool,
      compress: !compress
    });

    const handleChangeSsr = () => setBool({ ...bool,
      ssr: !ssr
    });

    const handleChangeChecked = () => setBool({ ...bool,
      checked: !checked
    });

    const options = [{
      value: 'web',
      label: 'Web'
    }, {
      value: 'backend',
      label: 'Backend'
    }];
    const optionsEnvironment = [{
      value: 'development',
      label: 'Desarrollo'
    }, {
      value: 'production',
      label: 'Production'
    }];

    const close = () => setModal(false);

    const onSubmit = async () => {
      const distribution = { ...formValues,
        ...bool
      };
      const r = await deployment.addDistribution(distribution);
      console.log('response ', r);
    };

    return /*#__PURE__*/React.createElement(_code4.BeyondModal, {
      show: true,
      onClose: close,
      className: "md ds-modal distributions-modal"
    }, /*#__PURE__*/React.createElement("header", {
      className: "ds-modal_header"
    }, /*#__PURE__*/React.createElement("section", {
      className: "section-header"
    }, /*#__PURE__*/React.createElement("h4", null, texts.titleModal), /*#__PURE__*/React.createElement("h5", {
      className: "primary-color"
    }, texts.modalHeader))), /*#__PURE__*/React.createElement(_code6.BeyondForm, {
      className: "form-modal-distributions",
      onSubmit: onSubmit
    }, /*#__PURE__*/React.createElement("div", {
      className: "item"
    }, /*#__PURE__*/React.createElement(_code6.BeyondInput, {
      name: "name",
      label: "Nombre",
      placeholder: "Nombre de la distribucion",
      required: true,
      value: name,
      onChange: handleChange
    }), /*#__PURE__*/React.createElement("div", {
      className: "selects-distributions"
    }, /*#__PURE__*/React.createElement("div", {
      className: "distributions-select"
    }, /*#__PURE__*/React.createElement("label", null, texts.platform), /*#__PURE__*/React.createElement(_code.DSSelect, {
      name: "platform",
      options: options,
      value: platform,
      onSelect: handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "distributions-select"
    }, /*#__PURE__*/React.createElement("label", null, texts.environment), /*#__PURE__*/React.createElement(_code.DSSelect, {
      name: "environment",
      options: optionsEnvironment,
      value: environment,
      onSelect: handleChange
    }))), /*#__PURE__*/React.createElement("div", {
      className: "input-group-distributions"
    }, /*#__PURE__*/React.createElement("div", {
      className: "port"
    }, /*#__PURE__*/React.createElement(_code6.BeyondInput, {
      name: "port",
      label: "Puerto",
      type: "number",
      placeholder: "Puerto",
      min: "1",
      onChange: handleChange
    })), /*#__PURE__*/React.createElement(_code6.BeyondCheckbox, {
      label: "TypeScript",
      checked: checked,
      onChange: handleChangeChecked,
      value: checked
    })), /*#__PURE__*/React.createElement("div", {
      className: "input-switch-distributions"
    }, /*#__PURE__*/React.createElement("div", {
      className: "switch-item"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: ""
    }, texts.compress), /*#__PURE__*/React.createElement(_code6.BeyondSwitch, {
      name: "compress",
      value: compress,
      onChange: handleChangeCompress
    })), /*#__PURE__*/React.createElement("div", {
      className: "switch-item"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: ""
    }, texts.ssr), /*#__PURE__*/React.createElement(_code6.BeyondSwitch, {
      name: "ssr",
      value: ssr,
      onChange: handleChangeSsr
    })), /*#__PURE__*/React.createElement("div", {
      className: "switch-item"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: ""
    }, texts.default), /*#__PURE__*/React.createElement(_code6.BeyondSwitch, {
      name: "default",
      value: distDefault,
      onChange: handleChangeDistDefault
    })))), /*#__PURE__*/React.createElement("div", {
      className: "div-botton-distributions"
    }, /*#__PURE__*/React.createElement(_code6.BeyondButton, {
      className: "btn primary beyond-button waves-effect",
      type: "submit"
    }, texts.add))));
  };
  /********
  theme.jsx
  ********/


  function Theme() {
    const {
      model,
      texts: {
        controls
      }
    } = useConfigContext();

    const handleChange = ele => {
      model.theme = ele.value;
    };

    const options = [{
      value: 'vs-light',
      label: 'vs-light'
    }, {
      value: 'vs-dark',
      label: 'vs-dark'
    }, {
      value: 'vs-black',
      label: 'vs-black'
    }, {
      value: 'hc-black',
      label: 'hc-black'
    }];
    return /*#__PURE__*/React.createElement("div", {
      className: "form-column"
    }, /*#__PURE__*/React.createElement("label", null, controls.theme.label), /*#__PURE__*/React.createElement(_code.DSSelect, {
      options: options,
      value: model.theme,
      onSelect: handleChange
    }));
  }
  /***********
  JS PROCESSOR
  ***********/

  /******************
  FILE: controller.js
  ******************/


  class Controller extends _js.ReactiveModel {
    get ready() {
      return module.texts?.ready;
    }

    _model;

    get model() {
      return this._model;
    }

    get texts() {
      return module.texts?.value ?? {};
    }

    constructor() {
      super();
      module.texts.bind('change', this.triggerEvent);
      this._model = _code3.monacoDependency.settings;
      this.model.bind('change', this.triggerEvent);
    }

    dispose() {
      module.texts.unbind('change', this.triggerEvent);
    }

  }
  /***************
  FILE: useForm.js
  ***************/


  const useForm = (initialState = {}) => {
    const [values, setValues] = React.useState(initialState);

    const reset = () => {
      setValues(initialState);
    };

    const handleInputChange = ({
      target
    }) => {
      setValues({ ...values,
        [target.name]: target.value
      });
    };

    return [values, handleInputChange, reset];
  };
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.workspace__board .container-distributions .header-distributions{display:flex;justify-content:space-between}.workspace__board .container-distributions .header-distributions .beyond-button{width:7rem;height:3rem}.workspace__board .container-distributions .list-distributions{list-style-type:none;padding:0}.workspace__board .container-distributions .list-distributions .item-distribution{display:flex;justify-content:space-between;border-bottom:2px solid #fff;background-color:#0d121a;border-radius:.5rem;padding:2rem;margin-bottom:1rem}.workspace__board .container-distributions .list-distributions .item-distribution .right-box-distributions{display:flex;flex-direction:column;text-transform:capitalize}.workspace__board .container-distributions .list-distributions .item-distribution .right-box-distributions h4{font-size:14px}.workspace__board .container-distributions .list-distributions .item-distribution .right-box-distributions span{padding-bottom:1rem;font-size:12px;margin-left:.5rem;color:#ff8056}.workspace__board .container-distributions .list-distributions .item-distribution .left-box-distributions{display:flex;flex-direction:column;justify-content:center;text-transform:capitalize;margin-right:2rem;margin-top:1rem}.workspace__board .container-distributions .list-distributions .item-distribution .left-box-distributions span{margin-bottom:1rem;background-color:#050910;color:#fff;border-radius:.5rem;font-size:10px;padding:.5rem;border:1px solid #050910}.workspace__board .container-distributions .list-distributions .item-distribution .left-box-distributions:nth-child(2){text-align:center}.distributions-modal{background-color:rgba(0,0,0,.8)}.distributions-modal .modal-wrapper .modal-content{width:60%}.distributions-modal .modal-wrapper .modal-content .ds-modal_header .section-header{text-align:center;text-transform:capitalize}.distributions-modal .modal-wrapper .modal-content .form-modal-distributions{padding:1rem 3rem}.distributions-modal .modal-wrapper .modal-content .form-modal-distributions .item .selects-distributions{display:grid;grid-template-columns:repeat(2,1fr)}.distributions-modal .modal-wrapper .modal-content .form-modal-distributions .item .selects-distributions .distributions-select .form__select{width:95%}.distributions-modal .modal-wrapper .modal-content .form-modal-distributions .item .selects-distributions .distributions-select .form__select .form__select__options{background-color:#050910;z-index:100}.distributions-modal .modal-wrapper .modal-content .form-modal-distributions .item .selects-distributions .distributions-select .form__select .form__select__options .option{color:#fff}.distributions-modal .modal-wrapper .modal-content .form-modal-distributions .item .input-group-distributions{display:grid;grid-template-columns:repeat(2,1fr)}.distributions-modal .modal-wrapper .modal-content .form-modal-distributions .item .input-group-distributions .port .beyond-element-input{font-size:15px;width:98%}.distributions-modal .modal-wrapper .modal-content .form-modal-distributions .item .input-group-distributions .beyond-checkbox{flex-direction:column-reverse;align-items:flex-start;margin:auto}.distributions-modal .modal-wrapper .modal-content .form-modal-distributions .item .input-group-distributions .beyond-checkbox .checkmark{height:18px;width:18px}.distributions-modal .modal-wrapper .modal-content .form-modal-distributions .item .input-switch-distributions{display:flex;justify-content:center;gap:6rem}.distributions-modal .modal-wrapper .modal-content .form-modal-distributions .item .input-switch-distributions .switch-item{justify-self:center}.distributions-modal .modal-wrapper .modal-content .div-botton-distributions{display:flex;justify-content:flex-end}.distributions-modal .modal-wrapper .modal-content .div-botton-distributions .beyond-button{width:7rem}.workspace__board{--border-color:var(--beyond-gray-darker-color);--border-color-focus:var(--beyond-gray-dark-color);display:flex;flex-direction:column;justify-content:center}.workspace__board .settings__item{padding:15px 0;display:grid;gap:10px}.workspace__board .settings__item input{background:0 0;border:1px solid var(--border-color);padding:8px;color:var(--beyond-text-on-primary);outline:0}.workspace__board .settings__item input:hover{border-color:var(--border-color-focus)}.workspace__board .form{align-self:normal}.workspace__board .settings__actions{margin-top:15px;padding:15px 0;justify-content:flex-end;align-items:center;display:flex;border-top:1px solid var(--beyond-gray-light-color)}';
  bundle.styles.appendToDOM();
});