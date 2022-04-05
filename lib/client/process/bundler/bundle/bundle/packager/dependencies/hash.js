const DynamicProcessor = global.utils.DynamicProcessor();
const {crc32} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.bundle.dependencies.hash';
    }

    #value;
    get value() {
        if (this.#value !== void 0) return this.#value;

        const processors = this.children.get('processors').child;

        const compute = {};
        processors.forEach((processor, name) => {
            const {dependencies} = processor;
            dependencies && (compute[name] = dependencies.hash.value);
        });

        return this.#value = crc32(JSON.stringify(compute));
    }

    constructor(bundle) {
        super();

        const {processors} = bundle;
        const events = ['dependencies.hash.initialised', 'dependencies.hash.change'];
        super.setup(new Map([['processors', {child: processors, events}]]));
    }

    _prepared(check) {
        const processors = this.children.get('processors').child;
        processors.forEach(processor => {
            const {dependencies} = processor;
            dependencies && check(dependencies.hash);
        });
    }

    _process() {
        this.#value = void 0;
    }
}
