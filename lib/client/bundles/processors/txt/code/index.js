module.exports = class extends global.ProcessorCode {
    get dp() {
        return 'txt.code';
    }

    _build() {
        const {processor, compiler} = this.packager;
        const {specs} = processor;
        const {application} = specs;
        const language = specs.language === '.' ? application.languages.default : specs.language;

        // Merge the texts of the different json files into one object
        const merged = {};
        compiler.files.forEach(source => require('./merge')(merged, source.compiled));
        compiler.overwrites.forEach(source => require('./merge')(merged, source.compiled));

        let json = this.multilanguage ? merged[language] : merged;
        json = typeof json === 'object' ? json : {};
        const stringified = JSON.stringify(json);

        const code = `__pkg.exports.process = (require, _exports) => (_exports.txt = ${stringified});\n\n`;
        return {code};
    }
}
