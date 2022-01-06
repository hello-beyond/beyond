const ts = require('typescript');

module.exports = function (source) {
    const options = {
        allowJs: true,
        declaration: true,
        emitDeclarationOnly: true,
        types: [],
        skipLibCheck: true,
        noLib: true
    };

    const host = ts.createCompilerHost(options);

    const {getSourceFile} = host;
    host.getSourceFile = (file, lv, error) => file === 'source.js' ?
        ts.createSourceFile(file, source, lv) : getSourceFile(file, lv, error);

    let output;
    host.writeFile = (file, content) => file === 'source.d.ts' && (output = content);

    const program = ts.createProgram(['source.js'], options, host);
    program.emit();

    return output;
}
