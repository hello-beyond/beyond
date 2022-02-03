const ts = require('typescript');

module.exports = class extends global.ProcessorDeclaration {
    get dp() {
        return 'txt.declaration';
    }

    _build() {
        const {code} = this.children.get('code').child;

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
            ts.createSourceFile(file, code, lv) : getSourceFile(file, lv, error);

        let output;
        host.writeFile = (file, content) => file === 'source.d.ts' && (output = content);

        const program = ts.createProgram(['source.js'], options, host);
        program.emit();

        return output;
    }
}
