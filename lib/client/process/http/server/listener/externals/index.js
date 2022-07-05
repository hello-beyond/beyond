const {join} = require('path');

module.exports = async function (url, application, distribution) {
    'use strict';

    let {pathname} = url;
    if (!pathname.startsWith('/packages/')) return;

    // Remove the extension
    let extname = pathname.endsWith('.js.map') ? '.js.map' : void 0;
    extname = extname ? extname : (pathname.endsWith('.d.ts') ? '.d.ts' : '');
    extname = extname ? extname : (pathname.endsWith('.js') ? '.js' : '');
    pathname = pathname.slice(0, pathname.length - extname.length);

    if (extname === '.d.ts') {
        return new global.Resource({'500': 'External package extension .d.ts actually not supported'});
    }

    const {bundle, pkg, version} = (() => {
        // Remove the /packages/ string at the beginning of the pathname
        const bundle = pathname.substr(10);
        const split = bundle.split('/');
        const pkg = split[0].startsWith('@') ? `${split.shift()}/${split.shift()}` : split.shift();
        return {bundle, pkg};
    })();

    // Check if package is an application library
    await application.libraries.ready;
    if (application.libraries.has(pkg)) return;

    if (!['.js', '.js.map'].includes(extname)) {
        return new global.Resource({'500': 'Package extension is invalid'});
    }

    const paths = {
        cwd: application.path,
        cache: join(process.cwd(), '.beyond/uimport'),
        temp: '.beyond/uimport'
        // cache: join(process.cwd(), '.beyond/uimport')
    };
    const {mode} = distribution;
    // const {code, map, errors} = await require('uimport')(bundle, version, mode, paths);
    const {code, map, errors} = await require('uimport')(bundle, paths);

    const info = url.searchParams.has('info');
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

    let content = extname === '.js.map' ? map : code;
    content = content ? content : '';
    return new global.Resource({content, extname});
}
