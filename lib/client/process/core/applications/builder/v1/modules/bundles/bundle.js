const {fs} = global.utils;

/**
 * Build a bundle of a module
 *
 * @param path {string} The build target path
 * @param module {object} The module
 * @param bundle {object} The bundle being exported
 * @param distribution {object} The distribution specification
 * @param language {string} The language
 * @param uglifier {object}
 * @param builder {object} The builder object
 * @param exports {Set<string>} The resources being exported
 * @return {Promise<void>}
 */
module.exports = async function (path, module, bundle, distribution, language, uglifier, builder, exports) {
    const packager = await bundle.packagers.get(distribution, language);

    let {code} = packager;
    await code.ready;
    if (!code.valid) {
        builder.emit('error', `  . Bundle "${bundle.pathname}" is not valid`);
        return;
    }

    const exported = require('path').join(module.pathname, bundle.name + (language ? `.${language}` : ''));
    exports.add(exported.replace(/\\/g, '/'));
    const target = require('path').join(path, `${exported}.js`);

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
}
