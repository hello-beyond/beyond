const {ipc} = global.utils;

module.exports = class {
    #bee;

    constructor(bee) {
        this.#bee = bee;
    }

    async get(module) {
        const bee = this.#bee;
        const distribution = (require('./distribution'))(bee.is);

        // Request the code of the bundles by IPC
        const params = [bee.application.id, module, distribution];

        return await ipc.exec('main-client', 'bridges/get', ...params);
    }
}
