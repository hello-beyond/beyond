const sass = require('sass');
const toHtml = new (require('ansi-to-html'));

module.exports = class extends global.ProcessorSinglyCompiler {
    get dp() {
        return 'sass.compiler';
    }

    get depfiles() {
        return this.children.get('dependencies.files')?.child;
    }

    constructor(packager) {
        super(packager, require('./children'));
    }

    _compileSource(source) {
        if (source.basename.startsWith('_')) return {};

        const importer = new (require('./importer'))(this);
        const {processor} = this.packager;
        const options = {sourceMap: true, importer};

        let result;
        try {
            result = sass.compileString(source.content, options);
        }
        catch (exc) {
            console.log(exc.stack);
            let message = toHtml.toHtml(exc.message);
            message = message.replace(/\n/g, '<br/>');
            message = `<div style="background: #ddd; color: #333;">${message}</div>`;

            const compiled = new this.CompiledSource(processor, source.is, source, {});
            const errors = [message];
            return {compiled, errors};
        }

        const {css, sourceMap: map} = result;
        const code = css.toString();
        map.sources[0] = source.url;

        const compiled = new this.CompiledSource(processor, source.is, source, {code, map});
        return {compiled};
    }
}
