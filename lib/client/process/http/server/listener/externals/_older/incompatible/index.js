/**
 * Resolve the externals that are not compatible as universal packages
 * and requires custom configuration in the project.json
 *
 * @return {Promise<{errors}|{content}|*|{errors}>}
 */
module.exports = async function (application, pkg, subpath, distribution) {
    await application.externals.ready;

    const id = subpath ? `${pkg}/${subpath}` : pkg;
    if (!application.externals.has(id)) return {};

    const external = application.externals.get(id);
    await external.ready;
    if (!external.valid) return {errors: external.errors};

    let errors, filename;
    ({filename, errors} = external.filename(distribution));
    if (errors) return {errors};

    let content;
    ({content, errors} = external.js(filename));
    return errors ? {errors} : {content};
}
