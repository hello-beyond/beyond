const DynamicProcessor = global.utils.DynamicProcessor(Map);

/**
 * The jsx compiler
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'jsx-processor.compiler';
    }

    #errors = [];
    get errors() {
        return this.#errors;
    }

    get valid() {
        return !this.#errors.length;
    }

    #code;
    get code() {
        return this.#code;
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
        const sources = this.children.get('sources').child;

        let input = '';
        this.clear();
        for (const source of sources.values()) {
            const file = source.relative.file;
            input += global.utils.code.header(file);
            input += source.content + '\n\n';
            this.set(file, source);
        }

        const compiled = require('./compile')(input);
        this.#errors = compiled.errors ? compiled.errors : [];
        this.#code = compiled.code;
    }
}
