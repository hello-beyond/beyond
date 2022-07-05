define(["exports", "@beyond-js/dashboard/uploader-components", "@beyond-js/dashboard/ds-contexts", "@beyond-js/kernel/bundle", "react", "react-dom"], function (_exports, _uploaderComponents, _dsContexts, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Uploader = Uploader;
  _exports.hmr = void 0;
  //WORKSPACE CONTEXT
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/dashboard/uploader-workspace",
    "bundle": "code"
  }).package();

  ;
  externals.register(new Map([["react", dependency_1], ["react-dom", dependency_2]]));
  const {
    module
  } = __pkg.bundle;
  const React = externals.get('react');
  const ReactDOM = externals.get('react-dom');
  /***********
  uploader.jsx
  ***********/

  function Uploader({
    onLoadFile,
    onLoadEnd,
    name = 'images',
    multiple,
    children,
    specs
  }) {
    const btn = React.useRef();
    const [uploader, setUploader] = React.useState();
    const {
      workspace: {
        application
      }
    } = (0, _dsContexts.useDSWorkspaceContext)();
    const url = `${application.application.url}/uploader`;
    React.useEffect(() => {
      const model = new _uploaderComponents.JidaUploader({
        type: 'image',
        name: 'images',
        params: specs,
        url: url,
        input: {
          name: name,
          multiple: !!multiple
        }
      });
      model.create(btn.current);

      const onLoad = () => {
        [...model.files.items.values()][0];
        onLoadFile(model.files.items);
      };

      const loadend = async () => {
        const response = await model.publish();
        onLoadEnd(response);
      };

      model.bind('file.loaded', onLoad);
      model.bind('loadend', loadend);
      setUploader(model);
    }, [url, multiple]);
    return /*#__PURE__*/React.createElement("span", {
      ref: btn
    }, children);
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