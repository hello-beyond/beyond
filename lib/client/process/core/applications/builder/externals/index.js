const {fs} = global.utils;

/**
 * Copy externals (node dependencies) static resources
 *
 * @param application {object} The application object
 * @param distribution {object} Distribution specification
 * @param path {string} The destination path
 * @param events {object} The events object
 * @returns {Promise<void>}
 */
module.exports = async function (application, distribution, path, events) {
    'use strict';

    events.emit('message', 'Copying external resources');

    const {externals} = application;
    await externals.ready;

    const promises = [];
    externals.forEach(external => promises.push(external.ready));
    await Promise.all(promises);

    for (const [pkg, external] of externals) {
        const {filename, errors} = external.filename(distribution);
        if (errors) {
            events.emit('error', `  . Errors found on external "${pkg}"`);
            continue;
        }
        const {content} = external.js(filename);

        await fs.mkdir(require('path').join(path, 'packages', pkg), {'recursive': true});
        const target = require('path').join(path, 'packages', `${pkg}/${filename}`);
        await fs.save(target, content);
    }
}
