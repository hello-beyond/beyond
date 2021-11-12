module.exports = class extends require('../property') {
    get is() {
        return 'object';
    }

    #properties;
    get properties() {
        return this.#properties;
    }

    has = (name) => this.#properties.has(name);
    get = (name) => this.#properties.get(name);

    constructor(path, branchesSpecs, branch, parent) {
        super(path, branchesSpecs, branch, parent);
        this.#properties = new (require('./properties'))(this);
    }

    async updateChildren(request) {
        await this.#properties.update(request);
    }

    async destroyChildren(request) {
        await this.#properties.destroy(request);
    }

    destroy() {
        super.destroy();
    }
}
