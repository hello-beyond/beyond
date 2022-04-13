const {pathToFileURL} = require('url');

module.exports = class {
    #processor;

    #dependencies = new Set();
    get dependencies() {
        return this.#dependencies;
    }

    constructor(processor) {
        this.#processor = processor;
    }

    findFileUrl = async (resource) => {
        const {files, application} = this.#processor;

        if (!resource.startsWith('~')) {
            const file = `${resource}.scss`;
            return files.has(file) ? pathToFileURL(files.get(file).file) : null;
        }

        const parsed = new (require('../../../parser'))(resource.substr(1));

        // Check if the file is contained in an application module
        const bundle = parsed.bundle.dependency;
        const dependency = bundle ? new (require('./dependency'))(application, bundle) : void 0;
        await dependency?.process();
        if (dependency?.files.has(parsed.bundle.file)) {
            this.#dependencies.add(parsed.bundle.dependency);
            return pathToFileURL(dependency.files.get(parsed.bundle.file).file);
        }

        // Check if the file is contained in an external package
        const external = require('./external')(parsed.external, application);
        if (external) {
            // @TODO: Continue from here:
            this.#dependencies.add(parsed.external.pkg);
            return external;
        }

        throw new Error(`File not found on bundle "${dependency.bundle}"`);
    }
}
