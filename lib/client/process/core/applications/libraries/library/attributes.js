const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application.library';
    }

    #application;
    #library;

    constructor(application, library) {
        super();
        this.#application = application;
        this.#library = library;

        const children = new Map();
        children.set('library', {child: library});
        super.setup(children);
    }

    get is() {
        return 'library';
    }

    get id() {
        return `${this.#application.id}/${this.#library.id}`;
    }

    get path() {
        return this.#library.path;
    }

    get scope() {
        return this.#library.scope;
    }

    get name() {
        return this.#library.name;
    }

    get resource() {
        return this.#library.resource;
    }

    get pathname() {
        return this.#library.pathname;
    }

    get package() {
        return this.#library.package;
    }

    get description() {
        return this.#library.description;
    }

    get version() {
        return this.#library.version;
    }

    get connect() {
        return this.#library.connect;
    }

    get hosts() {
        return this.#library.hosts;
    }
}
