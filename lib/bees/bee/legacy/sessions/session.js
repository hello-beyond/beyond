module.exports = class {
    #io;
    get io() {
        return this.#io;
    }

    #ns;
    get ns() {
        return this.#ns;
    }

    #socket;
    get socket() {
        return this.#socket;
    }

    constructor(io, ns, socket) {
        this.#io = io;
        this.#ns = ns;
        this.#socket = socket;
    }
}
