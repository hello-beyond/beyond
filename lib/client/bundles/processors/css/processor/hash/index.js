module.exports = class extends global.ProcessorHash {
    get dp() {
        return 'css.processor.hash';
    }

    constructor(processor) {
        super(processor);

        const {functions} = processor.sources;
        functions && super.setup(new Map([['functions.hash', {child: functions.hash}]]));
    }

    _compute() {
        const functions = this.children.get('functions.hash')?.child;
        return functions ? functions.value : 0;
    }
}
