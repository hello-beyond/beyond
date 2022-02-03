module.exports = class {
    #listeners = new Map();

    constructor(emitter) {
        const events = [
            'js.initialised', 'js.change',
            'css.initialised', 'css.change',
            'hash.initialised', 'hash.change',
            'dependencies.initialised', 'dependencies.change',
            'dependencies.hash.initialised', 'dependencies.hash.change',
            'dependency.initialised', 'dependency.change'
        ];
        events.forEach(event => this.#listeners.set(event, (...params) => emitter.emit(event, ...params)));
    }

    subscribe = packagers => packagers.forEach(packager => {
        const listeners = this.#listeners;
        packager.js?.on('initialised', listeners.get('js.initialised'));
        packager.js?.on('change', listeners.get('js.change'));
        packager.css?.on('initialised', listeners.get('css.initialised'));
        packager.css?.on('change', listeners.get('css.change'));
        packager.hash.on('initialised', listeners.get('hash.initialised'));
        packager.hash.on('change', listeners.get('hash.change'));
        packager.dependencies.on('initialised', listeners.get('dependencies.initialised'));
        packager.dependencies.on('change', listeners.get('dependencies.change'));
        packager.dependencies.hash.on('initialised', listeners.get('dependencies.hash.initialised'));
        packager.dependencies.hash.on('change', listeners.get('dependencies.hash.change'));
        packager.dependencies.on('dependency.initialised', listeners.get('dependency.initialised'));
        packager.dependencies.on('dependency.change', listeners.get('dependency.change'));
    });

    unsubscribe = packagers => packagers.forEach(packager => {
        const listeners = this.#listeners;
        packager.js?.off('initialised', listeners.get('js.initialised'));
        packager.js?.off('change', listeners.get('js.change'));
        packager.css?.off('initialised', listeners.get('css.initialised'));
        packager.css?.off('change', listeners.get('css.change'));
        packager.hash.off('initialised', listeners.get('hash.initialised'));
        packager.hash.off('change', listeners.get('hash.change'));
        packager.dependencies.off('initialised', listeners.get('dependencies.initialised'));
        packager.dependencies.off('change', listeners.get('dependencies.change'));
        packager.dependencies.hash.off('initialised', listeners.get('dependencies.hash.initialised'));
        packager.dependencies.hash.off('change', listeners.get('dependencies.hash.change'));
        packager.dependencies.off('dependency.initialised', listeners.get('dependency.initialised'));
        packager.dependencies.off('dependency.change', listeners.get('dependency.change'));
    });
}
