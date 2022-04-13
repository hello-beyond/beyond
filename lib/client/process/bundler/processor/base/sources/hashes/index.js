const DynamicProcessor = global.utils.DynamicProcessor();
const {crc32, equal} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'processor.sources.hashes';
    }

    // The hashes of the extensions
    #extensions = new Map();
    get extensions() {
        return this.#extensions;
    }

    constructor(sources) {
        super();
        const {files, overwrites, extensions, options} = sources;

        const children = [
            ['files.hash', {child: files.hash}],
            ['extensions.hashes', {child: extensions.hashes}]
        ];

        overwrites && children.push(['overwrites.hash', {child: overwrites.hash}]);
        options && children.push(['options.hash', {child: options}]);
        super.setup(new Map(children));
    }

    /**
     * This method allows inheritance of the hash calculation
     *
     * @return {number} The calculated hash of the children of the inherited class
     * @private
     */
    _compute() {
        return 0;
    }

    #sources;
    get sources() {
        if (this.#sources !== void 0) return this.#sources;

        const {children} = this;
        const files = children.get('files.hash').child.value;
        const overwrites = children.get('overwrites.hash')?.child.value;
        const options = children.get('options.hash')?.child.hash;
        const extensions = children.get('extensions.hashes').child.sources;
        const inheritance = this._compute();

        const compute = {
            files, extensions,
            overwrites: overwrites ? overwrites : 0,
            options: options ? options : 0,
            inheritance
        };

        if (compute.files === 0 && compute.extensions === 0 && compute.overwrites === 0 &&
            compute.options === 0 && compute.inheritance === 0) {
            return this.#sources = 0;
        }
        return this.#sources = crc32(equal.generate(compute));
    }

    _process() {
        this.#sources = void 0;

        const {children} = this;
        const exthashes = children.get('extensions.hashes').child;

        this.#extensions.clear();
        exthashes.roots.forEach((hash, processor) => this.#extensions.set(processor, hash));
    }
}
