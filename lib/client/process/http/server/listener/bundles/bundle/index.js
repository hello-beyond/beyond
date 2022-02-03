module.exports = async function (application, distribution, bundle, resource, info) {
    'use strict';

    await bundle.ready;

    // Check language only in js bundle, as it does not apply to declarations
    const {multilanguage} = bundle;
    const {language} = resource;
    const check = resource.extname === '.js' && resource.checkLanguage(multilanguage);
    if (check.error) return new global.Resource({'404': check.error});

    const packager = bundle.packagers.get(distribution, language);
    await packager.ready;

    return ['.js', '.css'].includes(resource.extname) ?
        await require('./code')(packager, resource, info) :
        await require('./declaration')(packager, resource, info);
}
