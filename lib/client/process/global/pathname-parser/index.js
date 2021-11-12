module.exports = class {
    #application;
    get application() {
        return this.#application;
    }

    #resource;
    get resource() {
        return this.#resource;
    }

    #error;
    get error() {
        return this.#error;
    }

    get valid() {
        return !this.#error;
    }

    // Can be 'processor' (from a hmr request), 'bundle', or 'transversal'
    #is;
    get is() {
        return this.#is;
    }

    #diagnostics;
    get diagnostics() {
        return this.#diagnostics;
    }

    #extname;
    get extname() {
        return this.#extname;
    }

    #bundle;
    get bundle() {
        return this.#bundle;
    }

    #processor;
    get processor() {
        return this.#processor;
    }

    #language;
    get language() {
        return this.#language;
    }

    #id;
    get id() {
        return this.#id;
    }

    #name;
    get name() {
        return this.#name;
    }

    #pkg;

    get package() {
        return this.#pkg;
    }

    checkLanguage(multilanguage) {
        return require('./language').check(this.bundle, multilanguage, this.#language);
    }

    constructor(application, resource) {
        this.#application = application;
        this.#resource = resource;
    }

    // Search and return the bundle or transversal bundle
    async find() {
        return await require('./find')(this);
    }

    async process() {
        const application = this.#application;
        const resource = this.#resource;

        const diagnostics = this.#diagnostics = resource.substr(resource.length - 5) === '.html';
        const pathname = diagnostics ? resource.substr(0, resource.length - 5) : resource;

        let extname = pathname.endsWith('.d.ts') ? '.d.ts' : undefined;
        this.#extname = extname = pathname.endsWith('.js') ? '.js' : extname;
        if (!extname) return;

        const split = pathname.substr(1, pathname.length - 1 - extname.length).split('/');

        let error, bundle, processor, language;

        // Process to resolve if an hmr processor request is being made
        ({error, bundle, processor} = await require('./processor')(split.pop()));
        if (error) {
            this.#error = error;
            return;
        }

        // Parse the language
        ({error, bundle, language} = require('./language').parse(application, bundle, extname));
        if (error) {
            this.#error = error;
            return;
        }

        this.#bundle = bundle;
        this.#processor = processor;
        this.#language = language;

        const {bundles} = global;
        await bundles.ready;

        // If the resource is not a bundle, just go away
        if (!bundles.has(bundle)) return;

        const specs = bundles.get(bundle);

        // Check if resource is a transversal bundle
        if (!split.length) {
            // At this point the resource can only be a transversal bundle,
            // if not, then it is not another kind of bundle or a processor
            this.#is = specs.Transversal ? 'transversal' : void 0;
            return;
        }

        this.#is = processor ? 'processor' : 'bundle';

        // If the pathname do not starts with '/packages', then it is a bundle contained in the application package
        if (split[0] !== 'packages') {
            this.#name = split.join('/');
            this.#id = `${application.package}/${this.#name}`;
            this.#pkg = application.package;
            return;
        }

        split.shift(); // // Remove the 'packages' entry
        this.#id = split.join('/');

        if (!split.length) {
            this.#error = 'Invalid url';
            return;
        }

        const pkg = this.#pkg = {};
        if (split[0].startsWith('@')) {
            if (split.length < 2) {
                this.#error = 'Invalid url';
                return;
            }

            pkg.scope = split.shift();
            pkg.name = split.shift();
        }
        else {
            pkg.name = split.shift();
        }

        pkg.id = (pkg.scope ? `${pkg.scope}/` : '') + pkg.name;
        this.#name = this.#id.substr(pkg.id.length + 1);
    }
}
