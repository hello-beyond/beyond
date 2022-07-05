/**
 * Build module bundles
 *
 * @param builder {object} The builder object
 * @param module {object} The module
 * @param distribution {object} Distribution specification
 * @param path {string} The build target path
 * @param uglifier {object} The uglifier
 * @param exports {Set<string>} The resources being exported
 * @param externals {Set<string>} The externals resources being generated
 * @returns {Promise<void>}
 */
module.exports = async function (builder, module, distribution, path, uglifier, exports, externals) {
    'use strict';

    const {bundles} = global;
    await bundles.ready;
    for (const bundle of module.bundles.values()) {
        await bundle.ready;
        if (!!bundles.get(bundle.name).transversal) continue;

        builder.emit('message', `  . Building bundle ${bundle.name}`);

        const build = async language => {
            const specs = {path, module, bundle, distribution, language, uglifier, builder, exports, externals};
            await require(distribution.npm ? './bundles' : './bundle')('.js', specs);
            await require('./bundle')('.css', specs);
        };

        if (bundle.multilanguage) {
            const {application} = builder;
            const languages = application.languages.supported;
            const promises = [];
            for (const language of languages) promises.push(build(language));
            await Promise.all(promises);
            continue;
        }
        await build();
    }
}