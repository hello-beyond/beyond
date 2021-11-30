const DynamicProcessor = global.utils.DynamicProcessor();
const {crc32} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'ts-processor.options.hash';
    }

    constructor(options) {
        super();
        super.setup(new Map([['options', {child: options}]]));
    }

    #value;
    get value() {
        if (this.#value !== undefined) return this.#value;
        const options = this.children.get('options').child;
        return options.value ? crc32(JSON.stringify(options.value)) : 0;
    }

    _process() {
        this.#value = undefined;
    }
}
