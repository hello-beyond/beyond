/**
 * Process the exports of the bundle
 *
 * @param packager {object} The bundle packager
 * @param sourcemap {object} The sourcemap of the processed script
 * @param transversal {boolean} Is it a transversal bundle or not
 */
module.exports = function (packager, sourcemap, transversal) {
    const {processors} = packager;

    // Add the declaration of all exports
    const declaration = new Set();
    let script = '';
    const tab = '    ';

    const process = (processor) => {
        const {packager} = processor;
        if (!packager || !packager.js) return;

        const {ims} = packager.js
        ims?.forEach(im => {
            const {exports, id} = im;
            exports?.forEach(({name, from}) => {
                declaration.add(name);

                const variable = !transversal ? `${name} = ` : '';
                script += `${tab}${variable}_exports.${name} = require('${id}').${from};\n`;
            });
        });
    }
    processors.forEach(processor => process(processor));

    // ES6 exported values
    // Transversal only export the values through the exports of the beyond/core bundle.package objects
    !transversal && declaration.size && sourcemap.concat(`export let ${[...declaration].join(', ')};\n`);

    sourcemap.concat('__pkg.exports.process = function(require, _exports) {');
    sourcemap.concat(script);
    sourcemap.concat('};');

    !transversal && require('./hmr')(packager, sourcemap);
}
