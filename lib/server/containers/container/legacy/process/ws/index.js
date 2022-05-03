const {Server} = require('socket.io');

module.exports = class {
    #port;
    #config;
    #core;
    #sessions;
    #modules;
    #connections = new Map();
    #initialised;
    #destroyed;
    #server;
    get server() {
        return this.#server;
    }

    #ns;
    get ns() {
        return this.#ns;
    }

    // Ready when core, sessions and modules are initialised
    #ready = Promise.pending();

    constructor(port, config, core, sessions, modules) {
        if (!port) {
            console.trace();
        }
        this.#port = port;
        this.#config = config;
        this.#core = core;
        this.#sessions = sessions;
        this.#modules = modules;

        // Create ws server
        const options = {serveClient: false, maxHttpBufferSize: 100000};
        this.#server = new Server(options);
        this.#server.listen(this.#port);

        const pkg = this.#config.package;
        const namespace = '/' + pkg.startsWith('@') ? pkg.substr(1) : pkg;
        this.#ns = this.#server.of(namespace);
        this.#ns.on('connection', this.#onConnection);
    }

    #onConnection = async (socket) => {
        await this.#ready.value;

        const session = await this.#sessions.connect(socket);
        const connection = new (require('./connection'))(this.#modules, session);

        const connections = this.#connections;
        connections.set(socket.id, connection);

        const disconnect = async () => {
            connections.delete(socket.id);
            connection.disconnect();
            await this.#sessions.disconnect(session);
            socket.off('disconnect', _disconnect);
        };
        const _disconnect = () => disconnect().catch(exc => console.error(exc.stack));

        socket.on('disconnect', _disconnect);
    }

    /**
     * Start listening for connections once the core, sessions and modules are initialised, not before
     */
    initialise() {
        if (this.#destroyed) {
            throw new Error('ws is destroyed');
        }
        if (this.#initialised) {
            throw new Error('ws already initialised');
        }
        if (!this.#core.initialised || !this.#sessions.initialised || !this.#modules.initialised) {
            throw new Error('Core, sessions and modules objects must be initialised before initialising the ws');
        }

        this.#initialised = true;
        this.#ready.resolve();
    }

    destroy() {
        if (this.#destroyed) throw new Error('ws already destroyed');
        this.#destroyed = true;
        if (!this.#initialised) return;

        this.#ns.off('connection', this.#onConnection);
    }
}
