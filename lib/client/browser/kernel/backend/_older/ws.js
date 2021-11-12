module.exports = class {
    #port;
    #config;
    #connections = new Map();
    #initialised;
    #destroyed;
    #io;
    get io() {
        return this.#io;
    }

    #ns;
    get ns() {
        return this.#ns;
    }

    #bundles;

    constructor(port, config) {
        this.#port = port;
        this.#config = config;
        this.#bundles = new (require('./bundles'))(config.id);

        // Create ws server
        const options = {serveClient: false, maxHttpBufferSize: 100000};
        const server = require('http').createServer();
        server.listen(port);
        const io = require('socket.io').listen(server, options);
        this.#io = io;

        const {name, is} = config;
        const namespace = (is === 'application' ? 'applications/' : 'libraries/') + name;
        this.#ns = io.of(namespace);
    }

    #connection = async (socket) => {
        const session = {socket};
        // const session = await this.#sessions.connect(socket);
        const connection = new (require('./connection'))(this.#config, this.#bundles, session);

        const connections = this.#connections;
        connections.set(socket.id, connection);

        const _disconnect = () => disconnect().catch(exc => console.error(exc.stack));

        const disconnect = async () => {
            connections.delete(socket.id);
            connection.disconnect();
            // await this.#sessions.disconnect(session);
            socket.off('disconnect', _disconnect);
        };

        socket.on('disconnect', _disconnect);
    }

    /**
     * Start listening for connections
     */
    initialise() {
        if (this.#destroyed) throw new Error('ws is destroyed');
        if (this.#initialised) throw new Error('ws already initialised');
        this.#initialised = true;

        this.#ns.on('connection', this.#connection);
    }

    destroy() {
        if (this.#destroyed) throw new Error('ws already destroyed');
        this.#destroyed = true;
        if (!this.#initialised) return;

        this.#ns.off('connection', this.#connection);
    }
}
