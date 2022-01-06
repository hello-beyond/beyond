module.exports = class {
    #listeners = new Map();

    constructor(emitter) {
        const events = ['modules.initialised', 'modules.change']
        events.forEach(event => this.#listeners.set(event, () => emitter.emit(event)));
    }

    subscribe(library) {
        const listeners = this.#listeners;
        library.modules.on('initialised', listeners.get('modules.initialised'));
        library.modules.on('change', listeners.get('modules.change'));
    }

    unsubscribe(library) {
        const listeners = this.#listeners;
        library.modules.off('initialised', listeners.get('modules.initialised'));
        library.modules.off('change', listeners.get('modules.change'));
    }
}