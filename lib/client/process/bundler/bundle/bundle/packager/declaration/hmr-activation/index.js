module.exports = function (bundle) {
    const transversal = global.bundles.get(bundle.name).Transversal;
    if (transversal) return '';

    const excludes = [
        '@beyond-js/local/main/ts',
        '@beyond-js/kernel/core/ts',
        '@beyond-js/kernel/routing/ts'
    ];

    return excludes.includes(bundle.resource) ? '' :
        'export declare const hmr: {' +
        'on: (event: string, listener: any) => void, ' +
        'off: (event: string, listener: any) => void ' +
        '};';
}
