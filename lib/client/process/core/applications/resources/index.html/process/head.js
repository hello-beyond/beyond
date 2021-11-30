/**
 * Process the index.html resource
 *
 * @param application {object} The application object
 * @param distribution {object} The distribution specification
 * @returns {Promise<*>}
 */
module.exports = async function (application, distribution) {
    'use strict';

    const amd = distribution.bundles.mode === 'amd';

    // Process application icons for the different platforms
    let head = await require('./icons.js')(application, distribution);

    const hosts = {
        'require': 'packages/@beyond-js/kernel/static/vendor/require.min.js',
        'core': 'packages/@beyond-js/kernel/core/ts.js',
        'routing': `packages/@beyond-js/kernel/routing/ts.js`,
        'phonegap': 'packages/@beyond-js/kernel/phonegap/ts.js',
        'start': 'start.js',
        'cordova': 'cordova.js'
    };

    const root = distribution.platform === 'web' ? '/' : '';
    const {ssr} = distribution;

    // Include application styles
    !ssr && application.template?.application &&
    (head += `<link rel="stylesheet" type="text/css" id="beyond-application-styles" ` +
        `href="${root}styles.css" media="screen" />\n`);

    // Include global styles
    !ssr && application.template?.global &&
    (head += `<link rel="stylesheet" type="text/css" id="beyond-global-styles" ` +
        `href="${root}global.css" media="screen" />\n`);

    const main = amd ? `data-main="${root}start"` : '';
    head += `<script ${main} src="${root}${hosts.require}"></script>\n`;
    head += distribution.local ? '<script>requirejs.config({waitSeconds: 30});</script>\n' : '';
    head += amd ? '' : `<script src="${root}${hosts.core}" type="module"></script>\n`;

    // BeyondJS routing bundle must be loaded before the 'start' code as it exposes
    // the functions to configure the pages and the layouts that the start code configures
    head += amd ? '' : `<script src="${root}${hosts.routing}" type="module"></script>\n`;

    head += distribution.platform !== 'web' ? `<script src="${root}${hosts.phonegap}"></script>\n` : '';
    head += amd ? '' : `<script src="${root}${hosts.start}" type="module"></script>\n`;

    distribution.platform !== 'web' ? head += `<script src="${hosts.cordova}"></script>\n\n` : null;

    // add a tab in all lines to the head code
    head = head.replace(/\n/g, '\n    ');
    return head;
}
