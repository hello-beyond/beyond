const DynamicProcessor = global.utils.DynamicProcessor(Map);

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'ts-processor.dependencies.declarations';
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
        const events = ['declaration.initialised', 'declaration.change'];
        super.setup(new Map([['dependencies', {child: dependencies, events}]]));
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
