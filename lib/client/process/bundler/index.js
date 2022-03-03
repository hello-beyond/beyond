/**
 * Processor, Source and Bundle are objects that are exposed globally
 * in lib/client/process/core/global/index.js
 *
 * The registry is created in lib/client/process/core/index.js, and exposed globally
 * in lib/client/process/core/global/index.js
 */
module.exports = new class {
    #Bundle = (require('./bundle/bundle'));
    get Bundle() {
        return this.#Bundle;
    }

    #Bundles = (require('./bundles'));
    get Bundles() {
        return this.#Bundles;
    }

    #BundlesConfig = (require('./bundles/config'));
    get BundlesConfig() {
        return this.#BundlesConfig;
    }

    #TxtBundle = (require('./bundle/txt'));
    get TxtBundle() {
        return this.#TxtBundle;
    }

    #Transversal = (require('./bundle/transversal'));
    get Transversal() {
        return this.#Transversal;
    }

    #TransversalPackager = (require('./bundle/transversal/packager'));
    get TransversalPackager() {
        return this.#TransversalPackager;
    }

    #TransversalCodePackager = (require('./bundle/transversal/packager/code'));
    get TransversalCodePackager() {
        return this.#TransversalCodePackager;
    }

    #ProcessorBase = (require('./processor/base'));
    get ProcessorBase() {
        return this.#ProcessorBase;
    }

    #ProcessorHash = (require('./processor/base/hash'));
    get ProcessorHash() {
        return this.#ProcessorHash;
    }

    #ProcessorSources = (require('./processor/base/sources'));
    get ProcessorSources() {
        return this.#ProcessorSources;
    }

    #ProcessorSourcesHash = (require('./processor/base/sources/hash'));
    get ProcessorSourcesHash() {
        return this.#ProcessorSourcesHash;
    }

    #ProcessorSource = (require('./processor/source'));
    get ProcessorSource() {
        return this.#ProcessorSource;
    }

    #ProcessorOptions = (require('./processor/base/options'));
    get ProcessorOptions() {
        return this.#ProcessorOptions;
    }

    #ProcessorAnalyzer = (require('./processor/base/analyzer'));
    get ProcessorAnalyzer() {
        return this.#ProcessorAnalyzer;
    }

    #ProcessorPackager = (require('./processor/packager'));
    get ProcessorPackager() {
        return this.#ProcessorPackager;
    }

    #ProcessorCompiler = (require('./processor/packager/compiler'));
    get ProcessorCompiler() {
        return this.#ProcessorCompiler;
    }

    #ProcessorSinglyCompiler = (require('./processor/packager/compiler/singly'));
    get ProcessorSinglyCompiler() {
        return this.#ProcessorSinglyCompiler;
    }

    #ProcessorCode = (require('./processor/packager/code'));
    get ProcessorCode() {
        return this.#ProcessorCode;
    }

    #ProcessorDeclaration = (require('./processor/packager/declaration'));
    get ProcessorDeclaration() {
        return this.#ProcessorDeclaration;
    }

    #ProcessorsExtender = (require('./processor/extender'));
    get ProcessorsExtender() {
        return this.#ProcessorsExtender;
    }

    #ProcessorsExtenderPreprocessor = (require('./processor/extender/preprocessor'));
    get ProcessorsExtenderPreprocessor() {
        return this.#ProcessorsExtenderPreprocessor;
    }

    #ProcessorsExtenderCompiler = (require('./processor/extender/compiler'));
    get ProcessorsExtenderCompiler() {
        return this.#ProcessorsExtenderCompiler;
    }

    #ProcessorsExtenderSinglyCompiler = (require('./processor/extender/compiler/singly'));
    get ProcessorsExtenderSinglyCompiler() {
        return this.#ProcessorsExtenderSinglyCompiler;
    }

    #Dependencies = (require('./dependencies'));
    get Dependencies() {
        return this.#Dependencies;
    }

    #Dependency = (require('./dependencies/dependency'));
    get Dependency() {
        return this.#Dependency;
    }

    #SourceMap = (require('./sourcemap'));
    get SourceMap() {
        return this.#SourceMap;
    }

    #registries = require('./registries');

    createRegistries(config) {
        this.#registries.create(config);
    }

    get bundles() {
        return this.#registries.bundles;
    }

    get processors() {
        return this.#registries.processors;
    }
};
