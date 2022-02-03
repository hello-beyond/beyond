module.exports = async function (specs, compiler, extensions, diagnostics, sourcemap) {
    const process = (source, is) => {
        let {file} = source.relative;
        const {header} = global.utils.code;

        sourcemap.concat(header(`FILE: ${file}`));

        let {code, map} = source;

        // Remove the line breaks at the end of the content
        code = code.replace(/\n$/g, '');

        // Remove the sourcemap reference to the source file left by typescript
        code = code.replace(/\/\/([#@])\s(sourceURL|sourceMappingURL)=\s*(\S*?)\s*$/m, '');

        let moduleId = require('./id')(source);

        const creator = 'creator: function (require, exports) {';
        sourcemap.concat(`modules.set('${moduleId}', {hash: ${source.hash}, ${creator}`);

        // Transform to CJS
        const cjs = require('./cjs')(code, map);

        if (cjs.errors?.length) {
            diagnostics[is].set(file, [{message: cjs.errors, kind: 'html'}]);
        }
        else {
            sourcemap.concat(cjs.code, source.url, cjs.map);
            sourcemap.concat('}});\n');
        }
    }

    extensions.forEach(compiled => process(compiled, 'extensions'));
    compiler.files.forEach(compiled => process(compiled, 'files'));
}
