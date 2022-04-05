module.exports = class extends global.ProcessorCode {
    get dp() {
        return 'sass.js';
    }

    _build() {
        return {code: `bundle.styles.mode = 'external';`};
    }
}
