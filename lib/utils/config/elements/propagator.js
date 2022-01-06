module.exports = class {
    #listeners = new Map();

    constructor(emitter) {
        const events = ['item.initialised', 'item.change'];
        events.forEach(event => this.#listeners.set(event, () => emitter.emit(event)));
    }

    subscribe = items => items.forEach(item => {
        const listeners = this.#listeners;

        item.on('initialised', listeners.get('item.initialised'));
        item.on('change', listeners.get('item.change'));
    });

    unsubscribe = items => items.forEach(item => {
        const listeners = this.#listeners;

        item.off('initialised', listeners.get('item.initialised'));
        item.off('change', listeners.get('item.change'));
    });
}
