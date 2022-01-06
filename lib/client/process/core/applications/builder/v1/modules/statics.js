const {fs} = global.utils;

/**
 * Build module static resources
 *
 * @param builder {object} The builder object
 * @param module {object} The module
 * @param path {string} The build target path
 * @return {Promise<void>}
 */
module.exports = async function (builder, module, path) {
    'use strict';

    await module.static.ready;
    for (let resource of await module.static.values()) {
        const relative = resource.file.relative.file;
        resource = resource.overwrite ? resource.overwrite : resource.file;

        const target = require('path').join(path, module.pathname, 'static', relative);
        await fs.mkdir(require('path').dirname(target), {'recursive': true});
        await fs.copyFile(resource.file, target);
    }
}
