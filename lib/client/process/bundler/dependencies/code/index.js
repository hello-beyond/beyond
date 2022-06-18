const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.dependencies.code';
    }

    get id() {
        return this.#container.id;
    }

    // Can be a bundle packager or a transversal packager
    #container;

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

    // The bundle dependencies that should be registered on the client
    #register = {
        // The external dependencies that are required by the bundle
        externals: void 0,
        // The dependencies that are beyond bundles (including transversals bundles)
        beyond: void 0
    };
    get register() {
        return this.#register;
    }

    constructor(dependencies, container) {
        super();
        this.#container = container;
        super.setup(new Map([['dependencies', {child: dependencies}]]));
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
        let count = 0;
        let code = '';

        // The bundle dependencies that should be reported on the client
        this.#register.externals = new Map();
        this.#register.beyond = new Set();

        // Avoid to import the same resource more than once (can happen on transversals)
        const resources = new Set();

        dependencies.forEach(({valid, is, kind, bundle}, resource) => {
            if (!valid) {
                this.#errors.push(`Dependency "${resource}" is invalid`);
                return;
            }
            if (!is.has('import')) return;

            const name = `dependency_${count}`;

            // To report to the client that the bundle being processed has the current beyond dependency
            ['bundle', 'transversal'].includes(kind) && !resource.startsWith('@beyond-js/') &&
            this.#register.beyond.add(resource);

            // To report to the client that the bundle being processed has the current dependency
            ['external', 'node.internal'].includes(kind) && this.#register.externals.set(resource, name);

            // If the start transversal is loaded at the beginning of the application, uncomment the following line,
            // as AMD would brings drawbacks (timeout error)
            // if (kind === 'transversal' && pathname === 'start') return;
            const {application} = this.#container;

            const url = kind === 'transversal' ? `${application.package}/${bundle.name}` : resource;
            if (resources.has(url)) return;
            resources.add(url);

            code += `import * as ${name} from '${url}';\n`;
            count++;
        });

        this.#count = count;
        this.#code = code;
    }

    _prepared(require) {
        const dependencies = this.children.get('dependencies').child;
        dependencies.forEach(dependency => require(dependency, dependency.id));
    }

    _process() {
        this.#count = this.#code = this.#errors = void 0;
    }
}
