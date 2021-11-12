/**
 * Returns the list of backend bridges
 */
module.exports = async function (bundle, distribution, language) {
    // Getting the packager
    const packager = bundle.packagers.get(distribution, language);
    await packager.processors.ready;

    if (!packager.processors.has('ts')) return;

    // It is not required the analyzer to be ready, as the bridges process independently
    const bridges = packager.processors.get('ts').analyzer.bridges;
    bridges && await bridges.ready;

    let exports = bridges && [...bridges.info];
    exports = exports && exports.map(([key, methods]) => [key, [...methods]]);
    return exports;
}
