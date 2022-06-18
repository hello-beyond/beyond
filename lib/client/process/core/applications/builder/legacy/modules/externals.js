/**
 * Set externals dependencies
 */
module.exports = async function (packager, distribution, externals) {
    await packager.ready;
    await packager.processors.ready;

    if (!packager.processors.has('ts')) return;
    const processor = packager.processors.get('ts');
    await processor.ready;

    processor.dependencies.forEach(p => {
        if (p.kind === 'bundle' || !!p.internal) return;

        externals.all.add(p.resource);
        const find = global.platforms.webAndMobile.includes(distribution.platform);
        find && externals.client.add(p.resource);
    });
}