/**
 * Set externals dependencies
 */
module.exports = async function (packager, distribution, externals) {
    const clientPlatforms = ['web', 'android', 'ios', 'web.ssr'];

    await packager.ready;
    await packager.processors.ready;

    if (!packager.processors.has('ts')) return;
    const processor = packager.processors.get('ts');
    await processor.ready;

    processor.dependencies.forEach(p => {
        if (p.kind === 'bundle' || !!p.internal) return;
        externals.all.add(p.resource);
        clientPlatforms.includes(distribution.platform) && externals.client.add(p.resource);
    });
}