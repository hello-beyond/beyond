const {fs} = global.utils;

module.exports = class {
    #path;
    #specs = new Map();

    constructor(path) {
        this.#path = require('path').join(path, 'actions.specs.json');
    }

    async process(module, distribution, builder) {
        if (distribution.platform !== 'backend') return;

        await module.bundles.ready;
        if (!module.bundles.has('bridge')) return;

        const bundle = module.bundles.get('bridge');
        const packager = await bundle.packagers.get(distribution);
        await packager.processors.ready;
        if (!packager.processors.has('ts')) return;

        // It is not required the analyzer to be ready, as the bridges process independently
        const {bridges} = packager.processors.get('ts').analyzer;
        if (!bridges) return;

        await bridges.ready;
        builder.emit('message', `  . Building bridge specification of "${bundle.pathname}"`);

        const exports = [...bridges.info].map(([key, methods]) => [key, [...methods]]);
        this.#specs.set(module.resource, exports);
    }

    async save() {
        const specs = [...this.#specs];
        await fs.save(this.#path, JSON.stringify(specs, null, 2));
    }
}

