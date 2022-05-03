# Dynamic Processors (DPs)

## Processors base objects

### processor.sources.hash

Used as a property of:

* files sources
* Overwrites sources

### ts.processor.hashes

Inherits from **processor.hashes**.

#### Children

The children of this class are appended to the inherited.

* declarations.hash

### processor.analyzer

### processor.analyzer.hash

### bundler.bundle.dependencies

### bundler.bundle.dependencies.hash

### processor.packager.compiler.extended

### packager.compiler

#### Children

* sources (files, overwrites, extensions)
* analyzer
* extended

### packager.compiler.hash

#### Children

* compiler: packager.compiler

### packager.code

#### Children

* compiler or analyzer or sources (files, overwrites, extensions)

## Typescript processor

### ts.dependencies.declarations

### ts.dependencies.declarations.hash

### ts.compiler.transpiler

### ts.dependencies

### ts.code
