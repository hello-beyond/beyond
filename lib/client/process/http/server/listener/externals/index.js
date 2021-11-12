module.exports = async function (url, application) {
    'use strict';

    const diagnostics = url.pathname.substr(url.pathname.length - 5) === '.html';
    const pathname = diagnostics ? url.pathname.substr(0, url.pathname.length - 5) : url.pathname;

    let extname = pathname.endsWith('.js.map') ? '.js.map' : void 0;
    extname = extname ? extname : (pathname.endsWith('.js') ? '.js' : void 0);
    if (!pathname || !pathname.startsWith('/packages/')) return;

    const split = pathname.substr(10).split('/');
    const file = split.pop();
    let pkg = split.join('/');

    const {externals} = application;
    await externals.ready;

    const external = [...externals.values()].find(external => pkg === external.package);
    if (!external) return;

    await external.ready;
    if (!external.valid) {
        return new global.Resource({'404': `External package "${pkg}" has errors: ${JSON.stringify(external.errors)}`});
    }

    const {content, errors} = external.js(file);
    if (diagnostics) {
        return !errors ?
            new global.Resource({
                content: 'External resource is not reporting any errors or warnings',
                extname: '.html'
            }) :
            new global.Resource({'500': await require('./diagnostics')(errors), extname: '.html'});
    }

    if (errors) {
        return new global.Resource({'500': `External resource has been processed with errors`});
    }
    else if (!content) {
        return new global.Resource({'404': `Content of external package "${pkg}" not found`});
    }

    return new global.Resource({content, extname: '.js'});
}
