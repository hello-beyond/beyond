/**
 * Return the code of a bundle
 *
 * @param application {object} The application object
 * @param distribution {object} The distribution specification
 * @param bundle {object} The bundle object
 * @param resource {object} The parsed url
 * @param info {boolean} If requesting the transversal information
 * @param map {boolean} True if requesting a source map
 * @return {Promise<*>}
 */
module.exports = async function (application, distribution, bundle, resource, info, map) {
    'use strict';

    await bundle.ready;
    if (!bundle.valid) {
        const {extname} = resource;
        return info ? await require('./info')({bundle, extname}) :
            new global.Resource({'500': 'Bundle is invalid'});
    }

    const {language} = resource;
    const packager = bundle.packagers.get(distribution, language);
    await packager.ready;

    return ['.js', '.css'].includes(resource.extname) ?
        await require('./code')(packager, bundle, resource, info, distribution, map) :
        await require('./declaration')(packager, resource, info);
}
