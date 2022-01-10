define(["exports", "react", "react-dom", "@beyond-js/dashboard-lib/models/js", "@beyond-js/dashboard/core-components/code", "@beyond-js/dashboard/hooks/code", "@beyond-js/dashboard/ds-contexts/code", "@beyond-js/dashboard/models/code"], function (_exports, React, ReactDOM, _js, _code, _code2, _code3, _code4) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.DsNotificationContext = _exports.DSNotifications = void 0;
  _exports.NotificationPanel = NotificationPanel;
  _exports.NotificationsPanel = NotificationsPanel;
  _exports.useDsNotificationContext = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/ds-notifications/code', false, {
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

  /******
  box.jsx
  ******/


  function BoxNotifications({
    toggle
  }) {
    const {
      items,
      texts
    } = useDsNotificationContext();
    const cls = `ds-notification__list ${toggle ? 'is-opened' : ''}`;
    return /*#__PURE__*/React.createElement("div", {
      className: cls
    }, /*#__PURE__*/React.createElement(ApplicationsPanel, null), /*#__PURE__*/React.createElement(NotificationsPanel, null));
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
    }, /*#__PURE__*/React.createElement(_code.DSIcon, {
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
  /*******************
  item\application.jsx
  *******************/


  function ApplicationItem({
    item
  }) {
    return /*#__PURE__*/React.createElement("div", null, item.message, ";");
  }
  /**************
  item\bundle.jsx
  **************/


  function BundleItem({
    item
  }) {
    return /*#__PURE__*/React.createElement("div", null, item.message, ";");
  }
  /***************
  item\default.jsx
  ***************/


  function DefaultItem({
    item
  }) {
    return /*#__PURE__*/React.createElement("div", null, item.message, ";");
  }
  /***************
  item\factory.jsx
  ***************/


  function FactoryItem({
    item
  }) {
    const TYPES = {
      application: ApplicationItem,
      module: ModuleItem,
      bundle: BundleItem,
      source: SourceItem,
      default: DefaultItem
    };
    const Control = TYPES.hasOwnProperty(item.type) ? TYPES[item.type] : TYPES.default;
    return /*#__PURE__*/React.createElement("div", {
      className: "ds-notification__list-item"
    }, /*#__PURE__*/React.createElement(Control, {
      item: item
    }));
  }
  /**************
  item\module.jsx
  **************/


  function ModuleItem({
    item
  }) {
    return /*#__PURE__*/React.createElement("div", null, item.message, ";");
  }
  /**************
  item\source.jsx
  **************/


  function SourceItem({
    item
  }) {
    return /*#__PURE__*/React.createElement("div", null, item.message);
  }
  /**********************
  panels\applications.jsx
  **********************/


  function ApplicationsPanel() {
    const model = DSNotifications;
    const {
      texts
    } = useDsNotificationContext();
    const {
      workspace
    } = (0, _code3.useDSWorkspaceContext)();
    const output = [];
    model.applications.forEach(item => {
      const {
        application
      } = item;

      const openApp = () => workspace.openApp(application.id);

      output.push( /*#__PURE__*/React.createElement("li", {
        key: application.id,
        onClick: openApp
      }, /*#__PURE__*/React.createElement("span", {
        className: "item__name"
      }, application.name ?? texts.projects.noName), /*#__PURE__*/React.createElement("div", {
        className: "item__detail"
      }, /*#__PURE__*/React.createElement("span", {
        className: "label"
      }, texts.projects.scanned), /*#__PURE__*/React.createElement("span", {
        className: "detail"
      }, item.processed, "/", item.total))));
    });
    return /*#__PURE__*/React.createElement("div", {
      className: "ds-resume ds-resume__panel ds-resume__panel--projects"
    }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("span", {
      className: "title"
    }, texts.projects.title)), /*#__PURE__*/React.createElement("ul", null, output));
  }
  /***********************
  panels\notifications.jsx
  ***********************/


  function NotificationsPanel() {
    const {
      items,
      texts
    } = useDsNotificationContext();
    const output = [];
    items.forEach(item => output.push( /*#__PURE__*/React.createElement(FactoryItem, {
      key: `${item.applicationId}-error-${item.id}`,
      item: item
    })));
    return /*#__PURE__*/React.createElement(React.Fragment, null, output.length ? /*#__PURE__*/React.createElement("ul", null, output) : /*#__PURE__*/React.createElement(EmptyNotifications, null));
  }
  /***********
  JS PROCESSOR
  ***********/

  /*************************
  FILE: notification\item.js
  *************************/


  class ItemNotificationModel extends _js.ReactiveModel {
    _id;

    get id() {
      return this._id;
    }

    get data() {
      return this._data;
    }

    get type() {
      return "application";
    }

    constructor(data) {
      super();
      this._data = data;
      this._id = data.id;
    }

  }
  /*****************************
  FILE: listeners\application.js
  *****************************/


  class ApplicationListener extends _js.ReactiveModel {
    #app;
    #model;
    #maps = {
      errors: new Map(),
      warnings: new Map()
    };

    get errors() {
      return this.#maps.errors;
    }

    get warnings() {
      return this.#maps.warnings;
    }

    get name() {
      return this.#model.application?.name;
    }

    get id() {
      return this.#model.id;
    }

    get application() {
      return this.#model.application;
    }

    get processed() {
      return this.#model.moduleManager.processed;
    }

    get total() {
      return this.#model.moduleManager.total;
    }

    constructor(app) {
      super();

      const model = _code4.applicationsFactory.get(app.id);

      this.#model = model;
      model.bind('change', this.listener);
    }

    get items() {
      return Array.from(this.#maps.errors.values()).concat(Array.from(this.#maps.warnings.values()));
    }

    listener = () => {
      let change = false;

      const clean = (type, id) => {
        const property = type === 'errors' ? this.#model.errors : this.#model.warnings;
        type = type === 'errors' ? 'errors' : 'warnings';
        const exists = property.find(error => error.id === id);
        if (exists) this.#maps[type].delete(id);
        change = true;
      };

      const set = (type, element) => {
        type = type === 'errors' ? 'errors' : 'warnings';
        if (this.#maps[type].has(element.id)) return;
        this.#maps[type].set(element.id, new ApplicationItemModel(element, this.#model));
        change = true;
      };

      Array.from(this.#maps.errors.keys()).forEach(id => clean('errors', id));
      this.#model.errors.forEach(error => set('errors', error));
      Array.from(this.#maps.warnings.keys()).forEach(id => clean('warnings', id));
      this.#model.warnings.forEach(warnings => set('warnings', warnings));

      if (change) {
        this.triggerEvent();
      }
    };
  }
  /*************
  FILE: model.js
  *************/


  const DSNotifications = new class extends _js.ReactiveModel {
    /**
     * Map con las notificaciones agrupadas para mostrar
     * los  keys son los ids de las notificaciones
     * @type {Map<any, any>}
     * @private
     */
    #notifications = new Map();

    get notifications() {
      return this.#notifications;
    }
    /**
     * Map con todas las notificaciones en detalle
     * los  keys son los ids de las notificaciones
     * @type {Map<any, any>}
     * @private
     */


    #items = new Map();

    get items() {
      return this.#items;
    }

    get ready() {
      return module?.texts?.ready;
    }

    get texts() {
      return module?.texts?.value;
    }

    #applications = new Map();

    get applications() {
      return this.#applications;
    }

    #unread;

    get unread() {
      return this.#unread;
    }

    get items() {
      let items = [];
      this.#applications.forEach(app => {
        items = items.concat(app.items);
      });
      return items;
    }

    constructor() {
      super();
      module.texts.bind('change', this.triggerEvent);
    }

    start(applications) {
      applications.forEach(app => {
        if (this.#applications.has(app.id)) return;
        const listener = new ApplicationListener(app);
        this.#applications.set(app.id, listener);
        listener.bind('change', this.triggerEvent);
      });
    }

  }();
  /********************************
  FILE: notification\application.js
  ********************************/

  _exports.DSNotifications = DSNotifications;

  class ApplicationItemModel extends ItemNotificationModel {
    get message() {
      const message = this.data.message.replace(this.application.pathname, '');
      return message;
    }

    #application;

    get application() {
      return this.#application;
    }

    constructor(data, application) {
      super(data);
      this.#application = application;
    }

  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.ds-notification__container .ds-notification__badge{position:absolute;top:10px;right:10px;width:10px;height:10px;background:#d2281e;color:#fff;display:flex;justify-content:center;align-items:center;border-radius:50%}.dashboard-layout .ds-toolbar .ds-notification__list{position:absolute;top:3.8rem;max-width:350px;right:0;background-color:#000;border:1px solid #121f36;overflow:hidden;z-index:9;display:none;width:100%;transition:.3s ease-in all;border-radius:5px}.dashboard-layout .ds-toolbar .ds-notification__list.is-opened{display:flex;flex-direction:column}.ds-notification__container .empty__item{display:grid;justify-items:center;color:#5e5f5c}.ds-notification__container .empty__item span{display:grid;padding:15px}.dashboard-layout .ds-toolbar .group-items-toolbar .ds-notification__container{height:100%}.dashboard-layout .ds-toolbar .group-items-toolbar .ds-notification__container .ds-notification__button__container{position:relative;display:flex;align-items:center;justify-content:center;justify-items:center;border:none;height:100%;outline:0;text-align:center;padding:0 10px 0 15px;cursor:pointer}.dashboard-layout .ds-toolbar .group-items-toolbar .ds-notification__container .ds-notification__button__container.is-opened{background:rgba(5,9,16,.8)}.dashboard-layout .ds-toolbar .group-items-toolbar .ds-notification__container .ds-notification__button__container .beyond-icon{fill:#FFFFFF;transition:all .3s ease-in}.dashboard-layout .ds-toolbar .group-items-toolbar .ds-notification__container .ds-notification__button__container.list--unread .beyond-icon{fill:#A2000A}.dashboard-layout .ds-toolbar .ds-notification__container .ds-notification__list-item{height:auto;text-decoration-line:none;display:flex;align-items:center;transition:background .5s;cursor:pointer;padding:15px;border-top:1px solid #313c50}.dashboard-layout .ds-toolbar .ds-notification__container .ds-notification__list-item svg{height:3rem;width:3rem;fill:#D2281E}.dashboard-layout .ds-toolbar .ds-notification__container .ds-notification__list-item .error{fill:#D2281E}.dashboard-layout .ds-toolbar .ds-notification__container .ds-notification__list-item .warning{fill:#F7C700}.dashboard-layout .ds-toolbar .ds-notification__container .ds-notification__list-item .icon-button{margin-right:.5rem}.dashboard-layout .ds-toolbar .ds-notification__container .ds-notification__list-item .icon-button:hover{filter:none}.dashboard-layout .ds-toolbar .ds-notification__container .ds-notification__list-item:hover{background:rgba(255,128,86,.3)}.dashboard-layout .ds-toolbar .ds-notification__container .ds-notification__list-item .icon-right{margin-left:auto}.dashboard-layout .ds-toolbar .ds-notification__container .ds-notification__list-item .item__title{text-transform:uppercase;font-size:.9rem}.dashboard-layout .ds-toolbar .ds-notification__container .ds-notification__list-item .item__information{display:flex;justify-content:space-between;width:90%;flex-direction:column;flex-wrap:wrap;padding-left:1rem}.dashboard-layout .ds-toolbar .ds-notification__container .ds-notification__list-item .item__data{display:flex;gap:10px;max-width:100%;overflow:hidden}.ds-notification__list ul{padding:0;list-style:none;margin:0}.ds-resume.ds-resume__panel{padding:15px}.ds-resume.ds-resume__panel header .title{padding:0;text-transform:uppercase;color:#a2000a}.ds-resume.ds-resume__panel.ds-resume__panel--projects li{display:flex;justify-content:space-between;padding:2px 0;cursor:pointer}.ds-resume.ds-resume__panel.ds-resume__panel--projects li:hover{color:#f7c700}.ds-resume.ds-resume__panel.ds-resume__panel--projects li .item__detail .label{padding:0 10px}';
  bundle.styles.appendToDOM();
});