# Modular bundler

El engine de procesamiento de BeyondJS funciona de manera muy diferente al diseño de los bundlers como webpack, rollup.
No sigue un modelo de entry point y loaders. El diseño de los bundles de BeyondJS se basa en el empaquetado por medio de
procesadores.

# Module - Bundle - Processor approach

# Modules

BeyondJS busca todos los archivos de la aplicación con nombre 'module.json'.

# Tooling

BeyondJS provee un conjunto de clases:

* global.utils.Bundle
* global.Utils.ProcessorPackager
* global.utils.ProcessorSources
* ...
* Finder
