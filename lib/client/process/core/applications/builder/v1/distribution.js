const {crc32, equal} = global.utils;

module.exports = function (distribution) {
    const {platforms} = global;
    const {platform} = distribution;

    const mode = platforms.node.includes(platform) ? 'cjs' : 'amd';
    distribution.bundles = {mode};
    distribution.build = true;

    const compute = {
        platform: distribution.platform,
        server: !!distribution.server,
        environment: distribution.environment,
        compress: distribution.compress,
        bundles: distribution.bundles,
        ts: distribution.ts
    }

    distribution.key = crc32(equal.generate(compute));

    return distribution;
}
