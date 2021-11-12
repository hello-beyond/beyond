module.exports = async function (is, bundle, distribution, language) {
    // Getting the packager
    const packager = bundle.packagers.get(distribution, language);
    await packager.code.ready;
    await packager.dependencies.ready;

    const promises = [];
    packager.dependencies.forEach(dependency => promises.push(dependency.ready));
    await Promise.all(promises);

    const dependencies = [...packager.dependencies].map(([resource, {kind}]) => ({resource, kind}));

    const code = packager.code;
    await code.ready;
    return {is, code: code.code, map: code.map, dependencies};
}
