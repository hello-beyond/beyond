module.exports = class {
    #seeker;
    #listeners = new Map();
    #bundle;
    #external;

    constructor(seeker, emitter) {
        this.#seeker = seeker;

        const events = ['external.initialised', 'external.change',
            'declaration.initialised', 'declaration.change'];
        events.forEach(event => this.#listeners.set(event, (...params) => emitter.emit(event, ...params)));
    }

    subscribe() {
        this.unsubscribe();

        const listeners = this.#listeners;
        const external = this.#external, bundle = this.#bundle;

        if (external) {
            external.on('initialised', listeners.get('external.initialised'));
            external.on('change', listeners.get('external.change'));
        }
        if (bundle) {
            bundle.declaration?.on('initialised', listeners.get('declaration.initialised'));
            bundle.declaration?.on('change', listeners.get('declaration.change'));
        }

        this.#external = external;
        this.#bundle = bundle;
    }

    unsubscribe() {
        const listeners = this.#listeners;
        const external = this.#external, bundle = this.#bundle;

        if (external) {
            external.off('initialised', listeners.get('external.initialised'));
            external.off('change', listeners.get('external.change'));
        }
        if (bundle) {
            bundle.declaration?.off('initialised', listeners.get('declaration.initialised'));
            bundle.declaration?.off('change', listeners.get('declaration.change'));
        }
    }
}
