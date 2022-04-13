/**
 * Process library configuration
 *
 * @param config {object} The library configuration input
 * @returns {object} The post processed library configuration
 */
module.exports = function (config) {
    'use strict';

    // All the configuration properties that are not reserved keys, are bundles
    const reserved = ['modules', 'static', 'scope', 'name', 'description', 'version', 'connect', 'hosts'];

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
