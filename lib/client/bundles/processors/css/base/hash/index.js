const DynamicProcessor = global.utils.DynamicProcessor();
const {crc32} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'css-processor.hash';
    }

    constructor(sources) {
        super();
        const children = [['hashes.files', {child: sources.files.hash}]];
        const {overwrites} = sources;
        overwrites && children.push(['hashes.overwrites', {child: overwrites.hash}]);
        super.setup(new Map(children))
    }

    #value;
    get value() {
        if (this.#value !== undefined) return this.#value;

        const compute = {files: this.children.get('hashes.files').child.value};

        const overwrites = this.children.has('hashes.overwrites') ? this.children.get('hashes.overwrites').child : undefined;
        overwrites && (compute.overwrites = overwrites.value);
        if (compute.files === 0 && (compute.overwrites || compute.overwrites === 0)) return (this.#value = 0);
        return (this.#value = crc32(JSON.stringify(compute)));
    }

    _process() {
        this.#value = undefined;
    }
}
