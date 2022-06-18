require('./global');

new class {
    #specs;
    get specs() {
        return this.#specs;
    }

    #shared;
    #core;
    get core() {
        return this.#core;
    }

    #sessions;
    #modules;
    #ws;

    #onmessage = (message) => {
        if (typeof message !== 'object') return;
        switch (message.type) {
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
    }

    constructor() {
        let specs;
        try {
            this.#specs = specs = JSON.parse(process.argv[2]);
            require('./specs')(this.#specs);
        }
        catch (exc) {
            console.error(`Error parsing backend service configuration: Working directory: "${process.cwd()}"`);
            return;
        }

        Object.defineProperty(global, 'dashboard', {get: () => specs.dashboard});

        const dashboard = specs.dashboard ? ':dashboard' : '';
        process.title = `"${specs.project.pkg}${dashboard}" project`;

        process.on('message', this.#onmessage);

        // Launch the legacy backend server
        this.#start().catch(exc => console.error(exc.stack));
    }

    async #start() {
        const specs = this.#specs;
        const {dashboard} = specs;
        const core = Object.assign({}, specs.legacy.core, {dashboard});
        const {modules, sessions, shared} = specs.legacy;

        this.#shared = new (require('./shared'))(shared ? shared : [], dashboard);
        this.#core = new (require('./core'))(core, this);
        this.#sessions = new (require('./sessions'))(sessions, this);
        this.#modules = new (require('./modules'))(modules, this);

        const port = this.#specs.ports.http;
        this.#ws = new (require('./ws'))(port, specs, this.#core, this.#sessions, this.#modules);

        try {
            await this.#core.initialise(this.#ws, this.#shared);
            await this.#modules.initialise(this.#core);
            await this.#sessions.initialise(this.#ws);
            await this.#ws.initialise();
        }
        catch (exc) {
            console.error('exception', exc.stack);
        }
        finally {
            process.send({type: 'ready'});
        }
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
