const vue = require('vue/compiler-sfc');

module.exports = class extends global.ProcessorSinglyCompiler {
    #CompiledSource = require('./source');
    get CompiledSource() {
        return this.#CompiledSource;
    }

    _compileSource(source, is) {
        const {extended} = this;
        const processor = this.packager;

        const filename = source.relative.file;
        const scopeId = filename
            .slice(0, filename.length - 4) // remove .vue extension
            .replace(/\//g, '__');

        let css;
        if (extended.get('sass').has(source.relative.file)) {
            const preprocessed = extended.get('sass').get(source.relative.file);
            const {content, scoped, map: inMap} = preprocessed;
            css = vue.compileStyle({id: scopeId, filename, scoped, source: content, inMap});
            if (css.errors?.length) return {errors: css.errors};
        }

        const options = {sourceMap: source.map, filename: source.url};
        const {descriptor} = vue.parse(source.content, options);

        const script = vue.compileScript(descriptor, {id: scopeId});
        const template = (source => {
            return vue.compileTemplate({source, filename, id: scopeId});
        })(descriptor.template.content);

        const compiled = new this.#CompiledSource(processor, is, source, {
            scopeId,
            code: script.content, map: script.map,
            css: css?.code, cssMap: css?.map,
            template: template.code, templateMap: template.map
        });
        return {compiled};
    }
}
