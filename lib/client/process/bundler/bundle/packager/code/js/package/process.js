/**
 * Process the bundle code
 *
 * @param jscode {object} The js code packager
 * @param hmr {boolean} Is it an hmr bundle?
 * @param transversal {boolean} Is it a transversal package?
 * @return {object}
 */
module.exports = function (jscode, hmr, transversal) {
    'use strict';

    const {packager} = jscode;
    const {application, bundle, distribution, language, processors, dependencies} = packager;
    const sourcemap = new global.SourceMap();

    // Process the processors imports and the bundle imports
    // Just for backward compatibility
    !transversal && require('./imports')(dependencies, processors, packager.imports, sourcemap);

    // Add the code of the dependencies
    dependencies.size && (!transversal || hmr) && sourcemap.concat(dependencies.code.code);

    if (!processors.size) {
        sourcemap.concat('// No processors found');
        return sourcemap;
    }

    const kernel = bundle.resource === '@beyond-js/kernel/bundle';
    const core = bundle.resource === '@beyond-js/kernel/core';
    const widgets = [
        '@beyond-js/widgets/render',
        '@beyond-js/widgets/layout',
        '@beyond-js/widgets/routing',
        '@beyond-js/widgets/application'].includes(bundle.resource);

    (core || widgets) && distribution.bundles.mode === 'amd' &&
    sourcemap.concat('const amd_require = require;');

    if (core) {
        // cjs_require, es6_import are needed by the beyond.import function
        const {mode} = distribution.bundles;

        // In production environments, the brequire function is declared in the index.js file
        // to allow application packages to be reached
        mode === 'cjs' && sourcemap.concat(
            `const cjs_require = typeof globalThis.brequire !== 'undefined' ? brequire : require;`);

        mode === 'es6' && sourcemap.concat('const es6_import = module => import(module);');
    }

    // Create the bundle object
    if (!kernel) {
        if (!transversal || hmr) {
            const pkgProperty = `.package(${bundle.multilanguage ? `'${language}'` : ''});`;

            // Register the dependencies to the client global dependencies
            const externals = (() => {
                const {externals} = dependencies.code.register;
                let register = '[';
                externals.forEach((name, resource) => register += `["${resource}", ${name}],`);
                register += ']';

                return `externals.register(new Map(${register}));`;
            })();

            const {bbm} = dependencies.code;

            if (!hmr) {
                // Create the bundle
                // The name of the var __Bundle (instead of Bundle) is because the ims of the
                // legacy projects (js processor) are not scoped
                const vars = 'Bundle: __Bundle' + (externals ? ', externals' : '');
                sourcemap.concat(`const {${vars}} = ${bbm};`);

                const params = {
                    module: bundle.container.resource,
                    multibundle: bundle.container.bundles.size > 1,
                    bundle: bundle.iname
                };
                !params.multibundle && delete (params.multibundle);
                sourcemap.concat(`const __pkg = new __Bundle(${JSON.stringify(params)})${pkgProperty};`);
            }
            else {
                // Get the bundle instance
                const vars = 'instances' + (externals ? ', externals' : '');
                sourcemap.concat(`const {${vars}} = ${bbm};`);
                sourcemap.concat(`const __pkg = instances.get('${bundle.resource}')${pkgProperty};`);
            }

            externals && sourcemap.concat(externals);

            // Just for legacy projects
            application.engine === 'legacy' && sourcemap.concat(`const {module} = __pkg.bundle;`);
        }

        /**
         * Update the dependencies of the package
         * In transversals, the package dependencies are returned in bundle initialisation
         */
        (() => {
            const {register} = dependencies.code;
            if (!hmr && (!register.beyond.size || transversal)) return;

            const text = JSON.stringify([...register.beyond]);
            sourcemap.concat(`__pkg.dependencies.update(new Set(${text}));`);
        })();
    }
    else if (kernel) {
        sourcemap.concat('let __pkg = {exports: {}};');
    }

    // Only required for .jsx legacy processor support
    if (processors.has('jsx')) {
        sourcemap.concat(`const React = externals.get('react');`);
        sourcemap.concat(`const ReactDOM = externals.get('react-dom');`);
    }

    // Allows bundles to inject code at the beginning of the bundle
    const precode = jscode._precode();
    precode && sourcemap.concat(precode);

    // Process the scripts code of each processor
    processors.forEach(processor => require('./script')(processor, sourcemap));

    // In transversals, the ims map is received from the creator function
    (!transversal || hmr) && sourcemap.concat('const ims = new Map();\n');

    // Process the ims code of each processor
    processors.forEach(processor => require('./ims')(processor, sourcemap));

    // Process the exports
    require('./exports')(packager, hmr, kernel, sourcemap, transversal);

    if (kernel) {
        sourcemap.concat('const __bp = {};');
        sourcemap.concat(`ims.get('./base/index').creator(() => 0, __bp);`);
        sourcemap.concat('__pkg = new __bp.BeyondPackage(__pkg.exports);');
    }

    // Initialise package
    const initialisation = require('./initialisation')(packager, hmr);
    initialisation && sourcemap.concat(initialisation);

    sourcemap.map.sourceRoot = distribution.platform === 'web' ? '/' : `${process.cwd()}/`;
    return sourcemap;
}
