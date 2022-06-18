const {minify} = require('uglify-js');

/**
 * Process the bundle code
 *
 * @param jscode {object} The js code packager
 * @param hmr {boolean} Is it an hmr bundle?
 * @param transversal {boolean} Is it a transversal package?
 * @param specs {{module?: {dirname: string}}, {txt?: {multilanguage: boolean}}}
 */
module.exports = function (jscode, hmr, transversal, specs) {
    'use strict';

    const {packager} = jscode;
    const {distribution} = packager;
    const {mode} = distribution.bundles;

    const hydrator = packager.bundle.resource === '@beyond-js/ssr/hydrator/ts';

    const sourcemap = require('./process')(jscode, hmr, transversal, mode, specs);
    if (hydrator || (transversal && !hmr) || !['amd', 'cjs'].includes(mode)) return {sourcemap};

    let {code, map, errors} = require(`./mode/${mode}`)(packager, sourcemap);
    if (errors) return {errors};

    if (!distribution.minify?.js) return {sourcemap: {code, map}};

    // Minify the .js bundle
    ({code, map} = minify(code, {sourceMap: {content: map}}));
    map = typeof map === 'string' ? JSON.parse(map) : map;
    return {sourcemap: {code, map}};
}
