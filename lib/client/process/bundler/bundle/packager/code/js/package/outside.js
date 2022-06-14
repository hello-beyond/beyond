/**
 * html-vue must be outside the scope of the transformation to amd or cjs, as it would
 * be considered under strict mode, and vue render functions are not compatible with strict mode.
 *
 * @param packager {object} The processor packager
 * @param code {string}
 * @param map {object}
 */
module.exports = function (packager, code, map) {
    const {processors} = packager;
    if (!processors.has('html-vue')) return {sourcemap: {code, map}};

    const sourcemap = new global.SourceMap();
    sourcemap.concat(code, void 0, map);

    const processor = processors.get('html-vue');

    code = processor.packager.js;
    if (!code.code) return;

    sourcemap.concat(code.code, void 0, code.map);
    sourcemap.concat('\n');

    return {sourcemap};
}
