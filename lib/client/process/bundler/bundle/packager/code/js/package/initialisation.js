/**
 * Package initialisation
 *
 * @param packager {object} The packager
 * @param hmr {boolean} Is it an hmr bundle?
 * @return {string|undefined} The initialisation code
 */
module.exports = function (packager, hmr) {
    const {bundle} = packager;
    const transversal = !!global.bundles.get(bundle.name).transversal;

    if (!hmr && transversal) {
        const {register} = packager.dependencies.code;
        if (!register.beyond.size) return;

        const dependencies = `dependencies: new Set(${JSON.stringify([...register.beyond])})`;
        return `return {${dependencies}};`;
    }

    // When the bundle is a transversal, the package initialization is made by the transversal in
    // the bundle creator function
    return `__pkg.${hmr ? 'update' : 'initialise'}(ims);`;
}
