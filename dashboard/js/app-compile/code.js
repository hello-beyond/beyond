define(["exports", "react", "react-dom", "@beyond-js/dashboard/unnamed/layout/header-bar/code", "@beyond-js/dashboard/unnamed/components/breadcrumb/code", "@beyond-js/dashboard-lib/models/ts", "@beyond-js/dashboard-lib/models/js", "@beyond-js/ui/modal/code", "@beyond-js/ui/spinner/code"], function (_exports, React, ReactDOM, _code, _code2, _ts, _js, _code3, _code4) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.CompileBoard = CompileBoard;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/app-compile/code', false, {
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

  /**************
  compilation.jsx
  **************/


  class CompilationModal extends React.Component {
    constructor(props) {
      super(props);
      /**
       * when this component is mounted the module is already loaded so, we can
       * access to the module texts without check if it is ready.
       *
       * @type {{showed: number, messages: [], message: {text}, items: number}}
       */

      this.state = {
        messages: [],
        items: 0,
        showed: 0,
        message: {
          "text": module.texts.value.compilation.start
        }
      };
      this.container = React.createRef();

      this.updateState = () => this.setState({});

      this.processMessages = this.processMessages.bind(this);
      window._state = this.state;
      window._bulder = this.props.builder;
    }
    /**
     * Trying to add some animation,
     * this code needs to be removed later.
     *
     */


    processMessages() {
      const messages = this.props.builder.messages;
      const total = this.props.builder.messages.length;

      if (total > this.state.showed) {
        const message = messages[this.state.showed + 1];

        if (!message?.text) {
          return;
        }

        window.setTimeout(() => {
          this.container.current.classList.replace('fade-out', 'fade-in');
          window.setTimeout(() => {
            this.setState(state => {
              return {
                messages: this.state.messages.concat([message.text]),
                message: message,
                showed: state.showed + 1
              };
            });
          }, 500);
        }, 500);
      }
    }

    componentDidMount() {
      this.processMessages(this.container.current); // this.props.builder.on('change', this.updateState);

      this.props.builder.on('change', this.processMessages);
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.showed < this.props.builder.messages.length) {
        this.processMessages();
      }
    }

    componentWillUnmount() {
      // this.props.builder.off('change', this.updateState);
      this.props.builder.off('change', this.processMessages);
    }

    render() {
      const {
        onClose,
        texts,
        builder,
        openPrevious
      } = this.props;
      const {
        finished,
        error,
        processing
      } = builder;

      const closeModal = () => {
        builder.clean();
        onClose();
      };

      const onFinish = () => {
        closeModal();
        openPrevious();
      };

      const output = [];
      const footer = [];
      if (!error) output.push( /*#__PURE__*/React.createElement(_code4.BeyondSpinner, {
        key: "spinner",
        fetching: processing
      }));else {
        output.push( /*#__PURE__*/React.createElement(BeyondAlert, {
          key: "error-message",
          type: "error",
          onClose: builder.cleanError
        }, error));
        footer.push( /*#__PURE__*/React.createElement("footer", {
          key: "footer-error",
          className: "ds-modal__actions"
        }, /*#__PURE__*/React.createElement(BeyondButton, {
          onClick: closeModal,
          className: "primary btn-block"
        }, texts.actions.close)));
      }
      const cls = finished || error ? 'compilation__message hidden' : 'compilation__message ';
      return /*#__PURE__*/React.createElement(_code3.BeyondModal, {
        show: true,
        className: "md ds-modal ds-modal-compilation",
        onClose: closeModal
      }, /*#__PURE__*/React.createElement("header", {
        className: "ds-modal_header"
      }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h4", null, texts.compilation.title), /*#__PURE__*/React.createElement("h5", {
        className: "primary-color"
      }, texts.compilation.subtitle))), /*#__PURE__*/React.createElement("div", {
        className: "ds-modal__content"
      }, output, finished && /*#__PURE__*/React.createElement(FadeIn, null, /*#__PURE__*/React.createElement(BeyondAlert, {
        onClose: builder.cleanError,
        type: "success"
      }, texts.compilation.finished), /*#__PURE__*/React.createElement("footer", {
        className: "ds-modal__actions"
      }, /*#__PURE__*/React.createElement(BeyondButton, {
        onClick: onFinish,
        className: "primary btn-block"
      }, texts.actions.close))), /*#__PURE__*/React.createElement(FadeIn, null, /*#__PURE__*/React.createElement("div", {
        className: cls,
        ref: this.container
      }, this.state.message.text)), footer));
    }

  }
  /**************
  environment.jsx
  **************/


  function Environment() {
    const {
      texts,
      changeValue,
      onSelectEnvironment,
      environment
    } = useCompilerContext();

    if (environment) {
      return /*#__PURE__*/React.createElement("section", {
        className: "form-section"
      }, /*#__PURE__*/React.createElement("h4", null, texts.environments.titleSelected), /*#__PURE__*/React.createElement("div", {
        className: "block-options"
      }, /*#__PURE__*/React.createElement("figure", {
        className: "active",
        "data-environment": "development"
      }, /*#__PURE__*/React.createElement(DsIcon, {
        icon: "code"
      }), /*#__PURE__*/React.createElement("h4", null, texts.environments.dev.title), /*#__PURE__*/React.createElement("button", {
        "data-property": "environment",
        onClick: changeValue,
        className: "btn link"
      }, texts.actions.change))));
    }

    return /*#__PURE__*/React.createElement("section", {
      className: "form-section"
    }, /*#__PURE__*/React.createElement("h4", null, texts.environments.title), /*#__PURE__*/React.createElement("div", {
      className: "block-options"
    }, /*#__PURE__*/React.createElement("figure", {
      onClick: onSelectEnvironment,
      "data-environment": "development"
    }, /*#__PURE__*/React.createElement(DsIcon, {
      icon: "code"
    }), /*#__PURE__*/React.createElement("h4", null, texts.environments.dev.title), /*#__PURE__*/React.createElement("p", null, texts.environments.dev.description)), /*#__PURE__*/React.createElement("figure", {
      onClick: onSelectEnvironment,
      "data-environment": "production"
    }, /*#__PURE__*/React.createElement(DsIcon, {
      icon: "cloudDone"
    }), /*#__PURE__*/React.createElement("h4", null, texts.environments.prod.title), /*#__PURE__*/React.createElement("p", null, texts.environments.prod.description))));
  }
  /*****
  os.jsx
  *****/


  function OsFields() {
    const {
      platform,
      texts,
      onOSSelect,
      os,
      changeValue
    } = useCompilerContext();
    if (platform !== 'mobile') return null;

    if (os) {
      return /*#__PURE__*/React.createElement("div", {
        className: "form-section"
      }, /*#__PURE__*/React.createElement("h4", null, texts.so.titleSelected), /*#__PURE__*/React.createElement("div", {
        className: "block-options"
      }, /*#__PURE__*/React.createElement("figure", {
        className: "active",
        "data-property": "os",
        "data-value": "android"
      }, /*#__PURE__*/React.createElement(DsIcon, {
        icon: "mobile"
      }), /*#__PURE__*/React.createElement("h4", null, texts.so[os].title), /*#__PURE__*/React.createElement("button", {
        "data-property": "os",
        onClick: changeValue,
        className: "btn link"
      }, texts.actions.change))));
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "form-section"
    }, /*#__PURE__*/React.createElement("h4", null, texts.so.title), /*#__PURE__*/React.createElement("div", {
      className: "block-options"
    }, /*#__PURE__*/React.createElement("figure", {
      onClick: onOSSelect,
      "data-property": "os",
      "data-value": "android"
    }, /*#__PURE__*/React.createElement(DsIcon, {
      icon: "mobile"
    }), /*#__PURE__*/React.createElement("h4", null, texts.so.android.title), /*#__PURE__*/React.createElement("span", null, texts.so.android.description)), /*#__PURE__*/React.createElement("figure", {
      onClick: onOSSelect,
      "data-property": "os",
      "data-value": "ios"
    }, /*#__PURE__*/React.createElement(DsIcon, {
      icon: "ios"
    }), /*#__PURE__*/React.createElement("h4", null, texts.so.ios.title), /*#__PURE__*/React.createElement("span", null, texts.so.ios.description))));
  }
  /***********
  platform.jsx
  ***********/


  function Platform() {
    const {
      environment,
      texts,
      onPlatformSelect,
      platform,
      changeValue
    } = useCompilerContext();
    if (!environment) return null;

    if (platform) {
      return /*#__PURE__*/React.createElement("div", {
        className: "form-section"
      }, /*#__PURE__*/React.createElement("h4", null, texts.platforms.titleSelected), /*#__PURE__*/React.createElement("div", {
        className: "block-options"
      }, /*#__PURE__*/React.createElement("figure", {
        className: "active",
        "data-property": "platform",
        "data-value": "mobile"
      }, /*#__PURE__*/React.createElement(DsIcon, {
        icon: "responsive"
      }), /*#__PURE__*/React.createElement("h4", null, texts.platforms[platform].title), /*#__PURE__*/React.createElement("button", {
        "data-property": "platform",
        onClick: changeValue,
        className: "btn link"
      }, texts.actions.change))));
    }

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "form-section"
    }, /*#__PURE__*/React.createElement("h4", null, texts.platforms.title), /*#__PURE__*/React.createElement("div", {
      className: "block-options"
    }, /*#__PURE__*/React.createElement("figure", {
      onClick: onPlatformSelect,
      "data-property": "platform",
      "data-value": "mobile"
    }, /*#__PURE__*/React.createElement(DsIcon, {
      icon: "mobile"
    }), /*#__PURE__*/React.createElement("h4", null, texts.platforms.mobile.title), /*#__PURE__*/React.createElement("span", null, texts.platforms.mobile.description)), /*#__PURE__*/React.createElement("figure", {
      onClick: onPlatformSelect,
      "data-property": "platform",
      "data-value": "web"
    }, /*#__PURE__*/React.createElement(DsIcon, {
      icon: "responsive"
    }), /*#__PURE__*/React.createElement("h4", null, texts.platforms.web.title), /*#__PURE__*/React.createElement("span", null, texts.platforms.web.description)))));
  }
  /***********
  previous.jsx
  ***********/


  function PreviousCompilations({
    open
  }) {
    const {
      texts,
      builder
    } = useCompilerContext();
    const [modal, toggleModal] = React.useState(open);
    React.useEffect(() => toggleModal(open), [open]);

    const show = event => {
      toggleModal(!modal);
    };

    if (!builder.builds || !Object.keys(builder.builds).length) return null;

    const onDelete = event => {
      //TODO: add delete functionality
      console.log("deleting...");
    };

    const builds = [];

    if (builder.builds) {
      for (const key in builder.builds) {
        if (!builder.builds.hasOwnProperty(key)) continue;
        const build = builder.builds[key];
        builds.push( /*#__PURE__*/React.createElement("li", {
          "data-id": key,
          key: key
        }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", {
          className: "primary-color upper"
        }, build.platform), /*#__PURE__*/React.createElement("strong", null, texts.builds.path, ":"), " ", /*#__PURE__*/React.createElement("span", null, build.base)), /*#__PURE__*/React.createElement(DsIconButton, {
          className: "primary",
          icon: "delete",
          onClick: onDelete
        })));
      }
    }

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "column__right-content"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn link",
      onClick: show
    }, texts.builds.message)), modal && /*#__PURE__*/React.createElement(_code3.BeyondModal, {
      className: "md ds-modal ds-modal-compilation",
      show: true
    }, /*#__PURE__*/React.createElement("header", {
      className: "ds-modal_header"
    }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h4", null, texts.builds.title), /*#__PURE__*/React.createElement("h5", {
      className: "primary-color"
    }, texts.builds.subtitle))), /*#__PURE__*/React.createElement("div", {
      className: "ds-modal_content"
    }, /*#__PURE__*/React.createElement("ul", {
      className: "list-builds"
    }, builds))));
  }
  /*******
  view.jsx
  *******/


  const CompilerContext = React.createContext();

  const useCompilerContext = () => React.useContext(CompilerContext);

  function CompileBoard() {
    const {
      workspace: {
        application
      }
    } = useDSWorkspaceContext();
    const [state, setState] = React.useState({});
    React.useEffect(() => {
      const onChange = () => {
        setState({ ...state,
          texts: module.texts.value,
          ready: module.texts.ready
        });
      };

      module.texts.bind('change', onChange);
      return () => module.texts.unbind('change', onChange);
    }, []);

    const onSelectEnvironment = event => {
      const target = event.currentTarget;
      const {
        environment
      } = target.dataset;
      target.closest('.block-options').querySelectorAll('.active').forEach(item => item.classList.remove('active'));
      target.classList.toggle('active');
      setState({
        environment: environment
      });
    };

    function onPlatformSelect(event) {
      const target = event.currentTarget;
      const {
        value
      } = target.dataset;
      target.closest('.block-options').querySelectorAll('.active').forEach(item => item.classList.remove('active'));
      target.classList.toggle('active');
      const state = {
        platform: value
      };
      if (value === 'web') state.os = false;
      setState(state);
    }

    function onOSSelect(event) {
      const target = event.currentTarget;
      const {
        value
      } = target.dataset;
      target.closest('.block-options').querySelectorAll('.active').forEach(item => item.classList.remove('active'));
      target.classList.toggle('active');
      setState({
        os: value
      });
    }

    function changeValue(event) {
      const target = event.currentTarget;
      const {
        property
      } = target.dataset;
      const value = {};
      value[property] = undefined;
      setState(value);
    }

    function setSwitch(event) {
      const target = event.currentTarget;
      const value = {};
      value[target.name] = target.checked;
      setState({ ...state,
        value
      });
    }

    const togglePrevious = () => setState(state => ({ ...state,
      openPrevious: !state.openPrevious
    }));

    function compile(event) {
      event.preventDefault();
      event.stopPropagation();
      setState({ ...state,
        showCompilation: true
      });
      const specs = {
        environment: state.environment,
        platform: state.platform === 'web' ? 'web' : state.os,
        ssr: true,
        compress: state.compress,
        icons: state.icons
      };
      application.builder.build(specs);
    }

    function onClose() {
      setState({ ...state,
        showCompilation: undefined
      });
    }

    if (!state.ready) return /*#__PURE__*/React.createElement(DsFetchingBlock, null);
    const {
      texts
    } = state;
    const {
      environment,
      platform,
      os
    } = state;
    const isValid = environment && platform && (platform === 'web' || !!os);
    const value = {
      texts: texts,
      application: application,
      builder: application.builder,
      ready: ready,
      ...state,
      onSelectEnvironment: onSelectEnvironment,
      onPlatformSelect: onPlatformSelect,
      onOSSelect: onOSSelect,
      changeValue: changeValue,
      isValid: isValid,
      previousOpened: state.openPrevious,
      togglePrevious: togglePrevious
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CompilerContext.Provider, {
      value: value
    }, /*#__PURE__*/React.createElement(_code.DsHeaderBar, null, /*#__PURE__*/React.createElement("div", {
      className: "left-col"
    }, /*#__PURE__*/React.createElement("div", {
      className: "title-col"
    }, /*#__PURE__*/React.createElement(_code2.DsBreadcrumb, {
      items: items
    }), /*#__PURE__*/React.createElement("h2", {
      className: "title primary-color"
    }, application.name)))), /*#__PURE__*/React.createElement("div", {
      className: "ds-container app-application-compile-page"
    }, /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("h4", null, texts.title), /*#__PURE__*/React.createElement("h5", null, texts.subtitle)), /*#__PURE__*/React.createElement(PreviousCompilations, {
      open: state.openPrevious
    }), /*#__PURE__*/React.createElement("div", {
      className: "panels"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-container"
    }, /*#__PURE__*/React.createElement(Environment, null), /*#__PURE__*/React.createElement(Platform, null), /*#__PURE__*/React.createElement(OsFields, null))), /*#__PURE__*/React.createElement("hr", null), isValid && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "column__right-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-column"
    }, /*#__PURE__*/React.createElement(BeyondSwitch, {
      name: "compress",
      value: true,
      onChange: setSwitch
    }), /*#__PURE__*/React.createElement("label", null, texts.compress))), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("footer", {
      className: "center-block"
    }, /*#__PURE__*/React.createElement(BeyondButton, {
      onClick: compile,
      className: "primary btn-block"
    }, texts.actions.compile)))))), state.showCompilation && /*#__PURE__*/React.createElement(CompilationModal, {
      texts: texts,
      onClose: onClose,
      builder: application.builder,
      openPrevious: togglePrevious
    }));
  }
  /***********
  JS PROCESSOR
  ***********/

  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.ds-modal.ds-modal-compilation .beyond-element-spinner{position:absolute;right:20px;top:20px}.ds-modal.ds-modal-compilation .hidden{display:none}.ds-modal.ds-modal-compilation .beyond-button{display:grid;width:70%;margin:auto}.ds-modal.ds-modal-compilation .ds-modal__content{padding:20px;position:relative;display:grid}.ds-modal.ds-modal-compilation .ds-modal__content .compilation__message,.ds-modal.ds-modal-compilation .ds-modal__content .ds-modal__actions{margin:15px 0 0}.ds-modal.ds-modal-compilation .list-builds{list-style:none;padding:20px}.ds-modal.ds-modal-compilation .list-builds li{border-bottom:1px solid #f0f0f0;display:grid;grid-template-columns:1fr auto;padding:8px;align-items:center}.ds-modal.ds-modal-compilation .list-builds li h5{padding:0;color:#ff8056}.ds-modal.ds-modal-compilation .list-builds li:last-child{border-bottom:none}.app-application-compile-page header{padding:15px;margin-bottom:30px}.app-application-compile-page header h4,.app-application-compile-page header h5{padding:0;margin:0}.app-application-compile-page header h5{margin-top:8px;color:#ff8056}.app-application-compile-page .panels{display:grid}.app-application-compile-page .panels .form-container{display:grid;grid-auto-flow:column}.app-application-compile-page .panels .form-section{display:grid;grid-template-rows:50px auto}.app-application-compile-page .panels .form-section:nth-child(2) .block-options figure.active{background:#ff7142}.app-application-compile-page .panels .form-section:nth-child(2) .block-options figure.active:hover{background:#ff612d}.app-application-compile-page .panels .form-section:nth-child(3) .block-options figure.active{background:#ff5a23}.app-application-compile-page .panels .form-section:nth-child(3) .block-options figure.active:hover{background:#ff8056}.app-application-compile-page .block-options{display:flex;display:flex}.app-application-compile-page .block-options p{font-size:12px}.app-application-compile-page .block-options figure{flex:1 1 0;display:grid;flex-direction:column;text-align:center;align-items:center;padding:40px;cursor:pointer;gap:8px;margin:0;justify-content:center;text-align:center;transition:all 150ms ease-in}.app-application-compile-page .block-options figure h4{padding:0 0 8px}.app-application-compile-page .block-options figure svg{height:4rem;width:4rem;margin:auto;fill:#FF8056}.app-application-compile-page .block-options figure.active,.app-application-compile-page .block-options figure:hover{transition:all 150ms ease-in;background:#ff8056;color:#fff}.app-application-compile-page .block-options figure.active svg,.app-application-compile-page .block-options figure:hover svg{fill:#fff}.app-application-compile-page .block-options figure.active:hover,.app-application-compile-page .block-options figure:hover:hover{background:rgba(0,0,0,.5)}.app-application-compile-page .block-options figure.active:hover svg,.app-application-compile-page .block-options figure:hover:hover svg{fill:#FF8056}.app-application-compile-page .block-options figure.active.active:hover,.app-application-compile-page .block-options figure:hover.active:hover{background:#ff6d3d}.app-application-compile-page .block-options figure.active.active:hover svg,.app-application-compile-page .block-options figure:hover.active:hover svg{fill:#fff}.app-application-compile-page .block-options figure{flex:1}.app-application-compile-page .block-options figure:hover h4{color:#ff8056}.app-application-compile-page .block-options figure.active:hover h4{color:#fff}.app-application-compile-page .checkbox-section,.app-application-compile-page .flex-column{display:flex;gap:15px}.app-application-compile-page .flex-column{padding:8px 15px}.app-application-compile-page .flex-column+.app-application-compile-page .flex-column{padding-left:30px}.app-application-compile-page .column__right-content{display:flex;justify-content:flex-end}';
  bundle.styles.appendToDOM();
});