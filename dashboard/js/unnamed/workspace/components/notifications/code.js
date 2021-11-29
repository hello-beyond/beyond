define(["exports", "react", "react-dom", "@beyond-js/dashboard-lib/models/js", "@beyond-js/dashboard/unnamed/components/core/code", "@beyond-js/dashboard/unnamed/components/binder/code", "@beyond-js/dashboard/unnamed/workspace/context/code"], function (_exports, React, ReactDOM, _js, _code, _code2, _code3) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.DsNotificationContext = _exports.DSNotifications = void 0;
  _exports.NotificationPanel = NotificationPanel;
  _exports.useDsNotificationContext = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/workspace/components/notifications/code', false, {
    "txt": {
      "multilanguage": false
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

  /*******************
  box-notification.jsx
  *******************/


  function BoxNotifications({
    toggle
  }) {
    const {
      items,
      texts
    } = useDsNotificationContext();
    const cls = `ds-notification__list ${toggle ? 'is-opened' : ''}`;
    const output = [];
    items.forEach(item => output.push( /*#__PURE__*/React.createElement(NotificationItem, {
      key: `${item.applicationId}-error-${item.id}`,
      item: item
    })));
    return /*#__PURE__*/React.createElement("div", {
      className: cls
    }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("h5", {
      className: "title"
    }, texts.title)), output.length ? /*#__PURE__*/React.createElement("ul", null, output) : /*#__PURE__*/React.createElement(EmptyNotifications, null));
  }
  /**********
  control.jsx
  **********/


  const DsNotificationContext = React.createContext(null);
  _exports.DsNotificationContext = DsNotificationContext;

  const useDsNotificationContext = () => React.useContext(DsNotificationContext);

  _exports.useDsNotificationContext = useDsNotificationContext;

  function NotificationPanel() {
    const [toggle, setToggle] = React.useState(false);
    const {
      texts,
      ready,
      items
    } = DSNotifications;
    const [state, setState] = React.useState({
      texts,
      ready,
      items
    });
    (0, _code2.useBinder)([DSNotifications], () => {
      const {
        ready,
        items,
        texts,
        unread
      } = DSNotifications;
      setState(state => ({ ...state,
        ready,
        items,
        texts,
        unread
      }));
    });
    if (!state?.ready) return null;
    const {
      unread
    } = state;
    const cls = ` ds-notification__button__container ${toggle ? 'is-opened' : ''} ${unread ? ' list--unread' : ''}`;
    return /*#__PURE__*/React.createElement(DsNotificationContext.Provider, {
      value: { ...state
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ds-notification__container",
      onClick: () => setToggle(!toggle)
    }, /*#__PURE__*/React.createElement("div", {
      className: cls
    }, /*#__PURE__*/React.createElement(_code.DsIcon, {
      icon: "bell"
    }), state.unread && /*#__PURE__*/React.createElement("span", {
      className: "ds-notification__badge"
    })), /*#__PURE__*/React.createElement(BoxNotifications, {
      toggle: toggle
    })));
  }
  /********
  empty.jsx
  ********/


  const EmptyNotifications = () => {
    const {
      texts
    } = useDsNotificationContext();
    return /*#__PURE__*/React.createElement("div", {
      className: "empty__item"
    }, /*#__PURE__*/React.createElement("span", null, texts.empty));
  };
  /*******
  item.jsx
  *******/


  function NotificationItem({
    item,
    icon = "error"
  }) {
    const {
      workspace
    } = (0, _code3.useDSWorkspaceContext)();
    const {
      texts
    } = useDsNotificationContext();
    if (!workspace.application) return null;
    const {
      application: {
        application
      }
    } = workspace;

    const openModule = () => workspace.openBoard('module', {
      label: item?.module?.module.pathname
    });

    const openSource = () => {
      const file = item.file.replace(/\//g, '\\');
      const processorName = 'ts';

      if (!item.bundle.processors.has(processorName)) {
        return;
      }

      const processor = item.bundle.processors.get(processorName);
      const source = processor.sources.items.find(i => i.file === file);
      const position = {
        lineNumber: item.line,
        column: item.character
      };
      const specs = {
        source: source,
        path: source.relative.file,
        processor: processorName,
        position: position,
        module: item.module
      };
      workspace.openFile(specs);
    };

    if (item.type !== 'diagnostics') {
      return /*#__PURE__*/React.createElement("li", {
        className: "ds-notification__list-item",
        onClick: openModule
      }, item.message, item.count > 1 ? item.count : null);
    }

    const applicationPath = application?.path.replaceAll('\\', '/').toLowerCase();
    const file = item.file.toLowerCase().replace(applicationPath, '');
    return /*#__PURE__*/React.createElement("li", {
      className: "ds-notification__list-item",
      onClick: openSource
    }, /*#__PURE__*/React.createElement(_code.DsIcon, {
      className: icon,
      icon: icon
    }), /*#__PURE__*/React.createElement("div", {
      className: "item__information"
    }, /*#__PURE__*/React.createElement("span", {
      className: "item__title"
    }, item.message), /*#__PURE__*/React.createElement("div", {
      className: "item__data"
    }, /*#__PURE__*/React.createElement("strong", null, texts.item.file), /*#__PURE__*/React.createElement("span", {
      className: "name-file"
    }, file)), /*#__PURE__*/React.createElement("div", {
      className: "item__data"
    }, /*#__PURE__*/React.createElement("strong", null, texts.item.line), /*#__PURE__*/React.createElement("span", {
      className: "number-line"
    }, item.line))));
  }
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: item.js
  ************/


  class NotificationModel {
    _id;

    get id() {
      return this._id;
    }

    _count = 1;

    get count() {
      return this._count;
    }

    _type;

    get type() {
      return this._type;
    }

    _message;

    get message() {
      return this._message;
    }

    _character;

    get character() {
      return this._character;
    }

    _file;

    get file() {
      return this._file;
    }

    _line;

    get line() {
      return this._line;
    }

    set total(value) {
      this._total = value;
    }

    _bundle;

    get bundle() {
      return this._bundle;
    }

    _module;

    get module() {
      return this._module;
    }

    _application;

    get application() {
      return this._application;
    }

    constructor(item, specs) {
      this._module = specs?.module;
      this._bundle = specs?.bundle;
      this._application = specs?.application;

      for (let key in item) {
        if (!item.hasOwnProperty(key)) {
          return;
        }

        this[`_${key}`] = item[key];
      }
    }

    getters() {
      return {
        id: this.id,
        count: this.count,
        type: this.type,
        message: this.message,
        character: this.character,
        file: this.file,
        line: this.line,
        bundle: this.bundle,
        module: this.module,
        application: this.application
      };
    }

  }
  /*************
  FILE: model.js
  *************/


  const DSNotifications = new class extends _js.ReactiveModel {
    get count() {
      return this._notifications.size;
    }
    /**
     * Map con las notificaciones agrupadas para mostrar
     * los  keys son los ids de las notificaciones
     * @type {Map<any, any>}
     * @private
     */


    _notifications = new Map();

    get notifications() {
      return this._notifications;
    }
    /**
     * Map con todas las notificaciones en detalle
     * los  keys son los ids de las notificaciones
     * @type {Map<any, any>}
     * @private
     */


    _items = new Map();

    get items() {
      return this._items;
    }
    /**
     * Mapa donde cada entrada es un Set con los ids de las notificaciones
     * Los keys van por ID de Aplicacion, Modulo, Bundle, Processor, o Diagnostic de un Procesador
     * @type {Map<any, any>}
     * @private
     */


    _recent = new Map();

    get recent() {
      return this._recent;
    }
    /**
     * Set con los ids de cada notificador activo
     * notificador = Aplicacion o Modulo
     * @type {Set<any>}
     * @private
     */


    _identifiers = new Set();

    get identifiers() {
      return this._identifiers;
    }

    get ready() {
      return module?.texts?.ready;
    }

    get texts() {
      return module?.texts?.value;
    }

    #unread;

    get unread() {
      return this.#unread;
    }

    constructor() {
      super();
      module.texts.bind('change', this.triggerEvent);
    }

    _add(notification, specs) {
      if (this._items.has(notification.id)) return;
      const item = new NotificationModel(notification, specs);
      this.items.set(item.id, item);
    }

    _delete(id) {
      if (!this._items.has(id)) return;
      this.items.delete(id);
    }

    _register(notifications, specs) {
      if (!notifications.length) return;
      const recent = new Set();
      notifications.forEach(notification => {
        this._add(notification, specs); //add to items


        recent.add(notification.id); // prepare to add on recent
      });
      this.recent.set(specs.id, recent); //add Id on recent

      const id = specs.module?.id ?? specs.application.id;

      this._identifiers.add(id); //add on identifiers


      this.setNotifications();
    }

    _update(notifications, specs) {
      const recent = this.recent.get(specs.id);
      const ids = notifications.map(item => item.id); //Removemos los recientes que no vengan en las notificaciones nuevas

      [...recent.keys()].forEach(item => {
        !ids.includes(item) && recent.delete(item) && this._delete(item);
      });
      /**
       * Agregamos a los recientes las notificaciones nuevas
       * Agregamos a las notificaciones las que vienen nuevas
       */

      notifications.forEach(item => !recent.has(item.id) && recent.add(item.id) && this._add(item, specs));
      this.recent.set(specs.id, recent); //Actualizamos el mapa de recientes

      const id = specs.module?.id ?? specs.application.id;

      this._identifiers.add(id); //add on identifiers


      this.setNotifications();
    }

    notify() {
      this.#unread = true;
      this.triggerEvent();
    }

    setNotifications() {
      this.notifications.clear();
      this.recent.forEach((recent, key) => {
        const iterator = recent.values().next().value;

        if (!iterator) {
          return;
        }

        const moduleId = key.split('//').slice(0, 3).join('//');

        if (this.notifications.has(moduleId)) {
          const get = this.notifications.get(moduleId);
          const params = {
            count: get.count + recent.size
          };
          this.notifications.set(moduleId, new NotificationModel({ ...get.getters(),
            ...params
          }));
          this.notify();
          return;
        }

        const item = this.items.get(iterator);

        if (recent.size === 1) {
          this.notifications.set(moduleId, item);
          this.notify();
          return;
        }

        const params = {
          id: item.module.id,
          count: recent.size,
          type: `group-${item.module.name}`,
          message: `Errors on module ${item.module.name}`
        };
        this.notifications.set(moduleId, new NotificationModel({ ...item.getters(),
          ...params
        }));
        this.notify();
      });
    }

    register(notifications, specs) {
      window.notifications = this; //No hay notificaciones, limpiamos los mapas

      if (!notifications || notifications instanceof Array && !notifications.length) {
        if (!this.recent.has(specs.id)) return;
        const toDelete = this.recent.get(specs.id);
        toDelete.forEach(item => this._delete(item));
        this.recent.delete(specs.id);
        const id = specs.module?.id ?? specs.application.id;

        this._identifiers.delete(id); //remove on identifiers


        this.setNotifications();
        this.triggerEvent();
        return;
      } //Notificaciones Generales


      if (notifications instanceof Array) {
        const method = !this.recent.has(specs.id) ? '_register' : '_update';
        this[method](notifications, specs);
        this.triggerEvent();
        return;
      }
      /**
       * Notificaciones de tipo Diagnostics
       * general: []
       * files, overwrites, dependencies: Map()
       */


      const {
        general,
        files,
        overwrites,
        dependencies
      } = notifications;
      const method = !this.recent.has(specs.id) ? '_register' : '_update';
      this[method](general, specs);
      files.forEach((entries, key) => this[method](entries, specs));
      overwrites.forEach((entries, key) => this[method](entries, specs));
      dependencies.forEach((entries, key) => this[method](entries, specs));
      this.triggerEvent();
    }

  }();
  /**********
  SCSS STYLES
  **********/

  _exports.DSNotifications = DSNotifications;
  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.ds-notification__container .ds-notification__badge{position:absolute;top:10px;right:10px;width:10px;height:10px;background:#d2281e;color:#fff;display:flex;justify-content:center;align-items:center;border-radius:50%}.dashboard-layout .ds-toolbar .ds-notification__list{position:absolute;top:3.8rem;max-width:350px;right:0;background-color:#000;border:1px solid #121f36;overflow:hidden;z-index:9;display:none;width:100%;transition:.3s ease-in all;border-radius:5px}.dashboard-layout .ds-toolbar .ds-notification__list header{padding:5px 15px}.dashboard-layout .ds-toolbar .ds-notification__list header .title{color:#313c50}.dashboard-layout .ds-toolbar .ds-notification__list.is-opened{display:flex;flex-direction:column}.ds-notification__container .empty__item{display:grid;justify-items:center;color:#5e5f5c}.ds-notification__container .empty__item span{display:grid;padding:15px}.dashboard-layout .ds-toolbar .group-items-toolbar .ds-notification__container{height:100%}.dashboard-layout .ds-toolbar .group-items-toolbar .ds-notification__container .ds-notification__button__container{position:relative;display:flex;align-items:center;justify-content:center;justify-items:center;border:none;height:100%;outline:0;text-align:center;padding:0 10px 0 15px;cursor:pointer}.dashboard-layout .ds-toolbar .group-items-toolbar .ds-notification__container .ds-notification__button__container.is-opened{background:rgba(5,9,16,.8)}.dashboard-layout .ds-toolbar .group-items-toolbar .ds-notification__container .ds-notification__button__container .beyond-icon{fill:#FFFFFF;transition:all .3s ease-in}.dashboard-layout .ds-toolbar .group-items-toolbar .ds-notification__container .ds-notification__button__container.list--unread .beyond-icon{fill:#A2000A}.dashboard-layout .ds-toolbar .ds-notification__container .ds-notification__list-item{height:auto;text-decoration-line:none;display:flex;align-items:center;transition:background .5s;cursor:pointer;padding:15px;border-top:1px solid #313c50}.dashboard-layout .ds-toolbar .ds-notification__container .ds-notification__list-item svg{height:3rem;width:3rem;fill:#D2281E}.dashboard-layout .ds-toolbar .ds-notification__container .ds-notification__list-item .error{fill:#D2281E}.dashboard-layout .ds-toolbar .ds-notification__container .ds-notification__list-item .warning{fill:#F7C700}.dashboard-layout .ds-toolbar .ds-notification__container .ds-notification__list-item .icon-button{margin-right:.5rem}.dashboard-layout .ds-toolbar .ds-notification__container .ds-notification__list-item .icon-button:hover{filter:none}.dashboard-layout .ds-toolbar .ds-notification__container .ds-notification__list-item:hover{background:rgba(255,128,86,.3)}.dashboard-layout .ds-toolbar .ds-notification__container .ds-notification__list-item .icon-right{margin-left:auto}.dashboard-layout .ds-toolbar .ds-notification__container .ds-notification__list-item .item__title{text-transform:uppercase;font-size:.9rem}.dashboard-layout .ds-toolbar .ds-notification__container .ds-notification__list-item .item__information{display:flex;justify-content:space-between;width:90%;flex-direction:column;flex-wrap:wrap;padding-left:1rem}.dashboard-layout .ds-toolbar .ds-notification__container .ds-notification__list-item .item__data{display:flex;gap:10px;max-width:100%;overflow:hidden}.ds-notification__list ul{padding:0;list-style:none;margin:0}';
  bundle.styles.appendToDOM();
});