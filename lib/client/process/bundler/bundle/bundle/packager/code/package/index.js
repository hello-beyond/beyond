/**
 * Process the bundle code
 *
 * @param packager {object} The packager
 * @param transversal {boolean} Is it a transversal package?
 * @param specs {{txt?: {multilanguage: boolean}}}
 */
module.exports = function (packager, transversal, specs) {
    'use strict';

    const {distribution} = packager;
    const {mode} = distribution.bundles;

    const sourcemap = require('./process')(packager, transversal, specs);
    return !transversal && ['amd', 'cjs'].includes(mode) ? require(`./${mode}`)(sourcemap) : sourcemap;
}
