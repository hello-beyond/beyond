module.exports = class {
    #client;
    get client() {
        return this.#client;
    }

    #server;
    get server() {
        return this.#server;
    }

    constructor(data) {
        const path = process.cwd();
        this.#client = new (require('./client'))(path, false, data);
        this.#server = new (require('./server'))(path, false, data);
    }
}
