const DynamicProcessor = global.utils.DynamicProcessor();
const {crc32} = global.utils;

/**
 * Hash of a collection of sources. It is used by files and overwrites
 * This class is also exposed globally as global.ProcessorSourcesHash to be overridden by the processors
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'processor.sources.hash';
    }

    constructor(sources) {
        super();
        const events = ['item.initialised', 'item.change'];
        super.setup(new Map([['sources', {child: sources, events}]]));
    }

    #value;
    get value() {
        if (this.#value !== void 0) return this.#value;
        if (!this.processed) throw new Error('Processor is not ready');

        const sources = this.children.get('sources').child;
        if (!sources.size) return (this.#value = 0);

        const compute = {};
        sources.forEach(source => compute[source.relative.file] = source.hash);
        return this.#value = crc32(JSON.stringify(compute));
    }

    _prepared(check) {
        const sources = this.children.get('sources').child;
        sources.forEach(source => check(source));
    }

    _process() {
        this.#value = undefined;
    }
}
