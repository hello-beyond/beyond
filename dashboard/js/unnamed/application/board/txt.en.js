define([], function () {
  "use strict";

  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/application/board/txt', true, {
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
    "actions": {
      "navigate": "Navegar",
      "compile": "Compilar",
      "editDescription": "Edit description",
      "generatingDeclarations": "Generando...",
      "publish": "Publish",
      "update": "Update dependencies",
      "declarations": "Generar declaraciones",
      "start": "Play",
      "stop": "Stop",
      "restart": "Restart"
    },
    "application": {
      "info": {
        "description": "Descripción",
        "title": "Titulo",
        "name": "Nombre",
        "empty": {
          "description": "La aplicación no posee descripción",
          "title": "Agrega un titulo para tu aplicación",
          "name": "Agrega un nombre para tu aplicación"
        }
      },
      "actions": {
        "save": "Guardar",
        "close": "Cerrar"
      },
      "error404": "Application not found"
    },
    "aside": {
      "module": {
        "empty": {
          "title": "Select a module",
          "description": "Go to the application tab and select the module you want to use as a work table"
        }
      },
      "tree": {
        "actions": {
          "delete": "Are you sure to remove the element?",
          "create": "Create",
          "addBundle": "Add bundle",
          "rename": "Rename"
        }
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
        "title": "Static files"
      },
      "dependencies": {
        "title": "Dependencies"
      },
      "favorites": {
        "title": "Favorites",
        "empty": {
          "title": "No Favorites",
          "description": "Here you will see each element added as a favorite"
        }
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
      }
    },
    "compilation": "Compilación",
    "transpilation": "Transpilación",
    "info": {
      "route": "URL"
    },
    "processors": {
      "alerts": "Errors and Warnings",
      "jsx": "JSX Code",
      "js": "JS / Javascript Code",
      "scss": "SCSS / Stylesheets",
      "ts": "TS / Typescript code",
      "less": "LESS / Stylesheets",
      "txt": "TXT / TEXTS"
    },
    "forms": {
      "createFile": {
        "title": "Crear elemento",
        "action": "Crear",
        "label": "Nombre",
        "errors": {
          "FAILED": "Ha ocurrido un error, por favor vuelva a intentarlo o reinicie el servicio",
          "PROCESSOR": "¡Ups! Al parecer estas intentando crear que no es de tipo",
          "INVALID": "La estructura del nombre de archivo no es correcta",
          "PROCESSOR_NOT_FOUND": "El procesador sobre el que se está intentando trabajar, no existe."
        }
      }
    },
    "modules": {
      "header": {
        "searcher": "¿Que buscas?"
      },
      "actions": {
        "add": "Crear modulo",
        "navigate": "Navegar"
      },
      "empty": {
        "new": {
          "title": "¡Excelente! Ya creamos tu aplicación",
          "description": "En <b class=\"primary-color\">BeyondJS</b> todo se maneja con modulos. Avancemos creando el primero."
        },
        "application": {
          "title": "Aun no existen módulos en tu aplicación",
          "description": "Demos el primer paso"
        },
        "filter": {
          "title": "No posees módulos para este tipo bundle",
          "description": "Crea el primero"
        }
      }
    },
    "module": {
      "title": "Titulo del modulo",
      "description": "Descripción",
      "empty": {
        "title": "This module does not have name, add one",
        "description": "Add a description"
      },
      "hmr": "HMR",
      "diagnostics": {
        "title": "Errors and warnings in bundle ",
        "general": "General",
        "files": "Files",
        "overwrites": "Overwrites",
        "dependencies": "Dependencies"
      },
      "processors": {
        "alerts": "Errors and Warnings",
        "jEsx": "JSX Code",
        "js": "JS / Javascript Code",
        "scss": "SCSS / Stylesheets",
        "ts": "TS / Typescript code",
        "less": "LESS / Stylesheets",
        "txt": "TXT / TEXTS"
      },
      "server": {
        "title": "Código Backend",
        "created": "Configurados correctamente",
        "empty": {
          "title": "Este módulo no posee código backend",
          "action": "Crear",
          "fetching": "Creando backend...",
          "description": "El código backend te permite integrar código node con tu modulo cliente de manera simple y eficaz por medio de WebSockets."
        }
      },
      "overwrites": {
        "title": "Overwrites",
        "created": "Configurados correctamente",
        "empty": {
          "title": "Este módulo no posee código backend",
          "action": "Crear",
          "fetching": "Configurando idiomas",
          "description": "Agrega multiples idiomas a tu módulo de manera sencilla"
        }
      }
    },
    "alerts": {
      "title": "Alertas y warnings de la aplicación",
      "subtitle": "Resumen"
    },
    "header": {
      "searcher": "¿Que buscas?"
    },
    "titles": {
      "libraries": "Libraries",
      "modules": "Modules",
      "pages": "Pages",
      "routes": "routes",
      "statics": "Statics",
      "static": "Static",
      "templates": "Templates",
      "excluded": "Excluided files",
      "path": "path",
      "host": "host",
      "errors": "Errors:",
      "warnings": "Warnings:"
    },
    "navigate": "Navegar",
    "items": {
      "title": "Add new title",
      "description": "Module description",
      "icon": "pen",
      "btnDetails": "Details",
      "btnEdit": "Edit",
      "update": "Update dependencies"
    },
    "search": "Search",
    "empty": {
      "primary": "We are just beginning",
      "secondary": "click and create your first module"
    }
  };

  __pkg.initialise();
});