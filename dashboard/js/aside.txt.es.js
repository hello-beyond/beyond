define(["exports", "@beyond-js/kernel/bundle"], function (_exports, dependency_0) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.txt = _exports.hmr = void 0;
  const {
    Bundle: __Bundle,
    externals
  } = dependency_0;

  const __pkg = new __Bundle({
    "module": "@beyond-js/dashboard/aside",
    "multibundle": true,
    "bundle": "txt"
  }).package('es');

  ;
  externals.register(new Map([]));
  const {
    module
  } = __pkg.bundle;
  const ims = new Map();
  /*********************
  INTERNAL MODULE: ./txt
  *********************/

  ims.set('./txt', {
    hash: 1152158801,
    creator: function (require, exports) {
      exports.txt = {
        "favorites": {
          "title": "Favorites",
          "actions": {
            "save": "Guardar en favoritos",
            "delete": "¿Desea eliminar esta elemento de sus favoritos?",
            "new": "Nueva Lista",
            "select": "Seleccionar de la lista existente"
          },
          "newList": "Nueva lista",
          "goToList": "Seleccionar lista existente",
          "newControl": {
            "placeholder": "Nombre de la lista",
            "label": "Nombre de la lista"
          },
          "empty": {
            "title": "No Favorites",
            "description": "Here you will see each element added as a favorite"
          }
        },
        "empty": "Selecciona un modulo para que puedas ver su contenido",
        "list": {
          "empty": "No hay elementos"
        },
        "backend": {
          "title": "Backend code",
          "sessions": "Sessions Backend",
          "core": "Core Backend",
          "description": "BeyondJS permite trabajar de manera simple con acciones en realtime implementadas con websocket, puedes configurarlo si deseas.",
          "action": "Crear",
          "read": "Leer más"
        },
        "declarations": {
          "title": "Declaraciones",
          "description": "Las declaraciones permiten que el IDE identifique los objetos utilizados y garantice el buen funcionamiento de typescript",
          "action": "Actualizar"
        },
        "static": {
          "title": "Static files",
          "form": {
            "title": "Selecciona una image o arrastrala.",
            "errors": {
              "invalidFile": " El archivo subido no es válido, por favor verifiquelo y vuelva a intentarlo"
            },
            "header": {
              "title": "Agrega un archivo",
              "detail": "Selecciona un archivo como recurso estatico"
            },
            "actions": {
              "close": "Cerrar"
            }
          }
        },
        "dependencies": {
          "title": "Dependencies"
        },
        "template": {
          "title": "Template",
          "description": "El template permite definir la configuración de estilos general de la aplicación y los overwrites.",
          "styles": {
            "title": "Estilos",
            "description": "Estilos generales de la aplicación, que serán compartidos entre todos los módulos."
          }
        },
        "overwrites": {
          "title": "Overwrites",
          "description": "Los overwrites de un módulo te permiten customizar el diseño y los textos de un módulo."
        },
        "publish": {
          "title": "Publicar",
          "description": "El proceso de compilación de tu aplicación es esencial para poder dejar los archivos minificados, integrados y oprimizados para la puesta en marcha web o móvil, por suerte, beyond hace todo esto por tí."
        },
        "actions": {
          "readMore": "Leer más",
          "publish": "Publicar"
        },
        "tree": {
          "actions": {
            "delete": "Delete",
            "create": "Create",
            "addBundle": "Add bundle",
            "rename": "Rename",
            "save": "Save"
          },
          "confirm": {
            "delete": "Do you really want to remove this element?"
          },
          "modules": "Modules",
          "delete": "Delete",
          "rename": "Rename",
          "errors": {
            "EXT_INVALID": "Extensión no válida",
            "default": "Ha ocurrido un error, reinicie el servicio y vuelva a intentarlo"
          },
          "itemActions": {
            "create": {
              "title": "Crear archivo",
              "placeholder": "/path/file.ext",
              "action": "Guardar",
              "label": "Nombre del archivo"
            }
          },
          "files": {
            "delete": "¿Realmente deseas eliminar el archivo?",
            "actions": {
              "save": "Guardar",
              "create": "Crear",
              "delete": "Eliminar",
              "new": "Nueva Lista",
              "select": "Seleccionar de la lista existente"
            }
          },
          "favorites": {
            "title": "Selecciona la lista de favoritos",
            "actions": {
              "save": "Guardar en favoritos",
              "delete": "¿Desea eliminar esta elemento de sus favoritos?",
              "new": "Nueva Lista",
              "select": "Seleccionar de la lista existente"
            },
            "newList": "Nueva lista",
            "goToList": "Seleccionar lista existente",
            "newControl": {
              "placeholder": "Nombre de la lista",
              "label": "Nombre de la lista"
            }
          },
          "bundle": {
            "title": "Selecciona un tipo de bundle",
            "widget": {
              "title": "Titulo bundle",
              "inputs": {
                "route": {
                  "label": "Page Route",
                  "error": "invalid URL"
                },
                "type": {
                  "label": "Widget Type",
                  "placeholder": "Select..."
                },
                "name": {
                  "label": "Web Component Name",
                  "error": "Invalid Name"
                },
                "layoutId": {
                  "label": "Identificador del Layout",
                  "error": "El identificador no es valido"
                }
              }
            },
            "actions": {
              "save": "Agregar bundle",
              "next": "Continuar"
            }
          },
          "static": {
            "title": "Static files",
            "form": {
              "title": "Selecciona una imagen o arrastrala.",
              "errors": {
                "invalidFile": " El archivo subido no es válido, por favor verifiquelo y vuelva a intentarlo"
              },
              "header": {
                "title": "Agrega un archivo",
                "detail": "Selecciona un archivo como recurso estatico"
              },
              "actions": {
                "close": "Cerrar"
              }
            }
          },
          "module": {
            "empty": {
              "title": "Select a module",
              "description": "Go to the application tab and select the module you want to use as a work table"
            }
          },
          "template": {
            "application": "Application",
            "global": "Globals",
            "processors": "Processors",
            "title": "Template",
            "description": "El template permite definir la configuración de estilos general de la aplicación y los overwrites.",
            "styles": {
              "title": "Estilos",
              "description": "Estilos generales de la aplicación, que serán compartidos entre todos los módulos."
            }
          }
        }
      };
    }
  });
  __pkg.exports.descriptor = [{
    "im": "./txt",
    "from": "txt",
    "name": "txt"
  }];
  let txt; // Module exports

  _exports.txt = txt;

  __pkg.exports.process = function ({
    require,
    prop,
    value
  }) {
    (require || prop === 'txt') && (_exports.txt = txt = require ? require('./txt').txt : value);
  };

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports.hmr = hmr;

  __pkg.initialise(ims);
});