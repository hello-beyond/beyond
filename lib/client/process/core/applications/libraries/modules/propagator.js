module.exports = class {
    #listeners = new Map();

    constructor(emitter) {
        const events = ['module.initialised', 'module.change'];
        events.forEach(event => this.#listeners.set(event, () => emitter.emit(event)));
    }

    subscribe = modules => modules.forEach(module => {
        const listeners = this.#listeners;

        module.on('initialised', listeners.get('module.initialised'));
        module.on('change', listeners.get('module.change'));
    });

    unsubscribe = modules => modules.forEach(module => {
        const listeners = this.#listeners;

        module.off('initialised', listeners.get('module.initialised'));
        module.off('change', listeners.get('module.change'));
    });
}