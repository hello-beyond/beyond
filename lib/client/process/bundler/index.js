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

    #Processor = (require('./processor'));
    get Processor() {
        return this.#Processor;
    }

    #Dependencies = (require('./dependencies'));
    get Dependencies() {
        return this.#Dependencies;
    }

    #Dependency = (require('./dependencies/dependency'));
    get Dependency() {
        return this.#Dependency;
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
