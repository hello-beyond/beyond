/**
 * Process the bundle code
 *
 * @param packager {object} The packager
 * @param transversal {boolean} Is it a transversal package?
 * @param specs {{txt?: {multilanguage: boolean}}}
 * @return {object}
 */
module.exports = function (packager, transversal, specs) {
    'use strict';

    const {application, bundle, distribution, language, processors, dependencies} = packager;
    const {standalone} = bundle.config;
    const sourcemap = new (require('./sourcemap'));

    // Process the processors imports and the bundle imports
    // Just for backward compatibility
    !transversal && require('./imports')(dependencies, processors, packager.imports, sourcemap);

    // Only required for transversals
    const filtered = (() => {
        if (!dependencies.size || !transversal) return [];

        return [...dependencies.values()]
            .filter(({resource, is}) => !resource.startsWith('@beyond-js/kernel') && is.has('import'))
            .map(({resource}) => resource);
    })();

    // Add the code of the dependencies
    if (dependencies.size) {
        if (transversal && filtered.length) {
            sourcemap.concat('const td = transversal.dependencies;');
            sourcemap.concat(`const dp = new Set(${JSON.stringify(filtered)});`);
            sourcemap.concat('const dependencies = new Map(Array.from(td).filter(([key]) => dp.has(key)));');
        }
        else if (!transversal) {
            sourcemap.concat(dependencies.code.code);
        }
    }

    if (!processors.size) {
        sourcemap.concat('// No processors found');
        return sourcemap;
    }

    const core = bundle.resource === '@beyond-js/kernel/core/ts';

    // Used by the beyond.import function
    if (core) {
        const {mode} = distribution.bundles;
        mode === 'amd' && sourcemap.concat('const amd_require = require;');
        // In production environments, the brequire function is declared in the index.js file
        // to allow application packages to be reached
        mode === 'cjs' && sourcemap.concat(`const cjs_require = typeof brequire !== 'undefined' ? brequire: require;`);
        mode === 'es6' && sourcemap.concat('const es6_import = import;');
    }

    // Create the bundle object
    if (!core && !standalone) {
        if (transversal && filtered.length) {
            sourcemap.concat('bundle.dependencies.update(dependencies);');
        }
        else if (!transversal) {
            const params = `'${bundle.resource}', ${bundle.multilanguage}, ${JSON.stringify(specs)}` +
                (dependencies.size ? ', dependencies' : '');

            sourcemap.concat(`const {beyond} = globalThis;`);
            sourcemap.concat(`const bundle = beyond.bundles.obtain(${params});`);

            if (application.engine === 'legacy') {
                sourcemap.concat('const {container} = bundle;');
                sourcemap.concat(`const module = container.is === 'module' ? container : void 0;`);
            }

            sourcemap.concat(`const __pkg = bundle.package(${bundle.multilanguage ? `'${language}'` : ''});`);
        }
    }

    // Process the code of each processor
    processors.forEach(processor => {
        let {code} = processor.code;
        code = typeof code === 'string' ? {code: code} : code;
        if (!code || !code.code) return;

        sourcemap.concat(code.code, code.map);
        sourcemap.concat('\n');
    });

    return sourcemap;
}
