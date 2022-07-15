define(["exports", "@beyond-js/dashboard-lib/models.ts", "@beyond-js/ui/spinner", "@beyond-js/ui/form", "@beyond-js/ui/preload-text", "@beyond-js/dashboard/ds-select", "@beyond-js/ui/modal", "@beyond-js/dashboard/hooks", "@beyond-js/dashboard/texts-binder", "@beyond-js/dashboard/core-components", "@beyond-js/dashboard/ds-contexts", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _models, _spinner, _form, _preloadText, _dsSelect, _modal, _hooks, _textsBinder, _coreComponents, _dsContexts, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.hmr = _exports.AppDistributions = void 0;
  //WORKSPACE CONTEXT
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/dashboard/project-distributions",
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
  /*******
  item.jsx
  *******/


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
    }, texts.platform.environment, ": ", /*#__PURE__*/React.createElement("span", null, data.environment)), /*#__PURE__*/React.createElement("div", {
      className: "item__description"
    }, texts.platform.port.label, ": ", /*#__PURE__*/React.createElement("span", null, data.port)), data.ts && /*#__PURE__*/React.createElement("div", {
      className: "item__description"
    }, texts.ts, ": ", /*#__PURE__*/React.createElement("span", null, data.ts.compiler))), /*#__PURE__*/React.createElement("div", null, data.default && /*#__PURE__*/React.createElement("span", {
      className: "badge"
    }, texts.default), data.ssr && /*#__PURE__*/React.createElement("span", {
      className: "badge"
    }, texts.ssr)));
  };
  /*******
  list.jsx
  *******/


  const AppDistributions = ({
    application
  }) => {
    const [modal, showModal] = React.useState(false);
    const module = __pkg.bundle.module.resource;
    const [textsReady, texts] = (0, _textsBinder.useTextsBinder)(module);
    if (!textsReady || !texts) return null;

    if (!application.deployment) {
      console.warn("the application  does not has distributions");
      return null;
    }

    const {
      deployment: {
        distributions
      }
    } = application;

    const handleClick = () => showModal(!modal);

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
    }, texts.platform.title)), /*#__PURE__*/React.createElement("ul", {
      className: "list-distributions"
    }, output), modal && /*#__PURE__*/React.createElement(ModalDistributions, {
      application: application,
      texts: texts,
      showModal: showModal
    }));
  };
  /********
  modal.jsx
  ********/


  _exports.AppDistributions = AppDistributions;

  const ModalDistributions = ({
    showModal,
    application,
    texts
  }) => {
    const {
      workspace: {
        dashboard
      }
    } = (0, _dsContexts.useDSWorkspaceContext)();
    const [ready, setReady] = React.useState(false);
    const [isValid, setIsValid] = React.useState(false);
    const [fetching, setFetching] = React.useState(false);
    const [error, setError] = React.useState(false);
    const defaultValues = {
      state: {
        checked: false,
        checkType: false,
        name: '',
        port: 8080,
        compress: false,
        ssr: false,
        isDefault: false,
        platform: 'web',
        environment: 'development'
      }
    };
    const [formValues, handleChange] = (0, _coreComponents.useForm)(defaultValues);
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
    React.useEffect(() => {
      (async () => {
        const port = await dashboard.availablePort();
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
    } = application;
    const textsPlatform = texts.platform;
    const options = [{
      value: 'android',
      label: textsPlatform.options.android,
      name: 'platform'
    }, {
      value: 'ios',
      label: textsPlatform.options.ios,
      name: 'platform'
    }, {
      value: 'web',
      label: textsPlatform.options.web,
      name: 'platform'
    }, {
      value: 'backend',
      label: textsPlatform.options.backend,
      name: 'platform'
    }, {
      value: 'ssr',
      label: textsPlatform.options.ssr,
      name: 'platform'
    }, {
      value: 'node',
      label: textsPlatform.options.node,
      name: 'platform'
    }];
    const optionsEnvironment = [{
      value: 'development',
      label: textsPlatform.environments.dev,
      name: "environment"
    }, {
      value: 'production',
      label: textsPlatform.environments.prod,
      name: "environment"
    }];

    const close = () => showModal(false);

    const onSubmit = async () => {
      setFetching(true);
      setError(undefined);
      const response = await application.deployment.addDistribution(formValues);
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
    const portMessage = isValid ? textsPlatform.port.success : textsPlatform.port.error;
    const clsPortLabel = `fade-in ${isValid ? 'form__text-success' : 'form__text-error'}`;
    return /*#__PURE__*/React.createElement(_modal.BeyondModal, {
      show: true,
      onClose: close,
      className: "md ds-modal distributions-modal"
    }, /*#__PURE__*/React.createElement("header", {
      className: "ds-modal_header"
    }, /*#__PURE__*/React.createElement("section", {
      className: "section-header"
    }, /*#__PURE__*/React.createElement("h4", null, textsPlatform.titleModal), /*#__PURE__*/React.createElement("h5", {
      className: "primary-color"
    }, textsPlatform.modalHeader))), /*#__PURE__*/React.createElement(_form.BeyondForm, {
      onSubmit: onSubmit
    }, /*#__PURE__*/React.createElement(React.Fragment, null, error && /*#__PURE__*/React.createElement(_coreComponents.BeyondAlert, {
      type: "error"
    }, " ", texts.errors[error], " "), /*#__PURE__*/React.createElement("div", {
      className: "item"
    }, /*#__PURE__*/React.createElement(_form.BeyondInput, {
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
    }, /*#__PURE__*/React.createElement("label", null, textsPlatform.label), /*#__PURE__*/React.createElement(_dsSelect.DSSelect, {
      name: "platform",
      options: options,
      value: platform,
      onSelect: handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "distributions-select"
    }, /*#__PURE__*/React.createElement("label", null, textsPlatform.environment), /*#__PURE__*/React.createElement(_dsSelect.DSSelect, {
      name: "environment",
      options: optionsEnvironment,
      value: environment,
      onSelect: handleChange
    }))), /*#__PURE__*/React.createElement("div", {
      className: "input-group-distributions"
    }, /*#__PURE__*/React.createElement("div", {
      className: "port"
    }, /*#__PURE__*/React.createElement(_form.BeyondInput, {
      onBlur: onBlurPort,
      name: "port",
      label: textsPlatform.port.label,
      type: "number",
      value: port,
      placeholder: textsPlatform.port.label,
      min: "1",
      onChange: handleChange
    }), /*#__PURE__*/React.createElement("span", {
      className: clsPortLabel
    }, portMessage))), /*#__PURE__*/React.createElement("div", {
      className: "input-switch-distributions"
    }, /*#__PURE__*/React.createElement("div", {
      className: "switch-item"
    }, /*#__PURE__*/React.createElement("label", null, textsPlatform.checkType), /*#__PURE__*/React.createElement(_form.BeyondSwitch, {
      name: "checkType",
      checked: checkType,
      onChange: checkSwitch,
      value: checkType
    })), /*#__PURE__*/React.createElement("div", {
      className: "switch-item"
    }, /*#__PURE__*/React.createElement("label", null, textsPlatform.compress), /*#__PURE__*/React.createElement(_form.BeyondSwitch, {
      name: "compress",
      value: compress,
      onChange: checkSwitch
    })), /*#__PURE__*/React.createElement("div", {
      className: "switch-item"
    }, /*#__PURE__*/React.createElement("label", null, textsPlatform.ssr), /*#__PURE__*/React.createElement(_form.BeyondSwitch, {
      name: "ssr",
      value: ssr,
      onChange: checkSwitch
    })), /*#__PURE__*/React.createElement("div", {
      className: "switch-item"
    }, /*#__PURE__*/React.createElement("label", null, textsPlatform.default), /*#__PURE__*/React.createElement(_form.BeyondSwitch, {
      name: "default",
      value: isDefault,
      onChange: checkSwitch
    })))), /*#__PURE__*/React.createElement("div", {
      className: "ds-modal__actions"
    }, /*#__PURE__*/React.createElement(_form.BeyondButton, _extends({}, disabled, {
      className: "btn primary beyond-button waves-effect",
      type: "submit"
    }), fetching ? /*#__PURE__*/React.createElement(_spinner.BeyondSpinner, {
      className: "on-primary",
      fetching: true
    }) : textsPlatform.add)))));
  };
  /***********
  JS PROCESSOR
  ***********/

  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/dashboard/project-distributions.code', '.workspace__board .container-distributions .item-distribution{display:flex;justify-content:space-between;border-bottom:1px solid #fff;background-color:#0d121a;padding:2rem;margin-bottom:1rem}.workspace__board .container-distributions .item-distribution h2{text-transform:uppercase;margin:0;padding:0}.workspace__board .container-distributions .item-distribution h4{font-size:14px}.workspace__board .container-distributions .item-distribution span{padding-bottom:1rem;font-size:12px;margin-left:.5rem;color:var(--beyond-primary-color)}.workspace__board .container-distributions .item-distribution .left-box-distributions{display:flex;flex-direction:column;justify-content:center;text-transform:capitalize;margin-right:2rem;margin-top:1rem}.workspace__board .container-distributions .item-distribution .left-box-distributions span{margin-bottom:1rem;background-color:var(--beyond-secondary-dark-color);color:#fff;border-radius:.5rem;font-size:10px;padding:.5rem;border:1px solid var(--beyond-secondary-dark-color)}.workspace__board .container-distributions .item-distribution .left-box-distributions:nth-child(2){text-align:center}.workspace__board .container-distributions{margin-top:30px}.workspace__board .container-distributions .header-distributions{display:flex;justify-content:space-between}.workspace__board .container-distributions .header-distributions .beyond-button{width:7rem;height:3rem}.workspace__board .container-distributions .list-distributions{list-style-type:none;padding:0}.distributions-modal{background-color:rgba(0,0,0,.8)}.distributions-modal .modal-content form{padding:20px!important}.distributions-modal .item .selects-distributions{display:grid;grid-template-columns:repeat(2,1fr)}.distributions-modal .item .selects-distributions .distributions-select .form__select{width:95%}.distributions-modal .item .selects-distributions .distributions-select .form__select .form__select__options{background-color:var(--beyond-secondary-dark-color);z-index:100}.distributions-modal .item .selects-distributions .distributions-select .form__select .form__select__options .option{color:#fff}.distributions-modal .item .input-group-distributions{display:grid;grid-template-columns:repeat(2,1fr)}.distributions-modal .item .input-group-distributions .port .beyond-element-input{font-size:15px;width:98%}.distributions-modal .item .input-group-distributions .beyond-checkbox{flex-direction:column-reverse;align-items:flex-start;margin:auto}.distributions-modal .item .input-group-distributions .beyond-checkbox .checkmark{height:18px;width:18px}.distributions-modal .item .input-switch-distributions{display:flex;margin-top:15px;justify-content:start;gap:6rem}.distributions-modal .item .input-switch-distributions .switch-item{justify-self:center}.distributions-modal .div-botton-distributions{display:flex;justify-content:flex-end}.distributions-modal .div-botton-distributions .beyond-button{width:7rem}');
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