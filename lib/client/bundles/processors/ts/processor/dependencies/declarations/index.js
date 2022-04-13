const DynamicProcessor = global.utils.DynamicProcessor(Map);

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'ts.dependencies.declarations';
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
        super.setup(new Map([['dependencies', {child: dependencies}]]));

        this.#hash = new (require('./hash'))(this);
    }

    _prepared(check) {
        const dependencies = this.children.get('dependencies').child;
        dependencies.forEach(({declaration}) => check(declaration));
    }

    _process() {
        const dependencies = this.children.get('dependencies').child;

        // Check for errors in the dependencies
        const errors = [];
        dependencies.forEach(({resource, valid, errors, declaration}) => {
            !valid && errors.push(`Dependency "${resource}" is invalid: [${errors}]`);

            !declaration.valid &&
            errors.push(`Declaration of dependency "${resource}" has been processed with errors: ` +
                `[${declaration.errors}]`);
        });

        this.#errors = errors;
        this.clear();
        dependencies.forEach(({declaration}, resource) => this.set(resource, declaration));
    }

    destroy() {
        super.destroy();
        this.#hash.destroy();
    }
}
