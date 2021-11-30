const {crc32, equal} = global.utils;

module.exports = function (config) {
    const compute = {
        platform: config.platform,
        ssr: !!config.ssr,
        server: !!config.server,
        environment: config.environment,
        compress: config.compress,
        bundles: config.bundles
    }

    return crc32(equal.generate(compute));
}
