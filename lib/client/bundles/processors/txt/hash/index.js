const DynamicProcessor = global.utils.DynamicProcessor();
const {crc32} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'txt-processor.hash';
    }

    constructor(sources) {
        super();
        super.setup(new Map([
            ['hashes.files', {child: sources.files.hash}],
            ['hashes.overwrites', {child: sources.overwrites.hash}]
        ]))
    }

    #value;
    get value() {
        if (this.#value !== undefined) return this.#value;

        const compute = {
            files: this.children.get('hashes.files').child.value,
            overwrites: this.children.get('hashes.overwrites').child.value
        };

        if (compute.files === 0 && compute.overwrites === 0) return (this.#value = 0);
        return (this.#value = crc32(JSON.stringify(compute)));
    }

    _process() {
        this.#value = undefined;
    }
}
