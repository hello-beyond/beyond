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

    // The path of the application and the process.cwd() is the same thing
    get path() {
        return this.#application.path;
    }

    get package() {
        return this.#application.package;
    }

    #bundles;
    get bundles() {
        return this.#bundles;
    }

    #started = Promise.pending();
    get started() {
        return this.#started.value;
    }

    /**
     * BeyondJS execution environment constructor
     *
     * @param is {string} The type of bee: can be 'backend', 'node', 'ssr'
     * @param application {{id: string, is: string, dashboard: boolean, path: string, package: string}}
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

        this.#started.resolve();
    }
}
