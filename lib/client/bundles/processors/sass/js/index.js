module.exports = class extends global.ProcessorCode {
    get dp() {
        return 'sass.js';
    }

    _process() {
        return false;
    }

    _build() {
        return {code: `bundle.styles.mode = 'external';`};
    }
}
