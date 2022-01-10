define([], function () {
  "use strict";

  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/aside/txt', true, {
    "txt": {
      "multilanguage": true
    }
  });
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package('en');

  __pkg.exports.process = (require, _exports) => _exports.txt = {
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
          "invalidFile": "The uploaded file is invalid, please verify and try again"
        },
        "header": {
          "title": "Add file",
          "detail": "As static resource"
        },
        "actions": {
          "close": "Close"
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
              "error": "The web component name must be has the next structure: 'web-component'"
            },
            "layoutId": {
              "label": "Layout identifier",
              "error": "The layout identifier is not valid"
            }
          }
        },
        "actions": {
          "save": "Add bundle",
          "next": "Continuar"
        }
      },
      "static": {
        "title": "Static files",
        "form": {
          "title": "Select an image or drag it.",
          "errors": {
            "invalidFile": "The uploaded file is invalid, please verify and try again"
          },
          "header": {
            "title": "Add file",
            "detail": "As static resource"
          },
          "actions": {
            "close": "Close"
          }
        }
      },
      "module": {
        "empty": {
          "title": "Select a module",
          "description": "Go to the application tab and select the module you want to use as a work table"
        }
      }
    }
  };

  __pkg.initialise();
});