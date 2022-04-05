const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'jsx.dependencies.hash';
    }

    // The dependencies of the jsx processor never change
    get value() {
        return 0;
    }
}
