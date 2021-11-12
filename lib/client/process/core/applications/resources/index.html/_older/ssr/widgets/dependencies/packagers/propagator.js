module.exports = class {
    #listeners = new Map();

    constructor(emitter) {
        const events = ['item.initialised', 'item.change'];
        events.forEach(event => this.#listeners.set(event, () => emitter.emit(event)));
    }

    subscribe = packagers => packagers.forEach(packager => {
        const listeners = this.#listeners;
        packager.on('initialised', listeners.get('item.initialised'));
        packager.on('change', listeners.get('item.change'));
    });

    unsubscribe = packagers => packagers.forEach(packager => {
        const listeners = this.#listeners;
        packager.off('initialised', listeners.get('item.initialised'));
        packager.off('change', listeners.get('item.change'));
    });
}
