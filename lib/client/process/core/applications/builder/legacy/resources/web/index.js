/**
 * Build web favicon
 *
 * @param builder {object} The builder object
 * @param distribution {object} Distribution specification
 * @param path {string} The build target path
 * @returns {Promise<void>}
 */
module.exports = async function (builder, distribution, path) {
    'use strict';

    if (distribution.platform !== 'web') return;
    builder.emit('message', 'Building web configuration');
}
