define(["exports", "@beyond-js/ui/empty", "@beyond-js/ui/form", "@beyond-js/ui/spinner", "@beyond-js/ui/loading", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _empty, _form, _spinner, _loading, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.hmr = _exports.BeyondList = void 0;
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/ui/list",
    "bundle": "code"
  }).package();

  ;
  externals.register(new Map([["react", dependency_1], ["react-dom", dependency_2]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /*******
  item.jsx
  *******/

  const DefaultItem = ({
    item
  }) => /*#__PURE__*/React.createElement("div", {
    className: "beyond-list-default-item"
  }, /*#__PURE__*/React.createElement("h2", null, item.loaded ? item.id : /*#__PURE__*/React.createElement("div", {
    className: "preload-40"
  })), /*#__PURE__*/React.createElement("span", null, item.loaded ? item.id : /*#__PURE__*/React.createElement("div", {
    className: "preload-60"
  })));
  /*******
  list.jsx
  *******/


  class BeyondList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        getters: this.props.collection.getters
      };

      this.updateState = () => this.setState({
        getters: this.props.collection.getters
      });

      this.loadMore = this.loadMore.bind(this);
    }

    loadMore() {
      this.props.collection.load({
        'update': false
      });
    }

    componentDidMount() {
      this.props.collection.bind('change', this.updateState);
      if (this.props.load && !this.props.loaded) this.props.collection.load();
    }

    componentWillUnmount() {
      this.props.collection.unbind('change', this.updateState);
    }

    render() {
      let cls = `beyond-list ${this.props.className ? this.props.className : ''}`;

      if (!this.state.getters || !this.state.getters.loaded) {
        const Preload = this.props.preload ? this.props.preload : _loading.BeyondLoading;
        return /*#__PURE__*/React.createElement(Preload, null);
      }

      const {
        fetching,
        items,
        more
      } = this.props.collection.getters;
      if (!fetching && !items.length) return /*#__PURE__*/React.createElement(_empty.BeyondEmpty, null);
      let output = [];
      items.map(item => {
        const childrenWithProps = React.Children.map(this.props.children, child => {
          const key = item.id ? item.id : item.instanceId;
          const stateItem = {
            'key': `item-${key}`,
            'item': item
          };
          return React.cloneElement(child, stateItem);
        });
        output.push(childrenWithProps);
      });
      const onClick = this.props.onClickMore ? this.props.onClickMore : this.loadMore;
      const disabled = fetching;
      const textMore = this.props.textMore ? this.props.textMore : 'Cargar Más';
      const clsMore = this.props.clsMore ? this.props.clsMore : 'btn btn-load-more ';
      if (more) cls = `${cls} load-more`;
      return /*#__PURE__*/React.createElement("div", {
        className: cls
      }, output, more && /*#__PURE__*/React.createElement("div", {
        className: "load-more-container"
      }, /*#__PURE__*/React.createElement(_form.BeyondButton, {
        className: `${clsMore} more`,
        onClick: onClick,
        disabled: disabled
      }, fetching ? /*#__PURE__*/React.createElement(_spinner.BeyondSpinner, {
        fetching: true
      }) : textMore)));
    }

  }
  /**********
  SCSS STYLES
  **********/


  _exports.BeyondList = BeyondList;
  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/list', '.beyond-list-page .beyond-list-item .trash-toggle{position:absolute;top:0;left:-15px;bottom:-2px;right:-15px;background:#000;color:var(--beyond-text-on-primary);display:none;z-index:100}.beyond-list-page .beyond-list-item .trash-toggle.open{display:block;transition:.3s ease-in-out all}.beyond-list-page .beyond-list-item .trash-toggle .icon+.icon{margin:5px}.beyond-list-page .beyond-list-item .trash-toggle button svg{color:var(--beyond-text-on-primary);fill:var(--beyond-text-on-primary)}.beyond-list-page .beyond-list-item .trash-toggle .close-icon{position:absolute;top:15px;right:15px;z-index:10}.beyond-list-page .beyond-list-item .trash-toggle .actions-group{position:relative;display:flex;height:100%;align-items:center;padding:0 15px}.beyond-list-page .beyond-list-item{display:grid;position:relative;margin:0 15px 0;padding-bottom:15px;padding-top:15px;grid-gap:15px;grid-template-columns:40px auto;border-bottom:1px solid var(--beyond-primary-light-color);padding-right:4rem;cursor:pointer}.beyond-list-page .beyond-list-item .graphs-element-image{height:40px;width:40px;background:var(--beyond-primary-accent-color);margin:0;border-radius:50%}.beyond-list-page .beyond-list-item .graphs-element-image img{border-radius:50%}.beyond-list-page .beyond-list-item section.content-item{height:100%;align-self:center}.beyond-list-page .beyond-list-item section.content-item h2{font-size:14px;margin:0;font-weight:bolder}.beyond-list-page .beyond-list-item section.content-item h2:first-letter{text-transform:uppercase}.beyond-list-page .beyond-list-item section.content-item p{margin:0}.beyond-list-page .beyond-list-item section.content-item .settings-icon{position:absolute;right:0;top:15px}.beyond-list-page .beyond-list-item section.content-item.loading{border-bottom:1px solid var(--beyond-primary-light-color)}.beyond-list-page .beyond-list-item section.content-item.loading h2{background:var(--beyond-primary-accent-color);color:var(--beyond-primary-accent-color);width:80%}.beyond-list-page .beyond-list-item section.content-item.loading h2:first-letter{text-transform:uppercase}.beyond-list-page .beyond-list-item section.content-item.loading p{background:var(--beyond-primary-accent-color);color:var(--beyond-primary-accent-color);width:80%}.beyond-list-page .beyond-list-item section.content-item.loading .settings-icon{background:var(--beyond-primary-accent-color)}');
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