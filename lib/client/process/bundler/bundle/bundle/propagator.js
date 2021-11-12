module.exports = class {
    #listeners = new Map();

    constructor(emitter) {
        const events = ['packager.initialised', 'packager.change',
            'dependencies.initialised', 'dependencies.change',
            'dependency.initialised', 'dependency.change',
            'code.initialised', 'code.change',
            'hash.initialised', 'hash.change'
        ];
        events.forEach(event => this.#listeners.set(event, (...params) => emitter.emit(event, ...params)));
    }

    subscribe(packager) {
        const listeners = this.#listeners;
        packager.on('initialised', listeners.get('packager.initialised'));
        packager.on('change', listeners.get('packager.change'));
        packager.dependencies.on('initialised', listeners.get('dependencies.initialised'));
        packager.dependencies.on('change', listeners.get('dependencies.change'));
        packager.dependencies.on('dependency.initialised', listeners.get('dependency.initialised'));
        packager.dependencies.on('dependency.change', listeners.get('dependency.change'));
        packager.code.on('initialised', listeners.get('code.initialised'));
        packager.code.on('change', listeners.get('code.change'));
        packager.hash.on('initialised', listeners.get('hash.initialised'));
        packager.hash.on('change', listeners.get('hash.change'));
    }

    unsubscribe(packager) {
        const listeners = this.#listeners;
        packager.off('initialised', listeners.get('packager.initialised'));
        packager.off('change', listeners.get('packager.change'));
        packager.dependencies.off('initialised', listeners.get('dependencies.initialised'));
        packager.dependencies.off('change', listeners.get('dependencies.change'));
        packager.dependencies.off('dependency.initialised', listeners.get('dependency.initialised'));
        packager.dependencies.off('dependency.change', listeners.get('dependency.change'));
        packager.code.off('initialised', listeners.get('code.initialised'));
        packager.code.off('change', listeners.get('code.change'));
        packager.hash.off('initialised', listeners.get('hash.initialised'));
        packager.hash.off('change', listeners.get('hash.change'));
    }
}
