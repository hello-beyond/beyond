const path = require('path');
const {sep} = path;

module.exports = function (module, from) {
    // Remove the extension of the file
    const extensions = ['.d.ts', '.d.tsx', '.ts', '.tsx', '.map', '.js'];
    for (const ext of extensions) {
        if (module.endsWith(ext)) {
            module = module.substr(0, module.length - ext.length);
            break;
        }
    }

    if (from && module.startsWith('..')) {
        from = path.resolve(from, '..'); // Remove the file of the full directory of the from

        // The from and module are relative paths,
        // the resolve function resolves adding the path of the process.cwd, so remove it
        module = path.resolve(from, module);

        module = module.substring(process.cwd().length);
        module = `.${module}`;
    }

    module = sep === '/' ? module : module.replace(/\\/g, '/');

    let name = module.startsWith(`./`) ? module.substr(2) : module;

    name = name.replace(/\//gi, '_');
    name = name.replace(/[^\w\s]/gi, '');
    return `ns_${name}`;
}
