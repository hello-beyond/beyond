define(["exports", "@beyond-js/kernel/bundle", "react", "@beyond-js/kernel/core"], function (_exports, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.useWorkspacePanelsContext = _exports.useDSWorkspaceContext = _exports.useDSAsideContext = _exports.useConfigContext = _exports.useAppContext = _exports.hmr = _exports.WorkspacePanelsContext = _exports.DSWorkspaceContext = _exports.DSPreAside = _exports.DSBoards = _exports.DSAsideContext = _exports.ConfigContext = _exports.AppContext = void 0;
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/dashboard/ds-contexts",
    "bundle": "code"
  }).package();

  ;
  externals.register(new Map([["react", dependency_1]]));
  const {
    module
  } = __pkg.bundle;
  const ims = new Map();
  /*************************
  INTERNAL MODULE: ./context
  *************************/

  ims.set('./context', {
    hash: 2191741303,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.useWorkspacePanelsContext = exports.useDSWorkspaceContext = exports.useDSAsideContext = exports.useConfigContext = exports.useAppModulesContext = exports.useAppContext = exports.WorkspacePanelsContext = exports.DSWorkspaceContext = exports.DSBoards = exports.DSAsideContext = exports.ConfigContext = exports.AppModulesContext = exports.AppContext = void 0;

      var React = require("react");

      var _core = require("@beyond-js/kernel/core");
      /*bundle */


      const DSBoards = new class extends _core.Events {
        #items = new Map();

        get items() {
          return this.#items;
        }

        add(identifier, specs) {
          this.items.set(identifier, specs);
          this.trigger('board.added');
        }

      }();
      /**
       * Workspace
       */

      exports.DSBoards = DSBoards;
      /*bundle */

      const DSWorkspaceContext = React.createContext();
      exports.DSWorkspaceContext = DSWorkspaceContext;
      /*bundle */

      const useDSWorkspaceContext = () => React.useContext(DSWorkspaceContext);
      /**
       * ASide
       */


      exports.useDSWorkspaceContext = useDSWorkspaceContext;
      /*bundle */

      const DSAsideContext = React.createContext();
      exports.DSAsideContext = DSAsideContext;
      /*bundle */

      const useDSAsideContext = () => React.useContext(DSAsideContext);
      /**
       * Panels
       */


      exports.useDSAsideContext = useDSAsideContext;
      /*bundle */

      const WorkspacePanelsContext = React.createContext();
      exports.WorkspacePanelsContext = WorkspacePanelsContext;
      /*bundle */

      const useWorkspacePanelsContext = () => React.useContext(WorkspacePanelsContext);
      /**
       * Application
       */


      exports.useWorkspacePanelsContext = useWorkspacePanelsContext;
      /*bundle */

      const AppContext = React.createContext();
      exports.AppContext = AppContext;
      /*bundle */

      const useAppContext = () => React.useContext(AppContext);

      exports.useAppContext = useAppContext;
      /*bundle */

      const ConfigContext = React.createContext();
      exports.ConfigContext = ConfigContext;
      /*bundle */

      const useConfigContext = () => React.useContext(ConfigContext);
      /**
       * MODULES
       */


      exports.useConfigContext = useConfigContext;
      const AppModulesContext = React.createContext();
      exports.AppModulesContext = AppModulesContext;

      const useAppModulesContext = () => React.useContext(AppModulesContext);

      exports.useAppModulesContext = useAppModulesContext;
    }
  });
  /**************************
  INTERNAL MODULE: ./preaside
  **************************/

  ims.set('./preaside', {
    hash: 2495865331,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.DSPreAside = void 0;
      /*bundle*/

      const DSPreAside = new class extends Events {
        #bottom = new Map();

        get bottom() {
          return this.#bottom;
        }

        #top = new Map();

        get top() {
          return this.#top;
        }

        addToTop(identifier, specs) {
          this.#top.set(identifier, specs);
          this.trigger('item.added');
        }

        addItemsToTop(items) {}

        addToBottom(identifier, specs) {
          this.#bottom.set(identifier, specs);
          this.trigger('item.added');
        }

        addItems(position, items) {
          const nameFunction = position === 'bottom' ? 'addToBottom' : 'addToTop';
          Object.keys(items).forEach(name => {
            const data = items[name];
            this[nameFunction](name, data);
          });
          this.trigger('item.added');
        }

        remove = items => {
          items.forEach(item => {
            if (this.#bottom.has(item)) this.#bottom.delete(item);
            if (this.#top.has(item)) this.#top.delete(item);
          });
        };
      }();
      exports.DSPreAside = DSPreAside;
    }
  });
  /********************************
  INTERNAL MODULE: ./use-controller
  ********************************/

  ims.set('./use-controller', {
    hash: 1319212642,
    creator: function (require, exports) {
      // import React from "react";
      //
      // function useController(Controller) {
      //
      //     const [controller, setController] = React.useState();
      //     React.useEffect(() => {
      //
      //     }, []);
      //
      // }
      "use strict";
    }
  });
  __pkg.exports.descriptor = [{
    "im": "./context",
    "from": "DSBoards",
    "name": "DSBoards"
  }, {
    "im": "./context",
    "from": "DSWorkspaceContext",
    "name": "DSWorkspaceContext"
  }, {
    "im": "./context",
    "from": "useDSWorkspaceContext",
    "name": "useDSWorkspaceContext"
  }, {
    "im": "./context",
    "from": "DSAsideContext",
    "name": "DSAsideContext"
  }, {
    "im": "./context",
    "from": "useDSAsideContext",
    "name": "useDSAsideContext"
  }, {
    "im": "./context",
    "from": "WorkspacePanelsContext",
    "name": "WorkspacePanelsContext"
  }, {
    "im": "./context",
    "from": "useWorkspacePanelsContext",
    "name": "useWorkspacePanelsContext"
  }, {
    "im": "./context",
    "from": "AppContext",
    "name": "AppContext"
  }, {
    "im": "./context",
    "from": "useAppContext",
    "name": "useAppContext"
  }, {
    "im": "./context",
    "from": "ConfigContext",
    "name": "ConfigContext"
  }, {
    "im": "./context",
    "from": "useConfigContext",
    "name": "useConfigContext"
  }, {
    "im": "./preaside",
    "from": "DSPreAside",
    "name": "DSPreAside"
  }];
  let DSBoards, DSWorkspaceContext, useDSWorkspaceContext, DSAsideContext, useDSAsideContext, WorkspacePanelsContext, useWorkspacePanelsContext, AppContext, useAppContext, ConfigContext, useConfigContext, DSPreAside; // Module exports

  _exports.DSPreAside = DSPreAside;
  _exports.useConfigContext = useConfigContext;
  _exports.ConfigContext = ConfigContext;
  _exports.useAppContext = useAppContext;
  _exports.AppContext = AppContext;
  _exports.useWorkspacePanelsContext = useWorkspacePanelsContext;
  _exports.WorkspacePanelsContext = WorkspacePanelsContext;
  _exports.useDSAsideContext = useDSAsideContext;
  _exports.DSAsideContext = DSAsideContext;
  _exports.useDSWorkspaceContext = useDSWorkspaceContext;
  _exports.DSWorkspaceContext = DSWorkspaceContext;
  _exports.DSBoards = DSBoards;

  __pkg.exports.process = function ({
    require,
    prop,
    value
  }) {
    (require || prop === 'DSBoards') && (_exports.DSBoards = DSBoards = require ? require('./context').DSBoards : value);
    (require || prop === 'DSWorkspaceContext') && (_exports.DSWorkspaceContext = DSWorkspaceContext = require ? require('./context').DSWorkspaceContext : value);
    (require || prop === 'useDSWorkspaceContext') && (_exports.useDSWorkspaceContext = useDSWorkspaceContext = require ? require('./context').useDSWorkspaceContext : value);
    (require || prop === 'DSAsideContext') && (_exports.DSAsideContext = DSAsideContext = require ? require('./context').DSAsideContext : value);
    (require || prop === 'useDSAsideContext') && (_exports.useDSAsideContext = useDSAsideContext = require ? require('./context').useDSAsideContext : value);
    (require || prop === 'WorkspacePanelsContext') && (_exports.WorkspacePanelsContext = WorkspacePanelsContext = require ? require('./context').WorkspacePanelsContext : value);
    (require || prop === 'useWorkspacePanelsContext') && (_exports.useWorkspacePanelsContext = useWorkspacePanelsContext = require ? require('./context').useWorkspacePanelsContext : value);
    (require || prop === 'AppContext') && (_exports.AppContext = AppContext = require ? require('./context').AppContext : value);
    (require || prop === 'useAppContext') && (_exports.useAppContext = useAppContext = require ? require('./context').useAppContext : value);
    (require || prop === 'ConfigContext') && (_exports.ConfigContext = ConfigContext = require ? require('./context').ConfigContext : value);
    (require || prop === 'useConfigContext') && (_exports.useConfigContext = useConfigContext = require ? require('./context').useConfigContext : value);
    (require || prop === 'DSPreAside') && (_exports.DSPreAside = DSPreAside = require ? require('./preaside').DSPreAside : value);
  };

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports.hmr = hmr;

  __pkg.initialise(ims);
});