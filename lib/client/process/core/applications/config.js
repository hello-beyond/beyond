/**
 * Process application configuration
 *
 * @param config {object} The application configuration input
 * @returns {object} The post processed library configuration
 */
module.exports = function (config) {
    'use strict';

    // All the configuration properties that are not reserved keys, are bundles
    const reserved = ['modules', 'static', 'scope', 'name', 'title', 'description', 'version', 'languages',
        'connect', 'hosts', 'baseUrl', 'routing', 'layout', 'params', 'backend', 'engine', 'deployment'];

    // Move the bundles to the .bundles attribute
    config.bundles = {};
    for (const attribute of Object.keys(config)) {
        if (attribute === 'bundles') continue;
        if (reserved.includes(attribute)) continue;

        // Just for backward compatibility
        if (attribute === 'backend' && config.backend.engine === 'legacy') continue;

        config.bundles[attribute] = config[attribute];
        delete config[attribute];
    }

    return config;
}
