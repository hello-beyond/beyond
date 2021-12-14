const {fs} = global.utils;

/**
 * Build module bundles
 *
 * @param builder {object} The builder object
 * @param module {object} The module
 * @param distribution {object} Distribution specification
 * @param path {string} The build target path
 * @param uglifier {object} The uglifier
 * @returns {Promise<void>}
 */
module.exports = async function (builder, module, distribution, path, uglifier) {
    'use strict';

    const {bundles} = global;
    await bundles.ready;

    for (const bundle of module.bundles.values()) {
        await bundle.ready;
        if (!!bundles.get(bundle.name).Transversal) continue;

        builder.emit('message', `  . Building bundle ${bundle.name}`);

        const build = async language => {
            const packager = await bundle.packagers.get(distribution, language);

            let {code} = packager;
            await code.ready;
            if (!code.valid) {
                builder.emit('error', `  . Bundle "${bundle.pathname}" is not valid`);
                return;
            }

            const target = require('path').join(
                path,
                module.pathname,
                bundle.name + (language ? `.${language}.js` : '.js')
            );

            if (distribution.compress) {
                let errors;
                ({code, errors} = uglifier.uglify(target, code.code));

                errors && builder.emit('error', `  . Error uglifying bundle "${bundle.pathname}"`);
                errors?.forEach(({message, line, col}) =>
                    builder.emit('error', `    -> [${line}, ${col}] ${message}`));
                !errors && await fs.save(target, code);
            }
            else {
                await fs.save(target, code.code);
            }
        };

        if (bundle.multilanguage) {
            const {application} = builder;
            const languages = application.languages.supported;
            for (const language of languages) {
                await build(language);
            }
        }
        else {
            await build();
        }
    }
}
