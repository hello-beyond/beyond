define(["exports", "react", "react-dom"], function (_exports, React, ReactDOM) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/fade-in/code', false, {});
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /************
  JSX PROCESSOR
  ************/

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
});