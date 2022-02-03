module.exports = class {
    #listeners = new Map();

    constructor(emitter) {
        const events = [
            'hash.initialised', 'hash.change',
            'js.initialised', 'js.change',
            'css.initialised', 'css.change',
            'dependencies.initialised', 'dependencies.change',
            'dependencies.hash.initialised', 'dependencies.hash.change',
            'dependency.initialised', 'dependency.change',
            'declaration.initialised', 'declaration.change'
        ];
        events.forEach(event => this.#listeners.set(event, () => emitter.emit(event)));
    }

    subscribe = processors => processors.forEach(processor => {
        const listeners = this.#listeners;

        const {hash, packager} = processor;

        hash.on('initialised', listeners.get('hash.initialised'));
        hash.on('change', listeners.get('hash.change'));

        if (packager) {
            const {js, css, declaration} = packager;
            const {dependencies} = packager.processor;

            js?.on('initialised', listeners.get('js.initialised'));
            js?.on('change', listeners.get('js.change'));
            css?.on('initialised', listeners.get('css.initialised'));
            css?.on('change', listeners.get('css.change'));

            if (dependencies) {
                dependencies.on('initialised', listeners.get('dependencies.initialised'));
                dependencies.on('change', listeners.get('dependencies.change'));
                dependencies.hash.on('initialised', listeners.get('dependencies.hash.initialised'));
                dependencies.hash.on('change', listeners.get('dependencies.hash.change'));
                dependencies.on('dependency.initialised', listeners.get('dependency.initialised'));
                dependencies.on('dependency.change', listeners.get('dependency.change'));
            }

            if (declaration) {
                declaration.on('initialised', listeners.get('declaration.initialised'));
                declaration.on('change', listeners.get('declaration.change'));
            }
        }
    });

    unsubscribe = processors => processors.forEach(processor => {
        const listeners = this.#listeners;

        const {hash, packager} = processor;

        hash.off('initialised', listeners.get('hash.initialised'));
        hash.off('change', listeners.get('hash.change'));

        if (packager) {
            const {js, css, declaration} = packager;
            const {dependencies} = packager.processor;

            js?.off('initialised', listeners.get('js.initialised'));
            js?.off('change', listeners.get('js.change'));
            css?.off('initialised', listeners.get('css.initialised'));
            css?.off('change', listeners.get('css.change'));

            if (dependencies) {
                dependencies.off('initialised', listeners.get('dependencies.initialised'));
                dependencies.off('change', listeners.get('dependencies.change'));
                dependencies.hash.off('initialised', listeners.get('dependencies.hash.initialised'));
                dependencies.hash.off('change', listeners.get('dependencies.hash.change'));
                dependencies.off('dependency.initialised', listeners.get('dependency.initialised'));
                dependencies.off('dependency.change', listeners.get('dependency.change'));
            }

            if (declaration) {
                declaration.off('initialised', listeners.get('declaration.initialised'));
                declaration.off('change', listeners.get('declaration.change'));
            }
        }
    });
}
