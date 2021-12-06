const {fs} = global.utils;

/**
 * Build config.js file
 *
 * @param application {object} The application object
 * @param distribution {object} Distribution specification
 * @param path {string} The build target path
 * @param uglifier {object} The uglifier
 * @param events {object} The events object
 * @returns {Promise<void>}
 */
module.exports = async function (application, distribution, path, uglifier, events) {
    'use strict';

    events.emit('message', 'Building config.js file');

    const config = await application.config.get(distribution);
    await config.ready;
    const target = require('path').join(path, 'config.js');

    if (distribution.compress) {
        const {code, errors} = uglifier.uglify('start.js', config.code);
        errors ? events.emit('error', 'Error uglifying application styles') :
            await fs.save(target, code);
    }
    else {
        await fs.save(target, config.code);
    }
}
