define(["exports", "react", "@beyond-js/kernel/core/ts"], function (_exports2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.useWorkspacePanelsContext = _exports2.useDSWorkspaceContext = _exports2.useDSAsideContext = _exports2.useAppContext = _exports2.hmr = _exports2.WorkspacePanelsContext = _exports2.DSWorkspaceContext = _exports2.DSPreAside = _exports2.DSBoards = _exports2.DSAsideContext = _exports2.AppContext = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('@beyond-js/kernel/core/ts', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/workspace/context/code', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const modules = new Map(); // FILE: context.ts

  modules.set('./context', {
    hash: 3753501661,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.useAppModulesContext = exports.AppModulesContext = exports.useAppContext = exports.AppContext = exports.useWorkspacePanelsContext = exports.WorkspacePanelsContext = exports.useDSAsideContext = exports.DSAsideContext = exports.useDSWorkspaceContext = exports.DSWorkspaceContext = exports.DSBoards = void 0;

      const React = require("react");

      const ts_1 = require("@beyond-js/kernel/core/ts");

      exports.DSBoards = new class extends ts_1.Events {
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

      exports.DSWorkspaceContext = React.createContext();

      const useDSWorkspaceContext = () => React.useContext(exports.DSWorkspaceContext);

      exports.useDSWorkspaceContext = useDSWorkspaceContext;
      /**
       * ASide
       */

      exports.DSAsideContext = React.createContext();

      const useDSAsideContext = () => React.useContext(exports.DSAsideContext);

      exports.useDSAsideContext = useDSAsideContext;
      /**
       * Panels
       */

      exports.WorkspacePanelsContext = React.createContext();

      const useWorkspacePanelsContext = () => React.useContext(exports.WorkspacePanelsContext);

      exports.useWorkspacePanelsContext = useWorkspacePanelsContext;
      /**
       * Application
       */

      exports.AppContext = React.createContext();

      const useAppContext = () => React.useContext(exports.AppContext);

      exports.useAppContext = useAppContext;
      /**
       * MODULES
       */

      exports.AppModulesContext = React.createContext();

      const useAppModulesContext = () => React.useContext(exports.AppModulesContext);

      exports.useAppModulesContext = useAppModulesContext;
    }
  }); // FILE: preaside.ts

  modules.set('./preaside', {
    hash: 2495865331,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.DSPreAside = void 0;
      exports.DSPreAside = new class extends Events {
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
    }
  }); // FILE: use-controller.tsx

  modules.set('./use-controller', {
    hash: 1319212642,
    creator: function (require, exports) {
      "use strict"; // import React from "react";
      //
      // function useController(Controller) {
      //
      //     const [controller, setController] = React.useState();
      //     React.useEffect(() => {
      //
      //     }, []);
      //
      // }
    }
  });
  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;
  let DSBoards, DSWorkspaceContext, useDSWorkspaceContext, DSAsideContext, useDSAsideContext, WorkspacePanelsContext, useWorkspacePanelsContext, AppContext, useAppContext, DSPreAside;
  _exports2.DSPreAside = DSPreAside;
  _exports2.useAppContext = useAppContext;
  _exports2.AppContext = AppContext;
  _exports2.useWorkspacePanelsContext = useWorkspacePanelsContext;
  _exports2.WorkspacePanelsContext = WorkspacePanelsContext;
  _exports2.useDSAsideContext = useDSAsideContext;
  _exports2.DSAsideContext = DSAsideContext;
  _exports2.useDSWorkspaceContext = useDSWorkspaceContext;
  _exports2.DSWorkspaceContext = DSWorkspaceContext;
  _exports2.DSBoards = DSBoards;

  __pkg.exports.process = function (require, _exports) {
    _exports2.DSBoards = DSBoards = _exports.DSBoards = require('./context').DSBoards;
    _exports2.DSWorkspaceContext = DSWorkspaceContext = _exports.DSWorkspaceContext = require('./context').DSWorkspaceContext;
    _exports2.useDSWorkspaceContext = useDSWorkspaceContext = _exports.useDSWorkspaceContext = require('./context').useDSWorkspaceContext;
    _exports2.DSAsideContext = DSAsideContext = _exports.DSAsideContext = require('./context').DSAsideContext;
    _exports2.useDSAsideContext = useDSAsideContext = _exports.useDSAsideContext = require('./context').useDSAsideContext;
    _exports2.WorkspacePanelsContext = WorkspacePanelsContext = _exports.WorkspacePanelsContext = require('./context').WorkspacePanelsContext;
    _exports2.useWorkspacePanelsContext = useWorkspacePanelsContext = _exports.useWorkspacePanelsContext = require('./context').useWorkspacePanelsContext;
    _exports2.AppContext = AppContext = _exports.AppContext = require('./context').AppContext;
    _exports2.useAppContext = useAppContext = _exports.useAppContext = require('./context').useAppContext;
    _exports2.DSPreAside = DSPreAside = _exports.DSPreAside = require('./preaside').DSPreAside;
  };

  __pkg.initialise(modules);
});