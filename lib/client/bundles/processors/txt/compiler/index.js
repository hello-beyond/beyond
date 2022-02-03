module.exports = class extends global.ProcessorSinglyCompiler {
    get dp() {
        return 'txt.compiler';
    }

    #CompiledSource = require('./source');
    get CompiledSource() {
        return this.#CompiledSource;
    }

    _compileSource(source) {
        const {processor} = this.packager;

        try {
            const parsed = JSON.parse(source.content);
            const compiled = new this.#CompiledSource(processor, source.is, source, parsed);
            return {compiled};
        }
        catch (exc) {
            const compiled = new this.#CompiledSource(processor, source.is, source, parsed);
            const errors = [{message: exc.message}];
            return {compiled, errors};
        }
    }
}
