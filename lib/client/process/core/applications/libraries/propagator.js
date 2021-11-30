module.exports = class {
    #listeners = new Map();

    constructor(emitter) {
        const events = ['library.initialised', 'library.change',
            'bundles.initialised', 'bundles.change',
            'modules.initialised', 'modules.change'];
        events.forEach(event => this.#listeners.set(event, (...params) => emitter.emit(event, ...params)));

        this.#listeners.set('bundle.initialised', bundle => {
            emitter.emit(`bundle.initialised`, bundle);
            emitter.emit(`bundle.${bundle.name}.initialised`);
        });
        this.#listeners.set('bundle.change', bundle => {
            emitter.emit(`bundle.change`, bundle);
            emitter.emit(`bundle.${bundle.name}.change`);
        });
        this.#listeners.set('packager.initialised', ({bundle, distribution, language}) => {
            emitter.emit(`packager.${bundle.name}.${distribution.key}.${language}.initialised`);
        });
        this.#listeners.set('packager.change', ({bundle, distribution, language}) => {
            emitter.emit(`packager.${bundle.name}.${distribution.key}.${language}.change`);
        });
        this.#listeners.set('code.initialised', ({packager}) => {
            const {bundle, distribution, language} = packager;
            emitter.emit(`code.${bundle.name}.${distribution.key}.${language}.initialised`);
        });
        this.#listeners.set('code.change', ({packager}) => {
            const {bundle, distribution, language} = packager;
            emitter.emit(`code.${bundle.name}.${distribution.key}.${language}.change`);
        });
        this.#listeners.set('hash.initialised', ({packager}) => {
            const {bundle, distribution, language} = packager;
            emitter.emit(`hash.${bundle.name}.${distribution.key}.${language}.initialised`);
        });
        this.#listeners.set('hash.change', ({packager}) => {
            const {bundle, distribution, language} = packager;
            emitter.emit(`hash.${bundle.name}.${distribution.key}.${language}.change`);
        });
    }

    subscribe = libraries => libraries.forEach(library => {
        const listeners = this.#listeners;

        library.on('initialised', listeners.get('library.initialised'));
        library.on('change', listeners.get('library.change'));

        library.modules.on('initialised', listeners.get('modules.initialised'));
        library.modules.on('change', listeners.get('modules.change'));

        library.bundles.on('initialised', listeners.get('bundles.initialised'));
        library.bundles.on('change', listeners.get('bundles.change'));

        library.bundles.on('bundle.initialised', listeners.get('bundle.initialised'));
        library.bundles.on('bundle.change', listeners.get('bundle.change'));

        library.bundles.on('packager.initialised', listeners.get('packager.initialised'));
        library.bundles.on('packager.change', listeners.get('packager.change'));

        library.bundles.on('code.initialised', listeners.get('code.initialised'));
        library.bundles.on('code.change', listeners.get('code.change'));

        library.bundles.on('hash.initialised', listeners.get('hash.initialised'));
        library.bundles.on('hash.change', listeners.get('hash.change'));
    });

    unsubscribe = libraries => libraries.forEach(library => {
        const listeners = this.#listeners;

        library.off('initialised', listeners.get('library.initialised'));
        library.off('change', listeners.get('library.change'));

        library.modules.off('initialised', listeners.get('modules.initialised'));
        library.modules.off('change', listeners.get('modules.change'));

        library.bundles.off('initialised', listeners.get('bundles.initialised'));
        library.bundles.off('change', listeners.get('bundles.change'));

        library.bundles.off('bundle.initialised', listeners.get('bundle.initialised'));
        library.bundles.off('bundle.change', listeners.get('bundle.change'));

        library.bundles.off('packager.initialised', listeners.get('packager.initialised'));
        library.bundles.off('packager.change', listeners.get('packager.change'));

        library.bundles.off('code.initialised', listeners.get('code.initialised'));
        library.bundles.off('code.change', listeners.get('code.change'));

        library.bundles.off('hash.initialised', listeners.get('hash.initialised'));
        library.bundles.off('hash.change', listeners.get('hash.change'));
    });
}
