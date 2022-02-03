const DynamicProcessor = global.utils.DynamicProcessor();
const {crc32} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.dependencies.declarations.hash';
    }

    constructor(declarations) {
        super();
        super.setup(new Map([['declarations', {child: declarations}]]));
    }

    #value;
    get value() {
        if (this.#value !== undefined) return this.#value;

        const declarations = this.children.get('declarations').child;
        if (!declarations.valid) return 0;

        const compute = {};
        declarations.forEach(dependency => {
            const {declaration} = dependency;
            if (!declaration || !declaration.hash) return;
            compute[dependency.resource] = declaration.hash;
        });

        return this.#value = Object.entries(compute).length ? crc32(JSON.stringify(compute)) : 0;
    }

    _process() {
        this.#value = void 0;
    }
}

//   '@testing/my-app/message/ts': 1923937888,
