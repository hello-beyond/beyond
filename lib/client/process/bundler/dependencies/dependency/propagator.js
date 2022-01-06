module.exports = class {
    #seeker;
    #listeners = new Map();

    constructor(seeker, emitter) {
        this.#seeker = seeker;

        const events = ['external.initialised', 'external.change',
            'declaration.initialised', 'declaration.change'];
        events.forEach(event => this.#listeners.set(event, (...params) => emitter.emit(event, ...params)));

        this.#subscribe();
    }

    #subscribe() {
        const seeker = this.#seeker;
        const listeners = this.#listeners;

        seeker.on('external.initialised', listeners.get('external.initialised'));
        seeker.on('external.change', listeners.get('external.change'));
        seeker.on('declaration.initialised', listeners.get('declaration.initialised'));
        seeker.on('declaration.change', listeners.get('declaration.change'));
    }

    unsubscribe() {
        const seeker = this.#seeker;
        const listeners = this.#listeners;

        seeker.off('external.initialised', listeners.get('external.initialised'));
        seeker.off('external.change', listeners.get('external.change'));
        seeker.off('declaration.initialised', listeners.get('declaration.initialised'));
        seeker.off('declaration.change', listeners.get('declaration.change'));
    }
}
