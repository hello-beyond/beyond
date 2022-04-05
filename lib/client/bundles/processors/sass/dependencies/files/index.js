const DynamicProcessor = global.utils.DynamicProcessor(Map);

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'sass.dependencies.files';
    }

    #dependencies;
    get dependencies() {
        return this.#dependencies;
    }

    #hash;
    get hash() {
        return this.#hash;
    }

    #errors = [];
    get errors() {
        return this.#errors;
    }

    get valid() {
        return !this.#errors.length;
    }

    constructor(dependencies) {
        super();
        this.#dependencies = dependencies;
        const events = ['files.initialised', 'files.change'];
        super.setup(new Map([['dependencies', {child: dependencies, events}]]));

        this.#hash = new (require('./hash'))(this);
    }

    _prepared(check) {
        const dependencies = this.children.get('dependencies').child;
        dependencies.forEach(({files}) => check(files));
    }

    _process() {
        const dependencies = this.children.get('dependencies').child;

        // Check for errors in the dependencies
        const errors = [];
        dependencies.forEach(({resource, valid, errors}) =>
            !valid && errors.push(`Dependency "${resource}" is invalid: [${errors}]`));

        this.#errors = errors;
        this.clear();
        dependencies.forEach(({files}, resource) => this.set(resource, files));
    }

    destroy() {
        super.destroy();
        this.#hash.destroy();
    }
}
