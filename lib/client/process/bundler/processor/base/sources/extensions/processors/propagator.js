module.exports = class {
    #listeners = new Map();

    constructor(emitter) {
        const events = ['sources.initialised', 'sources.change'];
        events.forEach(event => this.#listeners.set(event, () => emitter.emit(event)));
    }

    subscribe = extensions => {
        extensions.forEach(extension => {
            const listeners = this.#listeners;
            extension.sources.on('initialised', listeners.get('sources.initialised'));
            extension.sources.on('change', listeners.get('sources.change'));
        });
    }

    unsubscribe = processors => processors.forEach(extension => {
        const listeners = this.#listeners;

        extension.sources.off('initialised', listeners.get('sources.initialised'));
        extension.sources.off('change', listeners.get('sources.change'));
    });
}
