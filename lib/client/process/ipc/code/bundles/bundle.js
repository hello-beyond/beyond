/**
 * Return the bundle code, map and dependencies
 *
 * @param is {string} Can be 'bundle' or 'transversal'
 * @param requested {object} The bundle being requested
 * @param distribution {object} The distribution specification
 * @param resource {object} The parsed resource
 * @return {Promise<{code: *, is, map: *, dependencies: (undefined|{resource: string, kind: *}|{resource: *, kind: *})[]}|{errors}>}
 */
module.exports = async function (is, requested, distribution, resource) {
    // Getting the packager
    const {hmr, language} = resource;
    const packager = requested.packagers.get(distribution, language);

    await packager.dependencies.ready;

    const promises = [];
    packager.dependencies.forEach(dependency => promises.push(dependency.ready));
    await Promise.all(promises);

    const dependencies = [...packager.dependencies]
        .filter(([, {is, kind, bundle}]) => {
            if (!is.has('import')) return false;

            // Exclude the imports that refers to bundles that are part of the actual transversal
            return kind !== 'transversal' || requested.name !== bundle?.name;
        })
        .map(([resource, {kind, bundle}]) => {
            if (kind === 'transversal') {
                const split = resource.split('/');
                const pkg = split[0].startsWith('@') ? `${split.shift()}/${split.shift()}` : split.shift();
                return {resource: `${pkg}/${bundle.name}`, kind};
            }
            return {resource, kind};
        });

    const {js} = packager;
    await js.ready;

    const {valid, errors} = js;
    const code = valid ? js.code(hmr) : void 0;
    const map = valid ? js.map(hmr) : void 0;
    return valid ? {is, code, map, dependencies} : {errors};
}
