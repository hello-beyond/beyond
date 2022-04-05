const DynamicProcessor = global.utils.DynamicProcessor();
const {crc32} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.transversal.dependencies.hash';
    }

    #value;
    get value() {
        if (this.#value !== void 0) return this.#value;

        const packagers = this.children.get('packagers').child;

        const compute = {};
        packagers.forEach((packager, id) => {
            const {dependencies} = packager;
            dependencies && (compute[id] = dependencies.hash.value);
        });

        return this.#value = crc32(JSON.stringify(compute));
    }

    constructor(packagers) {
        super();

        const events = ['dependencies.hash.initialised', 'dependencies.hash.change'];
        this.setup(new Map([['packagers', {child: packagers, events}]]));
    }

    _prepared(check) {
        const packagers = this.children.get('packagers').child;
        packagers.forEach(packager => {
            const {dependencies} = packager;
            dependencies && check(dependencies.hash);
        });
    }

    _process() {
        this.#value = void 0;
    }
}
