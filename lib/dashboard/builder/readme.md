# Compilación BeyondJS Dashboard

Pasos para compilar la aplicación local de BeyondJS y prepararla para su distribución en el paquete de NPM.
***

1. Ejecutar el compilador: lib/dashboard/builder/index.js

***

2. Antes de copiar los archivos compilados de la nueva versión:

- Eliminar los archivos cliente
    - dashboard/js


- Eliminar los archivos del servicio (mantener library.json y service.json)
    - dashboard/ws/core,
    - dashboard/ws/modules,
    - dashboard/ws/sessions

***

3. Copiar los archivos cliente:

- **Fuente**: lib/dashboard/builder/.beyond/builds/client/dashboard/code
- **Destino**: dashboard/js

***

4. Copiar los archivos del servicio beyond-dashboard:

- **Fuente**: lib/dashboard/builder/.beyond/builds/server/code
- **Destino**: dashboard/ws

***

5. Incluir los archivos de dashboard/js y dashboard/ws a git y actualizar el repositorio remoto

***