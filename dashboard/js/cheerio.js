define(["css-what","domelementtype","domhandler","entities","dom-serializer","domutils","boolbase","nth-check","css-select","cheerio-select","htmlparser2","parse5","parse5-htmlparser2-tree-adapter"], (dep_0, dep_1, dep_2, dep_3, dep_4, dep_5, dep_6, dep_7, dep_8, dep_9, dep_10, dep_11, dep_12) => {
const dependencies = new Map([['css-what', dep_0],['domelementtype', dep_1],['domhandler', dep_2],['entities', dep_3],['dom-serializer', dep_4],['domutils', dep_5],['boolbase', dep_6],['nth-check', dep_7],['css-select', dep_8],['cheerio-select', dep_9],['htmlparser2', dep_10],['parse5', dep_11],['parse5-htmlparser2-tree-adapter', dep_12]]);
const define = void 0;
const require = dependency => dependencies.get(dependency);
const module = {};

const code = (module, require) => {
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;

var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = {
    exports: {}
  }).exports, mod), mod.exports;
};

var __export = (target, all) => {
  for (var name in all) __defProp(target, name, {
    get: all[name],
    enumerable: true
  });
};

var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
  }

  return to;
};

var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));

var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
  value: mod,
  enumerable: true
}) : target, mod));

var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: true
}), mod); // ../../../node_modules/tslib/tslib.js


var require_tslib = __commonJS({
  "../../../node_modules/tslib/tslib.js"(exports, module2) {
    var __extends;

    var __assign;

    var __rest;

    var __decorate;

    var __param;

    var __metadata;

    var __awaiter;

    var __generator;

    var __exportStar;

    var __values;

    var __read;

    var __spread;

    var __spreadArrays;

    var __spreadArray;

    var __await;

    var __asyncGenerator;

    var __asyncDelegator;

    var __asyncValues;

    var __makeTemplateObject;

    var __importStar;

    var __importDefault;

    var __classPrivateFieldGet;

    var __classPrivateFieldSet;

    var __createBinding;

    (function (factory) {
      var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};

      if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function (exports2) {
          factory(createExporter(root, createExporter(exports2)));
        });
      } else if (typeof module2 === "object" && typeof module2.exports === "object") {
        factory(createExporter(root, createExporter(module2.exports)));
      } else {
        factory(createExporter(root));
      }

      function createExporter(exports2, previous) {
        if (exports2 !== root) {
          if (typeof Object.create === "function") {
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
          } else {
            exports2.__esModule = true;
          }
        }

        return function (id, v) {
          return exports2[id] = previous ? previous(id, v) : v;
        };
      }
    })(function (exporter) {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      };

      __extends = function (d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };

      __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      __rest = function (s, e) {
        var t = {};

        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

        if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
        }
        return t;
      };

      __decorate = function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };

      __param = function (paramIndex, decorator) {
        return function (target, key) {
          decorator(target, key, paramIndex);
        };
      };

      __metadata = function (metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
      };

      __awaiter = function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
          });
        }

        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }

          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }

          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }

          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };

      __generator = function (thisArg, body) {
        var _ = {
          label: 0,
          sent: function () {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: []
        },
            f,
            y,
            t,
            g;
        return g = {
          next: verb(0),
          "throw": verb(1),
          "return": verb(2)
        }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
          return this;
        }), g;

        function verb(n) {
          return function (v) {
            return step([n, v]);
          };
        }

        function step(op) {
          if (f) throw new TypeError("Generator is already executing.");

          while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];

            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;

              case 4:
                _.label++;
                return {
                  value: op[1],
                  done: false
                };

              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;

              case 7:
                op = _.ops.pop();

                _.trys.pop();

                continue;

              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }

                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }

                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }

                if (t && _.label < t[2]) {
                  _.label = t[2];

                  _.ops.push(op);

                  break;
                }

                if (t[2]) _.ops.pop();

                _.trys.pop();

                continue;
            }

            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }

          if (op[0] & 5) throw op[1];
          return {
            value: op[0] ? op[1] : void 0,
            done: true
          };
        }
      };

      __exportStar = function (m, o) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
      };

      __createBinding = Object.create ? function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          }
        });
      } : function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      };

      __values = function (o) {
        var s = typeof Symbol === "function" && Symbol.iterator,
            m = s && o[s],
            i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
          next: function () {
            if (o && i >= o.length) o = void 0;
            return {
              value: o && o[i++],
              done: !o
            };
          }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };

      __read = function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o),
            r,
            ar = [],
            e;

        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = {
            error
          };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }

        return ar;
      };

      __spread = function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

        return ar;
      };

      __spreadArrays = function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

        for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

        return r;
      };

      __spreadArray = function (to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
      };

      __await = function (v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
      };

      __asyncGenerator = function (thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []),
            i,
            q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
          return this;
        }, i;

        function verb(n) {
          if (g[n]) i[n] = function (v) {
            return new Promise(function (a, b) {
              q.push([n, v, a, b]) > 1 || resume(n, v);
            });
          };
        }

        function resume(n, v) {
          try {
            step(g[n](v));
          } catch (e) {
            settle(q[0][3], e);
          }
        }

        function step(r) {
          r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }

        function fulfill(value) {
          resume("next", value);
        }

        function reject(value) {
          resume("throw", value);
        }

        function settle(f, v) {
          if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
        }
      };

      __asyncDelegator = function (o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) {
          throw e;
        }), verb("return"), i[Symbol.iterator] = function () {
          return this;
        }, i;

        function verb(n, f) {
          i[n] = o[n] ? function (v) {
            return (p = !p) ? {
              value: __await(o[n](v)),
              done: n === "return"
            } : f ? f(v) : v;
          } : f;
        }
      };

      __asyncValues = function (o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator],
            i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
          return this;
        }, i);

        function verb(n) {
          i[n] = o[n] && function (v) {
            return new Promise(function (resolve, reject) {
              v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
          };
        }

        function settle(resolve, reject, d, v) {
          Promise.resolve(v).then(function (v2) {
            resolve({
              value: v2,
              done: d
            });
          }, reject);
        }
      };

      __makeTemplateObject = function (cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", {
            value: raw
          });
        } else {
          cooked.raw = raw;
        }

        return cooked;
      };

      var __setModuleDefault = Object.create ? function (o, v) {
        Object.defineProperty(o, "default", {
          enumerable: true,
          value: v
        });
      } : function (o, v) {
        o["default"] = v;
      };

      __importStar = function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};

        if (mod != null) {
          for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        }

        __setModuleDefault(result, mod);

        return result;
      };

      __importDefault = function (mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };

      __classPrivateFieldGet = function (receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      };

      __classPrivateFieldSet = function (receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
      };

      exporter("__extends", __extends);
      exporter("__assign", __assign);
      exporter("__rest", __rest);
      exporter("__decorate", __decorate);
      exporter("__param", __param);
      exporter("__metadata", __metadata);
      exporter("__awaiter", __awaiter);
      exporter("__generator", __generator);
      exporter("__exportStar", __exportStar);
      exporter("__createBinding", __createBinding);
      exporter("__values", __values);
      exporter("__read", __read);
      exporter("__spread", __spread);
      exporter("__spreadArrays", __spreadArrays);
      exporter("__spreadArray", __spreadArray);
      exporter("__await", __await);
      exporter("__asyncGenerator", __asyncGenerator);
      exporter("__asyncDelegator", __asyncDelegator);
      exporter("__asyncValues", __asyncValues);
      exporter("__makeTemplateObject", __makeTemplateObject);
      exporter("__importStar", __importStar);
      exporter("__importDefault", __importDefault);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet);
    });
  }

}); // ../../../node_modules/cheerio/lib/types.js


var require_types = __commonJS({
  "../../../node_modules/cheerio/lib/types.js"(exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
  }

}); // ../../../node_modules/cheerio/lib/options.js


var require_options = __commonJS({
  "../../../node_modules/cheerio/lib/options.js"(exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.flatten = void 0;
    var tslib_1 = require_tslib();
    var defaultOpts = {
      xml: false,
      decodeEntities: true
    };
    exports.default = defaultOpts;
    var xmlModeDefault = {
      _useHtmlParser2: true,
      xmlMode: true
    };

    function flatten(options) {
      return (options === null || options === void 0 ? void 0 : options.xml) ? typeof options.xml === "boolean" ? xmlModeDefault : tslib_1.__assign(tslib_1.__assign({}, xmlModeDefault), options.xml) : options !== null && options !== void 0 ? options : void 0;
    }

    exports.flatten = flatten;
  }

}); // ../../../node_modules/cheerio/lib/parsers/parse5-adapter.js


var require_parse5_adapter = __commonJS({
  "../../../node_modules/cheerio/lib/parsers/parse5-adapter.js"(exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.render = exports.parse = void 0;
    var tslib_1 = require_tslib();

    var domhandler_1 = require("../../../node_modules/domhandler/lib/index.js");

    var parse5_1 = require("../../../node_modules/parse5/lib/index.js");

    var parse5_htmlparser2_tree_adapter_1 = tslib_1.__importDefault(require("../../../node_modules/parse5-htmlparser2-tree-adapter/lib/index.js"));

    function parse(content, options, isDocument) {
      var opts = {
        scriptingEnabled: typeof options.scriptingEnabled === "boolean" ? options.scriptingEnabled : true,
        treeAdapter: parse5_htmlparser2_tree_adapter_1.default,
        sourceCodeLocationInfo: options.sourceCodeLocationInfo
      };
      var context = options.context;
      return isDocument ? parse5_1.parse(content, opts) : parse5_1.parseFragment(context, content, opts);
    }

    exports.parse = parse;

    function render(dom) {
      var _a;

      var nodes = "length" in dom ? dom : [dom];

      for (var index = 0; index < nodes.length; index += 1) {
        var node = nodes[index];

        if (domhandler_1.isDocument(node)) {
          (_a = Array.prototype.splice).call.apply(_a, tslib_1.__spreadArray([nodes, index, 1], node.children));
        }
      }

      return parse5_1.serialize({
        children: nodes
      }, {
        treeAdapter: parse5_htmlparser2_tree_adapter_1.default
      });
    }

    exports.render = render;
  }

}); // ../../../node_modules/cheerio/lib/parsers/htmlparser2-adapter.js


var require_htmlparser2_adapter = __commonJS({
  "../../../node_modules/cheerio/lib/parsers/htmlparser2-adapter.js"(exports) {
    "use strict";

    var __importDefault = exports && exports.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.render = exports.parse = void 0;

    var htmlparser2_1 = require("../../../node_modules/htmlparser2/lib/index.js");

    Object.defineProperty(exports, "parse", {
      enumerable: true,
      get: function () {
        return htmlparser2_1.parseDocument;
      }
    });

    var dom_serializer_1 = require("../../../node_modules/dom-serializer/lib/index.js");

    Object.defineProperty(exports, "render", {
      enumerable: true,
      get: function () {
        return __importDefault(dom_serializer_1).default;
      }
    });
  }

}); // ../../../node_modules/cheerio/lib/static.js


var require_static = __commonJS({
  "../../../node_modules/cheerio/lib/static.js"(exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.merge = exports.contains = exports.root = exports.parseHTML = exports.text = exports.xml = exports.html = void 0;
    var tslib_1 = require_tslib();

    var options_1 = tslib_1.__importStar(require_options());

    var cheerio_select_1 = require("../../../node_modules/cheerio-select/lib/index.js");

    var htmlparser2_1 = require("../../../node_modules/htmlparser2/lib/index.js");

    var parse5_adapter_1 = require_parse5_adapter();
    var htmlparser2_adapter_1 = require_htmlparser2_adapter();

    function render(that, dom, options) {
      var _a;

      var toRender = dom ? typeof dom === "string" ? cheerio_select_1.select(dom, (_a = that === null || that === void 0 ? void 0 : that._root) !== null && _a !== void 0 ? _a : [], options) : dom : that === null || that === void 0 ? void 0 : that._root.children;
      if (!toRender) return "";
      return options.xmlMode || options._useHtmlParser2 ? htmlparser2_adapter_1.render(toRender, options) : parse5_adapter_1.render(toRender);
    }

    function isOptions(dom) {
      return typeof dom === "object" && dom != null && !("length" in dom) && !("type" in dom);
    }

    function html(dom, options) {
      if (!options && isOptions(dom)) {
        options = dom;
        dom = void 0;
      }

      var opts = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, options_1.default), this ? this._options : {}), options_1.flatten(options !== null && options !== void 0 ? options : {}));

      return render(this || void 0, dom, opts);
    }

    exports.html = html;

    function xml(dom) {
      var options = tslib_1.__assign(tslib_1.__assign({}, this._options), {
        xmlMode: true
      });

      return render(this, dom, options);
    }

    exports.xml = xml;

    function text(elements) {
      var elems = elements ? elements : this ? this.root() : [];
      var ret = "";

      for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (htmlparser2_1.DomUtils.isText(elem)) ret += elem.data;else if (htmlparser2_1.DomUtils.hasChildren(elem) && elem.type !== htmlparser2_1.ElementType.Comment && elem.type !== htmlparser2_1.ElementType.Script && elem.type !== htmlparser2_1.ElementType.Style) {
          ret += text(elem.children);
        }
      }

      return ret;
    }

    exports.text = text;

    function parseHTML(data, context, keepScripts) {
      if (keepScripts === void 0) {
        keepScripts = typeof context === "boolean" ? context : false;
      }

      if (!data || typeof data !== "string") {
        return null;
      }

      if (typeof context === "boolean") {
        keepScripts = context;
      }

      var parsed = this.load(data, options_1.default, false);

      if (!keepScripts) {
        parsed("script").remove();
      }

      return parsed.root()[0].children.slice();
    }

    exports.parseHTML = parseHTML;

    function root() {
      return this(this._root);
    }

    exports.root = root;

    function contains(container, contained) {
      if (contained === container) {
        return false;
      }

      var next = contained;

      while (next && next !== next.parent) {
        next = next.parent;

        if (next === container) {
          return true;
        }
      }

      return false;
    }

    exports.contains = contains;

    function merge(arr1, arr2) {
      if (!isArrayLike(arr1) || !isArrayLike(arr2)) {
        return;
      }

      var newLength = arr1.length;
      var len = +arr2.length;

      for (var i = 0; i < len; i++) {
        arr1[newLength++] = arr2[i];
      }

      arr1.length = newLength;
      return arr1;
    }

    exports.merge = merge;

    function isArrayLike(item) {
      if (Array.isArray(item)) {
        return true;
      }

      if (typeof item !== "object" || !Object.prototype.hasOwnProperty.call(item, "length") || typeof item.length !== "number" || item.length < 0) {
        return false;
      }

      for (var i = 0; i < item.length; i++) {
        if (!(i in item)) {
          return false;
        }
      }

      return true;
    }
  }

}); // ../../../node_modules/cheerio/lib/parse.js


var require_parse = __commonJS({
  "../../../node_modules/cheerio/lib/parse.js"(exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.update = void 0;

    var htmlparser2_1 = require("../../../node_modules/htmlparser2/lib/index.js");

    var htmlparser2_adapter_1 = require_htmlparser2_adapter();
    var parse5_adapter_1 = require_parse5_adapter();

    var domhandler_1 = require("../../../node_modules/domhandler/lib/index.js");

    function parse(content, options, isDocument) {
      if (typeof Buffer !== "undefined" && Buffer.isBuffer(content)) {
        content = content.toString();
      }

      if (typeof content === "string") {
        return options.xmlMode || options._useHtmlParser2 ? htmlparser2_adapter_1.parse(content, options) : parse5_adapter_1.parse(content, options, isDocument);
      }

      var doc = content;

      if (!Array.isArray(doc) && domhandler_1.isDocument(doc)) {
        return doc;
      }

      var root = new domhandler_1.Document([]);
      update(doc, root);
      return root;
    }

    exports.default = parse;

    function update(newChilds, parent) {
      var arr = Array.isArray(newChilds) ? newChilds : [newChilds];

      if (parent) {
        parent.children = arr;
      } else {
        parent = null;
      }

      for (var i = 0; i < arr.length; i++) {
        var node = arr[i];

        if (node.parent && node.parent.children !== arr) {
          htmlparser2_1.DomUtils.removeElement(node);
        }

        if (parent) {
          node.prev = arr[i - 1] || null;
          node.next = arr[i + 1] || null;
        } else {
          node.prev = node.next = null;
        }

        node.parent = parent;
      }

      return parent;
    }

    exports.update = update;
  }

}); // ../../../node_modules/cheerio/lib/utils.js


var require_utils = __commonJS({
  "../../../node_modules/cheerio/lib/utils.js"(exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isHtml = exports.cloneDom = exports.domEach = exports.cssCase = exports.camelCase = exports.isCheerio = exports.isTag = void 0;

    var htmlparser2_1 = require("../../../node_modules/htmlparser2/lib/index.js");

    var domhandler_1 = require("../../../node_modules/domhandler/lib/index.js");

    exports.isTag = htmlparser2_1.DomUtils.isTag;

    function isCheerio(maybeCheerio) {
      return maybeCheerio.cheerio != null;
    }

    exports.isCheerio = isCheerio;

    function camelCase(str) {
      return str.replace(/[_.-](\w|$)/g, function (_, x) {
        return x.toUpperCase();
      });
    }

    exports.camelCase = camelCase;

    function cssCase(str) {
      return str.replace(/[A-Z]/g, "-$&").toLowerCase();
    }

    exports.cssCase = cssCase;

    function domEach(array, fn) {
      var len = array.length;

      for (var i = 0; i < len; i++) fn(array[i], i);

      return array;
    }

    exports.domEach = domEach;

    function cloneDom(dom) {
      var clone = "length" in dom ? Array.prototype.map.call(dom, function (el) {
        return domhandler_1.cloneNode(el, true);
      }) : [domhandler_1.cloneNode(dom, true)];
      var root = new domhandler_1.Document(clone);
      clone.forEach(function (node) {
        node.parent = root;
      });
      return clone;
    }

    exports.cloneDom = cloneDom;
    var quickExpr = /<[a-zA-Z][^]*>/;

    function isHtml(str) {
      return quickExpr.test(str);
    }

    exports.isHtml = isHtml;
  }

}); // ../../../node_modules/cheerio/lib/api/attributes.js


var require_attributes = __commonJS({
  "../../../node_modules/cheerio/lib/api/attributes.js"(exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.toggleClass = exports.removeClass = exports.addClass = exports.hasClass = exports.removeAttr = exports.val = exports.data = exports.prop = exports.attr = void 0;
    var static_1 = require_static();
    var utils_1 = require_utils();
    var hasOwn = Object.prototype.hasOwnProperty;
    var rspace = /\s+/;
    var dataAttrPrefix = "data-";
    var primitives = {
      null: null,
      true: true,
      false: false
    };
    var rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i;
    var rbrace = /^{[^]*}$|^\[[^]*]$/;

    function getAttr(elem, name, xmlMode) {
      var _a;

      if (!elem || !utils_1.isTag(elem)) return void 0;
      (_a = elem.attribs) !== null && _a !== void 0 ? _a : elem.attribs = {};

      if (!name) {
        return elem.attribs;
      }

      if (hasOwn.call(elem.attribs, name)) {
        return !xmlMode && rboolean.test(name) ? name : elem.attribs[name];
      }

      if (elem.name === "option" && name === "value") {
        return static_1.text(elem.children);
      }

      if (elem.name === "input" && (elem.attribs.type === "radio" || elem.attribs.type === "checkbox") && name === "value") {
        return "on";
      }

      return void 0;
    }

    function setAttr(el, name, value) {
      if (value === null) {
        removeAttribute(el, name);
      } else {
        el.attribs[name] = "" + value;
      }
    }

    function attr(name, value) {
      if (typeof name === "object" || value !== void 0) {
        if (typeof value === "function") {
          if (typeof name !== "string") {
            {
              throw new Error("Bad combination of arguments.");
            }
          }

          return utils_1.domEach(this, function (el, i) {
            if (utils_1.isTag(el)) setAttr(el, name, value.call(el, i, el.attribs[name]));
          });
        }

        return utils_1.domEach(this, function (el) {
          if (!utils_1.isTag(el)) return;

          if (typeof name === "object") {
            Object.keys(name).forEach(function (objName) {
              var objValue = name[objName];
              setAttr(el, objName, objValue);
            });
          } else {
            setAttr(el, name, value);
          }
        });
      }

      return arguments.length > 1 ? this : getAttr(this[0], name, this.options.xmlMode);
    }

    exports.attr = attr;

    function getProp(el, name, xmlMode) {
      if (!el || !utils_1.isTag(el)) return;
      return name in el ? el[name] : !xmlMode && rboolean.test(name) ? getAttr(el, name, false) !== void 0 : getAttr(el, name, xmlMode);
    }

    function setProp(el, name, value, xmlMode) {
      if (name in el) {
        el[name] = value;
      } else {
        setAttr(el, name, !xmlMode && rboolean.test(name) ? value ? "" : null : "" + value);
      }
    }

    function prop(name, value) {
      var _this = this;

      if (typeof name === "string" && value === void 0) {
        switch (name) {
          case "style":
            {
              var property_1 = this.css();
              var keys = Object.keys(property_1);
              keys.forEach(function (p, i) {
                property_1[i] = p;
              });
              property_1.length = keys.length;
              return property_1;
            }

          case "tagName":
          case "nodeName":
            {
              var el = this[0];
              return utils_1.isTag(el) ? el.name.toUpperCase() : void 0;
            }

          case "outerHTML":
            return this.clone().wrap("<container />").parent().html();

          case "innerHTML":
            return this.html();

          default:
            return getProp(this[0], name, this.options.xmlMode);
        }
      }

      if (typeof name === "object" || value !== void 0) {
        if (typeof value === "function") {
          if (typeof name === "object") {
            throw new Error("Bad combination of arguments.");
          }

          return utils_1.domEach(this, function (el2, i) {
            if (utils_1.isTag(el2)) setProp(el2, name, value.call(el2, i, getProp(el2, name, _this.options.xmlMode)), _this.options.xmlMode);
          });
        }

        return utils_1.domEach(this, function (el2) {
          if (!utils_1.isTag(el2)) return;

          if (typeof name === "object") {
            Object.keys(name).forEach(function (key) {
              var val2 = name[key];
              setProp(el2, key, val2, _this.options.xmlMode);
            });
          } else {
            setProp(el2, name, value, _this.options.xmlMode);
          }
        });
      }

      return void 0;
    }

    exports.prop = prop;

    function setData(el, name, value) {
      var _a;

      var elem = el;
      (_a = elem.data) !== null && _a !== void 0 ? _a : elem.data = {};
      if (typeof name === "object") Object.assign(elem.data, name);else if (typeof name === "string" && value !== void 0) {
        elem.data[name] = value;
      }
    }

    function readData(el, name) {
      var domNames;
      var jsNames;
      var value;

      if (name == null) {
        domNames = Object.keys(el.attribs).filter(function (attrName) {
          return attrName.startsWith(dataAttrPrefix);
        });
        jsNames = domNames.map(function (domName2) {
          return utils_1.camelCase(domName2.slice(dataAttrPrefix.length));
        });
      } else {
        domNames = [dataAttrPrefix + utils_1.cssCase(name)];
        jsNames = [name];
      }

      for (var idx = 0; idx < domNames.length; ++idx) {
        var domName = domNames[idx];
        var jsName = jsNames[idx];

        if (hasOwn.call(el.attribs, domName) && !hasOwn.call(el.data, jsName)) {
          value = el.attribs[domName];

          if (hasOwn.call(primitives, value)) {
            value = primitives[value];
          } else if (value === String(Number(value))) {
            value = Number(value);
          } else if (rbrace.test(value)) {
            try {
              value = JSON.parse(value);
            } catch (e) {}
          }

          el.data[jsName] = value;
        }
      }

      return name == null ? el.data : value;
    }

    function data(name, value) {
      var _a;

      var elem = this[0];
      if (!elem || !utils_1.isTag(elem)) return;
      var dataEl = elem;
      (_a = dataEl.data) !== null && _a !== void 0 ? _a : dataEl.data = {};

      if (!name) {
        return readData(dataEl);
      }

      if (typeof name === "object" || value !== void 0) {
        utils_1.domEach(this, function (el) {
          if (utils_1.isTag(el)) if (typeof name === "object") setData(el, name);else setData(el, name, value);
        });
        return this;
      }

      if (hasOwn.call(dataEl.data, name)) {
        return dataEl.data[name];
      }

      return readData(dataEl, name);
    }

    exports.data = data;

    function val(value) {
      var querying = arguments.length === 0;
      var element = this[0];
      if (!element || !utils_1.isTag(element)) return querying ? void 0 : this;

      switch (element.name) {
        case "textarea":
          return this.text(value);

        case "select":
          {
            var option = this.find("option:selected");

            if (!querying) {
              if (this.attr("multiple") == null && typeof value === "object") {
                return this;
              }

              this.find("option").removeAttr("selected");
              var values = typeof value !== "object" ? [value] : value;

              for (var i = 0; i < values.length; i++) {
                this.find('option[value="' + values[i] + '"]').attr("selected", "");
              }

              return this;
            }

            return this.attr("multiple") ? option.toArray().map(function (el) {
              return static_1.text(el.children);
            }) : option.attr("value");
          }

        case "input":
        case "option":
          return querying ? this.attr("value") : this.attr("value", value);
      }

      return void 0;
    }

    exports.val = val;

    function removeAttribute(elem, name) {
      if (!elem.attribs || !hasOwn.call(elem.attribs, name)) return;
      delete elem.attribs[name];
    }

    function splitNames(names) {
      return names ? names.trim().split(rspace) : [];
    }

    function removeAttr(name) {
      var attrNames = splitNames(name);

      var _loop_1 = function (i2) {
        utils_1.domEach(this_1, function (elem) {
          if (utils_1.isTag(elem)) removeAttribute(elem, attrNames[i2]);
        });
      };

      var this_1 = this;

      for (var i = 0; i < attrNames.length; i++) {
        _loop_1(i);
      }

      return this;
    }

    exports.removeAttr = removeAttr;

    function hasClass(className) {
      return this.toArray().some(function (elem) {
        var clazz = utils_1.isTag(elem) && elem.attribs.class;
        var idx = -1;

        if (clazz && className.length) {
          while ((idx = clazz.indexOf(className, idx + 1)) > -1) {
            var end = idx + className.length;

            if ((idx === 0 || rspace.test(clazz[idx - 1])) && (end === clazz.length || rspace.test(clazz[end]))) {
              return true;
            }
          }
        }

        return false;
      });
    }

    exports.hasClass = hasClass;

    function addClass(value) {
      if (typeof value === "function") {
        return utils_1.domEach(this, function (el2, i2) {
          if (utils_1.isTag(el2)) {
            var className2 = el2.attribs.class || "";
            addClass.call([el2], value.call(el2, i2, className2));
          }
        });
      }

      if (!value || typeof value !== "string") return this;
      var classNames = value.split(rspace);
      var numElements = this.length;

      for (var i = 0; i < numElements; i++) {
        var el = this[i];
        if (!utils_1.isTag(el)) continue;
        var className = getAttr(el, "class", false);

        if (!className) {
          setAttr(el, "class", classNames.join(" ").trim());
        } else {
          var setClass = " " + className + " ";

          for (var j = 0; j < classNames.length; j++) {
            var appendClass = classNames[j] + " ";
            if (!setClass.includes(" " + appendClass)) setClass += appendClass;
          }

          setAttr(el, "class", setClass.trim());
        }
      }

      return this;
    }

    exports.addClass = addClass;

    function removeClass(name) {
      if (typeof name === "function") {
        return utils_1.domEach(this, function (el, i) {
          if (utils_1.isTag(el)) removeClass.call([el], name.call(el, i, el.attribs.class || ""));
        });
      }

      var classes = splitNames(name);
      var numClasses = classes.length;
      var removeAll = arguments.length === 0;
      return utils_1.domEach(this, function (el) {
        if (!utils_1.isTag(el)) return;

        if (removeAll) {
          el.attribs.class = "";
        } else {
          var elClasses = splitNames(el.attribs.class);
          var changed = false;

          for (var j = 0; j < numClasses; j++) {
            var index = elClasses.indexOf(classes[j]);

            if (index >= 0) {
              elClasses.splice(index, 1);
              changed = true;
              j--;
            }
          }

          if (changed) {
            el.attribs.class = elClasses.join(" ");
          }
        }
      });
    }

    exports.removeClass = removeClass;

    function toggleClass(value, stateVal) {
      if (typeof value === "function") {
        return utils_1.domEach(this, function (el2, i2) {
          if (utils_1.isTag(el2)) {
            toggleClass.call([el2], value.call(el2, i2, el2.attribs.class || "", stateVal), stateVal);
          }
        });
      }

      if (!value || typeof value !== "string") return this;
      var classNames = value.split(rspace);
      var numClasses = classNames.length;
      var state = typeof stateVal === "boolean" ? stateVal ? 1 : -1 : 0;
      var numElements = this.length;

      for (var i = 0; i < numElements; i++) {
        var el = this[i];
        if (!utils_1.isTag(el)) continue;
        var elementClasses = splitNames(el.attribs.class);

        for (var j = 0; j < numClasses; j++) {
          var index = elementClasses.indexOf(classNames[j]);

          if (state >= 0 && index < 0) {
            elementClasses.push(classNames[j]);
          } else if (state <= 0 && index >= 0) {
            elementClasses.splice(index, 1);
          }
        }

        el.attribs.class = elementClasses.join(" ");
      }

      return this;
    }

    exports.toggleClass = toggleClass;
  }

}); // ../../../node_modules/cheerio/lib/api/traversing.js


var require_traversing = __commonJS({
  "../../../node_modules/cheerio/lib/api/traversing.js"(exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.addBack = exports.add = exports.end = exports.slice = exports.index = exports.toArray = exports.get = exports.eq = exports.last = exports.first = exports.has = exports.not = exports.is = exports.filterArray = exports.filter = exports.map = exports.each = exports.contents = exports.children = exports.siblings = exports.prevUntil = exports.prevAll = exports.prev = exports.nextUntil = exports.nextAll = exports.next = exports.closest = exports.parentsUntil = exports.parents = exports.parent = exports.find = void 0;
    var tslib_1 = require_tslib();

    var domhandler_1 = require("../../../node_modules/domhandler/lib/index.js");

    var select = tslib_1.__importStar(require("../../../node_modules/cheerio-select/lib/index.js"));

    var utils_1 = require_utils();
    var static_1 = require_static();

    var htmlparser2_1 = require("../../../node_modules/htmlparser2/lib/index.js");

    var uniqueSort = htmlparser2_1.DomUtils.uniqueSort;
    var reSiblingSelector = /^\s*[~+]/;

    function find(selectorOrHaystack) {
      var _a;

      if (!selectorOrHaystack) {
        return this._make([]);
      }

      var context = this.toArray();

      if (typeof selectorOrHaystack !== "string") {
        var haystack = utils_1.isCheerio(selectorOrHaystack) ? selectorOrHaystack.toArray() : [selectorOrHaystack];
        return this._make(haystack.filter(function (elem) {
          return context.some(function (node) {
            return static_1.contains(node, elem);
          });
        }));
      }

      var elems = reSiblingSelector.test(selectorOrHaystack) ? context : this.children().toArray();
      var options = {
        context,
        root: (_a = this._root) === null || _a === void 0 ? void 0 : _a[0],
        xmlMode: this.options.xmlMode
      };
      return this._make(select.select(selectorOrHaystack, elems, options));
    }

    exports.find = find;

    function _getMatcher(matchMap) {
      return function (fn) {
        var postFns = [];

        for (var _i = 1; _i < arguments.length; _i++) {
          postFns[_i - 1] = arguments[_i];
        }

        return function (selector) {
          var _a;

          var matched = matchMap(fn, this);

          if (selector) {
            matched = filterArray(matched, selector, this.options.xmlMode, (_a = this._root) === null || _a === void 0 ? void 0 : _a[0]);
          }

          return this._make(this.length > 1 && matched.length > 1 ? postFns.reduce(function (elems, fn2) {
            return fn2(elems);
          }, matched) : matched);
        };
      };
    }

    var _matcher = _getMatcher(function (fn, elems) {
      var _a;

      var ret = [];

      for (var i = 0; i < elems.length; i++) {
        var value = fn(elems[i]);
        ret.push(value);
      }

      return (_a = new Array()).concat.apply(_a, ret);
    });

    var _singleMatcher = _getMatcher(function (fn, elems) {
      var ret = [];

      for (var i = 0; i < elems.length; i++) {
        var value = fn(elems[i]);

        if (value !== null) {
          ret.push(value);
        }
      }

      return ret;
    });

    function _matchUntil(nextElem) {
      var postFns = [];

      for (var _i = 1; _i < arguments.length; _i++) {
        postFns[_i - 1] = arguments[_i];
      }

      var matches = null;

      var innerMatcher = _getMatcher(function (nextElem2, elems) {
        var matched = [];
        utils_1.domEach(elems, function (elem) {
          for (var next_1; next_1 = nextElem2(elem); elem = next_1) {
            if (matches === null || matches === void 0 ? void 0 : matches(next_1, matched.length)) break;
            matched.push(next_1);
          }
        });
        return matched;
      }).apply(void 0, tslib_1.__spreadArray([nextElem], postFns));

      return function (selector, filterSelector) {
        var _this = this;

        matches = typeof selector === "string" ? function (elem) {
          return select.is(elem, selector, _this.options);
        } : selector ? getFilterFn(selector) : null;
        var ret = innerMatcher.call(this, filterSelector);
        matches = null;
        return ret;
      };
    }

    function _removeDuplicates(elems) {
      return Array.from(new Set(elems));
    }

    exports.parent = _singleMatcher(function (_a) {
      var parent = _a.parent;
      return parent && !domhandler_1.isDocument(parent) ? parent : null;
    }, _removeDuplicates);
    exports.parents = _matcher(function (elem) {
      var matched = [];

      while (elem.parent && !domhandler_1.isDocument(elem.parent)) {
        matched.push(elem.parent);
        elem = elem.parent;
      }

      return matched;
    }, uniqueSort, function (elems) {
      return elems.reverse();
    });
    exports.parentsUntil = _matchUntil(function (_a) {
      var parent = _a.parent;
      return parent && !domhandler_1.isDocument(parent) ? parent : null;
    }, uniqueSort, function (elems) {
      return elems.reverse();
    });

    function closest(selector) {
      var _this = this;

      var set = [];

      if (!selector) {
        return this._make(set);
      }

      utils_1.domEach(this, function (elem) {
        var _a;

        while (elem && elem.type !== "root") {
          if (!selector || filterArray([elem], selector, _this.options.xmlMode, (_a = _this._root) === null || _a === void 0 ? void 0 : _a[0]).length) {
            if (elem && !set.includes(elem)) {
              set.push(elem);
            }

            break;
          }

          elem = elem.parent;
        }
      });
      return this._make(set);
    }

    exports.closest = closest;
    exports.next = _singleMatcher(function (elem) {
      return htmlparser2_1.DomUtils.nextElementSibling(elem);
    });
    exports.nextAll = _matcher(function (elem) {
      var matched = [];

      while (elem.next) {
        elem = elem.next;
        if (utils_1.isTag(elem)) matched.push(elem);
      }

      return matched;
    }, _removeDuplicates);
    exports.nextUntil = _matchUntil(function (el) {
      return htmlparser2_1.DomUtils.nextElementSibling(el);
    }, _removeDuplicates);
    exports.prev = _singleMatcher(function (elem) {
      return htmlparser2_1.DomUtils.prevElementSibling(elem);
    });
    exports.prevAll = _matcher(function (elem) {
      var matched = [];

      while (elem.prev) {
        elem = elem.prev;
        if (utils_1.isTag(elem)) matched.push(elem);
      }

      return matched;
    }, _removeDuplicates);
    exports.prevUntil = _matchUntil(function (el) {
      return htmlparser2_1.DomUtils.prevElementSibling(el);
    }, _removeDuplicates);
    exports.siblings = _matcher(function (elem) {
      return htmlparser2_1.DomUtils.getSiblings(elem).filter(function (el) {
        return utils_1.isTag(el) && el !== elem;
      });
    }, uniqueSort);
    exports.children = _matcher(function (elem) {
      return htmlparser2_1.DomUtils.getChildren(elem).filter(utils_1.isTag);
    }, _removeDuplicates);

    function contents() {
      var elems = this.toArray().reduce(function (newElems, elem) {
        return domhandler_1.hasChildren(elem) ? newElems.concat(elem.children) : newElems;
      }, []);
      return this._make(elems);
    }

    exports.contents = contents;

    function each(fn) {
      var i = 0;
      var len = this.length;

      while (i < len && fn.call(this[i], i, this[i]) !== false) ++i;

      return this;
    }

    exports.each = each;

    function map(fn) {
      var elems = [];

      for (var i = 0; i < this.length; i++) {
        var el = this[i];
        var val = fn.call(el, i, el);

        if (val != null) {
          elems = elems.concat(val);
        }
      }

      return this._make(elems);
    }

    exports.map = map;

    function getFilterFn(match) {
      if (typeof match === "function") {
        return function (el, i) {
          return match.call(el, i, el);
        };
      }

      if (utils_1.isCheerio(match)) {
        return function (el) {
          return Array.prototype.includes.call(match, el);
        };
      }

      return function (el) {
        return match === el;
      };
    }

    function filter(match) {
      var _a;

      return this._make(filterArray(this.toArray(), match, this.options.xmlMode, (_a = this._root) === null || _a === void 0 ? void 0 : _a[0]));
    }

    exports.filter = filter;

    function filterArray(nodes, match, xmlMode, root) {
      return typeof match === "string" ? select.filter(match, nodes, {
        xmlMode,
        root
      }) : nodes.filter(getFilterFn(match));
    }

    exports.filterArray = filterArray;

    function is(selector) {
      var nodes = this.toArray();
      return typeof selector === "string" ? select.some(nodes.filter(utils_1.isTag), selector, this.options) : selector ? nodes.some(getFilterFn(selector)) : false;
    }

    exports.is = is;

    function not(match) {
      var nodes = this.toArray();

      if (typeof match === "string") {
        var matches_1 = new Set(select.filter(match, nodes, this.options));
        nodes = nodes.filter(function (el) {
          return !matches_1.has(el);
        });
      } else {
        var filterFn_1 = getFilterFn(match);
        nodes = nodes.filter(function (el, i) {
          return !filterFn_1(el, i);
        });
      }

      return this._make(nodes);
    }

    exports.not = not;

    function has(selectorOrHaystack) {
      var _this = this;

      return this.filter(typeof selectorOrHaystack === "string" ? ":has(" + selectorOrHaystack + ")" : function (_, el) {
        return _this._make(el).find(selectorOrHaystack).length > 0;
      });
    }

    exports.has = has;

    function first() {
      return this.length > 1 ? this._make(this[0]) : this;
    }

    exports.first = first;

    function last() {
      return this.length > 0 ? this._make(this[this.length - 1]) : this;
    }

    exports.last = last;

    function eq(i) {
      var _a;

      i = +i;
      if (i === 0 && this.length <= 1) return this;
      if (i < 0) i = this.length + i;
      return this._make((_a = this[i]) !== null && _a !== void 0 ? _a : []);
    }

    exports.eq = eq;

    function get(i) {
      if (i == null) {
        return this.toArray();
      }

      return this[i < 0 ? this.length + i : i];
    }

    exports.get = get;

    function toArray() {
      return Array.prototype.slice.call(this);
    }

    exports.toArray = toArray;

    function index(selectorOrNeedle) {
      var $haystack;
      var needle;

      if (selectorOrNeedle == null) {
        $haystack = this.parent().children();
        needle = this[0];
      } else if (typeof selectorOrNeedle === "string") {
        $haystack = this._make(selectorOrNeedle);
        needle = this[0];
      } else {
        $haystack = this;
        needle = utils_1.isCheerio(selectorOrNeedle) ? selectorOrNeedle[0] : selectorOrNeedle;
      }

      return Array.prototype.indexOf.call($haystack, needle);
    }

    exports.index = index;

    function slice(start, end2) {
      return this._make(Array.prototype.slice.call(this, start, end2));
    }

    exports.slice = slice;

    function end() {
      var _a;

      return (_a = this.prevObject) !== null && _a !== void 0 ? _a : this._make([]);
    }

    exports.end = end;

    function add(other, context) {
      var selection = this._make(other, context);

      var contents2 = uniqueSort(tslib_1.__spreadArray(tslib_1.__spreadArray([], this.get()), selection.get()));
      return this._make(contents2);
    }

    exports.add = add;

    function addBack(selector) {
      return this.prevObject ? this.add(selector ? this.prevObject.filter(selector) : this.prevObject) : this;
    }

    exports.addBack = addBack;
  }

}); // ../../../node_modules/cheerio/lib/api/manipulation.js


var require_manipulation = __commonJS({
  "../../../node_modules/cheerio/lib/api/manipulation.js"(exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.clone = exports.text = exports.toString = exports.html = exports.empty = exports.replaceWith = exports.remove = exports.insertBefore = exports.before = exports.insertAfter = exports.after = exports.wrapAll = exports.unwrap = exports.wrapInner = exports.wrap = exports.prepend = exports.append = exports.prependTo = exports.appendTo = exports._makeDomArray = void 0;
    var tslib_1 = require_tslib();

    var domhandler_1 = require("../../../node_modules/domhandler/lib/index.js");

    var domhandler_2 = require("../../../node_modules/domhandler/lib/index.js");

    var parse_1 = tslib_1.__importStar(require_parse());

    var static_1 = require_static();
    var utils_1 = require_utils();

    var htmlparser2_1 = require("../../../node_modules/htmlparser2/lib/index.js");

    function _makeDomArray(elem, clone2) {
      var _this = this;

      if (elem == null) {
        return [];
      }

      if (utils_1.isCheerio(elem)) {
        return clone2 ? utils_1.cloneDom(elem.get()) : elem.get();
      }

      if (Array.isArray(elem)) {
        return elem.reduce(function (newElems, el) {
          return newElems.concat(_this._makeDomArray(el, clone2));
        }, []);
      }

      if (typeof elem === "string") {
        return parse_1.default(elem, this.options, false).children;
      }

      return clone2 ? utils_1.cloneDom([elem]) : [elem];
    }

    exports._makeDomArray = _makeDomArray;

    function _insert(concatenator) {
      return function () {
        var _this = this;

        var elems = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          elems[_i] = arguments[_i];
        }

        var lastIdx = this.length - 1;
        return utils_1.domEach(this, function (el, i) {
          if (!domhandler_1.hasChildren(el)) return;
          var domSrc = typeof elems[0] === "function" ? elems[0].call(el, i, static_1.html(el.children)) : elems;

          var dom = _this._makeDomArray(domSrc, i < lastIdx);

          concatenator(dom, el.children, el);
        });
      };
    }

    function uniqueSplice(array, spliceIdx, spliceCount, newElems, parent) {
      var _a, _b;

      var spliceArgs = tslib_1.__spreadArray([spliceIdx, spliceCount], newElems);

      var prev = array[spliceIdx - 1] || null;
      var next = array[spliceIdx + spliceCount] || null;

      for (var idx = 0; idx < newElems.length; ++idx) {
        var node = newElems[idx];
        var oldParent = node.parent;

        if (oldParent) {
          var prevIdx = oldParent.children.indexOf(newElems[idx]);

          if (prevIdx > -1) {
            oldParent.children.splice(prevIdx, 1);

            if (parent === oldParent && spliceIdx > prevIdx) {
              spliceArgs[0]--;
            }
          }
        }

        node.parent = parent;

        if (node.prev) {
          node.prev.next = (_a = node.next) !== null && _a !== void 0 ? _a : null;
        }

        if (node.next) {
          node.next.prev = (_b = node.prev) !== null && _b !== void 0 ? _b : null;
        }

        node.prev = newElems[idx - 1] || prev;
        node.next = newElems[idx + 1] || next;
      }

      if (prev) {
        prev.next = newElems[0];
      }

      if (next) {
        next.prev = newElems[newElems.length - 1];
      }

      return array.splice.apply(array, spliceArgs);
    }

    function appendTo(target) {
      var appendTarget = utils_1.isCheerio(target) ? target : this._make(target);
      appendTarget.append(this);
      return this;
    }

    exports.appendTo = appendTo;

    function prependTo(target) {
      var prependTarget = utils_1.isCheerio(target) ? target : this._make(target);
      prependTarget.prepend(this);
      return this;
    }

    exports.prependTo = prependTo;
    exports.append = _insert(function (dom, children, parent) {
      uniqueSplice(children, children.length, 0, dom, parent);
    });
    exports.prepend = _insert(function (dom, children, parent) {
      uniqueSplice(children, 0, 0, dom, parent);
    });

    function _wrap(insert) {
      return function (wrapper) {
        var lastIdx = this.length - 1;
        var lastParent = this.parents().last();

        for (var i = 0; i < this.length; i++) {
          var el = this[i];
          var wrap_1 = typeof wrapper === "function" ? wrapper.call(el, i, el) : typeof wrapper === "string" && !utils_1.isHtml(wrapper) ? lastParent.find(wrapper).clone() : wrapper;

          var wrapperDom = this._makeDomArray(wrap_1, i < lastIdx)[0];

          if (!wrapperDom || !htmlparser2_1.DomUtils.hasChildren(wrapperDom)) continue;
          var elInsertLocation = wrapperDom;
          var j = 0;

          while (j < elInsertLocation.children.length) {
            var child = elInsertLocation.children[j];

            if (utils_1.isTag(child)) {
              elInsertLocation = child;
              j = 0;
            } else {
              j++;
            }
          }

          insert(el, elInsertLocation, [wrapperDom]);
        }

        return this;
      };
    }

    exports.wrap = _wrap(function (el, elInsertLocation, wrapperDom) {
      var parent = el.parent;
      if (!parent) return;
      var siblings = parent.children;
      var index = siblings.indexOf(el);
      parse_1.update([el], elInsertLocation);
      uniqueSplice(siblings, index, 0, wrapperDom, parent);
    });
    exports.wrapInner = _wrap(function (el, elInsertLocation, wrapperDom) {
      if (!domhandler_1.hasChildren(el)) return;
      parse_1.update(el.children, elInsertLocation);
      parse_1.update(wrapperDom, el);
    });

    function unwrap(selector) {
      var _this = this;

      this.parent(selector).not("body").each(function (_, el) {
        _this._make(el).replaceWith(el.children);
      });
      return this;
    }

    exports.unwrap = unwrap;

    function wrapAll(wrapper) {
      var el = this[0];

      if (el) {
        var wrap_2 = this._make(typeof wrapper === "function" ? wrapper.call(el, 0, el) : wrapper).insertBefore(el);

        var elInsertLocation = void 0;

        for (var i = 0; i < wrap_2.length; i++) {
          if (wrap_2[i].type === "tag") elInsertLocation = wrap_2[i];
        }

        var j = 0;

        while (elInsertLocation && j < elInsertLocation.children.length) {
          var child = elInsertLocation.children[j];

          if (child.type === "tag") {
            elInsertLocation = child;
            j = 0;
          } else {
            j++;
          }
        }

        if (elInsertLocation) this._make(elInsertLocation).append(this);
      }

      return this;
    }

    exports.wrapAll = wrapAll;

    function after() {
      var _this = this;

      var elems = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        elems[_i] = arguments[_i];
      }

      var lastIdx = this.length - 1;
      return utils_1.domEach(this, function (el, i) {
        var parent = el.parent;

        if (!htmlparser2_1.DomUtils.hasChildren(el) || !parent) {
          return;
        }

        var siblings = parent.children;
        var index = siblings.indexOf(el);
        if (index < 0) return;
        var domSrc = typeof elems[0] === "function" ? elems[0].call(el, i, static_1.html(el.children)) : elems;

        var dom = _this._makeDomArray(domSrc, i < lastIdx);

        uniqueSplice(siblings, index + 1, 0, dom, parent);
      });
    }

    exports.after = after;

    function insertAfter(target) {
      var _this = this;

      if (typeof target === "string") {
        target = this._make(target);
      }

      this.remove();
      var clones = [];

      this._makeDomArray(target).forEach(function (el) {
        var clonedSelf = _this.clone().toArray();

        var parent = el.parent;

        if (!parent) {
          return;
        }

        var siblings = parent.children;
        var index = siblings.indexOf(el);
        if (index < 0) return;
        uniqueSplice(siblings, index + 1, 0, clonedSelf, parent);
        clones.push.apply(clones, clonedSelf);
      });

      return this._make(clones);
    }

    exports.insertAfter = insertAfter;

    function before() {
      var _this = this;

      var elems = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        elems[_i] = arguments[_i];
      }

      var lastIdx = this.length - 1;
      return utils_1.domEach(this, function (el, i) {
        var parent = el.parent;

        if (!htmlparser2_1.DomUtils.hasChildren(el) || !parent) {
          return;
        }

        var siblings = parent.children;
        var index = siblings.indexOf(el);
        if (index < 0) return;
        var domSrc = typeof elems[0] === "function" ? elems[0].call(el, i, static_1.html(el.children)) : elems;

        var dom = _this._makeDomArray(domSrc, i < lastIdx);

        uniqueSplice(siblings, index, 0, dom, parent);
      });
    }

    exports.before = before;

    function insertBefore(target) {
      var _this = this;

      var targetArr = this._make(target);

      this.remove();
      var clones = [];
      utils_1.domEach(targetArr, function (el) {
        var clonedSelf = _this.clone().toArray();

        var parent = el.parent;

        if (!parent) {
          return;
        }

        var siblings = parent.children;
        var index = siblings.indexOf(el);
        if (index < 0) return;
        uniqueSplice(siblings, index, 0, clonedSelf, parent);
        clones.push.apply(clones, clonedSelf);
      });
      return this._make(clones);
    }

    exports.insertBefore = insertBefore;

    function remove(selector) {
      var elems = selector ? this.filter(selector) : this;
      utils_1.domEach(elems, function (el) {
        htmlparser2_1.DomUtils.removeElement(el);
        el.prev = el.next = el.parent = null;
      });
      return this;
    }

    exports.remove = remove;

    function replaceWith(content) {
      var _this = this;

      return utils_1.domEach(this, function (el, i) {
        var parent = el.parent;

        if (!parent) {
          return;
        }

        var siblings = parent.children;
        var cont = typeof content === "function" ? content.call(el, i, el) : content;

        var dom = _this._makeDomArray(cont);

        parse_1.update(dom, null);
        var index = siblings.indexOf(el);
        uniqueSplice(siblings, index, 1, dom, parent);

        if (!dom.includes(el)) {
          el.parent = el.prev = el.next = null;
        }
      });
    }

    exports.replaceWith = replaceWith;

    function empty() {
      return utils_1.domEach(this, function (el) {
        if (!htmlparser2_1.DomUtils.hasChildren(el)) return;
        el.children.forEach(function (child) {
          child.next = child.prev = child.parent = null;
        });
        el.children.length = 0;
      });
    }

    exports.empty = empty;

    function html(str) {
      if (str === void 0) {
        var el = this[0];
        if (!el || !htmlparser2_1.DomUtils.hasChildren(el)) return null;
        return static_1.html(el.children, this.options);
      }

      var opts = tslib_1.__assign(tslib_1.__assign({}, this.options), {
        context: null
      });

      return utils_1.domEach(this, function (el2) {
        if (!htmlparser2_1.DomUtils.hasChildren(el2)) return;
        el2.children.forEach(function (child) {
          child.next = child.prev = child.parent = null;
        });
        opts.context = el2;
        var content = utils_1.isCheerio(str) ? str.toArray() : parse_1.default("" + str, opts, false).children;
        parse_1.update(content, el2);
      });
    }

    exports.html = html;

    function toString() {
      return static_1.html(this, this.options);
    }

    exports.toString = toString;

    function text(str) {
      var _this = this;

      if (str === void 0) {
        return static_1.text(this);
      }

      if (typeof str === "function") {
        return utils_1.domEach(this, function (el, i) {
          text.call(_this._make(el), str.call(el, i, static_1.text([el])));
        });
      }

      return utils_1.domEach(this, function (el) {
        if (!htmlparser2_1.DomUtils.hasChildren(el)) return;
        el.children.forEach(function (child) {
          child.next = child.prev = child.parent = null;
        });
        var textNode = new domhandler_2.Text(str);
        parse_1.update(textNode, el);
      });
    }

    exports.text = text;

    function clone() {
      return this._make(utils_1.cloneDom(this.get()));
    }

    exports.clone = clone;
  }

}); // ../../../node_modules/cheerio/lib/api/css.js


var require_css = __commonJS({
  "../../../node_modules/cheerio/lib/api/css.js"(exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.css = void 0;
    var utils_1 = require_utils();

    function css(prop, val) {
      if (prop != null && val != null || typeof prop === "object" && !Array.isArray(prop)) {
        return utils_1.domEach(this, function (el, i) {
          if (utils_1.isTag(el)) {
            setCss(el, prop, val, i);
          }
        });
      }

      return getCss(this[0], prop);
    }

    exports.css = css;

    function setCss(el, prop, value, idx) {
      if (typeof prop === "string") {
        var styles = getCss(el);
        var val = typeof value === "function" ? value.call(el, idx, styles[prop]) : value;

        if (val === "") {
          delete styles[prop];
        } else if (val != null) {
          styles[prop] = val;
        }

        el.attribs.style = stringify(styles);
      } else if (typeof prop === "object") {
        Object.keys(prop).forEach(function (k, i) {
          setCss(el, k, prop[k], i);
        });
      }
    }

    function getCss(el, prop) {
      if (!el || !utils_1.isTag(el)) return;
      var styles = parse(el.attribs.style);

      if (typeof prop === "string") {
        return styles[prop];
      }

      if (Array.isArray(prop)) {
        var newStyles_1 = {};
        prop.forEach(function (item) {
          if (styles[item] != null) {
            newStyles_1[item] = styles[item];
          }
        });
        return newStyles_1;
      }

      return styles;
    }

    function stringify(obj) {
      return Object.keys(obj).reduce(function (str, prop) {
        return "" + str + (str ? " " : "") + prop + ": " + obj[prop] + ";";
      }, "");
    }

    function parse(styles) {
      styles = (styles || "").trim();
      if (!styles) return {};
      return styles.split(";").reduce(function (obj, str) {
        var n = str.indexOf(":");
        if (n < 1 || n === str.length - 1) return obj;
        obj[str.slice(0, n).trim()] = str.slice(n + 1).trim();
        return obj;
      }, {});
    }
  }

}); // ../../../node_modules/cheerio/lib/api/forms.js


var require_forms = __commonJS({
  "../../../node_modules/cheerio/lib/api/forms.js"(exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.serializeArray = exports.serialize = void 0;
    var utils_1 = require_utils();
    var submittableSelector = "input,select,textarea,keygen";
    var r20 = /%20/g;
    var rCRLF = /\r?\n/g;

    function serialize() {
      var arr = this.serializeArray();
      var retArr = arr.map(function (data) {
        return encodeURIComponent(data.name) + "=" + encodeURIComponent(data.value);
      });
      return retArr.join("&").replace(r20, "+");
    }

    exports.serialize = serialize;

    function serializeArray() {
      var _this = this;

      return this.map(function (_, elem) {
        var $elem = _this._make(elem);

        if (utils_1.isTag(elem) && elem.name === "form") {
          return $elem.find(submittableSelector).toArray();
        }

        return $elem.filter(submittableSelector).toArray();
      }).filter('[name!=""]:enabled:not(:submit, :button, :image, :reset, :file):matches([checked], :not(:checkbox, :radio))').map(function (_, elem) {
        var _a;

        var $elem = _this._make(elem);

        var name = $elem.attr("name");
        var value = (_a = $elem.val()) !== null && _a !== void 0 ? _a : "";

        if (Array.isArray(value)) {
          return value.map(function (val) {
            return {
              name,
              value: val.replace(rCRLF, "\r\n")
            };
          });
        }

        return {
          name,
          value: value.replace(rCRLF, "\r\n")
        };
      }).toArray();
    }

    exports.serializeArray = serializeArray;
  }

}); // ../../../node_modules/cheerio/lib/cheerio.js


var require_cheerio = __commonJS({
  "../../../node_modules/cheerio/lib/cheerio.js"(exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Cheerio = void 0;
    var tslib_1 = require_tslib();

    var parse_1 = tslib_1.__importDefault(require_parse());

    var options_1 = tslib_1.__importDefault(require_options());

    var utils_1 = require_utils();

    var Attributes = tslib_1.__importStar(require_attributes());

    var Traversing = tslib_1.__importStar(require_traversing());

    var Manipulation = tslib_1.__importStar(require_manipulation());

    var Css = tslib_1.__importStar(require_css());

    var Forms = tslib_1.__importStar(require_forms());

    var Cheerio = function () {
      function Cheerio2(selector, context, root, options) {
        var _this = this;

        if (options === void 0) {
          options = options_1.default;
        }

        this.length = 0;
        this.options = options;
        if (!selector) return this;

        if (root) {
          if (typeof root === "string") root = parse_1.default(root, this.options, false);
          this._root = new this.constructor(root, null, null, this.options);
          this._root._root = this._root;
        }

        if (utils_1.isCheerio(selector)) return selector;
        var elements = typeof selector === "string" && utils_1.isHtml(selector) ? parse_1.default(selector, this.options, false).children : isNode(selector) ? [selector] : Array.isArray(selector) ? selector : null;

        if (elements) {
          elements.forEach(function (elem, idx) {
            _this[idx] = elem;
          });
          this.length = elements.length;
          return this;
        }

        var search = selector;
        var searchContext = !context ? this._root : typeof context === "string" ? utils_1.isHtml(context) ? this._make(parse_1.default(context, this.options, false)) : (search = context + " " + search, this._root) : utils_1.isCheerio(context) ? context : this._make(context);
        if (!searchContext) return this;
        return searchContext.find(search);
      }

      Cheerio2.prototype._make = function (dom, context) {
        var cheerio = new this.constructor(dom, context, this._root, this.options);
        cheerio.prevObject = this;
        return cheerio;
      };

      return Cheerio2;
    }();

    exports.Cheerio = Cheerio;
    Cheerio.prototype.cheerio = "[cheerio object]";
    Cheerio.prototype.splice = Array.prototype.splice;
    Cheerio.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
    Object.assign(Cheerio.prototype, Attributes, Traversing, Manipulation, Css, Forms);

    function isNode(obj) {
      return !!obj.name || obj.type === "root" || obj.type === "text" || obj.type === "comment";
    }
  }

}); // ../../../node_modules/cheerio/lib/load.js


var require_load = __commonJS({
  "../../../node_modules/cheerio/lib/load.js"(exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.load = void 0;
    var tslib_1 = require_tslib();

    var options_1 = tslib_1.__importStar(require_options());

    var staticMethods = tslib_1.__importStar(require_static());

    var cheerio_1 = require_cheerio();

    var parse_1 = tslib_1.__importDefault(require_parse());

    function load(content, options, isDocument) {
      if (isDocument === void 0) {
        isDocument = true;
      }

      if (content == null) {
        throw new Error("cheerio.load() expects a string");
      }

      var internalOpts = tslib_1.__assign(tslib_1.__assign({}, options_1.default), options_1.flatten(options));

      var root = parse_1.default(content, internalOpts, isDocument);

      var LoadedCheerio = function (_super) {
        tslib_1.__extends(LoadedCheerio2, _super);

        function LoadedCheerio2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }

        return LoadedCheerio2;
      }(cheerio_1.Cheerio);

      function initialize(selector, context, r, opts) {
        if (r === void 0) {
          r = root;
        }

        return new LoadedCheerio(selector, context, r, tslib_1.__assign(tslib_1.__assign({}, internalOpts), options_1.flatten(opts)));
      }

      Object.assign(initialize, staticMethods, {
        load,
        _root: root,
        _options: internalOpts,
        fn: LoadedCheerio.prototype,
        prototype: LoadedCheerio.prototype
      });
      return initialize;
    }

    exports.load = load;
  }

}); // ../../../node_modules/cheerio/lib/index.js


var require_lib = __commonJS({
  "../../../node_modules/cheerio/lib/index.js"(exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.root = exports.parseHTML = exports.merge = exports.contains = void 0;
    var tslib_1 = require_tslib();

    tslib_1.__exportStar(require_types(), exports);

    tslib_1.__exportStar(require_load(), exports);

    var load_1 = require_load();
    exports.default = load_1.load([]);

    var staticMethods = tslib_1.__importStar(require_static());

    exports.contains = staticMethods.contains;
    exports.merge = staticMethods.merge;
    exports.parseHTML = staticMethods.parseHTML;
    exports.root = staticMethods.root;
  }

}); // .beyond/uimport/temp/cheerio/1.0.0-rc.10.js


var rc_10_exports = {};

__export(rc_10_exports, {
  default: () => rc_10_default
});

module.exports = __toCommonJS(rc_10_exports);

__reExport(rc_10_exports, __toESM(require_lib()), module.exports);

var import_cheerio = __toESM(require_lib());

var rc_10_default = import_cheerio.default;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
};

code(module, require);
return module.exports;
});

