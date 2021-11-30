const ServiceEngineBase = require('./base');

new class extends ServiceEngineBase {
    #shared;
    #core;
    get core() {
        return this.#core;
    }

    #sessions;
    #modules;
    #ws;
    #ready;
    get ready() {
        return this.#ready.value;
    }

    constructor() {
        super();

        // Legacy is used only in development environment
        Object.defineProperty(global, 'environment', {get: () => 'development'});
    }

    #initialised = false;
    get initialised() {
        return this.#initialised;
    }

    async initialise(port) {
        if (this.#initialised) throw new Error('Engine already initialised');
        this.#initialised = true;

        if (this.#ready) return this.#ready.value;
        this.#ready = Promise.pending();

        const {config} = this;
        config.core = Object.assign({}, config.core, {dashboard: dashboard});

        this.#shared = new (require('./shared'))(config.shared ? config.shared : [], config.dashboard);
        this.#core = new (require('./core'))(config.core, this);
        this.#sessions = new (require('./sessions'))(config.sessions, this);
        this.#modules = new (require('./modules'))(config.modules, this);
        this.#ws = new (require('./ws'))(port, config, this.#core, this.#sessions, this.#modules);

        try {
            await this.#core.initialise(this.#ws, this.#shared);
            await this.#modules.initialise(this.#core);
            await this.#sessions.initialise(this.#ws);
            await this.#ws.initialise();
        }
        catch (exc) {
            console.error('exception', exc.stack);
            return;
        }

        this.#ready.resolve();

        super.initialise(port);
    }

    /**
     * This method is expected to be used only by unit test cases. Actually when executing
     * methods of the dashboard library
     * @returns {Promise<void>}
     */
    async exec(procedure, params) {
        await this.#core.ready;

        const split = procedure.split('/');
        let method = this.#core.instance;

        for (const property of split) {
            if (!method.hasOwnProperty(property)) {
                throw new Error(`Procedure "${procedure}" not found`);
            }
            method = method[property];
        }

        if (typeof method !== 'function') {
            throw new Error(`Procedure "${procedure}" not found`);
        }

        method(...(params instanceof Array ? params : []));
    }
}
