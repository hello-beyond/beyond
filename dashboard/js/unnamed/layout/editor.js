define(["exports", "@beyond-js/dashboard-lib/models.legacy", "@beyond-js/ui/image", "@beyond-js/ui/modal", "@beyond-js/ui/form", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _models, _image, _modal, _form, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.DsDocs = void 0;
  _exports.Layout = Layout;
  _exports.hmr = void 0;
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/dashboard/unnamed/layout/editor",
    "bundle": "layout"
  }).package();

  ;
  externals.register(new Map([["react", dependency_1], ["react-dom", dependency_2]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /***********
  docs\app.jsx
  ***********/

  function AppDoc({
    closeModal
  }) {
    const go = event => {
      closeModal();
      beyond.navigate('/create_app');
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
      className: "ds-modal_header"
    }, /*#__PURE__*/React.createElement("h4", null, "Aplicaciones en Beyond")), /*#__PURE__*/React.createElement("div", {
      className: "ds-modal_content pd"
    }, /*#__PURE__*/React.createElement("div", {
      className: "img-list"
    }, /*#__PURE__*/React.createElement(_image.BeyondImage, {
      src: "/images/logos/js.png"
    }), /*#__PURE__*/React.createElement(_image.BeyondImage, {
      src: "/images/logos/react.png"
    }), /*#__PURE__*/React.createElement(_image.BeyondImage, {
      src: "/images/logos/socket-1.png"
    }), /*#__PURE__*/React.createElement(_image.BeyondImage, {
      src: "/images/logos/typescript.png"
    })), /*#__PURE__*/React.createElement("p", {
      className: "p1"
    }, "Al crear una nueva aplicaci\xF3n, este dashboard va a crear autom\xE1ticamente los archivos de configuraci\xF3n necesarios para que puedas comenzar a trabajar em tu nueva app."), /*#__PURE__*/React.createElement("p", {
      className: "p1"
    }, "Para conocer todas las opciones disponibles de configuraci\xF3n y los detalles de estos archivos puedes revisar la documentaci\xF3n completa"), /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement(_form.BeyondButton, {
      className: "primary",
      onClick: go
    }, "Crear mi primera aplicaci\xF3n"))));
  }
  /****************
  documentation.jsx
  ****************/


  function Documentation({
    onClose,
    doc
  }) {
    const DOCS = {
      app: AppDoc
    };
    if (!DOCS.hasOwnProperty(doc)) return null;
    const Control = DOCS[doc];
    return /*#__PURE__*/React.createElement(_modal.BeyondModal, {
      className: "ds-modal ds-modal-doc md pd",
      show: true,
      onClose: onClose
    }, /*#__PURE__*/React.createElement(Control, null));
  }
  /*********
  layout.jsx
  *********/


  class Control extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.docs = props.docs;
      this.container = React.createRef();
      this.scroll = React.createRef();
      this.props.parent.bind('change', () => this.setState({}));

      this.update = () => this.setState({});

      this.openDoc = this.openDoc.bind(this);
      this.onScroll = this.onScroll.bind(this);
    }

    onScroll(e, target, ps) {
      if (!ps?.reach?.y) {
        e.currentTarget.classList.add('sticky');
        return;
      }

      if (ps?.reach?.y === 'start') {
        e.currentTarget.classList.remove('sticky');
      }
    }

    componentDidMount() {
      this.props.parent.rendered();
      this.docs.bind('change', this.update);
    }

    openDoc(doc) {
      this.setState({
        openDoc: true,
        doc: doc
      });
    }

    componentWillUnmount() {
      this.docs.unbind('change', this.update);
      this.scroll.current.removeEventListener('ps-scroll-y', this.onScroll);
    }

    render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "dashboard-layout",
        ref: this.container
      }), this.docs.showing && /*#__PURE__*/React.createElement(Documentation, {
        doc: this.docs.current,
        onClose: this.docs.clean
      }));
    }

  }
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: docs.js
  ************/


  class DashboardDocs extends _models.ReactiveModel {
    _showing;
    _current;

    constructor() {
      super();
      this.clean = this.clean.bind(this);
      this.open = this.open.bind(this);
    }

    get showing() {
      return this._showing;
    }

    get current() {
      return this._current;
    }

    open(doc) {
      this._showing = true;
      this._current = doc;
      this.triggerEvent();
    }

    clean() {
      this._showing = false;
      this._current = undefined;
      this.triggerEvent();
    }

  }

  const DsDocs = new DashboardDocs();
  /**************
  FILE: layout.js
  **************/

  _exports.DsDocs = DsDocs;

  function Layout() {
    this.control = ReactDOM.render(React.createElement(Control, {
      parent: this,
      docs: DsDocs
    }), this.container);
    this.container.classList.add('ds-layout-editor');
  }
  /**********
  SCSS STYLES
  **********/


  const legacyStyles = beyondLegacyStyles.register('@beyond-js/dashboard/unnamed/layout/editor', '.ds-modal.ds-modal-doc .modal-content .img-list{display:flex;gap:15px;justify-content:center}.ds-modal.ds-modal-doc .modal-content .img-list .beyond-element-image img{object-fit:cover;height:50px;width:50px}.ds-layout-editor{min-height:99vh;width:100%;display:grid;grid-template-rows:1fr;transition:all .3s ease-in}.ds-layout-editor.sticky{transition:all .3s ease-in}.ds-layout-editor.sticky .ds-toolbar{background-image:linear-gradient(to right,#030508 0,#121f36 100%);transition:all .3s ease-in}');
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