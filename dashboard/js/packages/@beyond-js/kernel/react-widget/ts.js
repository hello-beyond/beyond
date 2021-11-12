define(["exports", "react", "react-dom", "@beyond-js/kernel/core/ts"], function (_exports2, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.ReactWidgetController = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  dependencies.set('@beyond-js/kernel/core/ts', dependency_2);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/kernel/react-widget/ts', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const modules = new Map(); // FILE: controller.ts

  modules.set('./controller', {
    hash: 2714807785,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ReactWidgetController = void 0;

      const React = require("react");

      const ReactDOM = require("react-dom");

      const ts_1 = require("@beyond-js/kernel/core/ts");

      const retarget_events_1 = require("./retarget-events");

      class ReactWidgetController extends ts_1.BeyondWidgetController {
        #styles;
        #css;
        #hmrStylesChanged = () => {
          this.component.shadowRoot.removeChild(this.#css);
          this.#css = this.#styles.css;
          this.component.shadowRoot.appendChild(this.#css);
        };
        #body;

        render() {
          this.#body && ReactDOM.unmountComponentAtNode(this.#body);
          this.#body?.remove();
          this.#body = document.createElement('div');
          this.component.shadowRoot.appendChild(this.#body);
          const {
            Widget
          } = this.bundle.package().exports.values;

          if (!Widget) {
            const message = `Widget "${this.component.localName}" does not export a Widget class`;
            console.error(message);
            return;
          } // Render the widget


          ReactDOM.render(React.createElement(Widget), this.#body);
        }

        mount() {
          this.render();
          retarget_events_1.retargetEvents(this.component.shadowRoot); // Append styles and setup styles HMR

          this.#styles = this.bundle.styles;
          this.#css = this.#styles.css;
          this.#css && this.component.shadowRoot.appendChild(this.#css);
          this.#styles.on('change', this.#hmrStylesChanged);
        }

      }

      exports.ReactWidgetController = ReactWidgetController;
    }
  }); // FILE: retarget-events.ts

  modules.set('./retarget-events', {
    hash: 2415263902,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.retargetEvents = void 0;
      const reactEvents = ['onAbort', 'onAnimationCancel', 'onAnimationEnd', 'onAnimationIteration', 'onAuxClick', 'onBlur', 'onChange', 'onClick', 'onClose', 'onContextMenu', 'onDoubleClick', 'onError', 'onFocus', 'onGotPointerCapture', 'onInput', 'onKeyDown', 'onKeyPress', 'onKeyUp', 'onLoad', 'onLoadEnd', 'onLoadStart', 'onLostPointerCapture', 'onMouseDown', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp', 'onPointerCancel', 'onPointerDown', 'onPointerEnter', 'onPointerLeave', 'onPointerMove', 'onPointerOut', 'onPointerOver', 'onPointerUp', 'onReset', 'onResize', 'onScroll', 'onSelect', 'onSelectionChange', 'onSelectStart', 'onSubmit', 'onTouchCancel', 'onTouchMove', 'onTouchStart', 'onTouchEnd', 'onTransitionCancel', 'onTransitionEnd', 'onDrag', 'onDragEnd', 'onDragEnter', 'onDragExit', 'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop', 'onFocusOut'];
      const divergentNativeEvents = {
        onDoubleClick: 'dblclick'
      };
      const mimickedReactEvents = {
        onInput: 'onChange',
        onFocusOut: 'onBlur',
        onSelectionChange: 'onSelect'
      };
      const proxyHandlers = {
        get: function (target, prop, _receiver) {
          if (prop === "currentTarget") {
            return target._reactCurrentTarget;
          }

          const value = target[prop];
          return value instanceof Function ? value.bind(target) : value;
        }
      };

      function retargetEvents(shadowRoot) {
        const removeEventListeners = [];
        reactEvents.forEach(function (reactEventName) {
          const nativeEventName = getNativeEventName(reactEventName);

          function retargetEvent(event) {
            const path = event.path || event.composedPath && event.composedPath() || composedPath(event.target);
            const proxy = new Proxy(event, proxyHandlers);

            for (let i = 0; i < path.length; i++) {
              const el = path[i];
              let props = null;
              const reactComponent = findReactComponent(el);
              const eventHandlers = findReactEventHandlers(el);
              event._reactCurrentTarget = el;

              if (!eventHandlers) {
                props = findReactProps(reactComponent);
              } else {
                props = eventHandlers;
              }

              if (reactComponent && props) {
                dispatchEvent(proxy, reactEventName, props);
              }

              if (reactComponent && props && mimickedReactEvents[reactEventName]) {
                dispatchEvent(proxy, mimickedReactEvents[reactEventName], props);
              }

              if (event.cancelBubble) break;
              if (el === shadowRoot) break;
            }
          }

          shadowRoot.addEventListener(nativeEventName, retargetEvent, false);
          removeEventListeners.push(function () {
            shadowRoot.removeEventListener(nativeEventName, retargetEvent, false);
          });
        });
        return function () {
          removeEventListeners.forEach(function (removeEventListener) {
            removeEventListener();
          });
        };
      }

      exports.retargetEvents = retargetEvents;

      function findReactEventHandlers(item) {
        return findReactProperty(item, '__reactEventHandlers');
      }

      function findReactComponent(item) {
        return findReactProperty(item, '_reactInternal');
      }

      function findReactProperty(item, propertyPrefix) {
        for (const key in item) {
          if (item.hasOwnProperty(key) && key.indexOf(propertyPrefix) !== -1) {
            return item[key];
          }
        }
      }

      function findReactProps(component) {
        if (!component) return undefined;
        if (component.memoizedProps) return component.memoizedProps; // React 16 Fiber

        if (component._currentElement && component._currentElement.props) return component._currentElement.props; // React <=15
      }

      function dispatchEvent(event, eventType, componentProps) {
        event.persist = function () {
          event.isPersistent = function () {
            return true;
          };
        };

        if (componentProps[eventType]) {
          componentProps[eventType](event);
        }
      }

      function getNativeEventName(reactEventName) {
        if (divergentNativeEvents[reactEventName]) {
          return divergentNativeEvents[reactEventName];
        }

        return reactEventName.replace(/^on/, '').toLowerCase();
      }

      function composedPath(el) {
        const path = [];

        while (el) {
          path.push(el);

          if (el.tagName === 'HTML') {
            path.push(document);
            path.push(window);
            return path;
          }

          el = el.parentElement;
        }
      }
    }
  });
  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;
  let ReactWidgetController;
  _exports2.ReactWidgetController = ReactWidgetController;

  __pkg.exports.process = function (require, _exports) {
    _exports2.ReactWidgetController = ReactWidgetController = _exports.ReactWidgetController = require('./controller').ReactWidgetController;
  };

  __pkg.initialise(modules);
});