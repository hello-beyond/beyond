/**
 * Build application modules
 *
 * @param builder {object} The builder object
 * @param distribution {object} Distribution specification
 * @param path {string} The build target path
 * @param uglifier {object} The uglifier
 * @returns {Promise<void>}
 */
module.exports = async function (builder, distribution, path, uglifier) {
    'use strict';

    builder.emit('message', 'Building application modules');

    const {platform} = distribution;
    const {application} = builder;
    await application.modules.ready;
    for (const module of await application.modules.values()) {
        await module.ready;
        if (module.container.package === '@beyond-js/local') continue;
        if (!distribution.ssr && module.container.package === '@beyond-js/ssr') continue;
        if (!module.platforms.has(platform)) continue;

        builder.emit('message', `. Building module "${module.pathname}"`);
        await require('./bundles.js')(builder, module, distribution, path, uglifier);
        await require('./statics.js')(builder, module, path);
    }
}
