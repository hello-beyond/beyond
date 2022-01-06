module.exports = class {
    #listeners = new Map();

    constructor(emitter) {
        const events = [
            'dependencies.initialised', 'dependencies.change',
            'dependency.initialised', 'dependency.change',
            'code.initialised', 'code.change',
            'declaration.initialised', 'declaration.change',
            'hash.initialised', 'hash.change'
        ];
        events.forEach(event => this.#listeners.set(event, () => emitter.emit(event)));
    }

    subscribe = processors => processors.forEach(processor => {
        const {hash, dependencies, code, declaration} = processor;

        const listeners = this.#listeners;
        hash.on('initialised', listeners.get('hash.initialised'));
        hash.on('change', listeners.get('hash.change'));

        code.on('initialised', listeners.get('code.initialised'));
        code.on('change', listeners.get('code.change'));

        if (dependencies) {
            dependencies.on('initialised', listeners.get('dependencies.initialised'));
            dependencies.on('change', listeners.get('dependencies.change'));
            dependencies.on('dependency.initialised', listeners.get('dependency.initialised'));
            dependencies.on('dependency.change', listeners.get('dependency.change'));
        }

        if (declaration) {
            declaration.on('initialised', listeners.get('declaration.initialised'));
            declaration.on('change', listeners.get('declaration.change'));
        }
    });

    unsubscribe = processors => processors.forEach(processor => {
        const {hash, dependencies, code, declaration} = processor;
        if (!dependencies) return;

        const listeners = this.#listeners;
        hash.off('initialised', listeners.get('hash.initialised'));
        hash.off('change', listeners.get('hash.change'));

        code.off('initialised', listeners.get('code.initialised'));
        code.off('change', listeners.get('code.change'));

        if (dependencies) {
            dependencies.off('initialised', listeners.get('dependencies.initialised'));
            dependencies.off('change', listeners.get('dependencies.change'));
            dependencies.off('dependency.initialised', listeners.get('dependency.initialised'));
            dependencies.off('dependency.change', listeners.get('dependency.change'));
        }

        if (declaration) {
            declaration.off('initialised', listeners.get('declaration.initialised'));
            declaration.off('change', listeners.get('declaration.change'));
        }
    });
}
