module.exports = class {
    #imported;
    #instance;
    #ipc = global.utils.ipc;

    constructor(imported, dashboard) {
        if (imported && !(imported instanceof Array)) throw new Error('Invalid "imported" parameter');

        this.#imported = imported ? imported : [];
        this.#instance = dashboard ? 'dashboard:' : 'main:';
    }

    async has(library) {
        if (!this.#imported.includes(library)) return;
        const action = `${this.#instance}shared.has`;
        return await this.#ipc.exec('main', action, {library: library, dashboard: dashboard});
    }

    async get(library) {
        if (!this.#imported.includes(library)) return;
        const action = `${this.#instance}shared.get`;
        return await this.#ipc.exec('main', action, {library: library, dashboard: dashboard});
    }
}
