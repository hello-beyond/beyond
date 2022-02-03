const DynamicProcessor = global.utils.DynamicProcessor();
const {crc32} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'processor.hash';
    }

    constructor(processor) {
        super();
        const {sources, dependencies, options} = processor;
        const {files, overwrites, extensions} = sources;

        const children = [
            ['files.hash', {child: files.hash}],
            ['extensions.hash', {child: extensions.hash}]
        ];

        overwrites && children.push(['overwrites.hash', {child: overwrites.hash}]);
        dependencies && children.push(['declarations.hash', {child: dependencies.declarations.hash}]);
        options && children.push(['options.hash', {child: options}]);
        super.setup(new Map(children));
    }

    /**
     * This method allows the extension by inheritance of the hash calculation
     *
     * @return {number} The calculated hash of the children of the inherited class
     * @private
     */
    _compute() {
        return 0;
    }

    #value;
    get value() {
        if (this.#value !== undefined) return this.#value;

        const {children} = this;
        const overwrites = children.get('overwrites.hash')?.child.value;
        const declarations = children.get('declarations.hash')?.child.value;
        const options = children.get('options.hash')?.child.hash;
        const inheritance = this._compute();

        const compute = {
            files: this.children.get('files.hash').child.value,
            extensions: this.children.get('extensions.hash').child.value,
            overwrites: overwrites ? overwrites : 0,
            declarations: declarations ? declarations : 0,
            options: options ? options : 0,
            inheritance
        };

        if (compute.files === 0 && compute.overwrites === 0 && compute.inheritance === 0 &&
            compute.declarations === 0 && compute.options === 0) return (this.#value = 0);

        return (this.#value = crc32(JSON.stringify(compute)));
    }

    _process() {
        this.#value = undefined;
    }
}
