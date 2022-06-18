module.exports = async function (specs, compiler, sourcemap) {
    const exports = new Map();

    const add = (compiled, exported) => {
        const module = require('../modules/id')(compiled);
        const {name, from} = exported;
        exports.set(name, {module, from});
    }

    compiler.files.forEach(compiled => compiled.exports.forEach(exported => add(compiled, exported)));
    compiler.extensions.forEach(compiled => compiled.exports.forEach(exported => add(compiled, exported)));

    if (!exports.size) return;

    // Add the declaration of all exports
    let declaration = [];
    [...exports.keys()].forEach(name => declaration.push(name));

    // Declare the exports
    const transversal = !!global.bundles.get(specs.bundle.name).transversal;

    // Export the hmr.on / hmr.off methods
    !transversal && require('./hmr')(specs, sourcemap);

    // ES6 exported values
    // Transversal only export the values through the exports of the beyond/core bundle.package objects
    !transversal && sourcemap.concat(`export let ${declaration.join(', ')};\n`);

    sourcemap.concat('__pkg.exports.process = function(require, _exports) {');

    const tab = '    ';
    const values = (() => {
        let output = '';
        exports.forEach(({module, from}, name) => {
            const variable = !transversal ? `${name} = ` : '';
            output += `${tab}${variable}_exports.${name} = require('${module}').${from};\n`;
        });
        return output;
    })();

    sourcemap.concat(values);
    sourcemap.concat('};');
}
