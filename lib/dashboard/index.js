module.exports = class {
    #client;
    get client() {
        return this.#client;
    }

    #server;
    get server() {
        return this.#server;
    }

    constructor() {
        const path = __dirname;
        this.#client = new (require('../client'))(path, true);
        this.#server = new (require('../server'))(path, true);
    }
}
