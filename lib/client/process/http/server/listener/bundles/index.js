const {PathnameParser} = global;

module.exports = async function (url, application, distribution) {
    'use strict';

    let {pathname} = url;
    if (pathname.includes('/static/')) return;

    const map = pathname.endsWith('.map');
    pathname = map ? pathname.slice(0, pathname.length - 4) : pathname;
    const parsed = new PathnameParser(application, pathname, url.search.slice(1));
    await parsed.process(distribution);
    if (!parsed.valid) return new global.Resource({'500': parsed.error});

    if (!['.d.ts', '.js', '.css'].includes(parsed.extname) || !parsed.found) return;

    const {bundle} = parsed;
    const info = url.searchParams.has('info');
    switch (parsed.is) {
        case 'transversal':
            return await require('./transversals')(application, distribution, bundle, parsed, info, map);
        case 'bundle':
            return await require('./bundle')(application, distribution, bundle, parsed, info, map);
    }
}
