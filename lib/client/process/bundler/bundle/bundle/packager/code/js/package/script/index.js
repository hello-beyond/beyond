module.exports = function (processor, sourcemap, transversal, mode) {
    const {packager} = processor;
    if (!packager || !packager.js) return;

    // html-vue must be outside the scope of the transformation to amd or cjs, as it would
    // be considered under strict mode, and vue render functions are not compatible with strict mode
    if (!transversal && ['amd', 'cjs'].includes(mode) && processor.name === 'html-vue') return;

    let {code} = processor.packager.js;
    if (!code) return;

    code = typeof code === 'string' ? {code: code} : code;
    if (!code.code) return;

    sourcemap.concat(code.code, void 0, code.map);
    sourcemap.concat('\n');
}
