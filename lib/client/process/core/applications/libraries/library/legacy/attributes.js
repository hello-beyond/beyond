const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application.library.legacy';
    }

    get is() {
        return 'library';
    }

    #application;
    #pkg;
    get pkg() {
        return this.#pkg;
    }

    constructor(application, pkg) {
        super();
        this.#application = application;
        this.#pkg = pkg;
    }

    get id() {
        return `${this.#application.id}//${this.#pkg}`;
    }

    get path() {
        return this.library?.path;
    }

    get resource() {
        return this.library?.resource;
    }

    get pathname() {
        return this.library?.pathname;
    }

    get description() {
        return this.library?.description;
    }

    get version() {
        return this.library?.version;
    }

    get connect() {
        return this.library?.connect;
    }

    get hosts() {
        return this.library?.hosts;
    }
}
