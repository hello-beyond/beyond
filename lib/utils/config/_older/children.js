const Property = (require('.'));

/**
 * Children properties processor
 */
module.exports = class {
    #parent;
    #specs;
    #destroyed = false;
    get destroyed() {
        return this.#destroyed;
    }

    /**
     * Children properties constructor
     * @param parent {object} The parent property
     * @param specs {object} The nested properties specification
     */
    constructor(parent, specs) {
        this.#parent = parent;
        this.#specs = specs;
    }

    destroy() {
        if (this.#destroyed) throw new Error('Children properties were already destroyed');
        this.#destroyed = true;
    }
}
