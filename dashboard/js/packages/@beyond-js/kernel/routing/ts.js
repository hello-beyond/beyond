define(["exports", "@beyond-js/kernel/core/ts"], function (_exports2, dependency_0) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.routing = _exports2.PageContainer = _exports2.LayoutContainer = _exports2.IContainerControl = void 0;
  const dependencies = new Map();
  dependencies.set('@beyond-js/kernel/core/ts', dependency_0);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/kernel/routing/ts', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const modules = new Map(); // FILE: config\config.ts

  modules.set('./config/config', {
    hash: 539937088,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.RoutingConfig = void 0;

      const pages_1 = require("./pages");

      const layouts_1 = require("./layouts");

      class RoutingConfig {
        #layouts = new layouts_1.LayoutsConfig();

        get layouts() {
          return this.#layouts;
        }

        #pages = new pages_1.PagesConfig();

        get pages() {
          return this.#pages;
        }

      }

      exports.RoutingConfig = RoutingConfig;
    }
  }); // FILE: config\layouts.ts

  modules.set('./config/layouts', {
    hash: 1325939906,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.LayoutsConfig = exports.LayoutConfig = void 0;

      class LayoutConfig {
        #name;

        get name() {
          return this.#name;
        }

        #bundle;

        get bundle() {
          return this.#bundle;
        }

        constructor(config) {
          if (!config) {
            this.#name = 'default';
            this.#bundle = '';
            return;
          }

          this.#name = config.name;
          this.#bundle = config.bundle;
        }

      }

      exports.LayoutConfig = LayoutConfig;

      class LayoutsConfig {
        #layouts = {};

        register(layouts) {
          for (const layout of layouts) {
            this.#layouts[layout.name] = new LayoutConfig(layout);
          }
        }

        get(name) {
          return this.#layouts[name];
        }

        has(name) {
          return this.#layouts.hasOwnProperty(name);
        }

      }

      exports.LayoutsConfig = LayoutsConfig;
    }
  }); // FILE: config\pages.ts

  modules.set('./config/pages', {
    hash: 198396567,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.PagesConfig = exports.PageConfig = void 0;

      class PageConfig {
        #route;

        get route() {
          return this.#route;
        }

        #bundle;

        get bundle() {
          return this.#bundle;
        }

        #layout;

        get layout() {
          return this.#layout;
        }

        #vdir;

        get vdir() {
          return this.#vdir;
        }

        constructor(page) {
          this.#route = page.route;
          this.#bundle = page.bundle;
          this.#layout = page.layout;
          this.#vdir = page.vdir;
        }

      }

      exports.PageConfig = PageConfig;

      class PagesConfig {
        #pages = {};

        register(pages) {
          for (const page of pages) {
            this.#pages[page.route] = new PageConfig(page);
          }
        }

        get(name) {
          return this.#pages[name];
        }

        has(name) {
          return this.#pages.hasOwnProperty(name);
        }

      }

      exports.PagesConfig = PagesConfig;
    }
  }); // FILE: history\history.ts

  modules.set('./history/history', {
    hash: 1392004946,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.BeyondHistory = void 0;

      const position_1 = require("./position");

      const records_1 = require("./records");
      /**
       * Beyond keeps its own history list
       * @constructor
       */


      class BeyondHistory {
        #events;
        #position;
        #records;
        #initial = history.length;

        get initial() {
          return this.#initial;
        }

        get records() {
          return this.#records.data;
        }

        get length() {
          return this.#records.length;
        }

        get position() {
          return this.#position.value;
        }

        get current() {
          return this.#records.current;
        }

        get previous() {
          return this.#records.previous;
        }

        get following() {
          return this.#records.following;
        }

        #push = (url, state) => {
          if (!url || !state) throw new Error('Invalid parameters');
          this.#records.resetFromPosition();
          this.#records.push(url);
          this.#position.updateState(state, this.#records.length);
        };
        #processUrl = url => {
          const routing = require('../routing').routing;

          const RoutingModeEnum = require('../routing').RoutingMode;

          url = url.startsWith('/') ? url : `/${url}`;
          url = routing.mode === RoutingModeEnum.Hash ? `#${url}` : url;
          return url;
        };

        replaceState(state, title, url) {
          state = state ? state : {};
          if (typeof state !== 'object') throw new Error('Invalid state parameter');
          if (!this.#position.checkStateIsSet) return;
          this.#position.updateState(state);
          this.#records.updateCurrentUrl(url);
          history.replaceState(state, title, this.#processUrl(url));
        }

        pushState(url, state) {
          state = state ? state : {};
          if (typeof state !== 'object') throw new Error('Invalid state parameter');
          this.#push(url, state);
          history.pushState(state, null, this.#processUrl(url));
        }

        constructor(events) {
          this.#events = events;
          this.#position = new position_1.HistoryPosition(this.#events);
          this.#records = new records_1.HistoryRecords(this.#position);
          window.addEventListener('popstate', () => this.#position.updateSessionStorageFromState()); // When the position in the sessionStorage is not set, it is the first navigation on the tab
          // When the history.state position is not set, it is when the user refreshes the page

          if (!this.#position.getFromSessionStorage() || !this.#position.getFromState()) {
            let url = location.protocol === 'file:' ? location.href.substr(location.pathname.length + 7) : // file:// -> 7 chars
            location.href.substr(location.origin.length);
            url = !url ? '/' : url; // First page navigation on start up

            const state = history.state ? history.state : {};
            this.#push(url, state);
            history.replaceState(state, null);
          }

          this.#position.updateSessionStorageFromState();
        }

      }

      exports.BeyondHistory = BeyondHistory;
    }
  }); // FILE: history\position.ts

  modules.set('./history/position', {
    hash: 3297864936,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.HistoryPosition = void 0;
      /**
       * The position of the navigation is stored this way:
       *      1. In the state of each page (the history.state object), it is stored the position
       *         in which the page is located. To achieve this, the __beyond_navigation_position property
       *         is added to the state object.
       *      2. In the sessionStorage is stored the current position (__beyond_navigation_position)
       */

      class HistoryPosition {
        #events;

        constructor(events) {
          this.#events = events;
        }

        #ERROR_INVALID_STATE = 'History state is not defined. ' + 'This happen when state is changed outside the beyond defined navigation flows.';
        #valid = true;

        get valid() {
          return this.#valid;
        }
        /**
         * Returns the position from the history.state
         * @returns {number | undefined}
         */


        get value() {
          const position = history.state ? history.state.__beyond_navigation_position : undefined;
          return this.checkStateIsSet ? position : undefined;
        }
        /**
         * Check if the position is already stored in the history.state.
         * If it is not, then an error message is shown.
         *
         * @returns {boolean}
         */


        get checkStateIsSet() {
          if (!this.#valid) return false;
          const position = history.state ? history.state.__beyond_navigation_position : undefined;
          position === undefined && console.error(this.#ERROR_INVALID_STATE);
          this.#valid = this.#valid && position !== undefined;
          position !== undefined && this.#events.trigger('error');
          return position !== undefined;
        }
        /**
         * Set the position in the history.state
         *
         * @param state {any} The state object before being stored in the history.state. In this method
         * the state object will be updated to store the position
         * @param {number} position
         */


        updateState(state, position) {
          if (typeof state !== 'object') {
            throw new Error('Parameter state must be an object');
          }

          state.__beyond_navigation_position = position === undefined ? history.state.__beyond_navigation_position : position;
        }
        /**
         * Stores in the sessionStorage the position getting its value from the history.state
         */


        updateSessionStorageFromState() {
          if (!this.checkStateIsSet) return;
          const position = history.state ? history.state.__beyond_navigation_position : undefined;
          sessionStorage.setItem('__beyond_navigation_position', position);
        }
        /**
         * Returns the position of the navigation flow from the sessionStorage
         * @returns {string}
         */


        getFromSessionStorage() {
          const position = sessionStorage.getItem('__beyond_navigation_position');
          return typeof position === 'string' ? parseInt(position) : undefined;
        }
        /**
         * Returns the position of the navigation flow from the history.state.
         * It is equivalent to obtaining this same value directly from the .state property,
         * with the difference that the .state property verifies that the value is stored
         * and displays an error if it is not
         * @returns {any}
         */


        getFromState = () => history.state ? history.state.__beyond_navigation_position : undefined;
      }

      exports.HistoryPosition = HistoryPosition;
    }
  }); // FILE: history\records.ts

  modules.set('./history/records', {
    hash: 587652707,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.HistoryRecords = void 0;

      class HistoryRecords {
        #position;
        #records = [];

        get data() {
          return this.#records.slice();
        }

        get length() {
          return this.#records.length;
        }

        get current() {
          return this.#records[this.#position.value - 1];
        }

        get previous() {
          return this.#records[this.#position.value - 2];
        }

        get following() {
          return this.#records[this.#position.value];
        }

        constructor(position) {
          this.#position = position;

          try {
            let stored = sessionStorage.getItem('__beyond_navigation_records');
            stored = JSON.parse(stored);
            this.#records = stored instanceof Array ? stored : [];
          } catch (exc) {
            console.error('Error loading beyond navigation state', exc instanceof Error ? exc.stack : exc);
            this.#records = [];
          }
        }

        get = index => this.#records[index];
        /**
         * Push a url to the records stored in the sessionStorage
         * @param {string} url
         */

        push(url) {
          this.#records.push(url);
          sessionStorage.setItem('__beyond_navigation_records', JSON.stringify(this.#records));
          const position = this.#records.length.toString();
          sessionStorage.setItem('__beyond_navigation_position', position);
        }

        /**
         * Reset the list of records from the current position
         * This is required when:
         *      1. The list of browsed pages is greater than one (ex: page1 and page2)
         *      2. The user goes back in the history (ex: to position 1: page1)
         *      3. The user navigates another page (ex: page3)
         *
         * In step 3 is required this method, to clean the records from position 1, and after this
         * execution, the navigation flow can push page3
         */
        resetFromPosition() {
          const position = this.#position.getFromSessionStorage();
          position && position < this.#records.length ? this.#records = this.#records.slice(0, position) : null;
        }

        updateCurrentUrl(url) {
          const position = this.#position.getFromSessionStorage();
          this.#records[position - 1] = url;
          sessionStorage.setItem('__beyond_navigation_records', JSON.stringify(this.#records));
        }

      }

      exports.HistoryRecords = HistoryRecords;
    }
  }); // FILE: layouts\abstract-classes\layouts\layout.ts

  modules.set('./layouts/abstract-classes/layouts/layout', {
    hash: 1360728010,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.LayoutContainer = void 0;

      const ts_1 = require("@beyond-js/kernel/core/ts");

      class LayoutContainer extends ts_1.Events {
        #layoutManager;

        get container() {
          return this.#layoutManager.container;
        }

        constructor(layoutManager) {
          super();
          this.#layoutManager = layoutManager;
        }

        rendered = () => this.#layoutManager.rendered();
      }

      exports.LayoutContainer = LayoutContainer;
    }
  }); // FILE: layouts\abstract-classes\layouts\legacy.ts

  modules.set('./layouts/abstract-classes/layouts/legacy', {
    hash: 2180641383,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.LayoutLegacy = void 0;
      /**
       * It is required to allow backward compatibility
       * The reason why it exists is because the layout manager creates an instance of the Layout
       * and sets the Layout (LayoutLegacy in fact) as a prototype, and the private
       * properties of Layout doesn't work under this design, the LayoutLegacy solves this issue
       */

      const layout_1 = require("./layout");

      class LayoutLegacy {
        base;
        on = (event, listener) => this.base.on(event, listener);
        off = (event, listener) => this.base.off(event, listener);
        bind = (event, listener) => this.base.bind(event, listener);
        unbind = (event, listener) => this.base.unbind(event, listener);

        constructor(layoutManager) {
          this.base = new layout_1.LayoutContainer(layoutManager);
        }

        get container() {
          return this.base.container;
        }

        rendered = () => this.base.rendered();
      }

      exports.LayoutLegacy = LayoutLegacy;
    }
  }); // FILE: layouts\abstract-classes\pages\legacy.ts

  modules.set('./layouts/abstract-classes/pages/legacy', {
    hash: 1713806598,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.PageLegacy = void 0;
      /**
       * It is required to allow backward compatibility
       * The reason why it exists is because the page manager creates an instance of the Page
       * and sets the Page (PageLegacy in fact) as a prototype, and the private
       * properties of Page doesn't work under this design, the PageLegacy solves this issue
       */

      const page_container_1 = require("./page-container");

      class PageLegacy {
        base;

        constructor(pageManager) {
          this.base = new page_container_1.PageContainer(pageManager);
        }

        get container() {
          return this.base.container;
        }

        get route() {
          return this.base.route;
        }

        get pathname() {
          return this.base.pathname;
        }

        get vdir() {
          return this.base.vdir;
        }

        get search() {
          return this.base.search;
        }

        get qs() {
          return this.base.qs;
        }

        get querystring() {
          return this.base.qs;
        }

      }

      exports.PageLegacy = PageLegacy;
    }
  }); // FILE: layouts\abstract-classes\pages\page-container.ts

  modules.set('./layouts/abstract-classes/pages/page-container', {
    hash: 3651745821,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.PageContainer = void 0;

      class PageContainer {
        #container;

        get container() {
          return this.#container;
        }

        #pageManager;

        get route() {
          return this.#pageManager.uri.route;
        }

        get pathname() {
          return this.#pageManager.uri.pathname;
        }

        get vdir() {
          return this.#pageManager.uri.route.vdir;
        }

        get search() {
          return this.#pageManager.uri.search;
        }

        get qs() {
          return this.#pageManager.uri.qs;
        }

        get querystring() {
          return this.#pageManager.uri.qs;
        }

        constructor(pageManager) {
          this.#pageManager = pageManager;
          const element = document.createElement('div');
          const container = pageManager.pagesContainer instanceof HTMLDivElement ? pageManager.pagesContainer : pageManager.pagesContainer.current;
          container.appendChild(element);
          this.#container = element;
        }

        destroy() {
          this.#container.remove();
        }

      }

      exports.PageContainer = PageContainer;
    }
  }); // FILE: layouts\layout-manager\layout-manager.ts

  modules.set('./layouts/layout-manager/layout-manager', {
    hash: 480716395,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.LayoutManager = void 0;

      const pages_1 = require("./pages/pages");

      const load_1 = require("./load");

      const ts_1 = require("@beyond-js/kernel/core/ts");

      const layouts_1 = require("../../config/layouts");

      class LayoutManager extends layouts_1.LayoutConfig {
        #pages;

        get pages() {
          return this.#pages;
        }

        #container;

        get container() {
          return this.#container;
        }

        #loader = new load_1.LayoutLoader(this);
        load = async () => this.name === 'default' ? null : this.#loader.load();

        get loaded() {
          return this.name === 'default' ? true : this.#loader.loaded;
        }

        get error() {
          return this.name === 'default' ? false : this.#loader.error;
        }

        get layout() {
          return this.name === 'default' ? undefined : this.#loader.layout;
        } // If the layout is the "default", then the container of the pages is directly the
        // layout of the container


        get pagesContainer() {
          return this.name === 'default' ? this.#container : this.#loader.pagesContainer;
        }

        #rendered = new ts_1.PendingPromise();
        rendered = () => this.#rendered.resolve();

        get ready() {
          return this.name === 'default' ? true : this.#rendered;
        }

        #config = {
          timing: 300,
          css: {
            hiding: 'hiding-layout-container',
            hide: 'hide-layout-container',
            showing: 'showing-layout-container',
            show: 'showed-layout-container'
          }
        };

        constructor(name, routingConfig) {
          super(routingConfig.layouts.has(name) ? routingConfig.layouts.get(name) : undefined);
          if (this.name === 'default') this.rendered();
          this.#pages = new pages_1.Pages(this, routingConfig);
          const container = 'body > .layouts-container';
          const element = document.createElement('div');
          this.#container = document.querySelector(container).appendChild(element);
        }

        #cancellationToken = new ts_1.CancellationToken();

        async show(uri) {
          const cancellationTokenId = this.#cancellationToken.reset();
          await this.load();
          if (!this.#cancellationToken.check(cancellationTokenId)) return;
          if (this.error) return;
          await this.ready;
          if (!this.#cancellationToken.check(cancellationTokenId)) return;
          const config = this.#config;
          const container = this.container;
          container.classList.add(config.css.show);
          await new Promise(resolve => setTimeout(resolve, config.timing));
          if (!this.#cancellationToken.check(cancellationTokenId)) return; //TODO: @box check it out.
          //container.classList.contains(config.css.show) && container.classList.remove(config.css.show);

          container.classList.contains(config.css.hide) && container.classList.remove(config.css.hide);
          container.classList.add(config.css.show); // Layout is undefined if the layout is the "default"

          if (this.layout && typeof this.layout.show === 'function') {
            await this.layout.show();
          }

          await this.#pages.show(uri);
        }

        async hide() {
          const cancellationTokenId = this.#cancellationToken.reset();
          await this.load();
          if (!this.#cancellationToken.check(cancellationTokenId)) return;
          if (this.error) return;
          await this.ready;
          if (!this.#cancellationToken.check(cancellationTokenId)) return;
          const config = this.#config;
          const container = this.container;
          container.classList.contains(config.css.show) && container.classList.remove(config.css.show);
          container.classList.add(config.css.hide); // Layout is undefined if the layout is the "default"

          if (this.layout && typeof this.layout.hide === 'function') {
            await this.layout.hide();
          }
        }

      }

      exports.LayoutManager = LayoutManager;
    }
  }); // FILE: layouts\layout-manager\load.ts

  modules.set('./layouts/layout-manager/load', {
    hash: 2997887930,
    creator: function (require, exports) {
      "use strict";

      var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.LayoutLoader = void 0;

      const ts_1 = require("@beyond-js/kernel/core/ts");

      const layout_1 = require("../abstract-classes/layouts/layout");

      const legacy_1 = require("../abstract-classes/layouts/legacy");

      class LayoutLoader {
        #layoutManager;
        #layout;

        get layout() {
          return this.#layout;
        }

        #pagesContainer;

        get pagesContainer() {
          return this.#pagesContainer;
        }

        #loaded = false;

        get loaded() {
          return this.#loaded;
        }

        get ready() {
          return this.#loaded;
        }

        #error = '';

        get error() {
          return this.#error;
        }

        constructor(layoutManager) {
          this.#layoutManager = layoutManager;
        }

        async load() {
          if (this.#loaded || this.#error) return;
          const {
            bundle
          } = this.#layoutManager;

          const failed = (message, exc) => {
            this.#error = message;
            console.error(this.#error);
            exc && console.error(exc.stack);
          };

          let LayoutImported;

          try {
            LayoutImported = (await ts_1.beyond.import(bundle)).Layout;
          } catch (exc) {
            return failed(`Error importing layout from bundle "${bundle}"`, exc);
          }

          if (!LayoutImported || typeof LayoutImported !== 'function') {
            return failed(`Layout on bundle "${bundle}" did not return a valid Layout object`);
          }

          try {
            // Required for backward compatibility
            if (!(LayoutImported.prototype instanceof layout_1.LayoutContainer)) {
              LayoutImported.prototype = new legacy_1.LayoutLegacy(this.#layoutManager);
            }

            this.#layout = new LayoutImported(this.#layoutManager);

            if (typeof this.#layout.render === 'function') {
              await this.#layout.render();
            }

            if (!this.#layout.control || !this.#layout.control.container) {
              return failed(`Error in Layout: the layout must expose a .control.container property`);
            }

            this.#pagesContainer = this.#layout.control.container;
          } catch (exc) {
            return failed(`Error instantiating layout on bundle "${bundle}"`, exc);
          }

          this.#loaded = true;
        }

      }

      __decorate([ts_1.SingleCall], LayoutLoader.prototype, "load", null);

      exports.LayoutLoader = LayoutLoader;
    }
  }); // FILE: layouts\layout-manager\pages\page-manager\loader.ts

  modules.set('./layouts/layout-manager/pages/page-manager/loader', {
    hash: 88288278,
    creator: function (require, exports) {
      "use strict";

      var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.PageLoader = void 0;

      const ts_1 = require("@beyond-js/kernel/core/ts");

      const page_container_1 = require("../../../abstract-classes/pages/page-container");

      const legacy_1 = require("../../../abstract-classes/pages/legacy");

      class PageLoader {
        #pageManager; // The imported module where the Page is exported

        #importedModule; // The instantiated page

        #page;

        get page() {
          return this.#page;
        }

        #loaded = false;

        get loaded() {
          return this.#loaded;
        }

        #error = '';

        get error() {
          return this.#error;
        }

        constructor(pageManager) {
          this.#pageManager = pageManager;
        }

        #pageError = (message, exc) => {
          this.#error = message;
          console.error(this.#error);
          exc && console.error(exc.stack);
        };
        #createPage = async () => {
          const bundle = this.#pageManager.bundle;

          try {
            this.#error = '';
            const PageImported = this.#importedModule.Page;

            if (!PageImported || typeof PageImported !== 'function') {
              return this.#pageError(`Page on bundle "${bundle}" did not return a valid Page object`);
            } // Required for backward compatibility


            if (!(PageImported.prototype instanceof page_container_1.PageContainer)) {
              PageImported.prototype = new legacy_1.PageLegacy(this.#pageManager);
            }

            this.#page = new PageImported(this.#pageManager);

            if (typeof this.#page.render === 'function') {
              await this.#page.render();
            }
          } catch (exc) {
            return this.#pageError(`Error instantiating page on bundle "${bundle}"`, exc);
          }
        };
        #hmrChangedDetected = async () => {
          try {
            this.#page.destroy();
          } catch (exc) {
            console.error(`Error destroying page "${this.#pageManager.bundle}"`);
          }

          await this.#createPage();
        };

        async load() {
          if (this.#loaded || this.#error) return;
          const bundle = this.#pageManager.bundle;

          try {
            this.#importedModule = await ts_1.beyond.import(bundle);
          } catch (exc) {
            return this.#pageError(`Error importing page from bundle "${bundle}"`, exc);
          }

          await this.#createPage();
          this.#loaded = true; // Function .destroy is required to support HMR

          typeof this.#page.destroy === 'function' && this.#importedModule.hmr.on('change:ts', () => this.#hmrChangedDetected().catch(exc => console.error(exc.stack)));
        }

      }

      __decorate([ts_1.SingleCall], PageLoader.prototype, "load", null);

      exports.PageLoader = PageLoader;
    }
  }); // FILE: layouts\layout-manager\pages\page-manager\page-manager.ts

  modules.set('./layouts/layout-manager/pages/page-manager/page-manager', {
    hash: 3283275834,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.PageManager = void 0;

      const ts_1 = require("@beyond-js/kernel/core/ts");

      const loader_1 = require("./loader");

      const pages_1 = require("../../../../config/pages");

      class PageManager extends pages_1.PageConfig {
        #pagesContainer;

        get pagesContainer() {
          return this.#pagesContainer;
        }

        #loader = new loader_1.PageLoader(this);
        load = async () => this.#loader.load();
        #uri;

        get uri() {
          return this.#uri;
        }

        get error() {
          return this.#loader.error;
        }

        get page() {
          return this.#loader.page;
        }

        constructor(uri, config, pagesContainer) {
          super(config);
          this.#pagesContainer = pagesContainer;
          this.#uri = uri;
        }

        #cancellationToken = new ts_1.CancellationToken();

        async show() {
          const cancellationTokenId = this.#cancellationToken.reset();
          await this.#loader.load();
          if (!this.#cancellationToken.check(cancellationTokenId)) return;
          if (this.error) return;
          this.page.container.style.display = '';
          typeof this.page.show === 'function' && (await this.page.show());
        }

        async hide() {
          const cancellationTokenId = this.#cancellationToken.reset();
          await this.#loader.load();
          if (!this.#cancellationToken.check(cancellationTokenId)) return;
          if (this.error) return;
          this.page.container.style.display = 'none';
          typeof this.page.hide === 'function' && (await this.page.hide());
        }

      }

      exports.PageManager = PageManager;
    }
  }); // FILE: layouts\layout-manager\pages\pages.ts

  modules.set('./layouts/layout-manager/pages/pages', {
    hash: 1685652701,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Pages = void 0;

      const page_manager_1 = require("./page-manager/page-manager");

      const ts_1 = require("@beyond-js/kernel/core/ts");

      class Pages {
        #layoutManager;
        #routingConfig;
        #instances = new Map();
        #active;

        get active() {
          return this.#active;
        }

        constructor(layout, routingConfig) {
          this.#layoutManager = layout;
          this.#routingConfig = routingConfig;
        } // Avoid to continue the execution on asynchronous calls, when a newest call's been made


        #cancellationToken = new ts_1.CancellationToken();

        async show(uri) {
          const currentCancellationToken = this.#cancellationToken.reset();
          if (this.#active && uri.pathname === this.#active.uri.pathname) return;
          const route = uri.route.route;

          if (!route) {
            throw new Error(`Pathname "${uri.pathname}" does not has a page associated to it`);
          }

          let page;

          if (this.#instances.has(uri.pathname)) {
            page = this.#instances.get(uri.pathname);
          } else {
            if (!this.#routingConfig.pages.has(route)) throw Error(`Route "${route}" not found`);
            const pageConfig = this.#routingConfig.pages.get(route);
            page = new page_manager_1.PageManager(uri, pageConfig, this.#layoutManager.pagesContainer);
            this.#instances.set(uri.pathname, page);
          }

          if (this.#active) {
            const previous = this.#active;
            await previous.hide().catch(exc => console.error(`Error hiding page "${uri.pathname}"`, exc.stack));
            if (!this.#cancellationToken.check(currentCancellationToken)) return;
          }

          this.#active = page;
          page.show().catch(exc => console.error(`Error showing page "${uri.pathname}"`, exc.stack));
        }

        hide = async () => this.#active && (await this.#active.hide());
      }

      exports.Pages = Pages;
    }
  }); // FILE: layouts\layouts.ts

  modules.set('./layouts/layouts', {
    hash: 320378259,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Layouts = void 0;

      const layout_manager_1 = require("./layout-manager/layout-manager");

      const ts_1 = require("@beyond-js/kernel/core/ts");

      class Layouts {
        #config;
        #instances = new Map();
        #active;

        get active() {
          return this.#active;
        }

        constructor(config) {
          this.#config = config;
        } // Avoid to continue the execution on asynchronous calls, when a newest call's been made


        #cancellationToken = new ts_1.CancellationToken(); // Navigate the uri once the active layout is set

        #navigate = uri => {
          this.#active.show(uri).catch(exc => console.error(`Error showing layout "${this.#active.name}"`, exc.stack));
        }; // Navigates a uri setting the active layout first

        async navigate(uri) {
          const currentCancellationToken = this.#cancellationToken.reset();
          const route = uri.route.route;

          if (!route) {
            throw new Error(`Pathname "${uri.pathname}" does not has a page associated to it`);
          }

          if (!this.#config.pages.has(route)) {
            throw Error(`Route "${route}" not found`);
          }

          const pageConfig = this.#config.pages.get(route);
          const layoutName = pageConfig.layout ? pageConfig.layout : 'default';

          if (layoutName !== 'default' && !this.#config.layouts.has(layoutName)) {
            console.error(`The layout "${layoutName}" required by route "${route}" ` + `in the bundle "${pageConfig.bundle}" was not found`);
            return;
          }

          if (this.#active && layoutName === this.#active.name) {
            this.#navigate(uri);
            return;
          }

          let layout;

          if (this.#instances.has(layoutName)) {
            layout = this.#instances.get(layoutName);
          } else {
            layout = new layout_manager_1.LayoutManager(layoutName, this.#config);
            this.#instances.set(layoutName, layout);
          }

          if (this.#active) {
            const previous = this.#active;
            await previous.hide().catch(exc => console.error(`Error hiding layout "${layoutName}"`, exc.stack));
            if (!this.#cancellationToken.check(currentCancellationToken)) return;
          }

          this.#active = layout;
          this.#navigate(uri);
        }

      }

      exports.Layouts = Layouts;
    }
  }); // FILE: routing.ts

  modules.set('./routing', {
    hash: 1696938853,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.routing = exports.Routing = exports.RoutingMode = void 0;

      const uri_1 = require("./uri/uri");

      const layouts_1 = require("./layouts/layouts");

      const config_1 = require("./config/config");

      const ts_1 = require("@beyond-js/kernel/core/ts");

      const history_1 = require("./history/history");

      var RoutingMode;

      (function (RoutingMode) {
        RoutingMode[RoutingMode["Hash"] = 0] = "Hash";
        RoutingMode[RoutingMode["Pathname"] = 1] = "Pathname";
      })(RoutingMode = exports.RoutingMode || (exports.RoutingMode = {}));

      class Routing {
        #events = new ts_1.Events();
        #valid = true;

        get valid() {
          return this.#valid;
        }

        #mode;

        get mode() {
          return this.#mode;
        }

        #config = new config_1.RoutingConfig();

        get config() {
          return this.#config;
        }

        #layouts = new layouts_1.Layouts(this.#config);
        #uri;

        get uri() {
          return this.#uri;
        }

        missing;
        redirect;
        #history = new history_1.BeyondHistory(this.#events);

        get history() {
          return this.#history;
        }

        #initialised = false;

        get initialised() {
          return this.#initialised;
        }

        setUp(routingMode) {
          if (this.#initialised) {
            throw new Error('Routing setUp method can only be called once');
          }

          if (location.protocol === 'file:' && routingMode === RoutingMode.Pathname) {
            routingMode = RoutingMode.Hash;
            console.warn('Routing mode was set as "pathname" but it was changed to ' + '"hash" because the protocol used is "file:"');
          }

          if (![0, 1].includes(routingMode)) {
            console.warn(`Routing mode ${routingMode} is invalid`);
            routingMode = location.protocol === 'file:' ? RoutingMode.Hash : RoutingMode.Pathname;
          }

          this.#mode = routingMode;
          this.#initialised = true;
          this.update().catch(exc => console.error(exc.stack));
        }

        #redirect = async uri => {
          if (typeof this.redirect !== 'function') return;
          const redirected = await this.redirect(uri);
          if (!redirected) return;

          if (typeof redirected !== 'string') {
            console.error(`Invalid route value set by custom routing function`, redirected);
            return;
          }

          if (uri.pathname === redirected) return; // Routing function returned the actual route

          this.pushState(redirected);
          return true;
        };

        pushState(url, state) {
          this.#history.pushState(url, state);
          this.update().catch(exc => console.error(exc.stack));
        }

        replaceState(state, title, url) {
          this.#history.replaceState(state, title, url);
          this.update().catch(exc => console.error(exc.stack));
        }

        // Avoid to continue the execution on asynchronous calls, when a newest call's been made
        #cancellationToken = new ts_1.CancellationToken();
        update = async () => {
          if (!this.#initialised) return;
          const cancellationTokenId = this.#cancellationToken.reset();
          if (this.#uri && this.#uri.href === location.href) return;
          const uri = new uri_1.URI(location.href);
          this.#uri = uri;
          const redirected = await this.#redirect(uri);
          if (!this.#cancellationToken.check(cancellationTokenId)) return;
          if (redirected) return; // The page was redirected to another url

          await uri.initialise(); // Parse the uri and check the missing function if the route is not found

          if (!this.#cancellationToken.check(cancellationTokenId)) return; // Verify the state of the history registry to check for possible errors

          if (uri.url !== this.#history.current) {
            console.error(`History current ${this.#history.current} is not equal to actual url "${uri.url}"`);
            this.#valid = false;
            this.#events.trigger('error');
            return;
          }

          this.#layouts.navigate(uri).catch(exc => console.error(exc instanceof Error ? exc.stack : exc));
        };
        back = () => window.history.length ? window.history.back() : this.pushState('/');
      }

      exports.Routing = Routing;
      exports.routing = new Routing();
      window.routing = exports.routing;

      beyond.navigate = (url, state) => exports.routing.pushState(url, state);

      beyond.pushState = (url, state) => exports.routing.pushState(url, state);

      beyond.back = () => exports.routing.back();

      window.addEventListener('popstate', () => exports.routing.update().catch(exc => console.error(exc.stack)));
    }
  }); // FILE: uri\querystring.ts

  modules.set('./uri/querystring', {
    hash: 341598707,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.QueryString = void 0;

      class QueryString extends Map {
        constructor(search) {
          super();
          if (search.trim() === '') return;
          search = search.substr(0, 1) === '?' ? search.substr(1) : search;
          const split = search.split('&');

          for (let i = 0; i < split.length; ++i) {
            const param = split[i].split('=', 2);
            const value = param[1] ? decodeURIComponent(param[1].replace(/\+/g, ' ')) : undefined;
            this.set(param[0], value);
          }
        }

      }

      exports.QueryString = QueryString;
    }
  }); // FILE: uri\route.ts

  modules.set('./uri/route', {
    hash: 1632476785,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Route = void 0;

      class Route {
        #uri;
        #route;

        get route() {
          return this.#route;
        }

        #bundle;

        get bundle() {
          return this.#bundle;
        }

        #vdir;

        get vdir() {
          return this.#vdir;
        }

        #initialised = false;

        get initialised() {
          return this.#initialised;
        }

        constructor(uri) {
          this.#uri = uri;
        }

        async initialise() {
          if (this.#initialised) return;
          this.#initialised = true;
          const {
            pathname
          } = this.#uri;

          const {
            routing
          } = require('../routing');

          if (routing.config.pages.has(pathname)) {
            this.#route = pathname;
            this.#vdir = undefined;
            this.#bundle = routing.config.pages.get(pathname).bundle;
            return;
          }

          let split = pathname.split('/');
          let vdir = [];
          let dir;

          while (dir = split.pop()) {
            vdir.unshift(dir);
            let route = split.join('/');
            route = route ? route : '/';

            if (routing.config.pages.has(route)) {
              const config = routing.config.pages.get(route);
              if (vdir.length && !config.vdir) continue; // The page does not support vdir

              this.#route = route;
              this.#vdir = vdir.join('/');
              this.#bundle = config.bundle;
              return;
            }
          }

          if (typeof routing.missing !== 'function') return;
          const bundle = await routing.missing(this.#uri);
          if (!bundle) return;

          if (typeof bundle !== 'string') {
            console.error(`Invalid bundle value set by custom missing function`, bundle);
            return;
          }

          this.#route = this.#uri.pathname;
          this.#bundle = bundle;
        }

      }

      exports.Route = Route;
    }
  }); // FILE: uri\uri.ts

  modules.set('./uri/uri', {
    hash: 2888599651,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.URI = void 0;
      /**
       * Uri parser
       *
       * @param href {string} The href to be parsed
       * @constructor
       */

      const route_1 = require("./route");

      const querystring_1 = require("./querystring");

      class URI {
        #parser = document.createElement('a');
        #route;

        get route() {
          return this.#route;
        }

        #url;

        get url() {
          return this.#url;
        }

        #pathname;

        get pathname() {
          return this.#pathname;
        }

        get protocol() {
          return this.#parser.protocol;
        }

        get hostname() {
          return this.#parser.hostname;
        }

        get origin() {
          return this.#parser.origin;
        }

        get port() {
          return this.#parser.port;
        }

        get host() {
          return this.#parser.host;
        }

        get href() {
          return this.#parser.href;
        }

        get search() {
          return this.#parser.search;
        }

        #qs;

        get qs() {
          return this.#qs;
        }

        constructor(href) {
          const {
            routing,
            RoutingMode
          } = require('../routing');

          const parser = this.#parser;
          parser.href = href;
          let url = parser.protocol === 'file:' ? href.substr(parser.pathname.length + 7) : // file:// -> 7 chars
          href.substr(parser.origin.length);
          url = url.startsWith('#') ? `/${url.substr(1)}` : url;
          url = url.startsWith('/#') ? `/${url.substr(2)}` : url;
          this.#url = !url ? '/' : url;
          const hash = parser.hash.startsWith('#') ? parser.hash.substr(1) : '';
          this.#pathname = routing.mode === RoutingMode.Hash ? `/${hash}` : parser.pathname;
          this.#qs = new querystring_1.QueryString(parser.search);
          this.#route = new route_1.Route(this);
        }

        initialise = () => this.#route.initialise();
      }

      exports.URI = URI;
    }
  });
  let IContainerControl, LayoutContainer, PageContainer, routing;
  _exports2.routing = routing;
  _exports2.PageContainer = PageContainer;
  _exports2.LayoutContainer = LayoutContainer;
  _exports2.IContainerControl = IContainerControl;

  __pkg.exports.process = function (require, _exports) {
    _exports2.IContainerControl = IContainerControl = _exports.IContainerControl = require('./layouts/abstract-classes/layouts/layout').IContainerControl;
    _exports2.LayoutContainer = LayoutContainer = _exports.LayoutContainer = require('./layouts/abstract-classes/layouts/layout').LayoutContainer;
    _exports2.PageContainer = PageContainer = _exports.PageContainer = require('./layouts/abstract-classes/pages/page-container').PageContainer;
    _exports2.routing = routing = _exports.routing = require('./routing').routing;
  };

  __pkg.initialise(modules);
});