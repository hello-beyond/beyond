module.exports = function (compiler) {
    let output = '';

    compiler.files.forEach(compiled => compiled.exports.forEach(exported => {
        const module = compiled.relative.file;
        const namespace = require('../modules/namespaces/name')(compiler, module);
        output += `export import ${exported.name} = ${namespace}.${exported.from};\n`;
    }));
    return output;
}
