module.exports = async function (specs, compiler, sourcemap) {
    compiler.files.forEach(compiled => {
        let file = compiled.relative.file;
        sourcemap.concat(`// FILE: ${file}`);

        let content = compiled.code;

        // Remove the line breaks at the end of the content
        content = content.replace(/\n$/g, '');

        // Remove the sourcemap reference to the source file left by typescript
        content = content.replace(/\/\/([#@])\s(sourceURL|sourceMappingURL)=\s*(\S*?)\s*$/m, '');

        let moduleId = require('./id')(compiled);

        const creator = 'creator: function (require, exports) {';
        sourcemap.concat(`modules.set('${moduleId}', {hash: ${compiled.hash}, ${creator}`);
        sourcemap.concat('"use strict";');

        file = specs.bundle.name === 'start' ? `${specs.bundle.pathname}/` : '' + file;
        sourcemap.concat(content, file, compiled.map);
        sourcemap.concat('}});\n');
    });
}
