module.exports = class extends global.ProcessorCode {
    get dp() {
        return 'ts.code';
    }

    _build(hmr, diagnostics) {
        const {compiler, extensions} = this;
        const {specs} = this.packager.processor;

        const sourcemap = new global.SourceMap();
        sourcemap.concat('const modules = new Map();\n');

        require('./modules')(specs, compiler, extensions, diagnostics, sourcemap);
        !hmr && require('./exports')(specs, compiler, sourcemap);

        return {sourcemap};
    }
}
