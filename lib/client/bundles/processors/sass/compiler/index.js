const sass = require('sass');
const toHtml = new (require('ansi-to-html'));

module.exports = class extends global.ProcessorSinglyCompiler {
    get dp() {
        return 'sass.compiler';
    }

    _compileSource(source, is) {
        if (source.basename.startsWith('_')) return {};

        const {processor} = this.packager;

        const importers = [{
            // An importer that redirects relative URLs starting with "~" to
            // `node_modules`.
            findFileUrl(url) {
                console.log(url);
            }
        }];
        const options = {sourceMap: true, importers};

        let result;
        try {
            result = is === 'extension' ?
                sass.compileString(source.content, options) :
                sass.compile(source.file, options);
        }
        catch (exc) {
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
