const DynamicProcessor = global.utils.DynamicProcessor();
const {crc32} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'processor.extender.extension.sources.hash';
    }

    constructor(extension) {
        super();
        super.setup(new Map([['extension', {child: extension}]]));
    }

    #value;
    get value() {
        if (this.#value !== undefined) return this.#value;

        const compute = {};
        const extension = this.children.get('extension')?.child;
        extension.forEach((source, file) => compute[file] = source.hash);

        return (this.#value = crc32(JSON.stringify(compute)));
    }

    _process() {
        this.#value = undefined;
    }
}
