const {URL} = require('url');

/**
 * The http listener that serves an application of an specific distribution.
 *
 * @param application {object} The application
 * @param distribution {object} The distribution specification
 * @returns {Function}
 */
module.exports = (application, distribution) => async function (request, response) {
    'use strict';

    const url = (() => {
        const url = new URL(request.url, 'http://127.0.0.1');

        // Note: in AMD mode, the querystring is not allowed (it is used require.undef by the beyond.reload method)
        const {pathname} = url;
        if (pathname.endsWith('.hmr.js')) {
            url.pathname = `${pathname.slice(0, pathname.length - 7)}.js`;
            url.searchParams.append('hmr', true);
        }
        return url;
    })();
    const respond = require('./respond')(url, response);

    try {
        await application.ready;
        await global.bundles.ready;

        const done = resource => respond(resource);

        if (url.pathname === '/') {
            // Return index.html on default page
            respond(await require('./index-html')(application, distribution, url));
            return;
        }

        let resource;

        resource = url.pathname.startsWith('/__info/') && await require('./info/resources')(url.pathname.slice(8));
        if (done(resource)) return;

        if (url.pathname === '/config.js') {
            respond(await require('./config')(application, distribution));
            return;
        }

        if (url.pathname === '/favicon.ico') {
            respond(new global.Resource({404: 'Resource not found'}));
            return;
        }

        if (url.pathname === '/uploader') {
            await require('./uploader')(response, {request: request});
            return;
        }

        resource = await require('./static')(application, distribution, url);
        if (done(resource)) return;

        resource = await require('./styles')(application, distribution, url);
        if (done(resource)) return;

        resource = await require('./externals')(url, application);
        if (done(resource)) return;

        resource = await require('./bundles')(url, application, distribution);
        if (done(resource)) return;

        resource = await require('./sources')(url, application, distribution);
        if (done(resource)) return;

        // Any other resource must return the index.html
        return respond(await require('./index-html')(application, distribution, url));
    }
    catch (exc) {
        !(exc instanceof global.errors.StandardError) ? console.error(`${exc.stack}\n`) : null;
        respond(new global.Resource({'500': exc.message}));
    }
}
