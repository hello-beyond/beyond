const DynamicProcessor = global.utils.DynamicProcessor();
const {crc32, equal} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'processor.sources.extensions.hash';
    }

    // The root hashes of each extension
    #roots = new Map();
    get roots() {
        return this.#roots;
    }

    constructor(extensions) {
        super();
        super.setup(new Map([['extensions.sources', {child: extensions}]]));
    }

    // The calculated hash of the extensions sources
    #sources;
    get sources() {
        if (this.#sources !== void 0) return this.#sources;

        // Extensions is a list of sources populated from the preprocessed sources of all extensions
        const extensions = this.children.get('extensions.sources').child;
        if (!extensions.size) return (this.#sources = 0);

        const compute = {};
        const exthashes = extensions.children.get('extensions.hashes').child;
        exthashes.forEach((hashes, processor) => compute[processor] = hashes.sources);
        return this.#sources = crc32(equal.generate(compute));
    }

    _process() {
        this.#sources = void 0;
        this.#roots.clear();

        const es = this.children.get('extensions.sources').child;
        const exthashes = es.children.get('extensions.hashes')?.child;
        exthashes?.forEach((exthash, processor) => this.#roots.set(processor, exthash.extension.hashes.root));
    }
}
