# beyond.import / beyond.require

## beyond.import

The beyond.import method is only used to import BeyondJS bundles, but without having to worry about the type of bundle
used (cjs, amd, es6).

### Node js development environment

In node js development environment, beyond.import calls the global **bimport** function exposed by the BEE, which in
turn is responsible for dynamically importing (IPC call to the client process) and compiling the required bundle.

The method beyond.import internally calls the beyond.require method when:

* It is not working in node js development environment.
* It is not working in es6 mode, in which case it will do a es6 dynamic import.

## beyond.require

The beyond.require method is used when it is necessary to make a **nodejs** or **requirejs** require (depending on the
environment), since the require function is overridden by the IMs for internal use of the bundle. The require function
of the IM can be used to require a bundle that has been previously loaded (normally a dependency of the bundle), or to
require a relative IM.

The beyond.require method internally calls the **cjs_require** or **amd_require** functions depending to the bundles
mode specified by the beyond.mode property.

In node js platforms, the **cjs_require** is exposed by:

* A variable (const cjs_require = require) in the beyond/kernel/core
* In the index.js file to reach the bundles of the application package.

## BEE

### Dependencies require

The **require** function of the node js modules is overridden in:

* lib/server/containers/container/v1/process/bee/brequire/require.js

This function is intended to load the dependencies of the bundle, since the IMs override the require function for
internal use. \
This function is also used by the variable **cjs_require** which is declared in beyond/core in development.

### global.bimport function

The **bimport** function is used by the beyond.import method, and is exposed globally in:

* lib/server/containers/container/v1/process/bee/brequire/import.js

The use of this function is only to require BeyondJS bundles.

## BeyondJS kernel/core

### cjs_require and amd_require

To allow beyond.require to work, the BeyondJS bundler declares the variables cjs_require and amd_require and assigns
them the require function, since in that context the require function is the one exposed by node js or require js
depending on the environment.

The variable cjs_require is declared as follows:

```javascript
const cjs_require = typeof brequire !== 'undefined' ? brequire : require;
```

The function brequire is declared in the index.js file to allow application packages to be reached.

## Compiled index.js

The global variable brequire is declared in the index.js file to allow application packages to be reached.

```javascript
Object.defineProperty(global, 'brequire', {get: () => require});
```
