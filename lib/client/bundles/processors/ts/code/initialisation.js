// Package initialisation / update
module.exports = function (specs, hmr) {
    const transversal = !!global.bundles.get(specs.bundle.name).Transversal;

    // When the bundle is a transversal, the package initialization is made by the transversal in
    // the bundle creator function
    return transversal && !hmr ?
        'return (modules);' :
        `__pkg.${hmr ? 'update' : 'initialise'}(modules);\n`;
}
