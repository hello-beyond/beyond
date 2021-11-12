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

    events.emit('message', 'Copying libraries static resources');

    await application.libraries.ready;
    for (const library of application.libraries.values()) {
        await library.static.ready;

        for (let resource of library.static.values()) {
            const relative = resource.file.relative.file;
            resource = resource.overwrite ? resource.overwrite : resource.file;

            const target = require('path').join(
                path,
                'packages',
                library.package,
                'static',
                relative);

            await fs.mkdir(require('path').dirname(target), {'recursive': true});
            await fs.copyFile(resource.file, target);
        }
    }
}
