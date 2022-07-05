define(["exports", "@beyond-js/ui/image", "@beyond-js/ui/form", "@beyond-js/ui/icon", "@beyond-js/ui/alert", "/components/uploader/code", "/libraries/beyond-dashboard/js", "/libraries/beyond-dashboard/ts", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _image, _form, _icon, _alert, _code, _js, _ts, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.MediaItem = _exports.JGalleryContext = _exports.Item = void 0;
  _exports.Page = Page;
  _exports.useJGalleryContext = _exports.hmr = void 0;
  //Beyond
  //Jida library
  //Beyond-Dashboard
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/dashboard/unnamed/components/uploader/page",
    "bundle": "page"
  }).package();

  ;
  externals.register(new Map([["react", dependency_1], ["react-dom", dependency_2]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /**********
  context.jsx
  **********/

  const JGalleryContext = React.createContext();
  _exports.JGalleryContext = JGalleryContext;

  const useJGalleryContext = () => React.useContext(JGalleryContext);
  /***************
  gallery-item.jsx
  ***************/


  _exports.useJGalleryContext = useJGalleryContext;

  function GalleryItem({
    item
  }) {
    const src = item.loaded ? item.min : item.src;
    const {
      controller
    } = useJGalleryContext();

    const onDelete = () => {
      if (!item.loaded) return;
      controller.deleteItem(item.get('name'));
    };

    return /*#__PURE__*/React.createElement(_image.BeyondImage, {
      className: "jd-gallery__img",
      src: src
    }, item.loaded && /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement(_icon.BeyondIconButton, {
      icon: "delete",
      onClick: onDelete
    }), /*#__PURE__*/React.createElement(_icon.BeyondIconButton, {
      icon: "edit"
    })));
  }
  /**********
  gallery.jsx
  **********/


  function GalleryView() {
    const {
      controller: {
        items
      }
    } = useJGalleryContext();
    if (!items) return null;
    const imagesOutput = [];
    items.forEach((item, i) => imagesOutput.push( /*#__PURE__*/React.createElement("li", {
      key: `image-${i}`
    }, /*#__PURE__*/React.createElement(GalleryItem, {
      item: item
    }))));
    return /*#__PURE__*/React.createElement("div", {
      className: "jd-gallery__list"
    }, /*#__PURE__*/React.createElement("ul", null, imagesOutput));
  }
  /****************
  uploader-form.jsx
  ****************/


  function UploaderForm() {
    const {
      controller
    } = useJGalleryContext();
    const [error, setError] = React.useState();
    const [images, setImages] = React.useState([]);
    React.useEffect(() => {
      controller.create(btn.current, box.current);
    }, []);
    const btn = React.useRef(null);
    const box = React.useRef(null);
    return /*#__PURE__*/React.createElement("div", {
      className: "jd-gallery__drop-zone",
      ref: box
    }, /*#__PURE__*/React.createElement(_icon.BeyondIcon, {
      icon: "upload"
    }), /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement("a", {
      ref: btn
    }, "Selecciona una image "), " o arrastrala."), error && /*#__PURE__*/React.createElement("div", {
      className: "alert alert-danger"
    }, "El archivo subido no es v\xE1lido, por favor verifiquelo y vuelva a intentarlo"), /*#__PURE__*/React.createElement("hr", null));
  }
  /*******
  view.jsx
  *******/


  function View({
    controller
  }) {
    const [processing, setProcessing] = React.useState();
    const [showForm, setShowForm] = React.useState(true);
    const [galleryItems, setGalleryItems] = React.useState(controller.items);
    React.useEffect(() => {
      const onChange = () => {
        setGalleryItems([...controller.items.values()]);
        setProcessing(controller.processing);
      };

      controller.bind('change', onChange);
      return () => controller.unbind('change', onChange);
    }, [controller.items, controller.ready]);
    const value = {
      controller: controller,
      total: controller.items.length,
      processing: controller.processing
    };
    if (controller.ready) return /*#__PURE__*/React.createElement("h3", null, "Cargando");
    return /*#__PURE__*/React.createElement(JGalleryContext.Provider, {
      value: value
    }, /*#__PURE__*/React.createElement("div", {
      className: "header"
    }, /*#__PURE__*/React.createElement("header", {
      className: "jadmin-page-header border-header"
    }, /*#__PURE__*/React.createElement("h1", null, "Carga de imagenes"), /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, /*#__PURE__*/React.createElement("button", {
      className: " btn btn-primary",
      onClick: () => setShowForm(true)
    }, "Agregar"))), showForm && /*#__PURE__*/React.createElement(UploaderForm, null), /*#__PURE__*/React.createElement(GalleryView, null)));
  }
  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/dashboard/unnamed/components/uploader/page', '.jadmin-page.jd-page__gallery .jd-gallery__drop-zone{cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:.2s all ease-in;margin:15px;width:calc(100% - 30px);height:150px;padding:30px;outline:2px dashed var(--beyond-primary-dark-color);outline-offset:10px}.jadmin-page.jd-page__gallery .jd-gallery__drop-zone:hover{background:#f0f0f0;color:var(--beyond-secondary-dark-color)}.jadmin-page.jd-page__gallery .jd-gallery__drop-zone .beyond-icon{height:60px;width:60px;fill:#E4E5DC}.jd-gallery__list{width:100%}.jd-gallery__list ul{display:flex;flex-wrap:wrap;width:100%;list-style:none;padding:0}.jd-gallery__list li{flex:20%;max-width:20%;padding:0 4px;cursor:pointer;transition:all .2s ease-in}.jd-gallery__list li:hover{opacity:.8;transition:all .2s ease-in}.jd-gallery__list li .beyond-element-image{width:100%;height:130px;position:relative}.jd-gallery__list li .beyond-element-image img{object-fit:cover;z-index:1;height:100%;width:100%}.jd-gallery__list li .beyond-element-image figcaption{position:absolute;transition:all .2s ease-in;display:none}.jd-gallery__list li .beyond-element-image:hover figcaption{transition:all .2s ease-in-out;background:rgba(227,97,82,.7);display:flex;position:absolute;top:0;left:0;right:0;bottom:0;align-items:center;z-index:99;justify-content:center}.jd-gallery__list li .beyond-element-image:hover figcaption .beyond-icon-button svg{fill:#fff}#app-gallery-page{-webkit-animation-name:fadeIn;-moz-animation-name:fadeIn;-ms-animation-name:fadeIn;-o-animation-name:fadeIn;animation-name:fadeIn;-webkit-animation-iteration-count:1;-moz-animation-iteration-count:1;-ms-animation-iteration-count:1;-o-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-duration:1s;-moz-animation-duration:1s;-ms-animation-duration:1s;-o-animation-duration:1s;animation-duration:1s;-webkit-animation-delay:0s;-moz-animation-delay:0s;-ms-animation-delay:0s;-o-animation-delay:0s;animation-delay:0s;-webkit-animation-timing-function:ease;-moz-animation-timing-function:ease;-ms-animation-timing-function:ease;-o-animation-timing-function:ease;animation-timing-function:ease;-webkit-animation-fill-mode:both;-moz-animation-fill-mode:both;-ms-animation-fill-mode:both;-o-animation-fill-mode:both;animation-fill-mode:both;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;-o-backface-visibility:hidden;backface-visibility:hidden}@-webkit-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-moz-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-ms-keyframes fadeIn{#app-gallery-page 0%{opacity:0}#app-gallery-page 100%{opacity:1}}@-o-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}#app-gallery-page .beyond-element-input input{height:2.2rem}#app-gallery-page .hidden-input{display:none}#app-gallery-page .alert{-webkit-animation-name:fadeIn;-moz-animation-name:fadeIn;-ms-animation-name:fadeIn;-o-animation-name:fadeIn;animation-name:fadeIn;-webkit-animation-iteration-count:1;-moz-animation-iteration-count:1;-ms-animation-iteration-count:1;-o-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-duration:1s;-moz-animation-duration:1s;-ms-animation-duration:1s;-o-animation-duration:1s;animation-duration:1s;-webkit-animation-delay:0s;-moz-animation-delay:0s;-ms-animation-delay:0s;-o-animation-delay:0s;animation-delay:0s;-webkit-animation-timing-function:ease;-moz-animation-timing-function:ease;-ms-animation-timing-function:ease;-o-animation-timing-function:ease;animation-timing-function:ease;-webkit-animation-fill-mode:both;-moz-animation-fill-mode:both;-ms-animation-fill-mode:both;-o-animation-fill-mode:both;animation-fill-mode:both;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;-o-backface-visibility:hidden;backface-visibility:hidden}@-webkit-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-moz-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-ms-keyframes fadeIn{#app-gallery-page .alert 0%{opacity:0}#app-gallery-page .alert 100%{opacity:1}}@-o-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}#app-gallery-page form{display:block}#app-gallery-page .jd-uploader-form{display:flex;width:100%;align-items:center;flex-direction:column;justify-content:center}#app-gallery-page .jd-uploader-form .alert{width:100%}');
  legacyStyles.appendToDOM();
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: item.js
  ************/

  class Item extends _js.ReactiveModel {
    async load() {
      try {
        this._fetching = true;
        this.triggerEvent();
        const response = await this.Api.get(this._routes.load, {
          id: this._id
        });
        if (response.status) this.setProperties(response.data);else this._errors = response.error;
        this._loaded = true;
        this._fetching = false;
        this.triggerEvent();
        return response;
      } catch (exc) {
        console.error('Error: ', exc);
        return {
          status: false,
          error: exc
        };
      }
    }

    async publish() {
      this._fetching = true;
      this.triggerEvent();

      try {
        const params = this.getProperties();
        const response = await this.Api.post(this._routes.publish, params);
        if (response.status) this.setProperties(response.data);else this._errors = response.error;
        this._fetching = false;
        this.triggerEvent();
        return response;
      } catch (exc) {
        this._fetching = false;
        this.triggerEvent();
        console.error('Error: ', exc);
        return {
          status: false,
          error: exc
        };
      }
    }

    async remove() {
      try {
        const response = await this.Api.post(this._routes.delete, {
          id: this.get('id')
        });
        if (!response?.status) this._errors = response.error;
        return response;
      } catch (exc) {
        console.error('Error: ', exc);
        return {
          status: false,
          error: exc
        };
      }
    }

  }
  /******************
  FILE: media-item.js
  ******************/


  _exports.Item = Item;

  class MediaItem extends Item {
    _id;
    _name;
    _directory;
    _type;
    _intern;
    _description;
    _legend;
    _alt;
    _metaData;
    _languageId;
    _originalText;
    _originalName;
    _cover;
    _routes = {
      load: '/gallery/load',
      publish: '/media/publish',
      delete: '/media/delete'
    };
    _skeleton = ['id', 'name', 'directory', 'type', 'intern', 'description', 'legend', 'alt', 'metaData', 'languageId', 'originalText', 'originalName', 'cover'];
    _gettersIgnored = ['metaData'];

    get src() {
      return this.metaData.urls;
    }

    get min() {
      return this.getUrl('150x150');
    }

    get middle() {
      return this.getUrl('400x400');
    }

    get big() {
      return this.getUrl('800x800');
    }

    get bigger() {
      return this.getUrl('1200x1200');
    }

    get original() {
      return this.getUrl('original');
    }

    constructor(props) {
      super();
      this.instance(props);
    }

    get metaData() {
      try {
        if (!this._metaData) return {};
        return JSON.parse(this._metaData);
      } catch (e) {
        console.error('exception', e, this._metaData);
        return {};
      }
    }

    getUrl(source) {
      return this.metaData?.urls?.[source] ? this.metaData.urls[source] : undefined;
    }

    loadFromLocal(data) {
      this.setProperties(data);
      this._loaded = true;
    }

  }
  /************
  FILE: page.js
  ************/


  _exports.MediaItem = MediaItem;

  function Page() {
    const controller = new UIController();

    this.show = () => {
      ReactDOM.render(React.createElement(View, {
        controller: controller
      }), this.container);
      this.container.id = 'app-gallery-page';
      this.container.classList.add('jadmin-page', 'jd-page__gallery');
    };

    this.hide = () => setTimeout(() => ReactDOM.unmountComponentAtNode(this.container), 350);
  }
  /*********************
  FILE: ui-controller.js
  *********************/


  class UIController extends _js.ReactiveModel {
    _uploader;

    get uploader() {
      return this._uploader;
    }

    _items = new Map();

    get items() {
      return this._items;
    }

    get ready() {
      true;
    }

    _module;
    _application;

    constructor() {
      super();
      this.loadImages = this.loadImages.bind(this);
      this.checkItems = this.checkItems.bind(this);
      const id = {
        application: 1917723684,
        module: 'application//1917723684//static-test'
      };
      this._module = new _ts.Module({
        identifier: {
          id: id.module
        }
      });
      this._application = new _ts.Application({
        identifier: {
          id: id.application
        }
      });
      this.load();
    }

    checkItems() {
      this.triggerEvent();
    }

    load() {
      const params = {
        application: {
          id: this._application.id,
          type: 'application'
        },
        module: {
          id: this._module.id,
          type: 'module'
        },
        overwrite: {
          id: this._module.id,
          type: 'overwrite',
          image: 'static/jida.png'
        }
      };
      const uploader = new _code.JidaUploader({
        type: 'image',
        name: 'images',
        params: {},
        url: `http://localhost:8080/uploader`,
        input: {
          name: 'images',
          multiple: true
        }
      });
      this._uploader = uploader;
      uploader.bind('file.loaded', this.loadImages);
      uploader.bind('loadend', async event => {
        try {
          this._processing = true;
          this.triggerEvent(); //validamos la ruta static del modulo

          await this._module.checkStatic(); //TODO aqui debo llamar cuando es overwrite para agregar la entrada
          //validamos la ruta static de la applicacion

          await this._application.checkStatic();
          const response = await uploader.publish(params.application);
          response.data.forEach(item => {
            if (item.originalName) {
              const instance = new MediaItem();
              instance.loadFromLocale(item);
              this.items.set(item.originalName, instance);
            }
          });
          this._processing = false;
          this.triggerEvent();
        } catch (e) {
          console.error(e);
        }
      });
    }

    _interval;

    loadImages() {
      const {
        files
      } = this.uploader;
      this.uploader.files.items.forEach((item, key) => {
        this.items.set(key, item);
      });
      clearInterval(this._interval);
      this._interval = window.setTimeout(() => {
        this.triggerEvent();
      }, 0);
    }

    create(selector, draganddrop) {
      this.uploader.create(selector);
      this.uploader.addDragAndDrop(draganddrop);
      this.triggerEvent();
    }

    deleteItem(name) {
      const item = this.items.get(name);
      item.remove();
      this.items.delete(name);
      this.triggerEvent();
    }

  }

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