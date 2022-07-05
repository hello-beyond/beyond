define(["exports", "/libraries/plm/cache/indexeddb", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _indexeddb, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  _exports.hmr = void 0;
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/dashboard/unnamed/models/indexeddb/tests/plm",
    "bundle": "page"
  }).package();

  ;
  externals.register(new Map([["react", dependency_1], ["react-dom", dependency_2]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /*******
  view.jsx
  *******/

  function View() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "IndexDB - PLM"));
  }
  /***********
  JS PROCESSOR
  ***********/

  /**************
  FILE: config.js
  **************/


  const getConfig = () => {
    'use strict';

    const CONFIG = Object.freeze({
      'DB': 'plmtest',
      'VERSION': 1
    });
    const lists = {
      'name': 'lists',
      'config': {
        'keyPath': 'id',
        'autoIncrement': true
      },
      'indexes': [['id', 'id', {
        'unique': false
      }]]
    };
    const records = {
      'name': 'records',
      'config': {
        'keyPath': 'id',
        'autoIncrement': true
      },
      'indexes': [['id', 'id', {
        'unique': false
      }]]
    };
    const unpublished = {
      'name': 'unpublished',
      'config': {
        'keyPath': 'id',
        'autoIncrement': true
      },
      'indexes': [['instanceId', 'instanceId', {
        'unique': false
      }]]
    };
    return {
      'name': CONFIG.DB,
      'version': CONFIG.VERSION,
      'stores': [lists, records, unpublished]
    };
  };
  /**************
  FILE: define.js
  **************/


  async function defineDB() {
    const db = await _indexeddb.default.create(getConfig());
    let store;

    const save = async (name, data) => {
      store = db.store(name);
      await store.save(data);
    };

    let item = {
      'instanceId': '123456789',
      'item': {
        'id': 1,
        'name': 'Prueba',
        'email': 'prueba@jidadesarrollos.com'
      }
    };
    let item2 = {
      'instanceId': '212121',
      'item': {
        'id': 2,
        'name': 'Otra Prueba',
        'email': 'prueba@jidadesarrollos.com'
      }
    };
    await save('unpublished', item);
    await save('unpublished', item2);
  }
  /************
  FILE: page.js
  ************/


  function Page() {
    ReactDOM.render(React.createElement(View, {}), this.container);
    this.container.classList.add('app-indexed-plm-page');
    defineDB();
  }
  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/dashboard/unnamed/models/indexeddb/tests/plm', '');
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