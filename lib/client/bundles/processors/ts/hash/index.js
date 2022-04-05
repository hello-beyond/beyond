module.exports = class extends global.ProcessorHash {
    get dp() {
        return 'ts.processor.hash';
    }

    constructor(processor) {
        super(processor);

        const {dependencies} = processor;
        super.setup(new Map([['declarations.hash', {child: dependencies.declarations.hash}]]));
    }

    _compute() {
        return this.children.get('declarations.hash').child.value;
    }
}
