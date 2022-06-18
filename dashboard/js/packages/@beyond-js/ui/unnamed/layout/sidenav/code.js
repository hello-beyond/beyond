define(["exports", "@beyond-js/ui/image/code", "@beyond-js/ui/icon/code", "@beyond-js/ui/perfect-scrollbar/code", "react", "react-dom"], function (_exports, _code, _code2, _code3, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.hmr = _exports.Sidenav = _exports.COMPONENTS = void 0;

  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/ui/unnamed/layout/sidenav/code").package();

  externals.register(new Map([["react", dependency_0], ["react-dom", dependency_1]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /**********
  sidenav.jsx
  **********/

  class Sidenav extends React.Component {
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
      return /*#__PURE__*/React.createElement(_code3.BeyondScrollContainer, {
        className: "nav-beyond-ui"
      }, /*#__PURE__*/React.createElement("section", {
        className: "list-components"
      }, /*#__PURE__*/React.createElement("ul", null, components.map(component => {
        return /*#__PURE__*/React.createElement("li", {
          key: component.title
        }, /*#__PURE__*/React.createElement("h4", {
          onClick: this.navigate,
          "data-link": component.link
        }, component.title));
      }))));
    }

  }
  /***********
  JS PROCESSOR
  ***********/

  /******************
  FILE: components.js
  ******************/


  _exports.Sidenav = Sidenav;
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
  /**********
  SCSS STYLES
  **********/

  _exports.COMPONENTS = COMPONENTS;
  const legacyStyles = beyondLegacyStyles.register('@beyond-js/ui/unnamed/layout/sidenav/code', '.nav-beyond-ui{height:435px;border-right:solid 1px gray;position:fixed;width:180px}.nav-beyond-ui .list-components ul{list-style:none;color:#fff;padding:12px 0;text-align:left}.nav-beyond-ui .list-components li{padding:5px 0}.nav-beyond-ui .list-components li h4{cursor:pointer;transition:.5s color}.nav-beyond-ui .list-components li h4:hover{color:#e36152}.nav-beyond-ui .list-components li h5{color:gray;padding-left:5px;cursor:pointer;transition:.5s color}.nav-beyond-ui .list-components li h5:hover{color:#e36152}');
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