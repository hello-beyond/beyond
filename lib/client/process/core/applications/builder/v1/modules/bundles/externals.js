/**
 * Set externals dependencies
 */
module.exports = async function (packager, externals) {
    await packager.ready;
    await packager.processors.ready;

    if (!packager.processors.has('ts')) return;
    const processor = packager.processors.get('ts');
    await processor.ready;

    processor.dependencies.forEach(p => {
        if (p.kind === 'bundle' || !!p.internal) return;
        externals.add(p.resource);
    });
}