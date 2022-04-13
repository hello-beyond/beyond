const {equal, crc32} = global.utils;
const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.processors.hashes.inputs';
    }

    #value;
    get value() {
        return this.#value;
    }

    constructor(processors) {
        super();
        super.setup(new Map([['processors', {child: processors}]]));
    }

    _prepared(require) {
        const processors = this.children.get('processors').child;
        processors.forEach(({hashes}) => require(hashes));
    }

    _process() {
        const processors = this.children.get('processors').child;

        const compute = {};
        processors.forEach(({hashes}, name) => compute[name] = hashes.inputs);
        const value = crc32(equal.generate(compute));

        const changed = this.#value !== value;
        this.#value = value;
        return changed;
    }
}
