module.exports = class extends global.ProcessorCode {
    get dp() {
        return 'sass.code.js';
    }

    _build() {
        return {code: `bundle.styles.mode = 'external';`};
    }
}
