module.exports = class {
    #listeners = new Map();

    constructor(emitter) {
        const events = ['bundle.initialised', 'bundle.change',
            'packager.initialised', 'packager.change',
            'dependencies.initialised', 'dependencies.change',
            'dependency.initialised', 'dependency.change',
            'code.initialised', 'code.change',
            'hash.initialised', 'hash.change'];

        const listeners = this.#listeners;
        events.forEach(event => listeners.set(event, (...params) => emitter.emit(event, ...params)));
    }

    subscribe = bundles => bundles.forEach(bundle => {
        const listeners = this.#listeners;
        bundle.on('initialised', listeners.get('bundle.initialised'));
        bundle.on('change', listeners.get('bundle.change'));
        bundle.packagers.on('packager.initialised', listeners.get('packager.initialised'));
        bundle.packagers.on('packager.change', listeners.get('packager.change'));
        bundle.packagers.on('dependencies.initialised', listeners.get('dependencies.initialised'));
        bundle.packagers.on('dependencies.change', listeners.get('dependencies.change'));
        bundle.packagers.on('dependency.initialised', listeners.get('dependency.initialised'));
        bundle.packagers.on('dependency.change', listeners.get('dependency.change'));
        bundle.packagers.on('code.initialised', listeners.get('code.initialised'));
        bundle.packagers.on('code.change', listeners.get('code.change'));
        bundle.packagers.on('hash.initialised', listeners.get('hash.initialised'));
        bundle.packagers.on('hash.change', listeners.get('hash.change'));
    });

    unsubscribe = bundles => bundles.forEach(bundle => {
        const listeners = this.#listeners;
        bundle.off('initialised', listeners.get('bundle.initialised'));
        bundle.off('change', listeners.get('bundle.change'));
        bundle.packagers.off('packager.initialised', listeners.get('packager.initialised'));
        bundle.packagers.off('packager.change', listeners.get('packager.change'));
        bundle.packagers.off('dependencies.initialised', listeners.get('dependencies.initialised'));
        bundle.packagers.off('dependencies.change', listeners.get('dependencies.change'));
        bundle.packagers.off('dependency.initialised', listeners.get('dependency.initialised'));
        bundle.packagers.off('dependency.change', listeners.get('dependency.change'));
        bundle.packagers.off('code.initialised', listeners.get('code.initialised'));
        bundle.packagers.off('code.change', listeners.get('code.change'));
        bundle.packagers.off('hash.initialised', listeners.get('hash.initialised'));
        bundle.packagers.off('hash.change', listeners.get('hash.change'));
    });
}
