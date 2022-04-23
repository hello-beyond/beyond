const DynamicProcessor = global.utils.DynamicProcessor();
const {crc32, equal} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.bundle.packager.hash';
    }

    #packager;
    get packager() {
        return this.#packager;
    }

    #value;
    get value() {
        return this.#value;
    }

    constructor(packager) {
        super();
        this.#packager = packager;
        super.setup(new Map([
            ['processors.inputs.hash', {child: packager.processors.hashes.inputs}],
            ['imports.hash', {child: packager.imports.hash}]
        ]));
    }

    async _begin() {
        await this.#packager.initialise();
    }

    _process() {
        const compute = {
            imports: this.children.get('imports.hash').child.value,
            processors: this.children.get('processors.inputs.hash').child.value
        };

        const value = crc32(equal.generate(compute));
        const changed = this.#value !== value;
        this.#value = value;

        return changed;
    }
}
