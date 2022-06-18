define(["exports", "@beyond-js/dashboard-lib/models/ts", "react", "react-dom"], function (_exports, _ts, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  _exports.hmr = void 0;

  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/dashboard/unnamed/library/modules/page").package();

  externals.register(new Map([["react", dependency_0], ["react-dom", dependency_1]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /*********
  header.jsx
  *********/

  function Header() {
    return /*#__PURE__*/React.createElement("header", {
      className: "header"
    }, /*#__PURE__*/React.createElement(DashboardIcon, {
      className: "detail-icon",
      name: "chart-pie"
    }), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h1", null, "modulos"), /*#__PURE__*/React.createElement("div", {
      className: "project-numbers"
    }, "Selecciona uno o varios modulos a utilizar")));
  }
  /**********
  modules.jsx
  **********/


  class Modules extends React.Component {
    render() {
      const modules = this.props.modules;
      if (!modules.loaded) return null;
      const list = [];
      modules.items.forEach(module => {
        const id = module.id.split('//')[2];
        list.push( /*#__PURE__*/React.createElement("div", {
          key: module.id
        }, id));
      });
      let count = modules.counters.all.fetched ? modules.counters.all.value : '';
      count = count ? `(${count})` : '';
      return /*#__PURE__*/React.createElement("section", {
        className: "list"
      }, /*#__PURE__*/React.createElement("h4", null, "Modules ", count), /*#__PURE__*/React.createElement("div", {
        className: "items"
      }, list));
    }

  }
  /*******
  view.jsx
  *******/


  class View extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};

      this.update = () => this.setState({});
    }

    componentDidMount() {
      this.props.library.bind('change', this.update);
    }

    componentWillUnmount() {
      this.props.library.unbind('change', this.update);
    }

    render() {
      const library = this.props.library;
      if (!library.loaded) return null;
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "modules-content-lib"
      }, /*#__PURE__*/React.createElement("div", {
        className: "logo"
      }), /*#__PURE__*/React.createElement("h2", null, "Library name: ", /*#__PURE__*/React.createElement("strong", null, library.name)), /*#__PURE__*/React.createElement(Modules, {
        modules: library.modules
      })));
    }

  }
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: page.js
  ************/


  function Page() {
    const library = new _ts.Library({
      'identifier': {
        'name': this.vdir
      },
      'tree': {
        'properties': {
          'modules': {
            'properties': {
              'module': true
            }
          }
        }
      }
    });
    library.load({
      'modules': {
        'items': {
          'module': true
        }
      }
    });
    window.l = library;
    ReactDOM.render(React.createElement(View, {
      'library': library
    }), this.container);
  }
  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/dashboard/unnamed/library/modules/page', '.modules-content-lib{position:absolute;top:0;left:0;bottom:0;right:0;margin:auto;overflow:hidden;display:grid;grid-template-rows:auto 1fr;padding:15px 0}.modules-content-lib .logo{position:absolute;top:45px;left:auto;bottom:auto;right:57px}.modules-content-lib h2{text-align:left;margin:100px auto 10px 60px;color:var(--beyond-text-color)}.modules-content-lib h2 strong{color:var(--beyond-primary-accent-color);display:block}.modules-content-lib .list{height:100%;color:var(--beyond-text-color);overflow-y:auto;margin:15px auto auto;width:100%;padding-bottom:30px}.modules-content-lib .list h4{margin:auto auto 15px 60px}.modules-content-lib .list .items{margin:auto auto auto 60px;padding:0 0 15px}@media (max-width:600px){.modules-content-lib{display:block;padding:15px}.modules-content-lib h2{margin:auto;text-align:center}.modules-content-lib h4{margin:auto auto 15px 0!important}.modules-content-lib .list{margin:15px auto auto;text-align:left}.modules-content-lib .list .items{margin:auto}}');
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