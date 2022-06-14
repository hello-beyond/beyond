const sass = require('sass');
const toHtml = new (require('ansi-to-html'));

module.exports = class extends global.ProcessorAnalyzer {
    get dp() {
        return 'sass.analyzer';
    }

    // Analyze a source
    async #analyzeSource(source, request) {
        const importer = new (require('./importer'))(source, this.processor);
        const options = {sourceMap: false, importer};

        let result;
        try {
            result = await sass.compileStringAsync(source.content, options);
            if (this._request !== request) return;
        }
        catch (exc) {
            let message = toHtml.toHtml(exc.message);
            message = message.replace(/\n/g, '<br/>');
            message = `<div style="background: #ddd; color: #333;">${message}</div>`;
            return new this.AnalyzedSource(this.processor, source.is, source, {errors: [{message}]});
        }

        // Dependencies must be a Map<{resource, Set<is>}>
        const dependencies = new Map([...importer.dependencies].map(resource =>
            [resource, new Set(['css.import'])]));
        return new this.AnalyzedSource(this.processor, source.is, source, {dependencies});
    }

    async _analyze(updated, diagnostics, request) {
        const process = async (sources, is) => {
            for (const source of sources.values()) {
                const {file} = source;

                const analyzed = await this.#analyzeSource(source, request);
                if (this._request !== request || !analyzed) return;

                const {errors} = analyzed;
                errors?.length && diagnostics[is].set(source.relative.file, errors);
                updated[is].set(file, analyzed);
            }
        }

        const {files, overwrites, extensions} = this.processor.sources;
        await process(files, 'files');
        await process(extensions, 'extensions');
        overwrites && await process(overwrites, 'overwrites');
    }
}
