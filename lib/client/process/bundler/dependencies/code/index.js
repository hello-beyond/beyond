const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.dependencies.code';
    }

    get id() {
        return this.#packager.id;
    }

    // The bundle or transversal packager
    #packager;

    #errors;
    get errors() {
        this.#process();
        return this.#errors ? this.#errors : [];
    }

    get valid() {
        return this.processed && !this.errors.length;
    }

    #code;
    get code() {
        this.#process();
        return this.#code;
    }

    #count;
    get count() {
        this.#process();
        return this.#count;
    }

    constructor(dependencies, packager) {
        super();
        this.#packager = packager;

        const events = ['dependency.initialised', 'dependency.change'];
        super.setup(new Map([['dependencies', {child: dependencies, events}]]));
    }

    #process() {
        if (!this.processed) throw new Error('Dynamic processor is not ready');
        if (this.#code !== undefined || this.#errors !== undefined) return this.#code;

        const dependencies = this.children.get('dependencies').child;
        if (!dependencies.valid) {
            this.#errors = dependencies.errors;
            return;
        }

        this.#errors = [];
        const setters = [];
        let code = '';

        // Avoid to import the same resource more than once (can happen on transversals)
        const resources = new Set();

        dependencies.forEach(({valid, is, kind, pathname, bundle}, resource) => {
            if (!valid) {
                this.#errors.push(`Dependency "${resource}" is invalid`);
                return;
            }
            if (!is.has('import')) return;

            // The transversals are accessed from beyond.transversals, it is only required here that the import
            // of the transversal be added so that it is then available when required.
            // The start transversal is loaded at the beginning of the application,
            // therefore it is not necessary to include it, and with AMD it brings drawbacks (timeout error).
            pathname = kind === 'transversal' ? bundle.name : pathname;
            if (kind === 'transversal' && pathname === 'start') return;

            const def = is === 'external' ? '' : '* as ';
            const url = this.url(resource, pathname);

            if (resources.has(url)) return;
            resources.add(url);

            const index = setters.length;
            code += `import ${def}dependency_${index} from '${url}';\n`;
            kind !== 'transversal' && setters.push(`dependencies.set('${resource}', dependency_${index});`);
        });

        code += setters.length ? 'const dependencies = new Map();\n' : '';
        setters.forEach(setter => code += `${setter}\n`);
        this.#count = setters.length;
        this.#code = code;
    }

    url(resource, pathname) {
        const {distribution} = this.#packager;
        const {mode} = distribution.bundles;

        if (mode === 'es6') {
            let url = pathname + (mode === 'es6' ? '.js' : '');
            const root = mode === 'es6' && distribution.platform === 'web' ? '/' : '';
            return root + url;
        }
        else {
            // The URLs are solved by AMD paths configuration
            return resource;
        }
    }

    _prepared(check) {
        const dependencies = this.children.get('dependencies').child;
        dependencies.forEach(dependency => check(dependency, dependency.id));
    }

    _process() {
        this.#count = this.#code = this.#errors = undefined;
    }
}
