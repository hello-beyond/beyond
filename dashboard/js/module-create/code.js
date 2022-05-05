define(["exports", "@beyond-js/ui/modal/code", "@beyond-js/ui/spinner/code", "@beyond-js/dashboard-lib/models/js", "@beyond-js/dashboard/core-components/code", "@beyond-js/ui/form/code", "react", "react-dom"], function (_exports2, _code, _code2, _js, _code3, _code4, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.CreateModuleForm = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/module-create/code', false, {
    "txt": {
      "multilanguage": true
    }
  }, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');

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
  /**********
  context.jsx
  **********/


  const CreateModuleContext = React.createContext();

  const useCreateModuleContext = () => React.useContext(CreateModuleContext);
  /*********
  create.jsx
  *********/


  const CreateModuleForm = ({
    workspace,
    onClose
  }) => {
    const [state, setState] = React.useState({});
    const [template, setTemplate] = React.useState(false);

    const selectOrigin = origin => {
      const {
        controller: {
          model
        }
      } = state;
      model.origin = origin;
      model.cleanType();
      setTemplate(false);
    };

    const close = () => window.setTimeout(() => {
      setState({});
      onClose();
    }, 300);

    React.useEffect(() => {
      const controller = new Controller(workspace);

      const onChange = () => setState({ ...controller.state,
        controller
      });

      controller.bind('change', onChange);
      onChange();
      return () => controller.unbind('change', onChange);
    }, []);
    if (!state.ready) return null;
    const {
      controller: {
        model,
        texts,
        bundleType,
        application
      }
    } = state;
    const origin = model.origin;
    const value = {
      texts,
      origin,
      close,
      template,
      selectOrigin,
      bundle: bundleType,
      model,
      workspace,
      application,
      selectTemplate: template => setTemplate(template)
    };
    const output = /*#__PURE__*/React.createElement("div", {
      className: "ds-create-module"
    }, /*#__PURE__*/React.createElement("header", {
      className: "ds-modal_header"
    }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h4", null, texts.title), /*#__PURE__*/React.createElement("h5", {
      className: "primary-color"
    }, texts.subtitle))), /*#__PURE__*/React.createElement("section", {
      className: "ds-modal_content"
    }, /*#__PURE__*/React.createElement(Types, null), origin && value.model.type && /*#__PURE__*/React.createElement(Form, null)));
    return /*#__PURE__*/React.createElement(CreateModuleContext.Provider, {
      value: value
    }, /*#__PURE__*/React.createElement(_code.BeyondModal, {
      className: "md modal-md ds-modal",
      show: true,
      onClose: close
    }, output));
  };
  /*************************
  form\additional-fields.jsx
  *************************/


  _exports2.CreateModuleForm = CreateModuleForm;

  function AdditionalFields({
    children
  }) {
    const [additional, setAdditional] = React.useState(false);
    const {
      texts
    } = useCreateModuleContext();

    const onAdditional = () => setAdditional(!additional);

    const cls = additional ? 'show' : '';
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h5", {
      className: "link title-separator",
      onClick: onAdditional
    }, texts.additionalFeatures), /*#__PURE__*/React.createElement("div", {
      className: `additional-config ${cls}`
    }, children));
  }
  /*************
  form\aside.jsx
  *************/


  function AsideForm() {
    const {
      origin,
      texts,
      selectOrigin,
      template
    } = useCreateModuleContext();
    if (!template) return null;
    const templateData = texts[origin].options[parseInt(template.index)];

    const cleanType = () => selectOrigin(undefined);

    const icon = origin === 'template' ? 'appTemplate' : 'newApp';
    return /*#__PURE__*/React.createElement("aside", {
      className: "ds-create-module__breadcrumb-form"
    }, /*#__PURE__*/React.createElement(_code3.DSIcon, {
      icon: icon
    }), /*#__PURE__*/React.createElement("div", {
      className: "breadcrumb"
    }, /*#__PURE__*/React.createElement("a", {
      onClick: cleanType
    }, texts.types[origin].title), "\\", /*#__PURE__*/React.createElement("a", {
      onClick: () => selectOrigin(origin)
    }, templateData.title)));
  }
  /********************
  form\blank-fields.jsx
  ********************/


  function BlankFields({
    state,
    disabled
  }) {
    const {
      bundle,
      model,
      origin,
      texts
    } = useCreateModuleContext();
    /**
     * Use by multilanguage and server fields
     * @param event
     */

    const toggleRadio = event => {
      const target = event.currentTarget;
      const newValue = {};
      newValue[target.name] = target.checked;
      model.bundle.set(target.name, target.checked);
    };

    if (origin === 'templates') return null;
    const processorStyles = bundle !== 'ts' && bundle !== 'bridge';
    return /*#__PURE__*/React.createElement("div", {
      className: "item item_switch flex-container"
    }, processorStyles && /*#__PURE__*/React.createElement("div", {
      className: "switch-option"
    }, /*#__PURE__*/React.createElement(_code4.BeyondSwitch, _extends({
      name: "styles"
    }, disabled, {
      checked: state.styles,
      value: state.styles,
      onChange: toggleRadio
    })), /*#__PURE__*/React.createElement("label", null, texts.form.styles), /*#__PURE__*/React.createElement(_code3.DSIconButton, _extends({
      icon: "info"
    }, disabled, {
      className: "gray circle",
      title: texts.help.titles.styles
    }))), /*#__PURE__*/React.createElement("div", {
      className: "switch-option"
    }, /*#__PURE__*/React.createElement(_code4.BeyondSwitch, _extends({
      name: "multilanguage"
    }, disabled, {
      value: state.multilanguage,
      onChange: toggleRadio
    })), /*#__PURE__*/React.createElement("label", null, texts.form.multilanguage), /*#__PURE__*/React.createElement(_code3.DSIconButton, _extends({
      icon: "info"
    }, disabled, {
      className: "gray circle",
      title: texts.help.titles.text
    }))));
  }
  /*************************************
  form\bundles\additional-processors.jsx
  *************************************/


  function AdditionalProcessors() {
    const {
      model,
      bundle,
      texts
    } = useCreateModuleContext();
    if (bundle !== 'page' && bundle !== 'widget' && bundle !== 'layout') return null;

    const toggleRadio = event => {
      const target = event.currentTarget;
      const newValue = {};
      newValue[target.name] = target.checked;

      if (!target.checked) {
        model.bundle.removeProcessor(target.name);
        return;
      }

      model.bundle.clearProcessors();
      model.bundle.addProcessor(target.name);
    };

    const output = [];
    model.bundle.additionalProcessors.forEach(processor => {
      output.push( /*#__PURE__*/React.createElement("div", {
        key: processor.id,
        className: "switch-option"
      }, /*#__PURE__*/React.createElement(_code4.BeyondSwitch, {
        name: processor.id,
        onChange: toggleRadio,
        checked: model.bundle.processors.includes(processor.id)
      }), /*#__PURE__*/React.createElement("label", null, processor.name)));
    });
    return /*#__PURE__*/React.createElement("div", {
      className: "item item_switch flex-container"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "link title-separator"
    }, texts.processors), output);
  }
  /**********************
  form\bundles\bridge.jsx
  **********************/


  function FormBridge({
    state,
    handleChange
  }) {
    const {
      bundle,
      model,
      texts
    } = useCreateModuleContext();
    if (bundle !== 'bridge') return null;
    const fields = /*#__PURE__*/React.createElement(BlankFields, {
      state: state
    });
    const inputsAttrs = {};
    if (model.fetching) inputsAttrs.disabled = true;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "item"
    }, /*#__PURE__*/React.createElement(_code4.BeyondInput, _extends({
      required: true,
      name: "name"
    }, inputsAttrs, {
      label: texts.form.name,
      placeholder: texts.placeholder.name,
      value: state.name,
      onChange: handleChange
    })), /*#__PURE__*/React.createElement("span", {
      className: "help-block"
    }, texts.help.name)), /*#__PURE__*/React.createElement(AdditionalFields, {
      children: fields
    }), /*#__PURE__*/React.createElement(FormFooter, null));
  }
  /********************
  form\bundles\code.jsx
  ********************/


  function FormCode({
    state,
    handleChange
  }) {
    const {
      bundle,
      model,
      texts
    } = useCreateModuleContext();
    if (bundle !== 'code') return null;
    const inputsAttrs = {};
    if (model.fetching) inputsAttrs.disabled = true;
    const fields = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "item two-columns"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_code4.BeyondInput, _extends({
      name: "title"
    }, inputsAttrs, {
      label: texts.form.title,
      placeholder: texts.placeholder.title,
      value: state.title,
      onChange: handleChange
    })), /*#__PURE__*/React.createElement("span", {
      className: "help-block"
    }, texts.help.title)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_code4.BeyondInput, _extends({
      name: "description"
    }, inputsAttrs, {
      label: texts.form.description,
      placeholder: texts.placeholder.description,
      value: state.description,
      onChange: handleChange
    })), /*#__PURE__*/React.createElement("span", {
      className: "help-block"
    }, texts.help.description))), /*#__PURE__*/React.createElement(BlankFields, {
      state: state
    }));
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "item"
    }, /*#__PURE__*/React.createElement(_code4.BeyondInput, _extends({
      required: true,
      name: "name"
    }, inputsAttrs, {
      label: texts.form.name,
      placeholder: texts.placeholder.name,
      value: state.name,
      onChange: handleChange
    })), /*#__PURE__*/React.createElement("span", {
      className: "help-block"
    }, texts.help.name)), /*#__PURE__*/React.createElement(AdditionalFields, {
      children: fields
    }), /*#__PURE__*/React.createElement(FormFooter, null));
  }
  /**********************
  form\bundles\layout.jsx
  **********************/


  function FormLayout({
    state,
    handleChange
  }) {
    const {
      bundle,
      model,
      texts
    } = useCreateModuleContext();
    if (bundle !== 'layout') return null;
    const inputsAttrs = {};
    if (model.fetching) inputsAttrs.disabled = true;
    const fields = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "item two-columns"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_code4.BeyondInput, _extends({
      name: "title"
    }, inputsAttrs, {
      label: texts.form.title,
      placeholder: texts.placeholder.title,
      value: state.title,
      onChange: handleChange
    })), /*#__PURE__*/React.createElement("span", {
      className: "help-block"
    }, texts.help.title)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_code4.BeyondInput, _extends({
      name: "description"
    }, inputsAttrs, {
      label: texts.form.description,
      placeholder: texts.placeholder.description,
      value: state.description,
      onChange: handleChange
    })), /*#__PURE__*/React.createElement("span", {
      className: "help-block"
    }, texts.help.description))), /*#__PURE__*/React.createElement(BlankFields, {
      state: state
    }));
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "item two-columns"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_code4.BeyondInput, _extends({
      required: true,
      name: "name"
    }, inputsAttrs, {
      label: texts.form.name,
      placeholder: texts.placeholder.name,
      value: state.name,
      onChange: handleChange
    })), /*#__PURE__*/React.createElement("span", {
      className: "help-block"
    }, texts.help.name)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_code4.BeyondInput, _extends({
      name: "element"
    }, inputsAttrs, {
      label: texts.form.webcomponent,
      placeholder: texts.placeholder.webcomponent,
      value: state.element,
      onChange: handleChange
    })), /*#__PURE__*/React.createElement("span", {
      className: "help-block"
    }, texts.help.webcomponent)), /*#__PURE__*/React.createElement(AdditionalProcessors, {
      state: state
    })), /*#__PURE__*/React.createElement(AdditionalFields, {
      children: fields
    }), /*#__PURE__*/React.createElement(FormFooter, null));
  }
  /***************************
  form\bundles\page\layout.jsx
  ***************************/


  function FormLayoutSection({
    handleChange,
    disabled
  }) {
    const {
      application,
      origin,
      texts
    } = useCreateModuleContext();
    if (origin === 'templates') return null;
    const layouts = application.modules.getItems({
      bundle: 'layout'
    });
    const items = layouts.map(layout => {
      const id = layout.module.layoutId ?? layout.module.name;
      return /*#__PURE__*/React.createElement("option", {
        key: id,
        "data-layout": id
      }, id);
    });
    if (!items.length) return null;
    return /*#__PURE__*/React.createElement("div", {
      className: "item layout-selection"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: ""
    }, texts.page.layout), /*#__PURE__*/React.createElement("select", _extends({
      name: "layout",
      required: true
    }, disabled, {
      className: "form-select",
      title: `Selecciona un layout`,
      onChange: handleChange
    }), /*#__PURE__*/React.createElement("option", null, texts.page.input.layout.placeholder), items));
  }
  /*************************
  form\bundles\page\page.jsx
  *************************/


  function FormPage({
    state,
    handleChange,
    disabled
  }) {
    const {
      model,
      bundle,
      texts
    } = useCreateModuleContext();
    if (bundle !== 'page') return null;
    const [route, setRoute] = React.useState('/');

    const handlePage = event => {
      const target = event.currentTarget; //TODO: check regexp

      const checked = target.value.match(/\/[\/a-zA-Z0-9-_]*/);

      if (!checked) {
        event.preventDefault();
        return;
      }

      setRoute(checked.join(''));
      handleChange(event);
    };

    const fields = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FormLayoutSection, {
      disabled: disabled,
      handleChange: handleChange
    }), /*#__PURE__*/React.createElement("div", {
      className: "item two-columns"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_code4.BeyondInput, _extends({
      name: "title"
    }, disabled, {
      label: texts.form.title,
      placeholder: texts.placeholder.title,
      value: state.title,
      onChange: handleChange
    })), /*#__PURE__*/React.createElement("span", {
      className: "help-block"
    }, texts.help.title)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_code4.BeyondInput, _extends({
      name: "description"
    }, disabled, {
      label: texts.form.description,
      placeholder: texts.placeholder.description,
      value: state.description,
      onChange: handleChange
    })), /*#__PURE__*/React.createElement("span", {
      className: "help-block"
    }, texts.help.description))), /*#__PURE__*/React.createElement(BlankFields, {
      state: state,
      setState: handleChange
    }));
    const inputsAttrs = {};
    if (model.fetching) inputsAttrs.disabled = true;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "item two-columns"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_code4.BeyondInput, _extends({
      required: true,
      name: "name"
    }, inputsAttrs, disabled, {
      label: texts.form.name,
      placeholder: texts.placeholder.name,
      value: state.name,
      onChange: handleChange
    })), /*#__PURE__*/React.createElement("span", {
      className: "help-block"
    }, texts.help.name)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_code4.BeyondInput, _extends({}, inputsAttrs, {
      name: "element",
      label: texts.form.webcomponent,
      placeholder: texts.placeholder.webcomponent,
      value: state.element,
      onChange: handleChange
    })), /*#__PURE__*/React.createElement("span", {
      className: "help-block"
    }, texts.help.webcomponent))), /*#__PURE__*/React.createElement("div", {
      className: "item two-columns"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_code4.BeyondInput, _extends({}, inputsAttrs, {
      name: "route",
      required: true,
      value: route,
      onChange: handlePage,
      label: texts.form.url,
      placeholder: texts.placeholder.url
    })), /*#__PURE__*/React.createElement("span", {
      className: "help-block"
    }, texts.help.url)), /*#__PURE__*/React.createElement("div", {
      className: "item-vdir"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "vdir"
    }, "N\xFAmero de parametros de url?"), /*#__PURE__*/React.createElement("input", _extends({
      type: "number",
      defaultValue: model.bundle.vdir,
      name: "vdir",
      required: true,
      value: state.vdir
    }, inputsAttrs, {
      onChange: handleChange
    }))), /*#__PURE__*/React.createElement(AdditionalProcessors, {
      state: state
    })), /*#__PURE__*/React.createElement(AdditionalFields, {
      children: fields
    }), /*#__PURE__*/React.createElement(FormFooter, null));
  }
  /**************************
  form\bundles\typescript.jsx
  **************************/


  function FormTypescript({
    state,
    disabled,
    handleChange
  }) {
    const {
      bundle,
      model,
      texts
    } = useCreateModuleContext();
    if (bundle !== 'ts') return null;
    const fields = /*#__PURE__*/React.createElement(BlankFields, {
      state: state
    });
    const inputsAttrs = {};
    if (model.fetching) inputsAttrs.disabled = true;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "item"
    }, /*#__PURE__*/React.createElement(_code4.BeyondInput, _extends({
      required: true,
      name: "name"
    }, inputsAttrs, disabled, {
      label: texts.form.name,
      placeholder: texts.placeholder.name,
      value: state.name,
      onChange: handleChange
    })), /*#__PURE__*/React.createElement("span", {
      className: "help-block"
    }, texts.help.name)), /*#__PURE__*/React.createElement(AdditionalFields, {
      disabled: disabled,
      children: fields
    }), /*#__PURE__*/React.createElement(FormFooter, {
      disabled: disabled
    }));
  }
  /**********************
  form\bundles\widget.jsx
  **********************/


  function FormWidget({
    state,
    handleChange
  }) {
    const {
      bundle,
      model,
      texts
    } = useCreateModuleContext();
    if (bundle !== 'widget') return null;
    const inputsAttrs = {};
    if (model.fetching) inputsAttrs.disabled = true;
    const fields = /*#__PURE__*/React.createElement(BlankFields, {
      state: state
    });
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "item two-columns"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_code4.BeyondInput, _extends({
      required: true,
      name: "name"
    }, inputsAttrs, {
      label: texts.form.name,
      placeholder: texts.placeholder.name,
      value: state.name,
      onChange: handleChange
    })), /*#__PURE__*/React.createElement("span", {
      className: "help-block"
    }, texts.help.name)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_code4.BeyondInput, _extends({
      name: "element"
    }, inputsAttrs, {
      label: texts.form.webcomponent,
      placeholder: texts.placeholder.webcomponent,
      value: state.element,
      onChange: handleChange
    })), /*#__PURE__*/React.createElement("span", {
      className: "help-block"
    }, texts.help.webcomponent)), /*#__PURE__*/React.createElement(AdditionalProcessors, {
      state: state
    })), /*#__PURE__*/React.createElement(AdditionalFields, {
      children: fields
    }), /*#__PURE__*/React.createElement(FormFooter, null));
  }
  /**************
  form\footer.jsx
  **************/


  function FormFooter({
    disabled
  }) {
    const {
      model,
      texts
    } = useCreateModuleContext();
    const [isValid, setIsValid] = React.useState(model.bundle?.valid);
    React.useEffect(() => {
      const onChange = () => setIsValid(model.bundle.valid);

      model.bundle?.bind('change', onChange);
      return () => model.bundle && model.bundle?.unbind('change', onChange);
    });
    const attrs = {};
    if (!isValid) attrs.disabled = true;
    return /*#__PURE__*/React.createElement("footer", {
      className: "align-right ds-modal__actions"
    }, model.fetching ? /*#__PURE__*/React.createElement(_code2.BeyondSpinner, {
      fetching: true
    }) : /*#__PURE__*/React.createElement(_code4.BeyondButton, _extends({}, attrs, {
      className: "btn primary",
      type: "submit"
    }), texts.form.button));
  }
  /************
  form\form.jsx
  ************/


  function Form() {
    const {
      application: {
        application
      },
      close,
      model,
      workspace,
      template,
      texts
    } = useCreateModuleContext();
    if (!template) return null;
    const spinner = React.useRef();
    const [error, setError] = React.useState();
    const [initial, setInitial] = React.useState(true);
    const tpl = template.template;
    const styles = tpl === 'page' || tpl === 'widget' || tpl === 'layout' || tpl === 'code';
    const [state, setState] = React.useState({
      styles: styles
    });
    const [fetching, setFetching] = React.useState(false);
    const disabled = {};
    React.useEffect(() => {
      if (fetching) {
        window.setTimeout(() => spinner.current?.classList.toggle('container-hidden'), 100);
      }
    }, [fetching]);

    const onSubmit = async event => {
      event.preventDefault();

      try {
        if (model.type === 'page' && application.routes().includes(model.bundle.route)) {
          setError(`${texts.form.errors.route} ${model.bundle.route}`);
          return;
        }

        const exp = /[a-z]+-[a-z]+/g;
        const widgets = ['widget', 'page', 'layout'];

        if (widgets.includes(model.type) && !model.bundle.element.match(exp)) {
          setError(`${texts.form.errors.element}`);
          return;
        }

        setFetching(true);
        const response = await model.bundle.publish();
        window.setTimeout(() => {
          if (response.error) {
            setFetching(false);
            setError(response.error);
            return;
          }

          workspace.openBoard('module', {
            label: model.bundle.name,
            moduleId: model.bundle.moduleId
          });
          setFetching(false);
          close();
        }, 2000);
      } catch (exc) {
        setError(exc.error);
      }
    };

    const handleChange = event => {
      const target = event.currentTarget;
      const value = {};
      let fieldValue = target.value;

      if (target.name === 'name' || target.name === 'element') {
        fieldValue = fieldValue.replace(/ /g, '-');
      } //Seteamos el valor por defecto del estado


      if (initial) {
        model.bundle.set('styles', state.styles);
        setInitial(false);
      }

      value[target.name] = fieldValue;
      const newState = { ...state,
        ...value
      };
      model.bundle.set(target.name, fieldValue);
      setState(newState);
    };

    if (fetching) disabled.disabled = true;
    const props = {
      state,
      setState,
      handleChange,
      disabled
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, error && /*#__PURE__*/React.createElement(_code3.BeyondAlert, {
      type: "error",
      message: error
    }), /*#__PURE__*/React.createElement(AsideForm, null), /*#__PURE__*/React.createElement("div", {
      className: "ds-create-module__template-form"
    }, /*#__PURE__*/React.createElement(_code4.BeyondForm, {
      onSubmit: onSubmit
    }, /*#__PURE__*/React.createElement(FormPage, props), /*#__PURE__*/React.createElement(FormWidget, props), /*#__PURE__*/React.createElement(FormLayout, props), /*#__PURE__*/React.createElement(FormCode, props), /*#__PURE__*/React.createElement(FormBridge, props), /*#__PURE__*/React.createElement(FormTypescript, props)), fetching && /*#__PURE__*/React.createElement(_code3.DSSpinner, {
      ref: spinner,
      active: true,
      className: "absolute-container container-hidden"
    })));
  }
  /**********
  options.jsx
  **********/

  /**
   * STEP 2
   *
   * @returns {JSX.Element|null}
   * @constructor
   */


  function Options() {
    const {
      origin,
      texts,
      selectTemplate,
      model
    } = useCreateModuleContext();
    const {
      options
    } = texts[origin];

    if (!options) {
      return null;
    }

    const onClick = event => {
      const target = event.currentTarget;
      event.stopPropagation();
      event.preventDefault();
      const items = target.closest('.ds-create-module_template-list').querySelectorAll('.template-list__item');
      Array.from(items).forEach(item => item.classList.remove('active'));
      target.classList.add('active');
      const {
        template
      } = target.dataset;
      if (origin === 'templates') model.setTemplate(template);else model.setType(template);
      selectTemplate({
        index: target.dataset.index,
        template: target.dataset.template
      });
    };

    const output = options.map(({
      id,
      title,
      description,
      icon
    }, index) => {
      icon = 'settings';
      return /*#__PURE__*/React.createElement("section", {
        "data-template": id,
        "data-index": index,
        onClick: onClick,
        className: "template-list__item",
        key: `${id}-${origin}-${index}`
      }, /*#__PURE__*/React.createElement(_code3.DSIcon, {
        icon: icon
      }), /*#__PURE__*/React.createElement("h5", null, title), /*#__PURE__*/React.createElement("p", null, description));
    });
    return /*#__PURE__*/React.createElement("section", {
      className: "ds-create-module_template-list"
    }, output);
  }
  /********
  types.jsx
  ********/

  /**
   *
   * @returns {JSX.Element|null}
   * @constructor
   */


  function Types() {
    const {
      texts,
      selectOrigin,
      model
    } = useCreateModuleContext();
    const [origin, setOrigin] = React.useState(model.origin);
    const [type, setType] = React.useState(model.type);
    React.useEffect(() => {
      setType(model.type);
      setOrigin(model.origin);
    }, [model.type, model.origin]);

    const onClick = event => {
      const target = event.currentTarget;
      const items = target.closest('.block_types').querySelectorAll('.link');
      Array.from(items).forEach(item => item.classList.remove('active'));
      target.classList.add('active');
      const {
        origin
      } = target.dataset;
      selectOrigin(origin);
      setOrigin(origin);
    };

    const cleanType = () => {
      setOrigin(undefined);
      selectOrigin(undefined);
    };

    if (model.type && model.origin) return null;

    if (!model.origin) {
      return /*#__PURE__*/React.createElement("div", {
        className: "block_types"
      }, /*#__PURE__*/React.createElement("figure", {
        onClick: onClick,
        "data-origin": "bundles",
        className: "link"
      }, /*#__PURE__*/React.createElement(_code3.DSIcon, {
        icon: "appTemplate"
      }), /*#__PURE__*/React.createElement("h4", null, texts.types.bundles.title), /*#__PURE__*/React.createElement("p", null, texts.types.bundles.description)), /*#__PURE__*/React.createElement("figure", {
        onClick: onClick,
        "data-origin": "templates",
        className: "link"
      }, /*#__PURE__*/React.createElement(_code3.DSIcon, {
        icon: "newApp"
      }), /*#__PURE__*/React.createElement("h4", null, texts.types.templates.title), /*#__PURE__*/React.createElement("p", null, texts.types.templates.description)));
    }

    const icon = origin === 'template' ? 'appTemplate' : 'newApp';
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("figure", {
      onClick: cleanType,
      "data-origin": "bundles",
      className: "block-types__selected"
    }, /*#__PURE__*/React.createElement(_code3.DSIcon, {
      icon: icon
    }), /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement("h4", null, texts.types[origin].title), /*#__PURE__*/React.createElement("p", null, texts.types[origin].description))), /*#__PURE__*/React.createElement(Options, null));
  }
  /***********
  JS PROCESSOR
  ***********/

  /******************
  FILE: controller.js
  ******************/


  class Controller extends _js.ReactiveModel {
    _application;

    get application() {
      return this._application;
    }

    get texts() {
      return module.texts.current.value;
    }

    get ready() {
      return this.application?.ready && module.texts.current.ready;
    }

    get state() {
      return {
        ready: this.ready,
        texts: this.texts
      };
    }

    get BUNDLES() {
      return this.model?.BUNDLES;
    }

    get PROCESSORS() {
      return this.model?.PROCESSORS;
    }

    _model;

    get model() {
      return this._model;
    }

    get bundleType() {
      return this.model?.bundle?.type;
    }

    constructor(workspace) {
      super();
      this._workspace = workspace;
      this._application = workspace.application;
      module.texts.current.bind('change', this.triggerEvent);
      const model = new _js.ModuleBundleBuilder(workspace.application.application.id);
      this._model = model;
      model.bind('change', this.triggerEvent);
      this.triggerEvent();
    }

  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '.ds-create-module .ds-create-module__breadcrumb-form{display:flex;gap:15px;padding:15px;align-items:center;background:var(--beyond-primary-light-color)}.ds-create-module .ds-create-module__breadcrumb-form .beyond-icon{width:44px;height:44px}.ds-create-module .ds-create-module__breadcrumb-form .breadcrumb{display:flex;align-items:center;transition:.2s all ease-in}.ds-create-module .ds-create-module__breadcrumb-form .breadcrumb a{display:inline-grid;padding:5px;cursor:pointer;transition:all .2s linear}.ds-create-module .ds-create-module__breadcrumb-form .breadcrumb a:hover{text-decoration:underline}.ds-create-module .ds-create-module__template-form{padding:20px 40px}.ds-create-module .ds-create-module__template-form .additional-config{display:none}.ds-create-module .ds-create-module__template-form .additional-config.show{display:block}.ds-create-module .two-columns{display:grid;grid-gap:5px;grid-template-columns:1fr 1fr}.ds-create-module .three-columns{display:grid;grid-gap:5px;grid-template-columns:1fr 1fr 1fr}.ds-create-module .text-right{justify-content:end;text-align:right}.ds-create-module .steps{display:grid;grid-template-columns:1fr 1fr;justify-content:center;cursor:pointer}.ds-create-module .steps div{padding:15px;background:#f0f0f0}.ds-create-module .steps div.active{background:var(--beyond-primary-accent-color);color:#fff}.ds-create-module form{display:grid;grid-template-columns:auto}.ds-create-module form .item{margin-top:15px}.ds-create-module form .item.two-columns{display:grid;grid-template-columns:1fr 1fr}.ds-create-module form .switch-option{display:flex;align-items:center;grid-gap:8px}.ds-create-module form .radio-group{display:grid}.ds-create-module form .item-vdir{display:flex;align-items:center;gap:8px;justify-content:center}.ds-create-module form .item-vdir input[type=number]{background:#f0f0f0;border:0;outline:0;padding:8px;width:90px}.ds-create-module form .title-separator{border-bottom:1px solid #f0f0f0}.ds-create-module footer{display:block;text-align:right}.ds-create-module .layout-selection{display:flex;width:100%;justify-content:center;flex-direction:column}.ds-create-module .layout-selection select{outline:0;padding:8px;width:100%;border:1px #82837f}.ds-create-module .ds-create-module_template-list{display:grid;grid-template-columns:1fr 1fr 1fr;grid-gap:8px;justify-content:center;align-self:start;transition:all .2s ease-in-out}.ds-create-module .ds-create-module_template-list .template-list__item{padding:40px;cursor:pointer}.ds-create-module .ds-create-module_template-list .template-list__item.active,.ds-create-module .ds-create-module_template-list .template-list__item:hover{background:#e4e5dc;transition:all .2s ease-in}';
  bundle.styles.appendToDOM();
  const modules = new Map(); // Exports managed by beyond bundle objects

  __pkg.exports.managed = function (require, _exports) {}; // Module exports


  __pkg.exports.process = function (require) {};

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;

  __pkg.initialise(modules);
});