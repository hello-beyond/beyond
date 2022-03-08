const qs = require('querystring');

module.exports = async function (url, application, distribution) {
    'use strict';

    let {pathname} = url;
    if (!pathname.startsWith('/packages/')) return;

    // Remove the extension
    let extname = pathname.endsWith('.js.map') ? '.js.map' : void 0;
    extname = extname ? extname : (pathname.endsWith('.d.ts') ? '.d.ts' : '');
    extname = extname ? extname : (pathname.endsWith('.js') ? '.js' : '');
    pathname = pathname.slice(0, pathname.length - extname.length);

    // Remove the /packages/ string at the beggining of the pathname
    const split = pathname.substr(10).split('/');

    const scope = split[0].startsWith('@') ? `${split.shift()}/` : '';
    let [pkg, ...subpath] = split;
    pkg = `${scope}${pkg}`;
    subpath = subpath.join('/');

    await application.libraries.ready;
    if (application.libraries.has(pkg)) return;

    if (!['.js'].includes(extname)) {
        return new global.Resource({'500': 'Package extension must be .js'});
    }

    const {content, errors, resource} = await require('./process')(pkg, subpath, application, distribution);
    if (resource) return resource;

    const info = qs.parse(url.query).info !== undefined;
    if (info) {
        return !errors ?
            new global.Resource({
                content: 'External resource is not reporting any errors or warnings',
                extname: '.html'
            }) :
            new global.Resource({'500': await require('./info')(errors), extname: '.html'});
    }

    if (errors) {
        return new global.Resource({'500': `External resource has been processed with errors`});
    }

    return new global.Resource({content, extname: '.js'});
}
