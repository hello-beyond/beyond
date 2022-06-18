module.exports = class {
    #client;
    get client() {
        return this.#client;
    }

    #bees;
    get bees() {
        return this.#bees;
    }

    constructor(data) {
        const path = process.cwd();
        this.#client = new (require('./client'))(path, false, data);
        this.#bees = new (require('./bees'))(path, false, data);
    }
}
