module.exports = function (bundle) {
    const transversal = global.bundles.get(bundle.name).Transversal;
    if (transversal) return '';

    const excludes = [
        '@beyond-js/local/main',
        '@beyond-js/kernel/bundle',
        '@beyond-js/kernel/routing'
    ];

    return excludes.includes(bundle.resource) ? '' :
        'export declare const hmr: {' +
        'on: (event: string, listener: any) => void, ' +
        'off: (event: string, listener: any) => void ' +
        '};';
}
