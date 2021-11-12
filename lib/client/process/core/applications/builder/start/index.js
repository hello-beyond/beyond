/**
 * Build index.html, styles.css and transversals
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

    await require('./index-html')(application, distribution, path, uglifier, events);
    await require('./transversal')(application, distribution, path, uglifier, events);
    await require('./styles')(application, distribution, path, uglifier, events);
}
