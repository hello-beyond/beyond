module.exports = async function (is, bundle, distribution, language) {
    // Getting the packager
    const packager = bundle.packagers.get(distribution, language);
    await packager.code.ready;
    await packager.dependencies.ready;

    const promises = [];
    packager.dependencies.forEach(dependency => promises.push(dependency.ready));
    await Promise.all(promises);

    const dependencies = [...packager.dependencies]
        .filter(([, {is}]) => is.has('import'))
        .map(([resource, {kind}]) => ({resource, kind}));

    const pcode = packager.code;
    await pcode.ready;

    const {valid, errors, code, map} = pcode;
    return valid ? {is, code, map, dependencies} : {errors};
}
