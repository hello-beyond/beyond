/**
 * The exports declaration
 *
 * @param specs {object}
 * @param compiler {object} The compiler
 * @param sourcemap {object} The sourcemap
 * @return {Promise<void>}
 */
module.exports = async function (specs, compiler, sourcemap) {
    if (!compiler.files.size) return;

    // Add the declaration of all exports
    let declaration = [];
    compiler.files.forEach(compiled =>
        compiled.exports.forEach(exported => declaration = declaration.concat(exported)));

    // Declare the exports
    const transversal = !!global.bundles.get(specs.bundle.name).Transversal;

    // Export the hmr.on / hmr.off methods
    !transversal && require('./hmr')(specs, sourcemap);

    // ES6 exported values
    // Traversal only export the values through the exports of the beyond/core packages objects
    !transversal && declaration.length && sourcemap.concat(`export let ${declaration.join(', ')};\n`);

    if (specs.bundle.resource === '@beyond-js/kernel/core/ts') {
        const values = (() => {
            let output = '';

            // Iterate over each compiled file
            compiler.files.forEach(compiled => {
                let module = require('../modules/id')(compiled);
                module = module.startsWith('./beyond_backend/') ? module.substr(2) : module;

                // Iterate over the exports of each file
                compiled.exports.forEach(
                    exported => (output += `${exported} = __pkg.require('${module}').${exported};\n`));
            });
            return output;
        })();

        sourcemap.concat(values);
    }
    else {
        sourcemap.concat('__pkg.exports.process = function(require, _exports) {');

        const tab = '    ';
        const values = (() => {
            let output = '';

            // Iterate over each compiled file
            compiler.files.forEach(compiled => {
                let module = require('../modules/id')(compiled);
                module = module.startsWith('./beyond_backend/') ? module.substr(2) : module;

                // Iterate over the exports of each file
                compiled.exports.forEach(
                    exported => {
                        // The bundle exported variable
                        const variable = !transversal ? `${exported} = ` : '';
                        output += `${tab}${variable}_exports.${exported} = require('${module}').${exported};\n`;
                    });
            });
            return output;
        })();

        sourcemap.concat(values);
        sourcemap.concat('};');
    }
}
