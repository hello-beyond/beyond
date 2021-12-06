const DynamicProcessor = global.utils.DynamicProcessor();
const {crc32} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'dependency.declaration';
    }

    #dependency = () => this.children.get('dependency').child;

    #errors = [];
    get errors() {
        return this.#errors;
    }

    get valid() {
        return !this.errors.length;
    }

    #value;
    get value() {
        return this.#value;
    }

    #hash;
    get hash() {
        if (this.#hash !== undefined) return this.#hash;
        this.#hash = this.#value ? crc32(this.#value) : '0';
        return this.#hash;
    }

    #version;
    get version() {
        return this.#version;
    }

    constructor(application, dependency) {
        super();
        const events = ['external.initialised', 'external.change',
            'declaration.initialised', 'declaration.change'];
        super.setup(new Map([['dependency', {child: dependency, events}]]));
    }

    _prepared(check) {
        const dependency = this.#dependency();

        const {valid, external, bundle, distribution, language} = dependency;
        const {declaration} = bundle ? bundle.packagers.get(distribution, language) : {};

        const {children} = this;
        const previous = {
            declaration: children.has('declaration') ? children.get('declaration').child : void 0,
            external: children.has('external') ? children.get('external').child : void 0
        };

        // Unregister previous bundle declaration or external if differs from actual values
        previous.declaration && declaration !== previous.declaration && children.unregister(['declaration'], false);
        previous.external && external !== previous.external && children.unregister(['external'], false);

        if (!valid) return;

        // Register declaration if not previously registered
        declaration && declaration !== previous.declaration &&
        children.register(new Map([['declaration', {child: declaration}]]), false);

        // Register external if not previously registered
        external && external !== previous.external &&
        children.register(new Map([['external', {child: external}]]), false);

        if (external && !check(external)) return false;
        if (declaration && !(check(declaration))) return false;
        if (bundle && !check(bundle)) return false;
    }

    _process() {
        this.#value = this.#hash = this.#version = undefined;

        const dependency = this.#dependency();
        if (!dependency.valid) {
            this.#errors = dependency.errors;
            return;
        }

        const {children} = this;
        const external = children.has('external') ? children.get('external').child : void 0;
        const declaration = children.has('declaration') ? children.get('declaration').child : void 0;

        if (external) {
            this.#errors = external.errors;
            if (!external.valid) return;

            this.#value = external.dts;
            this.#version = '0';
        }
        else if (!declaration) {
            // dependency.node can be 'node.internal' or 'node'
            this.#value = '';
            this.#hash = 0;
            this.#version = 0;
        }
        else {
            this.#errors = declaration.errors;
            if (!declaration.valid) return;

            this.#value = declaration.code;
            this.#hash = declaration.hash;
            this.#version = declaration.version;
        }
    }
}
