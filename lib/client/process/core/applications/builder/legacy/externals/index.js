const {fs} = global.utils;

/**
 * Copy externals (node dependencies) static resources
 *
 * @param builder {object} The builder object
 * @param distribution {object} Distribution specification
 * @param path {string} The destination path
 * @returns {Promise<void>}
 */
module.exports = async function (builder, distribution, path) {
    'use strict';

    builder.emit('message', 'Copying external resources');

    const {application: {externals}} = builder;
    await externals.ready;

    const promises = [];
    externals.forEach(external => promises.push(external.ready));
    await Promise.all(promises);

    for (const [pkg, external] of externals) {
        const {filename, errors} = external.filename(distribution);
        if (errors) {
            builder.emit('error', `  . Errors found on external "${pkg}"`);
            continue;
        }
        const {content} = external.js(filename);

        await fs.mkdir(require('path').join(path, 'packages', pkg), {'recursive': true});
        const target = require('path').join(path, 'packages', `${pkg}.js`);
        await fs.save(target, content);
    }
}
