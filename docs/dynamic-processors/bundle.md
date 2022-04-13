# Dynamic Processors (DPs)

## Bundle DPs

### bundler.bundle

#### Children

* config

### bundler.processors.hashes

#### Children

* processors

### bundler.bundle.packager.hash

#### Children

* processors.hashes
* imports.hash

### bundler.processors

#### Children

* bundle: bundler.bundle
* global.processors

### bundler.bundle.packager.code

This dp uses cache, so it starts with a **hash** as a child, and then adds the necessary dps to perform processing.

#### Registered children

* hash: bundler.bundle.packager.hash
* processors: bundler.processors

#### Required children

* processors.packager
* processors.packager?.ext

### bundles

### bundler.bundle.packager.code.specs

#### Children:

Required to know if the bundle is contained in a module with a txt bundle.

* container.bundles: bundles

### bundler.dependencies

This dp implements cache.

#### Children:

* hash: it is passed to the constructor

### bundler.dependencies.code

#### Children:

* dependencies: bundler.dependencies

### bundler.analyzer.dependencies

#### Children

* analyzer

### bundler.bundle.dependencies

### bundler.bundle.dependencies.hash

### bundler.bundle.packager.code.js

Inherits from **bundler.bundle.packager.code**.

#### Children

With or without cache:

* specs: bundler.bundle.packager.code.specs

Without cache:

* dependencies: bundler.dependencies.code
* imports: 

