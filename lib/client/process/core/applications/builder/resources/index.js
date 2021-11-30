/**
 * Build mode specific resources, as icons, splash, configuration files
 *
 * @param application {object} The application object
 * @param distribution {object} Distribution specification
 * @param path {string} The build target path
 * @param events {object} The events object
 * @returns {Promise<void>}
 */
module.exports = (application, distribution, path, events) =>
    require(`./${distribution.platform === 'web' ? 'web' : 'phonegap'}`)
    (application, distribution, path, events);
