const {ipc} = global.utils;
const {dashboard} = global;
const instance = dashboard ? 'dashboard' : 'main';

module.exports = class {
    #ports = new Map();

    async get(is, id, type) {
        type = type ? type : 'backend';
        const bee = `${is}/${id}/${type}`;

        if (this.#ports.has(bee)) return await this.#ports.get(bee).value;
        const promise = Promise.pending();
        this.#ports.set(bee, promise);

        const data = await ipc.exec('main', 'bees/data', bee, instance);
        const port = data?.port;
        promise.resolve(port);
        return port;
    }
}
