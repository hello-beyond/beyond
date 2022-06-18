/**
 * Return the code of a transversal bundle
 *
 * @param application {object} The application object
 * @param distribution {object} The distribution specification
 * @param transversal {object} The transversal bundle
 * @param resource {object} The parsed url
 * @param info {boolean} If requesting the transversal information
 * @param map {boolean} True if requesting a source map
 * @return {Promise<*>}
 */
module.exports = async function (application, distribution, transversal, resource, info, map) {
    'use strict';

    if (resource.extname !== '.js') {
        return new global.Resource({'404': `Resource extension "${resource.extname}" is invalid`});
    }

    await transversal.ready;

    const check = resource.checkLanguage(transversal.multilanguage);
    if (check.error) return new global.Resource({'404': check.error});

    const tp = transversal.packagers.get(distribution, resource.language);
    await tp.ready;

    const {js} = tp;
    await js.ready;

    if (info) {
        return js.valid ?
            new global.Resource({content: 'Bundle is not reporting any errors or warnings', extname: '.html'}) :
            new global.Resource({'500': await require('./info')(tp), extname: '.html'});
    }
    else if (map) {
        const map = js.map();
        const content = typeof map === 'object' ? JSON.stringify(map) : map;
        return new global.Resource({content, extname: '.map'});
    }
    else {
        const mode = distribution.maps;
        const content = js.code ? require('../sourcemap')(transversal, js.code(), js.map(), resource.extname, mode) : '';

        return js.valid ?
            new global.Resource({content, extname: resource.extname}) :
            new global.Resource({'500': 'Bundle compiled with errors'});
    }
}
