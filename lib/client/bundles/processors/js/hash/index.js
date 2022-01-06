const DynamicProcessor = global.utils.DynamicProcessor();
const {crc32} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'js-processor.hash';
    }

    constructor(sources) {
        super();
        super.setup(new Map([['hashes.sources', {child: sources.hash}]]))
    }

    #value;
    get value() {
        if (this.#value !== undefined) return this.#value;

        const compute = {sources: this.children.get('hashes.sources').child.value};
        if (compute.sources === 0) return (this.#value = 0);
        return (this.#value = crc32(JSON.stringify(compute)));
    }

    _process() {
        this.#value = undefined;
    }
}
