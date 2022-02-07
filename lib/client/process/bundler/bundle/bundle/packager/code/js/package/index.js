/**
 * Process the bundle code
 *
 * @param packager {object} The packager
 * @param transversal {boolean} Is it a transversal package?
 * @param specs {{module?: {dirname: string}}, {txt?: {multilanguage: boolean}}}
 */
module.exports = function (packager, transversal, specs) {
    'use strict';

    const {distribution} = packager;
    const {mode} = distribution.bundles;

    const hydrator = packager.bundle.resource === '@beyond-js/ssr/hydrator/ts';

    const sourcemap = require('./process')(packager, transversal, mode, specs);
    if (hydrator || transversal || !['amd', 'cjs'].includes(mode)) return {sourcemap};

    const {code, map, errors} = require(`./mode/${mode}`)(packager, sourcemap);
    if (errors) return {errors};

    return require('./outside')(packager, code, map);
}
