module.exports = class {
    #config;
    #service;
    #enabled;
    #ready;
    get ready() {
        return this.#ready.value;
    }

    #instance;
    get instance() {
        return this.#instance;
    }

    constructor(config, service) {
        this.#config = config;
        this.#service = service;
    }

    #initialised = false;
    get initialised() {
        return this.#initialised;
    }

    async initialise(ws, shared) {
        if (this.#initialised) throw new Error('Engine already initialised');
        this.#initialised = true;

        if (this.#ready) throw new Error('Service core already initialised');
        this.#ready = Promise.pending();

        if (!this.#config || !this.#config.path) {
            this.#enabled = false;
            this.#ready.resolve();
            return;
        }

        const {path, dashboard} = this.#config;
        const instance = new (require(path))(ws.server, shared, dashboard);
        this.#instance = instance;

        typeof instance.initialise === 'function' && await instance.initialise();
        this.#enabled = true;
        this.#ready.resolve();
    }
}