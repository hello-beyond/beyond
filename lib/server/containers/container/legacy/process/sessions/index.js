module.exports = class {
    #config;
    #service;
    #enabled;
    #initialised;
    #instance;
    #io;
    #ns;

    get initialised() {
        return this.#initialised;
    }

    constructor(config, service) {
        this.#config = config;
        this.#service = service;
    }

    async initialise(ws) {
        this.#io = ws.io;
        this.#ns = ws.ns;

        if (!this.#config || !this.#config.path) {
            this.#enabled = false;
            this.#initialised = true;
            return;
        }

        const {path} = this.#config;
        const instance = new (require(path))(this.#service);
        this.#instance = instance;

        typeof instance.initialise === 'function' && await instance.initialise();
        typeof instance.listen === 'function' && await instance.listen(ws.ns);
        this.#enabled = true;
        this.#initialised = true;
    }

    async connect(socket) {
        const session = new (require('./session'))(this.#io, this.#ns, socket);
        const enabled = this.#enabled;
        const instance = this.#instance;

        enabled && typeof instance.connect === 'function' && await instance.connect(session);
        return session;
    }

    async disconnect(session) {
        const enabled = this.#enabled;
        const instance = this.#instance;

        enabled && typeof instance.disconnect === 'function' && await instance.disconnect(session);
    }
}