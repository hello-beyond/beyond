/**
 * Build web favicon
 *
 * @param application {object} The application object
 * @param distribution {object} Distribution specification
 * @param path {string} The build target path
 * @param events {object} The events object
 * @returns {Promise<void>}
 */
module.exports = async function (application, distribution, path, events) {
    'use strict';

    if (distribution.platform !== 'web') return;
    events.emit('message', 'Building web configuration');
}
