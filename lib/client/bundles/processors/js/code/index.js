const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'js-processor.code';
    }

    #code;
    get code() {
        if (this.#code !== undefined) return this.#code;

        const sources = this.children.get('sources').child;
        const {header} = global.utils.code;
        let code = header('JS PROCESSOR') + '\n';
        sources.forEach(source => code += header(`FILE: ${source.relative.file}`) + source.content + '\n\n');
        this.#code = code;
        return this.#code;
    }

    #errors = [];
    get errors() {
        return this.#errors;
    }

    get valid() {
        return this.processed && !this.#errors.length;
    }

    constructor(sources) {
        super();
        const children = new Map();
        children.set('sources', {child: sources, events: ['item.initialised', 'item.change']});
        super.setup(children);
    }

    _prepared(check) {
        const sources = this.children.get('sources').child;
        sources.forEach(source => check(source));
    }

    _process() {
        this.#code = undefined;
    }
}
