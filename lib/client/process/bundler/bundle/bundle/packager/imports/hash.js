const DynamicProcessor = global.utils.DynamicProcessor();
const {crc32} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.imports.hash';
    }

    constructor(sources) {
        super();
        const subscriptions = ['item.initialised', 'item.change'];
        super.setup(new Map([['sources', {child: sources, events: subscriptions}]]));
    }

    #value;
    get value() {
        if (this.#value !== undefined) return this.#value;

        const sources = this.children.get('sources').child;
        if (!sources.size) return (this.#value = 0);

        const compute = {};
        sources.forEach(source => compute[source.relative.file] = source.hash);
        this.#value = crc32(JSON.stringify(compute));
        return this.#value;
    }

    _prepared(check) {
        const sources = this.children.get('sources').child;
        sources.forEach(source => check(source));
    }

    _process() {
        this.#value = undefined;
    }
}
