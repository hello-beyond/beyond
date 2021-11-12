const DynamicProcessor = global.utils.DynamicProcessor();
const {crc32} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.transversal.packager.hash';
    }

    // The transversal packager
    #value;
    get value() {
        if (this.#value !== undefined) return this.#value;

        const packagers = this.children.get('packagers').child;
        const hashes = [];
        packagers.forEach((packager, path) => hashes.push({path, value: packager.hash.value}));
        hashes.sort((a, b) => a.path > b.path ? 1 : 0);
        return (this.#value = crc32(JSON.stringify(hashes)));
    }

    /**
     * Transversal packager hash constructor
     *
     * @param packagers {object} The packagers of the modules and libraries of the application
     */
    constructor(packagers) {
        super();
        const events = ['hash.initialised', 'hash.change'];
        super.setup(new Map([['packagers', {child: packagers, events}]]));
    }

    _prepared(check) {
        const packagers = this.children.get('packagers').child;
        packagers.forEach(packager => check(packager.hash));
    }

    _process() {
        this.#value = undefined;
    }
}
