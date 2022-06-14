const {ipc} = global.utils;

module.exports = class {
    #application;

    constructor(application) {
        this.#application = application;
    }

    #promise;

    async ready() {
        if (this.#promise) return await this.#promise.value;
        this.#promise = Promise.pending();

        const id = `application/${this.#application.id}/ssr`;
        const {status} = await ipc.exec('main', 'bees/data', id);
        if (status === 'running') {
            this.#promise.resolve();
            return;
        }

        await ipc.exec('main', 'bees/start', id);
        this.#promise.resolve();
    }
}
