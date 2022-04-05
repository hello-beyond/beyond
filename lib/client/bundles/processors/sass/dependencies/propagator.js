module.exports = class extends global.DependenciesPropagator {
    #listeners = new Map();

    constructor(emitter) {
        super(emitter);

        const events = ['files.initialised', 'files.change'];
        events.forEach(event => this.#listeners.set(event, (...params) => emitter.emit(event, ...params)));
    }

    subscribe(dependencies) {
        super.subscribe(dependencies);

        dependencies.forEach(dependency => {
            const listeners = this.#listeners;

            const {files} = dependency;
            files.on('initialised', listeners.get('files.initialised'));
            files.on('change', listeners.get('files.change'));
        })
    };

    unsubscribe(dependencies) {
        super.unsubscribe(dependencies);

        dependencies.forEach(dependency => {
            const listeners = this.#listeners;

            const {files} = dependency;
            files.off('initialised', listeners.get('files.initialised'));
            files.off('change', listeners.get('files.change'));
        });
    }
}
