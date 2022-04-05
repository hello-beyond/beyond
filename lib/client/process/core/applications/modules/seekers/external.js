const DynamicProcessor = global.utils.DynamicProcessor();
const packages = require('uimport/packages');

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'dependencies.external';
    }

    #pkg;

    get error() {
        return this.#pkg.error;
    }

    get name() {
        return this.#pkg.name;
    }

    get path() {
        return this.#pkg.path;
    }

    get subpaths() {
        return this.#pkg.subpaths;
    }

    get json() {
        return this.#pkg.json;
    }

    get version() {
        return this.#pkg.json.version;
    }

    constructor(pkg, application) {
        super();
        this.#pkg = packages.get(pkg, {cwd: application.path});
    }
}