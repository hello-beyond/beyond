module.exports = class extends global.ProcessorCode {
    get dp() {
        return 'sass.code.js';
    }

    _build() {
        const {bundle} = this.packager.processor.specs;
        const code = `require('@beyond-js/kernel/styles').styles.register('${bundle.resource}')`;

        return {code};
    }
}
