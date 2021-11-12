const {fs} = global.utils;

/**
 * Build transversal start
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

    events.emit('message', 'Building start.js transversal file');

    // Build start.js
    await application.transversals.ready;
    const resource = application.transversals.get('start').packagers.get(distribution);
    await resource.code.ready;

    let {code, errors, valid} = resource.code;
    if (!valid) {
        events.emit('error', 'Error on application start code');
        errors.forEach(error => events.emit('error', `  -> ${error}`));
        return;
    }

    const target = require('path').join(path, 'start.js');
    if (distribution.compress) {
        let errors;
        ({code, errors} = uglifier.uglify('start.js', code));

        errors && events.emit('error', 'Error uglifying application start');
        errors?.forEach(({message, line, col}) => events.emit('error', `    -> [${line}, ${col}] ${message}`));
        !errors && await fs.save(target, code);
    }
    else {
        await fs.save(target, code);
    }
}