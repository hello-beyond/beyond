define(["exports", "react", "react-dom", "@beyond-js/dashboard-lib/models/ts", "@beyond-js/dashboard-lib/models/js", "@beyond-js/ui/spinner/code", "@beyond-js/ui/form/code", "@beyond-js/ui/preload-text/code", "@beyond-js/dashboard/ds-select/code", "@beyond-js/ui/modal/code", "@beyond-js/dashboard/hooks/code", "@beyond-js/dashboard/core-components/code", "@beyond-js/dashboard/ds-contexts/code"], function (_exports, React, ReactDOM, _ts, _js, _code, _code2, _code3, _code4, _code5, _code6, _code7, _code8) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.ApplicationsSettings = ApplicationsSettings;
  //WORKSPACE CONTEXT
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/applications-settings/code', false, {
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
  /*********************
  distributions\item.jsx
  *********************/


  const DistributionItem = ({
    data,
    texts
  }) => {
    return /*#__PURE__*/React.createElement("li", {
      className: "item-distribution"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, data.name), /*#__PURE__*/React.createElement("div", {
      className: "item__description"
    }, texts.platform.label, ": ", /*#__PURE__*/React.createElement("span", null, data.platform)), /*#__PURE__*/React.createElement("div", {
      className: "item__description"
    }, texts.environment, ": ", /*#__PURE__*/React.createElement("span", null, data.environment)), /*#__PURE__*/React.createElement("div", {
      className: "item__description"
    }, texts.port.label, ": ", /*#__PURE__*/React.createElement("span", null, data.port)), data.ts && /*#__PURE__*/React.createElement("div", {
      className: "item__description"
    }, texts.ts, ": ", /*#__PURE__*/React.createElement("span", null, data.ts.compiler))), /*#__PURE__*/React.createElement("div", null, data.default && /*#__PURE__*/React.createElement("span", {
      className: "badge"
    }, texts.default), data.ssr && /*#__PURE__*/React.createElement("span", {
      className: "badge"
    }, texts.ssr)));
  };
  /*********************
  distributions\list.jsx
  *********************/


  const ListDistributions = () => {
    const {
      selected,
      texts
    } = useAppsSettingsContext();

    if (!selected.deployment) {
      console.warn("the application selected does not has distributions");
      return null;
    }

    const {
      deployment: {
        distributions
      }
    } = selected;

    const handleClick = () => showModal(!modal);

    const [modal, showModal] = React.useState(false);
    React.useEffect(() => {
      const onChange = event => console.log(1, `total: `, selected.deployment.distributions.size);

      selected.deployment.bind('change', onChange);
      return () => selected.deployment.unbind('change', onChange);
    });
    const output = [];
    distributions.forEach(data => output.push( /*#__PURE__*/React.createElement(DistributionItem, {
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
    }, texts.title), /*#__PURE__*/React.createElement(_code2.BeyondButton, {
      onClick: handleClick,
      className: "btn primary beyond-button waves-effect"
    }, texts.add)), /*#__PURE__*/React.createElement("ul", {
      className: "list-distributions"
    }, output), modal && /*#__PURE__*/React.createElement(ModalDistributions, {
      texts: texts,
      showModal: showModal
    }));
  };
  /**********************
  distributions\modal.jsx
  **********************/


  const ModalDistributions = ({
    showModal
  }) => {
    const {
      selected,
      texts
    } = useAppsSettingsContext();
    const [ready, setReady] = React.useState();
    const [isValid, setIsValid] = React.useState(false);
    const [fetching, setFetching] = React.useState(false);
    const [error, setError] = React.useState(false);
    const defaultValues = {
      checked: false,
      name: '',
      port: 8080,
      compress: false,
      ssr: false,
      isDefault: false,
      platform: 'web',
      environment: 'development',
      checkType: false
    };
    const [formValues, handleChange] = useForm(defaultValues);
    React.useEffect(() => {
      (async () => {
        const port = await controller.model.availablePort();
        setReady(true);
        setIsValid(true);
        handleChange({
          target: {
            name: 'port',
            value: port
          }
        });
      })();
    }, []);
    if (!ready) return null;
    const {
      deployment: {
        distributions
      }
    } = selected;
    const {
      name,
      platform,
      port,
      environment,
      isDefault,
      compress,
      ssr,
      checkType,
      checked
    } = formValues;
    const options = [{
      value: 'android',
      label: texts.platform.options.android,
      name: 'platform'
    }, {
      value: 'ios',
      label: texts.platform.options.ios,
      name: 'platform'
    }, {
      value: 'web',
      label: texts.platform.options.web,
      name: 'platform'
    }, {
      value: 'backend',
      label: texts.platform.options.backend,
      name: 'platform'
    }, {
      value: 'ssr',
      label: texts.platform.options.ssr,
      name: 'platform'
    }, {
      value: 'node',
      label: texts.platform.options.node,
      name: 'platform'
    }];
    const optionsEnvironment = [{
      value: 'development',
      label: texts.environments.dev,
      name: "environment"
    }, {
      value: 'production',
      label: texts.environments.prod,
      name: "environment"
    }];

    const close = () => showModal(false);

    const onSubmit = async () => {
      setFetching(true);
      setError(undefined);
      const response = await selected.deployment.addDistribution(formValues);
      setFetching(false);

      if (response?.error) {
        setError(response.error);
        return;
      }

      showModal(false);
    };

    const onBlurPort = async event => {
      setFetching(true);
      const isValid = await controller.model.checkPort(port);
      setIsValid(isValid);
      setFetching(false);
    };

    const disabled = {};
    const formValid = name && platform && environment;

    const checkSwitch = event => {
      const target = event.currentTarget;
      handleChange({
        target: {
          name: target.name,
          value: target.checked
        }
      });
    };

    if (!isValid || !formValid) disabled.disabled = true;
    const portMessage = isValid ? texts.port.success : texts.port.error;
    const clsPortLabel = `fade-in ${isValid ? 'form__text-success' : 'form__text-error'}`;
    return /*#__PURE__*/React.createElement(_code5.BeyondModal, {
      show: true,
      onClose: close,
      className: "md ds-modal distributions-modal"
    }, /*#__PURE__*/React.createElement("header", {
      className: "ds-modal_header"
    }, /*#__PURE__*/React.createElement("section", {
      className: "section-header"
    }, /*#__PURE__*/React.createElement("h4", null, texts.titleModal), /*#__PURE__*/React.createElement("h5", {
      className: "primary-color"
    }, texts.modalHeader))), /*#__PURE__*/React.createElement(_code2.BeyondForm, {
      onSubmit: onSubmit
    }, /*#__PURE__*/React.createElement(React.Fragment, null, error && /*#__PURE__*/React.createElement(_code7.BeyondAlert, {
      type: "error"
    }, " ", texts.errors[error], " "), /*#__PURE__*/React.createElement("div", {
      className: "item"
    }, /*#__PURE__*/React.createElement(_code2.BeyondInput, {
      name: "name",
      label: texts.name,
      placeholder: texts.name,
      required: true,
      value: name,
      onChange: handleChange
    }), /*#__PURE__*/React.createElement("div", {
      className: "selects-distributions"
    }, /*#__PURE__*/React.createElement("div", {
      className: "distributions-select"
    }, /*#__PURE__*/React.createElement("label", null, texts.platform.label), /*#__PURE__*/React.createElement(_code4.DSSelect, {
      name: "platform",
      options: options,
      value: platform,
      onSelect: handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "distributions-select"
    }, /*#__PURE__*/React.createElement("label", null, texts.environment), /*#__PURE__*/React.createElement(_code4.DSSelect, {
      name: "environment",
      options: optionsEnvironment,
      value: environment,
      onSelect: handleChange
    }))), /*#__PURE__*/React.createElement("div", {
      className: "input-group-distributions"
    }, /*#__PURE__*/React.createElement("div", {
      className: "port"
    }, /*#__PURE__*/React.createElement(_code2.BeyondInput, {
      onBlur: onBlurPort,
      name: "port",
      label: texts.port.label,
      type: "number",
      value: port,
      placeholder: texts.port.label,
      min: "1",
      onChange: handleChange
    }), /*#__PURE__*/React.createElement("span", {
      className: clsPortLabel
    }, portMessage))), /*#__PURE__*/React.createElement("div", {
      className: "input-switch-distributions"
    }, /*#__PURE__*/React.createElement("div", {
      className: "switch-item"
    }, /*#__PURE__*/React.createElement("label", null, texts.checkType), /*#__PURE__*/React.createElement(_code2.BeyondSwitch, {
      name: "checkType",
      checked: checkType,
      onChange: checkSwitch,
      value: checkType
    })), /*#__PURE__*/React.createElement("div", {
      className: "switch-item"
    }, /*#__PURE__*/React.createElement("label", null, texts.compress), /*#__PURE__*/React.createElement(_code2.BeyondSwitch, {
      name: "compress",
      value: compress,
      onChange: checkSwitch
    })), /*#__PURE__*/React.createElement("div", {
      className: "switch-item"
    }, /*#__PURE__*/React.createElement("label", null, texts.ssr), /*#__PURE__*/React.createElement(_code2.BeyondSwitch, {
      name: "ssr",
      value: ssr,
      onChange: checkSwitch
    })), /*#__PURE__*/React.createElement("div", {
      className: "switch-item"
    }, /*#__PURE__*/React.createElement("label", null, texts.default), /*#__PURE__*/React.createElement(_code2.BeyondSwitch, {
      name: "default",
      value: isDefault,
      onChange: checkSwitch
    })))), /*#__PURE__*/React.createElement("div", {
      className: "ds-modal__actions"
    }, /*#__PURE__*/React.createElement(_code2.BeyondButton, _extends({}, disabled, {
      className: "btn primary beyond-button waves-effect",
      type: "submit"
    }), fetching ? /*#__PURE__*/React.createElement(_code.BeyondSpinner, {
      className: "on-primary",
      fetching: true
    }) : texts.add)))));
  };
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
    }, /*#__PURE__*/React.createElement("label", null, texts.applications.select), /*#__PURE__*/React.createElement("div", {
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
    }, /*#__PURE__*/React.createElement(ApplicationsSelect, null), selected && /*#__PURE__*/React.createElement(ListDistributions, {
      texts: texts.distribution
    }));
  }
  /**********
  useForm.jsx
  **********/


  const useForm = (initialState = {}) => {
    const [values, setValues] = React.useState(initialState);

    const reset = () => setValues(initialState);

    const handleInputChange = ({
      target
    }) => {
      setValues({ ...values,
        [target.name]: target.value
      });
    };

    return [values, handleInputChange, reset];
  };
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
      return module.texts?.value;
    }

    get ready() {
      return module.texts.ready && this.#model.ready;
    }

    constructor(props) {
      super(props);
      const model = new _ts.Dashboard();
      window.d = model;
      this.#model = model;
      module.texts.bind('change', this.triggerEvent);
      model.bind('change', this.triggerEvent);
    }

  }();
  /**********
  SCSS STYLES
  **********/

  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.workspace__board .container-distributions .item-distribution{display:flex;justify-content:space-between;border-bottom:1px solid #fff;background-color:#0d121a;padding:2rem;margin-bottom:1rem}.workspace__board .container-distributions .item-distribution h2{text-transform:uppercase;margin:0;padding:0}.workspace__board .container-distributions .item-distribution h4{font-size:14px}.workspace__board .container-distributions .item-distribution span{padding-bottom:1rem;font-size:12px;margin-left:.5rem;color:#ff8056}.workspace__board .container-distributions .item-distribution .left-box-distributions{display:flex;flex-direction:column;justify-content:center;text-transform:capitalize;margin-right:2rem;margin-top:1rem}.workspace__board .container-distributions .item-distribution .left-box-distributions span{margin-bottom:1rem;background-color:#050910;color:#fff;border-radius:.5rem;font-size:10px;padding:.5rem;border:1px solid #050910}.workspace__board .container-distributions .item-distribution .left-box-distributions:nth-child(2){text-align:center}.workspace__board .container-distributions{margin-top:30px}.workspace__board .container-distributions .header-distributions{display:flex;justify-content:space-between}.workspace__board .container-distributions .header-distributions .beyond-button{width:7rem;height:3rem}.workspace__board .container-distributions .list-distributions{list-style-type:none;padding:0}.distributions-modal{background-color:rgba(0,0,0,.8)}.distributions-modal .modal-content form{padding:20px!important}.distributions-modal .item .selects-distributions{display:grid;grid-template-columns:repeat(2,1fr)}.distributions-modal .item .selects-distributions .distributions-select .form__select{width:95%}.distributions-modal .item .selects-distributions .distributions-select .form__select .form__select__options{background-color:#050910;z-index:100}.distributions-modal .item .selects-distributions .distributions-select .form__select .form__select__options .option{color:#fff}.distributions-modal .item .input-group-distributions{display:grid;grid-template-columns:repeat(2,1fr)}.distributions-modal .item .input-group-distributions .port .beyond-element-input{font-size:15px;width:98%}.distributions-modal .item .input-group-distributions .beyond-checkbox{flex-direction:column-reverse;align-items:flex-start;margin:auto}.distributions-modal .item .input-group-distributions .beyond-checkbox .checkmark{height:18px;width:18px}.distributions-modal .item .input-switch-distributions{display:flex;margin-top:15px;justify-content:start;gap:6rem}.distributions-modal .item .input-switch-distributions .switch-item{justify-self:center}.distributions-modal .div-botton-distributions{display:flex;justify-content:flex-end}.distributions-modal .div-botton-distributions .beyond-button{width:7rem}';
  bundle.styles.appendToDOM();
});