const {crc32, equal} = global.utils;

module.exports = function (config) {
    const compute = {
        platform: config.platform,
        environment: config.environment,
        minify: config.minify,
        bundles: config.bundles,
        ts: config.ts
    }

    return crc32(equal.generate(compute));
}
