module.exports = class extends require('../property') {
    get is() {
        return 'array';
    }

    #items;
    get items() {
        return this.#items;
    }

    constructor(path, branchesSpecs, branch, parent) {
        super(path, branchesSpecs, branch, parent);
        this.#items = new (require('./items'))(this);
    }

    async updateChildren(request) {
        await this.#items.update(request);
    }

    async destroyChildren(request) {
        await this.#items.destroy(request);
    }

    destroy() {
        super.destroy();
        this.#items.destroy();
    }
}
