module.exports = async function (application, distribution, bundle, resource) {
    'use strict';

    await bundle.ready;

    // Check language only in js bundle, as it does not apply to declarations
    const {multilanguage} = bundle;
    const {language} = resource;
    const check = resource.extname === '.js' && resource.checkLanguage(multilanguage);
    if (check.error) return check.error;

    const packager = bundle.packagers.get(distribution, language);
    await packager.ready;

    return resource.extname === '.js' ?
        await require('./code')(packager, resource) :
        await require('./declaration')(packager, resource);
}
