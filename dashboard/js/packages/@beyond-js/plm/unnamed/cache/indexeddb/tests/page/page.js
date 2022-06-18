define(["exports", "/indexeddb/code.js", "react", "react-dom"], function (_exports, _code, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  _exports.hmr = void 0;

  const {
    Bundle: __Bundle,
    externals
  } = require('@beyond-js/kernel/bundle/ts');

  const __pkg = new __Bundle("@beyond-js/plm/unnamed/cache/indexeddb/tests/page/page").package();

  externals.register(new Map([["react", dependency_0], ["react-dom", dependency_1]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /*******
  item.jsx
  *******/

  class Item extends React.Component {
    constructor(props) {
      super(props);
    }

    delete() {
      const {
        database
      } = this.props;
      database.removeItem(this.props.data.id);
    }

    render() {
      const {
        data
      } = this.props;
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, data.name), /*#__PURE__*/React.createElement("button", {
        onClick: this.delete.bind(this)
      }, "Eliminar"));
    }

  }
  /*******
  view.jsx
  *******/


  class View extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    updateState() {
      this.setState({});
    }

    componentDidMount() {
      this.props.database.bind('change', this.updateState.bind(this));
    }

    componentWillUnmount() {
      this.props.database.unbind('change', this.updateState.bind(this));
    }

    render() {
      const database = this.props.database;
      let items = [];

      if (database.ready) {
        items = database.items.map(item => /*#__PURE__*/React.createElement(Item, {
          key: item.id,
          database: database,
          data: item
        }));
      }

      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "IndexDB"), /*#__PURE__*/React.createElement("blockquote", null, "En esta pagina de prueba se realiza:", /*#__PURE__*/React.createElement("ol", null, /*#__PURE__*/React.createElement("li", null, "Creaci\xF3n de una base de datos indexedDB"), /*#__PURE__*/React.createElement("li", null, "Definici\xF3n de storas"), /*#__PURE__*/React.createElement("li", null, "Inserci\xF3n de datos"), /*#__PURE__*/React.createElement("li", null, "Se disponibilizan datos para probar inserci\xF3n y eliminaci\xF3n"), /*#__PURE__*/React.createElement("li", null, "El store \"customers\" queda disponible en la consola bajo el nombre global \"asd\"."))), items);
    }

  }
  /***********
  JS PROCESSOR
  ***********/

  /**************
  FILE: define.js
  **************/


  function Database() {
    const events = new Events({
      'bind': this
    });
    const config = {
      'name': 'test2',
      'version': 1,
      'stores': [{
        'name': 'customers',
        'config': {
          'keyPath': 'id',
          'autoIncrement': true
        },
        'indexes': [['name', 'name', {
          'unique': false
        }], ['email', 'email', {
          'unique': true
        }]]
      }]
    };
    let db, store;
    let items;
    Object.defineProperty(this, 'items', {
      'get': () => items
    });
    let ready;
    Object.defineProperty(this, 'ready', {
      'get': () => ready
    });

    this.removeItem = async id => {
      store = db.store('customers');
      await store.delete(id);
      items = await store.getAll();
      events.trigger('change');
    };

    this.create = async () => {
      await _code.default.delete(config.name);
      db = await _code.default.create(config);
      store = db.store('customers');
      await store.save([{
        'id': 3,
        'name': 'Moises',
        'email': 'jcontreras@jidadesarrollos.com'
      }, {
        'id': 4,
        'name': 'Jean',
        'email': 'mrodriguez@jidadesarrollos.com'
      }]);
      window.asd = store;
      await store.save([{
        'id': 3,
        'name': 'Moises',
        'email': 'isMoises@jidadesarrollos.com'
      }]);
      items = await store.getAll();
      ready = true;
      events.trigger('change');
    };
  }
  /************
  FILE: page.js
  ************/


  function Page() {
    const database = new LocalDatabase();
    database.create();
    ReactDOM.render(React.createElement(View, {
      'database': database
    }), this.container);
    this.container.classList.add('app-indexdb-page'); //connection();
  }
  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/plm/unnamed/cache/indexeddb/tests/page/page', '');
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