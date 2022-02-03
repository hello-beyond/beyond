module.exports = class extends global.ProcessorCode {
    get dp() {
        return 'sass.css';
    }

    // The code of the processor and its HMR is the same
    #sourcemap;

    _process(request) {
        this.#sourcemap = undefined;
        super._process(request);
    }

    _build(hmr, diagnostics) {
        void (hmr);
        void (diagnostics);

        if (this.#sourcemap !== void 0) return {sourcemap: this.#sourcemap};
        const sourcemap = this.#sourcemap = new global.SourceMap();

        const concat = compiled => {
            sourcemap.concat(compiled.code, compiled.url, compiled.map);
        }

        const {compiler, extensions} = this;
        compiler.files.forEach(compiled => concat(compiled));
        extensions.forEach(compiled => concat(compiled));

        return {sourcemap};
    }
}
