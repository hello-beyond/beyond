module.exports = function (compiler) {
    let output = '';

    compiler.files.forEach(compiled => compiled.exports.forEach(exported => {
        const module = compiled.relative.file;
        const namespace = require('../modules/namespaces/name')(module);
        output += `export import ${exported} = ${namespace}.${exported};\n`;
    }));
    return output;
}
