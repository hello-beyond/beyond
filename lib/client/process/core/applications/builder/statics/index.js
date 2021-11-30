const {fs} = global.utils;

/**
 * Compile application static resources
 *
 * @param application {object} The application object
 * @param distribution {object} Distribution specification
 * @param path {string} The destination path
 * @param events {object} The events object
 * @returns {Promise<void>}
 */
module.exports = async function (application, distribution, path, events) {
    'use strict';

    events.emit('message', 'Copying static resources');

    await application.static.ready;
    for (const resource of application.static) {
        const target = require('path').join(path, resource.relative.file);
        await fs.mkdir(require('path').dirname(target), {'recursive': true});
        await fs.copyFile(resource.file, target);
    }
}
