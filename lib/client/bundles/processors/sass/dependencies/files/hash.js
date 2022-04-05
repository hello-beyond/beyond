const DynamicProcessor = global.utils.DynamicProcessor();
const {crc32} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'sass.dependencies.files.hash';
    }

    constructor(files) {
        super();
        super.setup(new Map([['dependencies.files', {child: files}]]));
    }

    #value;
    get value() {
        if (this.#value !== undefined) return this.#value;

        const dfiles = this.children.get('dependencies.files').child;
        if (!dfiles.valid) return 0;

        const compute = {};
        dfiles.forEach((files, resource) => compute[resource] = files.hash);

        return this.#value = Object.entries(compute).length ? crc32(JSON.stringify(compute)) : 0;
    }

    _process() {
        this.#value = void 0;
    }
}
