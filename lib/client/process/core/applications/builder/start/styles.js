const {fs} = global.utils;

/**
 * Build styles.css file
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

    events.emit('message', 'Building styles.css file');

    const styles = await application.styles.get(distribution);
    if (styles) {
        await styles.ready;
        const target = require('path').join(path, 'styles.css');

        if (distribution.compress) {
            const {errors, css} = uglifier.uglify('styles.css', styles.value);
            errors ? events.emit('error', 'Error uglifying application styles') :
                await fs.save(target, css);
        }
        else {
            await fs.save(target, styles.value);
        }
    }
}
