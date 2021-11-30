module.exports = class {
    #listeners = new Map();

    constructor(emitter) {
        const listeners = this.#listeners;

        listeners.set('module.initialised', module => {
            emitter.emit('module.initialised');
            emitter.emit(`module.${module.pathname}.initialised`);
        });
        listeners.set('module.change', module => {
            emitter.emit('module.change');
            emitter.emit(`module.${module.pathname}.change`);
        });
        listeners.set('bundles.initialised', bundles => {
            emitter.emit('bundles.initialised');
            emitter.emit(`bundles.${bundles.container.pathname}.initialised`);
        });
        listeners.set('bundles.change', bundles => {
            emitter.emit('bundles.change');
            emitter.emit(`bundles.${bundles.container.pathname}.change`);
        });
        listeners.set('bundle.initialised', bundle => {
            emitter.emit('bundle.initialised');
            emitter.emit(`bundle.${bundle.name}.initialised`);
            emitter.emit(`bundle.${bundle.pathname}.initialised`);
        });
        listeners.set('bundle.change', bundle => {
            emitter.emit('bundle.change');
            emitter.emit(`bundle.${bundle.name}.change`);
            emitter.emit(`bundle.${bundle.pathname}.change`);
        });
        listeners.set('packager.initialised', ({bundle, distribution, language}) => {
            emitter.emit(`packager.${distribution.key}.${language}.initialised`);
            emitter.emit(`packager.${bundle.name}.${distribution.key}.${language}.initialised`);
        });
        listeners.set('packager.change', ({bundle, distribution, language}) => {
            emitter.emit(`packager.${distribution.key}.${language}.change`);
            emitter.emit(`packager.${bundle.name}.${distribution.key}.${language}.change`);
        });
        listeners.set('dependencies.initialised', ({packager}) => {
            const {distribution, language} = packager;
            emitter.emit(`dependencies.${distribution.key}.${language}.initialised`);
        });
        listeners.set('dependencies.change', ({packager}) => {
            const {distribution, language} = packager;
            emitter.emit(`dependencies.${distribution.key}.${language}.change`);
        });
        listeners.set('dependency.initialised', ({distribution, language}) => {
            emitter.emit(`dependency.${distribution.key}.${language}.initialised`);
        });
        listeners.set('dependency.change', ({distribution, language}) => {
            emitter.emit(`dependency.${distribution.key}.${language}.change`);
        });
        listeners.set('code.initialised', ({packager}) => {
            const {bundle, distribution, language} = packager;
            emitter.emit(`code.${bundle.name}.${distribution.key}.${language}.initialised`);
            emitter.emit(`code.${bundle.pathname}.${distribution.key}.${language}.initialised`);
        });
        listeners.set('code.change', ({packager}) => {
            const {bundle, distribution, language} = packager;
            emitter.emit(`code.${bundle.name}.${distribution.key}.${language}.change`);
            emitter.emit(`code.${bundle.pathname}.${distribution.key}.${language}.change`);
        });
        listeners.set('hash.initialised', ({packager}) => {
            const {bundle, distribution, language} = packager;
            emitter.emit(`hash.${bundle.name}.${distribution.key}.${language}.initialised`);
        });
        listeners.set('hash.change', ({packager}) => {
            const {bundle, distribution, language} = packager;
            emitter.emit(`hash.${bundle.name}.${distribution.key}.${language}.change`);
        });
    }

    subscribe = modules => modules.forEach(module => {
        const listeners = this.#listeners;

        module.on('initialised', listeners.get('module.initialised'));
        module.on('change', listeners.get('module.change'));

        module.bundles.on('initialised', listeners.get('bundles.initialised'));
        module.bundles.on('change', listeners.get('bundles.change'));

        module.bundles.on('bundle.initialised', listeners.get('bundle.initialised'));
        module.bundles.on('bundle.change', listeners.get('bundle.change'));

        module.bundles.on('packager.initialised', listeners.get('packager.initialised'));
        module.bundles.on('packager.change', listeners.get('packager.change'));

        module.bundles.on('dependencies.initialised', listeners.get('dependencies.initialised'));
        module.bundles.on('dependencies.change', listeners.get('dependencies.change'));

        module.bundles.on('dependency.initialised', listeners.get('dependency.initialised'));
        module.bundles.on('dependency.change', listeners.get('dependency.change'));

        module.bundles.on('code.initialised', listeners.get('code.initialised'));
        module.bundles.on('code.change', listeners.get('code.change'));

        module.bundles.on('hash.initialised', listeners.get('hash.initialised'));
        module.bundles.on('hash.change', listeners.get('hash.change'));
    });

    unsubscribe = modules => modules.forEach(module => {
        const listeners = this.#listeners;

        module.off('initialised', listeners.get('module.initialised'));
        module.off('change', listeners.get('module.change'));

        module.bundles.off('initialised', listeners.get('bundles.initialised'));
        module.bundles.off('change', listeners.get('bundles.change'));

        module.bundles.off('bundle.initialised', listeners.get('bundle.initialised'));
        module.bundles.off('bundle.change', listeners.get('bundle.change'));

        module.bundles.off('packager.initialised', listeners.get('packager.initialised'));
        module.bundles.off('packager.change', listeners.get('packager.change'));

        module.bundles.off('dependencies.initialised', listeners.get('dependencies.initialised'));
        module.bundles.off('dependencies.change', listeners.get('dependencies.change'));

        module.bundles.off('dependency.initialised', listeners.get('dependency.initialised'));
        module.bundles.off('dependency.change', listeners.get('dependency.change'));

        module.bundles.off('code.initialised', listeners.get('code.initialised'));
        module.bundles.off('code.change', listeners.get('code.change'));

        module.bundles.on('hash.initialised', listeners.get('hash.initialised'));
        module.bundles.on('hash.change', listeners.get('hash.change'));
    });
}
