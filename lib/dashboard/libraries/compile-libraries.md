De momento para compilar las librerias como graphs, plm, beyond-services, payments, etc.
Se debe pasar al repositorio de "app" en el branch "compile-libraries",
ahi se van a encontrar con la carpeta libraries con las librerias
 a excepcion de graphs que se encuentra en la caperta "socites".
  
  Para compilar en el repositorio de apps, se debe levantar el servicio y en la ruta
  http://localhost:3028/libs/compile/libraryName, al hacer click en el boton "build", 
  el cual va a generar la compilacion en la raiz de la libreria en la ruta builds/server/output
  (Ej: graphs/builds/server/output)
  
  
  El codigo esta actualizado al dia 21 de abril del 2020, modificaciones posteriores deberan
 ser anotadas en el change.log correspondiente a cada libreria con el fin de tener un control
  de los ajustes al momento de necesitar una compilacion. Despues de realizarse una compilacion 
  se anotara en el archivo backup.log que hizo una compilacion y se limpiara el change.log.
 
 