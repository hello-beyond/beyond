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
    get bundles() {
        return this.#bundles;
    }

    get valid() {
        return this.#bundles.valid;
    }

    /**
     * BeyondJS execution environment constructor
     *
     * @param is {string} The type of bee: can be 'backend', 'node', 'ssr'
     * @param application {{id: string, path: string}} The application id and path
     */
    constructor(is, application) {
        this.#is = is;
        this.#application = application;

        // Make bridges available
        const bridges = new (require('./bridges'))(this);
        Object.defineProperty(global, '__bridges', {get: () => bridges});

        // The bundles collection & importer
        this.#bundles = new (require('./bundles'))(this);

        // Extend the exception stack information
        require('./stack-trace')(this.#bundles);

        // Initiate the launch of the start bundle
        this.#start().catch(exc => console.error(exc.stack));
    }

    async #start() {
        await require('./config')(this);

        const bundle = await this.#bundles.import('start');
        bundle.errors && require('./log')(this.#application, {
            type: 'start.error',
            errors: bundle.errors
        });
    }
}
