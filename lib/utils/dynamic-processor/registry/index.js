module.exports = new class {
    #registry = new Set();

    register(dp) {
        this.#registry.add(dp);
    }

    delete(dp) {
        this.#registry.delete(dp);
    }
}
