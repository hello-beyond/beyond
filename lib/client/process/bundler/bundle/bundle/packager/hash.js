const DynamicProcessor = global.utils.DynamicProcessor();
const {crc32} = global.utils;

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
        if (this.#value !== undefined) return this.#value;

        const hashes = {
            imports: this.children.get('imports.hash').child.value,
            processors: [...this.children.get('processors.hashes').child]
        };
        return (this.#value = crc32(JSON.stringify(hashes)));
    }

    constructor(packager) {
        super();
        this.#packager = packager;
        super.setup(new Map([
            ['processors.hashes', {child: packager.processors.hashes}],
            ['imports.hash', {child: packager.imports.hash}]
        ]));
    }

    #initialising = false;
    get initialising() {
        return this.#initialising || super.initialising;
    }

    async initialise() {
        if (this.#initialising || this.initialised) return;
        this.#initialising = true;

        await this.#packager.initialise();
        await super.initialise();
        this.#initialising = false;
    }

    _process() {
        this.#value = undefined;
    }
}
