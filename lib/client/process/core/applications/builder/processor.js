/**
 * Build an application with a distribution specification
 *
 * @param application {object} The application object
 * @param distribution {object} The distribution specification
 * @param builds {object} Helper of the storage of the builds in disk
 * @param events {object} The events object
 * @returns {Promise<void>}
 */
module.exports = function (application, distribution, builds, events) {
    'use strict';

    const fs = global.utils.fs;
    const uglifier = new (require('./uglifier'));

    const paths = {};
    Object.defineProperty(this, 'paths', {'get': () => paths});

    const p = require('path');
    paths.builds = p.join(process.cwd(), '.beyond/builds/client');
    paths.base = p.join(paths.builds, distribution.name);
    paths.build = p.join(paths.base, 'code');
    paths.www = p.join(paths.build, ['android', 'ios'].includes(distribution.plaform) ? 'www' : '');
    paths.archive = p.join(paths.base, 'build.zip');

    this.process = async function () {
        if (await fs.exists(paths.base)) {
            events.emit('message', `A previous build was found on "${paths.base}"`);
            events.emit('message', 'Removing all content of the previous build');
            await fs.rm(paths.base);
            events.emit('message', 'Previous build removed');
        }
        else {
            events.emit('message', `Build is being processed on "${paths.base}"`);
        }
        if (await fs.exists(paths.base)) {
            throw new Error(`Directory "${paths.base}" must be empty before building application`);
        }

        // Append the build data to the builds storage
        await builds.append(paths, distribution);

        // Create the target directory
        await fs.mkdir(paths.build, {'recursive': true});

        // Build mode specific resources, as icons, splash, configuration files
        await (require('./resources'))(application, distribution, paths.build, events);

        // build index.html, config.js and start.js files
        await (require('./start'))(application, distribution, paths.www, uglifier, events);

        // Copy static resources
        await (require('./statics'))(application, distribution, paths.www, events);

        // Copy externals resources (node dependencies resources)
        await (require('./externals'))(application, distribution, paths.www, events);

        // Copy libraries statics resources
        await (require('./libraries'))(application, distribution, paths.www, events);

        // Build modules
        await (require('./modules'))(application, distribution, paths.www, uglifier, events);

        // Create the .zip file
        await require('./archive.js')(application, paths.build, paths.archive, events);

        // Append the build data to the builds storage
        await builds.append(paths, distribution, true);
    }
}
