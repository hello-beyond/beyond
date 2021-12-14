const {crc32, equal} = global.utils;

module.exports = function (distribution) {
    const mode = ['web', 'android', 'ios'].includes(distribution.platform) ? 'amd' : 'cjs';
    distribution.bundles = {mode};
    distribution.build = true;

    const compute = {
        platform: distribution.platform,
        ssr: !!distribution.ssr,
        server: !!distribution.server,
        environment: distribution.environment,
        compress: distribution.compress,
        bundles: distribution.bundles,
        ts: distribution.ts
    }

    distribution.key = crc32(equal.generate(compute));

    return distribution;
}
