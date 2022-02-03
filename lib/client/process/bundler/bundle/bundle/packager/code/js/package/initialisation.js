/**
 * Package initialisation
 *
 * @param packager {object} The packager
 * @return {string|undefined} The initialisation code
 */
module.exports = function (packager) {
    const {bundle, processors} = packager;
    const transversal = !!global.bundles.get(bundle.name).Transversal;

    // When the bundle is a transversal, the package initialization is made by the transversal in
    // the bundle creator function
    if (transversal) {
        return processors.has('ts') && transversal ? 'return (modules);' : '';
    }

    const modules = processors.has('ts') ? 'modules' : '';
    return `__pkg.initialise(${modules});`;
}
