define([], function () {
  "use strict";

  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/applications-board/txt', true, {
    "txt": {
      "multilanguage": true
    }
  });
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package('es');

  __pkg.exports.process = (require, _exports) => _exports.txt = {
    "empty": {
      "title": "Bienvenido a BeyondJS",
      "subtitle": "Crea tu primera aplicación",
      "info": "¿Que es esto?"
    },
    "header": {
      "title": "Proyectos",
      "projectsTitle": "Proyectos",
      "applications": "Proyectos",
      "elements": "Elementos",
      "titleHeader": "El nombre del proyecto va aquí",
      "showApps": "Información del proyecto",
      "filtersTitle": "Filtro",
      "selectView": "Vista",
      "welcome": "Bienvenido:",
      "logIn": "Inicio de sesion:"
    },
    "application": {
      "description": "No posee descripcion"
    },
    "actions": {
      "play": "Arrancar",
      "stop": "Detener",
      "restart": "Reiniciar",
      "details": "Detaalles",
      "compile": "Compilar",
      "publish": "Publicar",
      "create": "Crear proyecto",
      "download": "Descargar"
    }
  };

  __pkg.initialise();
});