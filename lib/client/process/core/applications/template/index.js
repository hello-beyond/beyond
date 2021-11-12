/**
 * Resources manager of the template of the application
 */
module.exports = class {
    #config;

    get path() {
        return this.#config.path;
    }

    #application;
    get application() {
        return this.#application;
    }

    #processors;
    get processors() {
        return this.#processors;
    }

    #overwrites;
    get overwrites() {
        return this.#overwrites;
    }

    constructor(application, config) {
        this.#config = config;

        const props = {
            application: config.properties.get('application'),
            processors: config.properties.get('processors'),
            overwrites: config.properties.get('overwrites')
        };

        this.#application = new (require('./application'))(application, props.application);
        this.#processors = new (require('./processors'))(application, props.processors);
        this.#overwrites = new (require('./overwrites'))(props.overwrites);
    }

    initialise() {
        this.#overwrites.initialise().catch(exc => console.log(exc.stack));
    }

    destroy() {
        this.#application.destroy();
        this.#processors.destroy();
        this.#overwrites.destroy();
    }
}