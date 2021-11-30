/**
 * Build application modules
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

    events.emit('message', 'Building application modules');

    await application.modules.ready;
    for (const module of await application.modules.values()) {
        await module.ready;

        if (module.container.is === 'library' && module.container.name === 'beyond-local') continue;

        events.emit('message', `. Building module "${module.pathname}"`);
        await require('./bundles.js')(application, module, distribution, path, uglifier, events);
        await require('./statics.js')(application, module, path);
    }
}
