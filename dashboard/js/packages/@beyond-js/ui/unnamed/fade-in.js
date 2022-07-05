define(["exports", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.hmr = _exports.default = void 0;
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/ui/unnamed/fade-in",
    "bundle": "code"
  }).package();

  ;
  externals.register(new Map([["react", dependency_1], ["react-dom", dependency_2]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /**********
  fade-in.jsx
  **********/

  class FadeIn extends React.Component {
    constructor() {
      super();
      this.state = {
        maxIsVisible: 0
      };
    }

    get delay() {
      return this.props.delay || 50;
    }

    get transitionDuration() {
      return this.props.transitionDuration || 400;
    }

    componentDidMount() {
      const count = React.Children.count(this.props.children);
      let i = 0;
      this.interval = setInterval(() => {
        i++;
        if (i > count) clearInterval(this.interval);
        this.setState({
          maxIsVisible: i
        });
      }, this.delay);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
      const transitionDuration = this.transitionDuration;
      const WrapperTag = this.props.wrapperTag || "div";
      const ChildTag = this.props.childTag || "div";
      return /*#__PURE__*/React.createElement(WrapperTag, {
        className: this.props.className
      }, React.Children.map(this.props.children, (child, i) => {
        return /*#__PURE__*/React.createElement(ChildTag, {
          className: this.props.childClassName,
          style: {
            transition: `opacity ${transitionDuration}ms, transform ${transitionDuration}ms`,
            transform: this.state.maxIsVisible > i ? 'none' : 'translateY(20px)',
            opacity: this.state.maxIsVisible > i ? 1 : 0
          }
        }, child);
      }));
    }

  }

  _exports.default = FadeIn;
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