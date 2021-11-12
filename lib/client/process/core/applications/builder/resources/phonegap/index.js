const {fs} = global.utils;

/**
 * Build phonegap config.xml & main.html (android only)
 *
 * @param application {object} The application object
 * @param distribution {object} Distribution specification
 * @param path {string} The build target path
 * @param events {object} The events object
 * @returns {Promise<void>}
 */
module.exports = async function (application, distribution, path, events) {
    'use strict';

    if (['android', 'ios'].includes(distribution.platform)) return;

    events.emit('message', 'Building phonegap configuration');

    const resources = await application.resources.phonegap(distribution.platform);
    for (const value of resources) {
        const {output, resource} = value;
        const target = require('path').join(path, output);
        await fs.mkdir(require('path').dirname(target), {'recursive': true});

        if (resource.type === 'file') {
            await fs.copyFile(resource.file, target);
        }
        else if (resource.type === 'content') {
            await fs.save(target, resource.content);
        }
        else {
            throw new Error('Invalid resource type');
        }
    }

    // Create, copy icons and splash resources
    await (require('./screens-icons'))(application, distribution, path, events);
}
