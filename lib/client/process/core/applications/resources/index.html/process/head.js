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
    const {platforms} = global;
    const {platform} = distribution;
    const ssr = distribution.platform === 'web.ssr';

    // Process application icons for the different platforms
    let head = await require('./icons.js')(application, distribution);

    const hosts = {
        require: 'packages/@beyond-js/kernel/vendor/require.min.js',
        core: 'packages/@beyond-js/kernel/core/ts.js',
        hydrator: 'packages/@beyond-js/ssr/hydrator/ts.js',
        routing: `packages/@beyond-js/kernel/routing/ts.js`,
        config: 'config.js',
        start: 'start.js',
        cordova: 'cordova.js'
    };

    const root = platforms.web.includes(platform) ? '/' : '';

    // Include application styles
    application.template?.application &&
    (head += `<link rel="stylesheet" type="text/css" id="beyond-application-styles" ` +
        `href="${root}styles.css" media="screen" />\n`);

    // Include global styles
    application.template?.global &&
    (head += `<link rel="stylesheet" type="text/css" id="beyond-global-styles" ` +
        `href="${root}global.css" media="screen" />\n`);

    // The SSR hydrator
    head += ssr ? `<!-- #beyond.ssr -->` : '';
    head += ssr ? `<script src="${root}${hosts.hydrator}"></script>\n` : '';

    const defer = ssr ? 'defer="true"' : '';

    head += `<script ${defer} src="${root}${hosts.config}"></script>\n`;

    // Add RequireJS, if mode is AMD, then the data-main directive will load the start.js bundle
    // which in turn, in AMD mode also includes BeyondJS core and routing
    const main = amd ? `data-main="${root}start" ` : '';
    head += `<script ${defer} ${main} src="${root}${hosts.require}"></script>\n`;

    // As defer attribute works only with external scripts tag with src, it is base64
    if (distribution.local) {
        const rconfig = 'requirejs.config({waitSeconds: 30});';
        const base64 = Buffer.from(rconfig).toString('base64');
        const src = `data:text/javascript;base64,${base64}`;
        const script =
            '<!-- requirejs.config({waitSeconds}) -->\n' +
            `<script ${defer} src="${src}"></script>\n`;
        head += script;
    }

    // Add BeyondJS core, routing and start on ES6 imports mode
    // BeyondJS routing bundle must be loaded before the 'start' code as it exposes
    // the functions to configure the pages and the layouts that the start code configures
    head += !amd ? `<script src="${root}${hosts.core}" type="module"></script>\n` : '';
    head += !amd ? `<script src="${root}${hosts.routing}" type="module"></script>\n` : '';
    head += !amd ? `<script src="${root}${hosts.start}" type="module"></script>\n` : '';

    ['android', 'ios'].includes(platform) && (head += `<script src="${hosts.cordova}"></script>\n\n`);

    // add a tab in all lines to the head code
    head = head.replace(/\n/g, '\n    ');
    return head;
}
