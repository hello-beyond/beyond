const {crc32, equal} = global.utils;

module.exports = function (config) {
    const compute = {
        server: !!config.server,
        platform: config.platform,
        environment: config.environment,
        compress: config.compress,
        bundles: config.bundles
    }

    return crc32(equal.generate(compute));
}
