define(["exports", "@beyond-js/dashboard/unnamed/components/breadcrumb/code", "@beyond-js/dashboard-lib/models/js", "@beyond-js/ui/alert/code", "@beyond-js/ui/form/code", "@beyond-js/ui/modal/code", "@beyond-js/ui/spinner/code", "@beyond-js/dashboard/ds-contexts/code", "@beyond-js/dashboard/hooks/code", "@beyond-js/dashboard/models/code", "@beyond-js/dashboard/core-components/code", "@beyond-js/kernel/texts/ts", "react", "react-dom"], function (_exports, _code, _js, _code2, _code3, _code4, _code5, _code6, _code7, _code8, _code9, _ts, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Compilation = Compilation;
  _exports.CompileBoard = CompileBoard;
  _exports.CompilerContext = void 0;
  _exports.Finished = Finished;
  _exports.Footer = Footer;
  _exports.useCompilerContext = _exports.hmr = void 0;

  // CORE
  //  @beyond-js Texts
  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/dashboard/app-compile/code").package();

  externals.register(new Map([["react", dependency_0], ["react-dom", dependency_1]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /***********
  _context.jsx
  ***********/

  const CompilerContext = React.createContext();
  _exports.CompilerContext = CompilerContext;

  const useCompilerContext = () => React.useContext(CompilerContext);
  /********
  board.jsx
  ********/


  _exports.useCompilerContext = useCompilerContext;

  function CompileBoard(props) {
    const [ready, setReady] = React.useState(controller.ready);
    const [selected, setSelected] = React.useState();
    const [fetching, setFetching] = React.useState();
    const [status, setStatus] = React.useState('start');
    const [compiling, setCompiling] = React.useState(null);
    (0, _code7.useBinder)([controller], () => setReady(controller.ready));
    React.useEffect(() => {
      if (props.specs.id) controller.getApp([props.specs.id]);
      setReady(controller.ready);
    }, [props.specs]);
    if (!ready || props.specs.projectId !== controller.application?.id) return /*#__PURE__*/React.createElement(_code9.DsFetchingBlock, null);
    const {
      texts,
      application,
      error
    } = controller;
    const Control = status !== 'start' ? Compilation : Start;
    return /*#__PURE__*/React.createElement(CompilerContext.Provider, {
      value: {
        setFetching,
        fetching,
        status,
        selected,
        setSelected,
        setStatus,
        texts,
        application
      }
    }, /*#__PURE__*/React.createElement(_code9.DSBoard, {
      className: "board__compile"
    }, /*#__PURE__*/React.createElement("header", {
      className: "board__header"
    }, /*#__PURE__*/React.createElement("h4", null, texts.title, " ", /*#__PURE__*/React.createElement("small", null, application.name))), /*#__PURE__*/React.createElement(Control, null)));
  }
  /**************
  compilation.jsx
  **************/


  function Compilation() {
    const {
      selected,
      status,
      setFetching,
      setStatus,
      application,
      texts
    } = useCompilerContext();
    const container = React.useRef(null);
    (0, _code7.useBinder)([application.builder], () => {
      const list = container.current.querySelector('.compile__trace__all-list');
      const errorList = container.current.querySelector('.compile__trace__error-list');

      const setMessage = (entries, error) => {
        const size = entries.length;
        if (!size) return;
        const item = document.createElement('li');
        const message = entries[size - 1];
        message.error && (item.className = 'message__error');
        item.innerHTML = message.text;

        if (message.error) {
          const errorItem = item.cloneNode(true);
          errorList.closest('.card').classList.remove('hidden');
          errorList.appendChild(errorItem);
        }

        list.appendChild(item);
      };

      const {
        messages,
        error
      } = application.builder;
      messages && setMessage(messages);
      error && setMessage(error, true);
    });
    React.useEffect(() => {
      const dist = application.deployment.distributions.get(selected);
      const {
        name,
        platform,
        npm,
        environment
      } = dist;
      application.builder.build({
        name,
        platform,
        npm,
        environment
      }).then(() => {
        setFetching(false);
        setStatus('finished');
      }).catch(e => {
        console.error('error', e);
      });
    }, []);
    return /*#__PURE__*/React.createElement("div", {
      ref: container
    }, status === 'finished' && /*#__PURE__*/React.createElement(Finished, null), /*#__PURE__*/React.createElement("div", {
      className: "ds-container two-columns no-m"
    }, /*#__PURE__*/React.createElement("article", {
      className: "card card--log"
    }, /*#__PURE__*/React.createElement("h3", null, texts.log.title), /*#__PURE__*/React.createElement("ul", {
      className: "compile__trace__list compile__trace__all-list"
    })), /*#__PURE__*/React.createElement("article", {
      className: "card card--error-log hidden"
    }, /*#__PURE__*/React.createElement("h3", null, texts.log.errorLog), /*#__PURE__*/React.createElement("ul", {
      className: "compile__trace__list compile__trace__error-list"
    }))));
  }
  /***********
  finished.jsx
  ***********/


  function Finished() {
    const {
      setStatus,
      texts,
      application,
      selected
    } = useCompilerContext();
    const dist = application.deployment.distributions.get(selected);
    const errors = application.builder.messages.filter(message => message.error);
    const type = errors.length ? 'error' : 'success';
    const path = `${application.path}/.beyond/builds/${dist.name}`.replace(/\\/g, '/');
    return /*#__PURE__*/React.createElement("div", {
      className: "pd-base"
    }, /*#__PURE__*/React.createElement(_code2.BeyondAlert, {
      type: type
    }, /*#__PURE__*/React.createElement("h3", null, errors.length ? texts.finished.error : texts.finished.success), /*#__PURE__*/React.createElement("strong", null, texts.finished.directory), /*#__PURE__*/React.createElement("span", {
      className: "pathname"
    }, path)), /*#__PURE__*/React.createElement("div", {
      className: "flex-container flex-end pd-v-1"
    }, /*#__PURE__*/React.createElement(_code3.BeyondButton, {
      className: "btn primary",
      onClick: () => setStatus('start')
    }, texts.actions.new)));
  }
  /*********
  footer.jsx
  *********/


  function Footer() {
    const {
      finished,
      application,
      setFinished,
      selected,
      setFetching
    } = useCompilerContext();
    return /*#__PURE__*/React.createElement(React.Fragment, null);
  }
  /*******
  item.jsx
  *******/


  const DistributionItem = ({
    data
  }) => {
    const {
      fetching,
      texts,
      selected,
      setSelected
    } = useCompilerContext();
    let cls = `item-distribution${selected === data.id ? ' selected' : ''}`;
    if (fetching) cls += " is-fetching";

    const onSelect = event => {
      const isSelected = selected ? undefined : data.id;
      setSelected(isSelected);
    };

    const attrs = {
      className: cls
    };
    if (!fetching) attrs.onClick = onSelect;
    return /*#__PURE__*/React.createElement("li", attrs, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", null, data.name), /*#__PURE__*/React.createElement("div", {
      className: "item__description"
    }, texts.platform.label, ": ", /*#__PURE__*/React.createElement("span", null, data.platform)), /*#__PURE__*/React.createElement("div", {
      className: "item__description"
    }, texts.platform.environment, ": ", /*#__PURE__*/React.createElement("span", null, data.environment)), /*#__PURE__*/React.createElement("div", {
      className: "item__description"
    }, texts.platform.port.label, ": ", /*#__PURE__*/React.createElement("span", null, data.port)), data.ts && /*#__PURE__*/React.createElement("div", {
      className: "item__description"
    }, texts.ts, ": ", /*#__PURE__*/React.createElement("span", null, data.ts.compiler))), /*#__PURE__*/React.createElement("div", {
      className: "col__right"
    }, /*#__PURE__*/React.createElement("div", null, data.ssr && /*#__PURE__*/React.createElement("span", {
      className: "badge"
    }, texts.ssr)), /*#__PURE__*/React.createElement(_code9.DSIcon, {
      icon: "check"
    })));
  };
  /********
  start.jsx
  ********/


  function Start() {
    const {
      selected,
      finished,
      application,
      setStatus,
      texts
    } = useCompilerContext();
    const distributions = [];
    application.deployment.distributions.forEach(dist => distributions.push( /*#__PURE__*/React.createElement(DistributionItem, {
      key: dist.id,
      data: dist
    })));

    const compile = async event => {
      event.stopPropagation();
      setStatus('compilation');
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "ds-container two-columns no-m"
    }, /*#__PURE__*/React.createElement("section", {
      className: "card"
    }, /*#__PURE__*/React.createElement("h3", null, texts.start.title), /*#__PURE__*/React.createElement("ul", {
      className: `distributions__list${selected ? ' is-selected' : ''}`
    }, distributions), !finished && /*#__PURE__*/React.createElement("div", {
      className: "compile__action"
    }, /*#__PURE__*/React.createElement(_code3.BeyondButton, {
      disabled: !selected,
      className: "btn primary",
      onClick: compile
    }, texts.actions.compile))))));
  }
  /***********
  JS PROCESSOR
  ***********/

  /******************
  FILE: controller.js
  ******************/


  const controller = new class extends _js.ReactiveModel {
    #texts;

    get texts() {
      return this.#texts?.value;
    }

    get ready() {
      return this.#texts.ready && (this.#application || this.#error);
    }

    #application;

    get application() {
      return this.#application?.application;
    }

    #error;

    get error() {
      return this.#error;
    }

    constructor() {
      super();
      const module = __pkg.bundle.module.resource;
      this.#texts = new _ts.CurrentTexts(module, true);
      this.#texts.bind('change', this.triggerEvent);
    }

    async getApp(id) {
      const application = await _code8.projectsFactory.get(id);

      if (!application) {
        this.#error = 'APP_NOT_FOUND';
      }

      this.#application = application;
      window._app = this.application;
      this.triggerEvent();
    }

  }();
  /**********
  SCSS STYLES
  **********/

  const legacyStyles = beyondLegacyStyles.register('@beyond-js/dashboard/app-compile/code', '.board__compile .distributions__list{list-style:none;padding:0;display:grid;gap:1rem}.board__compile .distributions__list .item-distribution{padding:1rem 2rem;cursor:pointer;display:grid;flex-grow:2;grid-template-columns:1fr 60px;border:1px solid var(--ds-border-element-color);align-items:center}.board__compile .distributions__list .item-distribution.item--selected{background:var(--ds-bg-selected)}.board__compile .distributions__list .item-distribution h3{font-size:1.6rem;text-transform:uppercase;padding:0}.board__compile .distributions__list .item-distribution.selected,.board__compile .distributions__list .item-distribution:hover{background:rgba(18,31,54,.3)}.board__compile .distributions__list .item-distribution.selected .col__right .beyond-icon,.board__compile .distributions__list .item-distribution:hover .col__right .beyond-icon{display:flex}.board__compile .distributions__list .item-distribution .col__right{display:flex;gap:15px}.board__compile .distributions__list .item-distribution .col__right .beyond-icon{display:none;background:var(--beyond-primary-color);border-radius:50%;padding:5px;height:20px;width:20px}.board__compile .compile__action{padding:2rem;display:flex;justify-content:flex-end}.board__compile .action__end{display:flex;align-self:flex-end;justify-content:flex-end;margin:1rem 0;color:var(--beyond-primary-accent-color);text-decoration:none}.compile__trace__list{list-style:none;display:grid;gap:2px;padding:0}.compile__trace__list li{padding:4px;cursor:pointer;transition:all 150ms ease-in}.compile__trace__list li:hover{background:var(--ds-element-hover)}.compile__trace__list .message__error{background:var(--beyond-error-color)}.compile__trace__list .message__error:hover{background:var(--beyond-error-darken-color)}.app-application-compile-page header{padding:15px;margin-bottom:30px}.app-application-compile-page header h4,.app-application-compile-page header h5{padding:0;margin:0}.app-application-compile-page header h5{margin-top:8px;color:var(--beyond-primary-color)}.app-application-compile-page .panels{display:grid}.app-application-compile-page .panels .form-container{display:grid;grid-auto-flow:column}.app-application-compile-page .panels .form-section{display:grid;grid-template-rows:50px auto}.app-application-compile-page .panels .form-section:nth-child(2) .block-options figure.active{background:#ff7142}.app-application-compile-page .panels .form-section:nth-child(2) .block-options figure.active:hover{background:#ff612d}.app-application-compile-page .panels .form-section:nth-child(3) .block-options figure.active{background:#ff5a23}.app-application-compile-page .panels .form-section:nth-child(3) .block-options figure.active:hover{background:var(--beyond-primary-color)}.app-application-compile-page .block-options{display:flex;display:flex}.app-application-compile-page .block-options p{font-size:12px}.app-application-compile-page .block-options figure{flex:1 1 0;display:grid;flex-direction:column;text-align:center;align-items:center;padding:40px;cursor:pointer;gap:8px;margin:0;justify-content:center;transition:all 150ms ease-in}.app-application-compile-page .block-options figure h4{padding:0 0 8px}.app-application-compile-page .block-options figure svg{height:4rem;width:4rem;margin:auto;fill:var(--beyond-primary-color)}.app-application-compile-page .block-options figure.active,.app-application-compile-page .block-options figure:hover{transition:all 150ms ease-in;background:var(--beyond-primary-color);color:var(--beyond-text-modal-color)}.app-application-compile-page .block-options figure.active svg,.app-application-compile-page .block-options figure:hover svg{fill:var(--beyond-text-on-primary)}.app-application-compile-page .block-options figure.active:hover,.app-application-compile-page .block-options figure:hover:hover{background:rgba(0,0,0,.5)}.app-application-compile-page .block-options figure.active:hover svg,.app-application-compile-page .block-options figure:hover:hover svg{fill:var(--beyond-primary-color)}.app-application-compile-page .block-options figure.active.active:hover,.app-application-compile-page .block-options figure:hover.active:hover{background:#ff6d3d}.app-application-compile-page .block-options figure.active.active:hover svg,.app-application-compile-page .block-options figure:hover.active:hover svg{fill:var(--beyond-text-on-primary)}.app-application-compile-page .block-options figure{flex:1}.app-application-compile-page .block-options figure:hover h4{color:var(--beyond-primary-color)}.app-application-compile-page .block-options figure.active:hover h4{color:#fff}.app-application-compile-page .checkbox-section,.app-application-compile-page .flex-column{display:flex;gap:15px}.app-application-compile-page .flex-column{padding:8px 15px}.app-application-compile-page .flex-column+.app-application-compile-page .flex-column{padding-left:30px}.app-application-compile-page .column__right-content{display:flex;justify-content:flex-end}');
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