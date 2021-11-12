module.exports = function (specs, compiler, hmr) {
    // If no sources to package, then return an empty object
    if (!compiler.files.size) return {};

    const sourcemap = new (require('./sourcemap'));
    sourcemap.concat('const modules = new Map();\n');

    require('./modules')(specs, compiler, sourcemap);

    const core = specs.bundle.resource === '@beyond-js/kernel/core/ts';

    if (core) {
        sourcemap.concat('const __bp = {};');
        sourcemap.concat(`modules.get('./base/package').creator(() => 0, __bp);`);
        sourcemap.concat('const __pkg = new __bp.BeyondPackage(modules);');
    }

    !hmr && require('./exports')(specs, compiler, sourcemap);

    !core && sourcemap.concat(require('./initialisation')(specs, hmr));

    return sourcemap;
}
