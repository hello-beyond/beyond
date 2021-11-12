const {PathnameParser} = global;

module.exports = async function (url, application, distribution) {
    'use strict';

    if (url.pathname.includes('/static/')) return;

    const parsed = new PathnameParser(application, url.pathname);
    await parsed.process();

    if (parsed.error) return new global.Resource({'404': parsed.error});
    if (!parsed.is) return;

    const {error, transversal, bundle} = await parsed.find();
    if (error) return new global.Resource({'404': error});

    switch (parsed.is) {
        case 'transversal':
            return await require('./transversals')(application, distribution, transversal, parsed);
        case 'processor':
            return await require('./processor')(application, distribution, bundle, parsed);
        case 'bundle':
            return await require('./bundle')(application, distribution, bundle, parsed);
    }
}
