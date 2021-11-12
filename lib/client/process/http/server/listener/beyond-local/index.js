const {ipc} = global.utils;
const {dashboard} = global;
const instance = dashboard ? 'dashboard' : 'main';

module.exports = new class {
    #running;

    async check(application) {
        if (this.#running) return;
        await application.libraries.ready;
        const local = application.libraries.get('@beyond-js/local').library;

        await ipc.exec('main', 'bees/start', `library/${local.id}/legacy`, instance);
        this.#running = true;
    }
}
