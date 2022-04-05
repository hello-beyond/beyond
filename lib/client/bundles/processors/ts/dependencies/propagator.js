module.exports = class extends global.DependenciesPropagator {
    #listeners = new Map();

    constructor(emitter) {
        super(emitter);

        const events = ['declaration.initialised', 'declaration.change'];
        events.forEach(event => this.#listeners.set(event, (...params) => emitter.emit(event, ...params)));
    }

    subscribe(dependencies) {
        super.subscribe(dependencies);

        dependencies.forEach(dependency => {
            const listeners = this.#listeners;

            const {declaration} = dependency;
            declaration.on('initialised', listeners.get('declaration.initialised'));
            declaration.on('change', listeners.get('declaration.change'));
        })
    };

    unsubscribe(dependencies) {
        super.unsubscribe(dependencies);

        dependencies.forEach(dependency => {
            const listeners = this.#listeners;

            const {declaration} = dependency;
            declaration.off('initialised', listeners.get('declaration.initialised'));
            declaration.off('change', listeners.get('declaration.change'));
        });
    }
}
