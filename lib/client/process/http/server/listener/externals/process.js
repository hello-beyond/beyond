const p = require('path');

// Save in memory cache the already accessed packages
let mcached = new Map();

module.exports = async function (pkg, subpath, application) {
    const bundle = `${pkg}/${subpath}`;
    if (mcached.has(bundle)) return mcached.get(bundle);

    const done = output => {
        mcached.set(bundle, output);
        return output;
    }

    let errors, resource;

    // Resolve the package as an universal package
    let uimport, path, json;
    ({uimport, path, json, resource, errors} = require('./resolve')(pkg, subpath, application));
    if (resource || errors) return done({resource, errors});
    if (!path) return done({});

    if (!uimport) {
        const paths = {
            cwd: application.path, // The working directory
            temp: '.beyond/uimport/temp', // Directory relative to the working directory, where uimport will create temporary files
            cache: p.join(process.cwd(), '.beyond/uimport')
        };

        const bundle = subpath ? `${pkg}/${subpath}` : pkg;
        const {code, errors} = await require('uimport')(bundle, paths);
        return done({content: code, errors});
    }

    // It is a uimport package, so it is not required to package the bundle being requested
    if (!json.amd) {
        const message = `Subpath "./${subpath}" of package "${pkg}" ` +
            `has no specification for "amd" conditional export`;
        return done({resource: new global.Resource({500: message})});
    }

    const file = require('path').join(path, json.amd);
    return done({resource: new global.Resource({file})});
}
