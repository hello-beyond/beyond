require('../global');

module.exports = class {
    #config;
    get config() {
        return this.#config;
    }

    get is() {
        return this.#config.is;
    }

    get id() {
        return this.#config.id;
    }

    get path() {
        return this.#config.path;
    }

    get dashboard() {
        return this.#config.dashboard;
    }

    get package() {
        return this.#config.package;
    }

    get version() {
        return this.#config.version;
    }

    #initialised = false;
    get initialised() {
        return this.#initialised;
    }

    /**
     * This method is expected to be overridden
     * @param port
     * @returns {Promise<void>}
     */
    async initialise(port) {
        if (this.#initialised) throw new Error('Engine already initialised');
        this.#initialised = true;

        process.send({type: 'initialised', port: port});
    }

    /**
     * This method is expected to be overridden
     * @returns {Promise<void>}
     */
    async close() {
        process.exit();
    }

    /**
     * This method should be overridden and is expected to be used only by unit test cases
     * Actually when executing methods of the dashboard library
     * @returns {Promise<void>}
     */
    async exec(procedure, params) {
        console.log(procedure, params);
        throw new Error('This method should be overridden, or never be called');
    }

    constructor() {
        try {
            this.#config = JSON.parse(process.argv[2]);
            const {path, package: pkg, is} = this.#config;

            process.title = `BeyondJS ${is} backend service: "${pkg}"`;
            const {dashboard} = this.#config;
            Object.defineProperty(global, 'dashboard', {get: () => dashboard});

            process.on('message', message => {
                if (typeof message !== 'object') return;

                let response;
                switch (message.type) {
                    case 'initialise':
                        response = this.initialise(message.port);
                        response instanceof Promise && response.catch(exc =>
                            console.error(`Error initialising "${path}" backend service`, exc.stack)
                        );
                        break;
                    case 'close':
                        response = this.close();
                        response instanceof Promise && response.catch(exc =>
                            console.error(`Error closing "${path}" backend service`, exc.stack)
                        );
                        break;
                    case 'exec':
                        const {procedure, params} = message;
                        if (typeof procedure !== 'string' || !procedure) {
                            throw new Error('Invalid message: procedure must be specified');
                        }
                        this.exec(procedure, params).catch(exc =>
                            console.error(`Error executing procedure on "${path}" backend service`, exc.stack)
                        );
                        break;
                }
            });
        }
        catch (exc) {
            console.error('Error parsing backend service configuration', exc.stack);
        }
    }
}
