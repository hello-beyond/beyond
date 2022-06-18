define(["exports", "react", "react-dom"], function (_exports, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.BeyondPopover = BeyondPopover;
  _exports.BeyondPopper = BeyondPopper;
  _exports.hmr = void 0;

  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/ui/popover/code").package();

  externals.register(new Map([["react", dependency_0], ["react-dom", dependency_1]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /***********
  JS PROCESSOR
  ***********/

  /***************
  FILE: control.js
  ***************/

  class Control {
    _events;
    _popper;

    get popper() {
      return this._popper;
    }

    _ready;

    get ready() {
      return this._ready;
    }

    constructor() {
      this._events = new Events({
        bind: this
      });
      this.load();
    }

    async load() {
      const url = `/libraries/beyond-ui/libs/popper/static/vendor/popper.min.js`;

      require(['@popperjs/core'], popper => {
        this._popper = popper;
        this._ready = true;

        this._events.trigger('change');
      });
    }

  }
  /**********
  popover.jsx
  **********/


  function BeyondPopover({
    children,
    target,
    className,
    options = {},
    placement = 'bottom'
  }) {
    const button = new React.useRef();
    const content = new React.useRef();
    const [ready, setReady] = React.useState();
    const [instance, setinstance] = React.useState();
    const [opened, setOpened] = React.useState(false);

    const close = () => {
      document.removeEventListener('click', close);
      content.current.removeAttribute('data-show');
      setOpened(false);
    };

    let control;

    const onOpen = () => {
      content.current.setAttribute('data-show', '');
      document.addEventListener('click', close);
      setOpened(true);
      instance?.update();
    };

    const toggle = event => {
      event.preventDefault();
      event.stopPropagation();
      const isOpened = opened;
      setOpened(!isOpened);
      isOpened ? close() : onOpen();
    };

    const hideEvents = ['mouseleave', 'blur'];
    React.useEffect(() => {
      control = new Control();

      const onChange = () => {
        setReady(control.ready);

        if (control.ready) {
          control.unbind('change', onChange);
          const specs = Object.assign({
            placement: placement
          }, options);
          setinstance(control.popper.createPopper(button.current, content.current, specs));
          content.current.addEventListener('blur', close);
          hideEvents.forEach(event => content.current.addEventListener(event, close));
        }
      };

      control.bind('change', onChange);
      if (control.ready) onChange();
      return () => {
        control.unbind('change', onChange);
        button?.current?.removeEventListener('blur', close);
        button?.current?.removeEventListener('mouseleave', close);
      };
    }, [opened]);

    if (!target) {
      throw Error('The target element must be a valid html element or react component');
    }

    if (!ready) return null;
    const cls = className ? `beyond-popover__content ${className}` : 'beyond-popover__content';
    const clsSpan = `beyond-popover__target ${opened ? ' target--opened' : ''}`;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: clsSpan,
      ref: button,
      onClick: toggle
    }, target, /*#__PURE__*/React.createElement("div", {
      className: "popover__container"
    }, /*#__PURE__*/React.createElement("div", {
      className: cls,
      ref: content
    }, children))));
  }
  /*********
  popper.jsx
  *********/


  function BeyondPopper({
    opened,
    children,
    target,
    className,
    options = {},
    placement = 'bottom'
  }) {
    const button = new React.useRef();
    const content = new React.useRef();
    const [ready, setReady] = React.useState();
    const [instance, setinstance] = React.useState();

    const close = () => {
      document.removeEventListener('click', close);
      content.current.removeAttribute('data-show');
      setOpened(false);
    };

    let control;

    const onOpen = () => {
      content.current.setAttribute('data-show', '');
      document.addEventListener('click', close);
      setOpened(true);
      instance?.update();
    };

    const hideEvents = ['mouseleave', 'blur'];
    React.useState(() => {
      if (!content?.current) return;
      opened ? onOpen() : close();
    }, [opened]);
    React.useEffect(() => {
      control = new Control();

      const onChange = () => {
        setReady(control.ready);

        if (control.ready) {
          control.unbind('change', onChange);
          const specs = Object.assign({
            placement: placement
          }, options);
          setinstance(control.popper.createPopper(button.current, content.current, specs));
          content.current.addEventListener('blur', close);
          hideEvents.forEach(event => content.current.addEventListener(event, close));
        }
      };

      control.bind('change', onChange);
      if (control.ready) onChange();
      return () => {
        button.current.removeEventListener('blur', close);
        button.current.removeEventListener('mouseleave', close);
      };
    }, [opened]);

    if (!target) {
      throw Error('The target element must be a valid html element or react component');
    }

    if (!ready) return null;
    const cls = className ? `beyond-popover__content ${className}` : 'beyond-popover__content';
    return /*#__PURE__*/React.createElement("div", {
      className: "popover__container"
    }, /*#__PURE__*/React.createElement("div", {
      className: cls,
      ref: content
    }, children));
  }
  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/popover/code', '.beyond-popover__content{display:none;background:#121f36;color:#fff}.beyond-popover__content[data-show]{display:grid;position:absolute;top:0;left:0}.beyond-popover__content .popover__container{position:relative}');
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