/**
 * BeyondJS execution environment
 */
module.exports = class {
    // The type of bee: can be 'backend', 'node', 'ssr'
    #is;
    get is() {
        return this.#is;
    }

    // The application id
    #application;
    get application() {
        return this.#application;
    }

    #bundles;
    #bridges;

    get valid() {
        return this.#bundles.valid;
    }

    /**
     * BeyondJS execution environment constructor
     *
     * @param is {string} The type of bee: can be 'backend', 'node', 'ssr'
     * @param application {string} The application id
     */
    constructor(is, application) {
        this.#is = is;
        this.#application = application;
        this.#bridges = new (require('./bridges'))(this);

        Object.defineProperty(global, '__bridges', {get: () => this.#bridges});

        this.#bundles = new (require('./bundles'))(is, application);
        require('./stack-trace')(this.#bundles);

        this.start().catch(exc => console.error(exc.stack));
    }

    async start() {
        await this.#bundles.import('start');
        !this.#bundles.valid && require('./log')(this.#bundles.errors, this.#application);
    }
}
