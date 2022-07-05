const {fs} = global.utils;

/**
 * Build a bundle of a module
 *
 * @param extname {string} Can be '.js' or '.css'
 * @param specs {object} {path, module, bundle, distribution, language, uglifier, builder, exports, externals}
 * @specs path {string} The build target path
 * @specs module {object} The module
 * @specs bundle {object} The bundle being exported
 * @specs distribution {object} The distribution specification
 * @specs language {string} The language
 * @specs uglifier {object}
 * @specs builder {object} The builder object
 * @specs exports {Set<string>} The resources being exported
 * @specs externals {Set<string>} The externals resources
 * @return {Promise<void>}
 */
module.exports = async function (extname, specs) {
    const {path, module, bundle, distribution, language, uglifier, builder, exports, externals} = specs;
    const packager = await bundle.packagers.get(distribution, language);

    let code = packager[extname === '.js' ? 'js' : 'css'];
    if (!code) return;

    await code.ready;
    if (!code.valid) {
        builder.emit('error', `  . Bundle "${bundle.pathname}" is not valid`);
        return;
    }
    if (!code.processorsCount || !code.code()) return;

    await require('./externals')(packager, distribution, externals);

    const exported = require('path').join(module.pathname, bundle.rname + (language ? `.${language}` : ''));
    const entry = exported.replace(/\\/g, '/');
    exports.set(entry, entry);
    const target = require('path').join(path, `${exported}${extname}`);

    if (!distribution.compress) {
        return fs.save(target, code.code());
    }

    let errors;
    ({code, errors} = uglifier.uglify(target, code.code()));
    errors && builder.emit('error', `  . Error uglifying bundle "${bundle.pathname}"`);
    errors?.forEach(({message, line, col}) => builder.emit('error', `    -> [${line}, ${col}] ${message}`));
    !errors && await fs.save(target, code);
}
