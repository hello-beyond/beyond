module.exports = class {
    #listeners = new Map();

    constructor(emitter) {
        const events = ['dependency.initialised', 'dependency.change'];
        events.forEach(event => this.#listeners.set(event, (...params) => emitter.emit(event, ...params)));
    }

    subscribe(dependencies) {
        dependencies.forEach(dependency => {
            const listeners = this.#listeners;

            dependency.on('initialised', listeners.get('dependency.initialised'));
            dependency.on('change', listeners.get('dependency.change'));
        });
    }

    unsubscribe(dependencies) {
        dependencies.forEach(dependency => {
            const listeners = this.#listeners;

            dependency.off('initialised', listeners.get('dependency.initialised'));
            dependency.off('change', listeners.get('dependency.change'));
        });
    }
}
