# About Modules

The javascript engines that run in modern browsers and in Node.js already support a standard module system with
encapsulation (local variables do not interfere with other modules) and with interface definition thanks to the export
and import capacity. The problem with these modular systems is that they have limitations and incompatibility issues.

## Current limitations

The main limitation of these module systems is that they work at the file level. That is, a file is a module. A file is
too small a unit to describe all the functions and interfaces on which to structure a module.

## Incompatibility

The import and export mechanisms currently used by most of the current Node.js packages are implemented with the Common
Js format and the system supported by es6 browsers are not supported.

# BeyondJS Modules

Think of each BeyondJS module as a set of files that internally have internal modules, but expose a subset of elements.
Each module has its own type declaration (.d.ts) and compiled code.
