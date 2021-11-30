/**
 * Injects the code to activate hmr support
 *
 * @param specs {{bundle: {id: string, resource: string, name: string, container: {is: string}, path: string, pathname: string}, distribution: object, application: object, watcher: object}}
 * @param sourcemap {object} The object with the sourcemap information
 */
module.exports = function (specs, sourcemap) {
    const excludes = [
        '@beyond-js/kernel/core/ts',
        '@beyond-js/kernel/routing/ts',
        '@beyond-js/local/main/ts'
    ];
    if (excludes.includes(specs.bundle.resource)) return;

    if (specs.distribution.local) {
        sourcemap.concat('export const hmr = new (function () {\n' +
            '    this.on = (event, listener) => bundle.hmr.on(event, listener);\n' +
            '    this.off = (event, listener) => bundle.hmr.off(event, listener);\n' +
            '});\n\n');
    }
    else {
        sourcemap.concat('export const hmr = new (function () {\n' +
            '    this.on = (event, listener) => void 0;\n' +
            '    this.off = (event, listener) => void 0;\n' +
            '});\n\n');
    }
}
