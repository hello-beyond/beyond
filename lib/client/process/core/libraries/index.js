const {ipc} = global.utils

module.exports = class extends global.utils.ConfigCollection {
    #propagator;

    constructor(...params) {
        super(...params);
        this.#propagator = new (require('./propagator'))(this._events);
    }

    /**
     * Find a library by its name
     * @param pkg {string} The library package identification
     */
    async find(pkg) {
        // Wait for all libraries to be ready
        const promises = [];
        await this.ready;
        this.forEach(library => promises.push(library.ready));
        await Promise.all(promises);

        return [...this.values()].find(library => library.package === pkg);
    }

    _notify() {
        ipc.notify('data-notification', {
            type: 'list/update',
            table: 'libraries'
        });
    }

    async _processConfig(config) {
        const libraries = [...config.items.values()];
        await require('./process-config').process(libraries);
        return libraries;
    }

    _createItem(config) {
        const library = new (require('./library'))(config);
        this.#propagator.subscribe(library);
        return library;
    }

    _deleteItem(library) {
        this.#propagator.unsubscribe(library);
        super._deleteItem(library);
    }
}
