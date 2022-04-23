const {pathToFileURL} = require('url');
const packages = require('uimport/packages');
const p = require('path');

module.exports = function (parsed, application) {
    const {pkg} = (() => {
        return {pkg: packages.get(parsed.pkg, {cwd: application.path})};
    })();

    if (!pkg || pkg.error) return;

    const file = !parsed.file ? pkg.json.sass : parsed.file;
    if (!file) throw new Error(`File "${file}" not found on package "${parsed.pkg}"`);

    const path = p.join(pkg.path, file);
    return pathToFileURL(path);
}
