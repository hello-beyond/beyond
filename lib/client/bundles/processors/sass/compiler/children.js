module.exports = class extends global.ProcessorCompilerChildren {
    dispose(check) {
        const {processor} = this.compiler.packager;
        const {dependencies} = processor;

        const children = new Map([['dependencies.files', {child: dependencies.files}]]);
        super.dispose(check, children);
    }
}
