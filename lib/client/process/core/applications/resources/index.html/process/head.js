/**
 * Process the index.html resource
 *
 * @param application {object} The application object
 * @param distribution {object} The distribution specification
 * @returns {Promise<*>}
 */
module.exports = async function (application, distribution) {
    'use strict';

    const {platform} = distribution;

    // Process application icons for the different platforms
    let head = await require('./icons.js')(application, distribution);

    const hosts = {
        require: 'packages/@beyond-js/kernel/vendor/require.min.js',
        config: 'config.js',
        cordova: 'cordova.js'
    };

    let baseDir = application.baseDir ? application.baseDir : '';
    baseDir = platform === 'web' ? `/${baseDir}` : '';

    // Include application styles
    application.template?.application &&
    (head += `<link rel="stylesheet" type="text/css" id="beyond-application-styles" ` +
        `href="${baseDir}styles.css" media="screen" />\n`);

    // Include global styles
    application.template?.global &&
    (head += `<link rel="stylesheet" type="text/css" id="beyond-global-styles" ` +
        `href="${baseDir}global.css" media="screen" />\n`);

    // Check if favicon exists
    await (async () => {
        await application.static.ready;
        const {favicon, type} = (() => {
            if (application.static.includes('favicon.ico')) return {favicon: 'favicon.ico', type: 'image/ico'};
            if (application.static.includes('favicon.png')) return {favicon: 'favicon.png', type: 'image/png'};
            return {};
        })();
        head += favicon ? `<link rel="shortcut icon" type="${type}" href="${baseDir}${favicon}"/>\n` :
            '<link rel="icon" href="data:;base64,=">\n';
    })();

    // Include config.js
    head += `<script src="${baseDir}${hosts.config}"></script>\n`;

    // Include require.js, its configuration and launch the initial scripts
    head += `<script src="${baseDir}${hosts.require}"></script>\n`;
    head += `<script>${await require('./main')(baseDir, application, distribution)}</script>\n`;

    ['android', 'ios'].includes(platform) && (head += `<script src="${hosts.cordova}.js"></script>\n\n`);

    // add a tab in all lines to the head code
    head = head.replace(/\n/g, '\n    ');
    return head;
}
