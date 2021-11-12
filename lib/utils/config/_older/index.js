/**
 * Configuration processor where the values of the properties can be a nested file.
 * Nested properties can be an object, or an array of objects
 */
module.exports = class extends EventEmitter {
    #root;
    get root() {
        return this.#root;
    }

    #type;
    get type() {
        return this.#type;
    }


    #value;
    get value() {
        return this.#value;
    }

    #errors = [];
    get errors() {
        return this.#errors;
    }

    #children = 1;

    /**
     * Configuration processor constructor
     * @param root {string}
     * @param specs {object}
     * @param branch {string}      */
    constructor(root, specs, branch) {
        if (!root) throw new Error('Invalid parameters, root must be specified');

        super();
        this.#root = root;

    }

    #previous;

    /**
     * Executed once the property's data is processed
     *
     * @param request {number} The request being processed
     * @returns {Promise<void>}
     */
    #done = async (request) => {
        if (this.#errors.length) {
            this.emit('change');
            return;
        }

        const processed = await this.#children.update(data, value);
        if (this.#destroyed || request !== this.#request) return;

        processed.errors.length ? this.#errors = this.#errors.concat(processed.errors) :
            this.#value = processed.updated;
        this.emit('change');
    };

    destroy() {
        this.#children.destroy();
    }
}
