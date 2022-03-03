module.exports = async function (pkg, subpath, application, distribution) {
    let errors, resource, content;

    // Check if it is an incompatible package registered in the project.json externals configuration
    ({errors, resource, content} = await require('./incompatible')(application, pkg, subpath, distribution));
    if (errors || resource || content) return {errors, resource, content};

    // Resolve the package as an universal package
    let path, json;
    ({path, json, resource, errors} = require('./resolve')(pkg, subpath, application));
    if (resource || errors) return {resource, errors};

    if (!json.amd) {
        const message = `Subpath "./${subpath}" of package "${pkg}" has no specification for "amd" conditional export`;
        return {resource: new global.Resource({500: message})};
    }

    const file = require('path').join(path, json.amd);
    return {resource: new global.Resource({file})};
}
