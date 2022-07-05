define(["exports", "@beyond-js/ui/image", "@beyond-js/ui/form", "@beyond-js/ui/icon", "/libraries/beyond-dashboard/ui/layout/search", "@beyond-js/ui/perfect-scrollbar", "@beyond-js/ui/ripple", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _image, _form, _icon, _search, _perfectScrollbar, _ripple, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.COMPONENTS = void 0;
  _exports.Page = Page;
  _exports.hmr = void 0;
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/ui/unnamed/home",
    "multibundle": true,
    "bundle": "page"
  }).package();

  ;
  externals.register(new Map([["react", dependency_1], ["react-dom", dependency_2]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /*************
  components.jsx
  *************/

  class Components extends React.Component {
    constructor(props) {
      super(props);

      this.updateState = () => this.setState({});
    }

    navigate(event) {
      const target = event.currentTarget;
      beyond.navigate(`/beyond/ui/${target.dataset.link}`);
    }

    render() {
      const components = Object.values(COMPONENTS);
      return components.map(component => {
        return /*#__PURE__*/React.createElement("div", {
          key: component.title,
          className: "component",
          "data-link": component.link,
          onClick: this.navigate
        }, /*#__PURE__*/React.createElement(_icon.BeyondIcon, {
          icon: component.icon
        }), /*#__PURE__*/React.createElement("h4", null, component.title), /*#__PURE__*/React.createElement("p", null, component.description), /*#__PURE__*/React.createElement(_ripple.BeyondWaves, null));
      });
    }

  }
  /*******
  view.jsx
  *******/


  class View extends React.Component {
    constructor(props) {
      super(props);

      this.updateState = () => this.setState({});
    }

    componentDidMount() {
      this.props.texts.bind('change', this.updateState);
    }

    componentWillUnmount() {
      this.props.texts.unbind('change', this.updateState);
    }

    render() {
      const {
        texts
      } = this.props;
      if (!texts.ready) return null;
      const text = texts.value;
      return /*#__PURE__*/React.createElement("div", {
        className: "home-beyond-ui"
      }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("h1", null, text.title), /*#__PURE__*/React.createElement("p", null, text.description)), /*#__PURE__*/React.createElement("section", {
        className: "container-components"
      }, /*#__PURE__*/React.createElement(Components, null)));
    }

  }
  /***********
  JS PROCESSOR
  ***********/

  /******************
  FILE: components.js
  ******************/


  const COMPONENTS = {
    'icons': {
      'title': 'Icons',
      'description': 'Una gran variedad de iconos para identificar muchos apartados, con una fácil integración y edición.',
      'icon': 'attractions',
      'link': 'icons'
    },
    'iconsButtons': {
      'title': 'Buttons Icons',
      'description': 'Una gran variedad de iconos para identificar muchos apartados, con una fácil integración y edición.',
      'icon': 'attractions',
      'link': 'icons/buttons'
    },
    'modals': {
      'title': 'Modals',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'modals'
    },
    'select': {
      'title': 'Select',
      'description': 'Cada opción definida se pasa y se muestra en el cuadro de diálogo para Seleccionar.',
      'icon': 'attractions',
      'link': 'select'
    },
    'form': {
      'title': 'Forms',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'form'
    },
    'alerts': {
      'title': 'Alerts',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'alerts'
    },
    'empty': {
      'title': 'Empty',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'empty'
    },
    'image': {
      'title': 'Images',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'image'
    },
    'instruction': {
      'title': 'Instructions',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'instruction'
    },
    'list': {
      'title': 'Lists',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'list'
    },
    'loading': {
      'title': 'Loadings',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'loading'
    },
    'media': {
      'title': 'Media',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'media'
    },
    'overlay': {
      'title': 'Overlays',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'overlay'
    },
    'scroll': {
      'title': 'Scroll',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'scroll'
    },
    'picture': {
      'title': 'Pictures',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'picture'
    },
    'preloadText': {
      'title': 'Preload Text',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'preloadText'
    },
    'preload': {
      'title': 'Preload',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'preload'
    },
    'publication': {
      'title': 'Publications',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'publication'
    },
    'ripple': {
      'title': 'Ripple',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'ripple'
    },
    'spinner': {
      'title': 'Spinners',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'spinner'
    },
    'swiper': {
      'title': 'Swiper',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'swiper'
    },
    'toast': {
      'title': 'Toasts',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'toast'
    },
    'toolbar': {
      'title': 'Toolbar',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'toolbar'
    },
    'videoPlayer': {
      'title': 'Video Player',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'video-player'
    },
    'waves': {
      'title': 'Waves',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'waves'
    }
  };
  /************
  FILE: page.js
  ************/

  _exports.COMPONENTS = COMPONENTS;

  function Page() {
    const wrapper = document.createElement('div');
    ReactDOM.render(React.createElement(View, {
      'texts': module.texts
    }), wrapper);
    this.container.classList.add('app-home-page');
    this.container.appendChild(wrapper);
  }
  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/unnamed/home.page', '.home-beyond-ui header{padding-bottom:15px;border-bottom:solid 1px gray}.home-beyond-ui header h1{padding-bottom:20px;padding-top:0}.home-beyond-ui header p{color:#b7b7b6;width:80%}.home-beyond-ui .container-components{padding-top:40px;display:grid;grid-template-columns:1fr 1fr 1fr;grid-gap:40px}.home-beyond-ui .container-components .component{position:relative;padding:15px;border-radius:4px;box-shadow:2px .175em .5em rgba(2,8,20,.1),0 .085em .375em;cursor:pointer;transition:.5s background}.home-beyond-ui .container-components .component:hover{background:#e36152}.home-beyond-ui .container-components .component svg{background:#fff;border-radius:50%;padding:8px}.home-beyond-ui .container-components .component p{font-size:12px;text-align:justify}.home-beyond-ui .container-components .component .beyond-icon{height:40px;width:40px;position:relative;fill:#1e2d42}');
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