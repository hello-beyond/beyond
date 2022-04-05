module.exports = class {
    #listeners = new Map();
    #previous;

    constructor(emitter) {
        const events = ['processors.initialised', 'processors.change'];
        events.forEach(event => this.#listeners.set(event, (...params) => emitter.emit(event, ...params)));
    }

    subscribe(dependency) {
        const {bundle, distribution, language} = dependency;
        const {processors} = bundle ? bundle.packagers.get(distribution, language) : {};
        if (processors === this.#previous) return;

        this.unsubscribe();
        this.#previous = processors;
        if (!processors) return;

        const listeners = this.#listeners;
        processors.on('initialised', listeners.get('processors.initialised'));
        processors.on('change', listeners.get('processors.change'));
    }

    unsubscribe() {
        const previous = this.#previous;
        if (!previous) return;

        const listeners = this.#listeners;
        previous.off('initialised', listeners.get('processors.initialised'));
        previous.off('change', listeners.get('processors.change'));
    }
}
