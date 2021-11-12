const {fs} = global.utils;

/**
 * Build index.html file
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

    events.emit('message', 'Building index.html file');

    // Build index.html
    let target, resource;
    resource = await application.resources.index.content(undefined, distribution);

    target = require('path').join(path, 'index.html');
    if (distribution.compress) {
        let html, errors;
        ({html, errors} = uglifier.uglify('index.html', resource));
        errors ? events.emit('error', 'Error uglifying index.html file') : await fs.save(target, html);
    }
    else {
        await fs.save(target, resource);
    }
}
