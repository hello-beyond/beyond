const DynamicProcessor = global.utils.DynamicProcessor();
const {crc32} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'ts-processor.hash';
    }

    constructor(sources, analyzer, options) {
        super();
        super.setup(new Map([
            ['hashes.sources', {child: sources.hash}],
            ['hashes.options', {child: options.hash}]
        ]))
    }

    #value;
    get value() {
        if (this.#value !== undefined) return this.#value;

        const compute = {
            sources: this.children.get('hashes.sources').child.value,
            options: this.children.get('hashes.options').child.value
        };

        if (compute.sources === 0 && compute.options === 0) {
            return (this.#value = 0);
        }

        return (this.#value = crc32(JSON.stringify(compute)));
    }

    _process() {
        this.#value = undefined;
    }
}
