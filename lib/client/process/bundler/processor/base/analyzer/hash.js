const DynamicProcessor = global.utils.DynamicProcessor();
const {crc32} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'processor.analyzer.hash';
    }

    #processor;

    constructor(processor) {
        super();
        this.#processor = processor;

        const events = ['item.initialised', 'item.change'];

        const {files, overwrites, extensions} = processor.sources;
        const children = [
            ['files', {child: files, events}],
            ['extensions', {child: extensions, events}]
        ];
        overwrites && children.push(['overwrites', {child: overwrites, events}]);
        super.setup(new Map(children));
    }

    #value;
    get value() {
        if (this.#value !== void 0) return this.#value;

        const {files, overwrites, extensions} = this.#processor.sources;
        const compute = {};
        files.forEach(source => compute[source.file] = source.hash);
        overwrites?.forEach(source => compute[source.file] = source.hash);
        extensions.forEach(source => compute[source.file] = source.hash);

        return this.#value = crc32(JSON.stringify(compute));
    }

    _prepared(check) {
        const {files, overwrites} = this.#processor.sources;
        files.forEach(source => check(source));
        overwrites?.forEach(source => check(source));
    }

    _process() {
        this.#value = void 0;
    }
}
