const DynamicProcessor = global.utils.DynamicProcessor();
const {crc32} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'processor.sources.extensions.hash';
    }

    constructor(extensions) {
        super();
        const events = ['item.initialised', 'item.change'];
        super.setup(new Map([['extensions', {child: extensions, events}]]));
    }

    #value;
    get value() {
        if (this.#value !== undefined) return this.#value;

        const extensions = this.children.get('extensions').child;
        if (!extensions.size) return (this.#value = 0);

        const compute = {};
        extensions.forEach(source => compute[source.relative.file] = source.hash);
        return this.#value = crc32(JSON.stringify(compute));
    }

    _process() {
        this.#value = undefined;
    }
}
