/**
 * Injects the code to activate hmr support
 *
 * @param packager {object} The bundle packager
 * @param sourcemap {object} The object with the sourcemap information
 */
module.exports = function (packager, sourcemap) {
    const {bundle, distribution} = packager;

    const excludes = [
        '@beyond-js/kernel/bundle/ts',
        '@beyond-js/kernel/routing/ts',
        '@beyond-js/local/main/ts'
    ];
    if (excludes.includes(bundle.resource)) return;

    if (distribution.local) {
        sourcemap.concat('export const hmr = new (function () {\n' +
            '    this.on = (event, listener) => __pkg.hmr.on(event, listener);\n' +
            '    this.off = (event, listener) => __pkg.hmr.off(event, listener);\n' +
            '});\n\n');
    }
    else {
        sourcemap.concat('export const hmr = new (function () {\n' +
            '    this.on = (event, listener) => void 0;\n' +
            '    this.off = (event, listener) => void 0;\n' +
            '});\n\n');
    }
}
