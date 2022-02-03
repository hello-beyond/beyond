const DynamicProcessor = global.utils.DynamicProcessor(Map);

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.dependencies.declarations';
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
        const events = ['declaration.initialised', 'declaration.change'];
        super.setup(new Map([['dependencies', {child: dependencies, events}]]));

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
        dependencies.forEach(dependency => {
            const {resource} = dependency;
            if (!dependency.valid) {
                errors.push(`Dependency "${resource}" is invalid: [${dependency.errors}]`);
                return;
            }

            const {declaration} = dependency;
            if (!declaration.valid) {
                errors.push(`Declaration of dependency "${resource}" has been processed with errors: ` +
                    `[${declaration.errors}]`);
            }
        });

        this.#errors = errors;
        this.clear();
        dependencies.forEach((value, key) => this.set(key, value));
    }
}
