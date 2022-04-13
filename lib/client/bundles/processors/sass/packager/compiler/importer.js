const {pathToFileURL} = require('url');

module.exports = class {
    #compiler;

    constructor(compiler) {
        this.#compiler = compiler;
    }

    findFileUrl = (resource) => {
        if (!resource.startsWith('~')) {
            const filename = `${resource}.scss`;
            const {files} = this.#compiler.packager.processor;
            if (!files.has(filename)) return null;

            const file = files.get(filename);
            return pathToFileURL(file.file);
        }

        const parsed = new (require('../../parser'))(resource.slice(1));

        const {depfiles} = this.#compiler;
        const {dependencies} = depfiles;

        // Solve the dependency as a bundle of a module in the application
        const bundle = (() => {
            if (!depfiles.has(parsed.bundle.dependency)) return;

            const files = depfiles.get(parsed.bundle.dependency);
            if (!files.has(parsed.bundle.file)) return null;

            const file = files.get(parsed.bundle.file);
            return pathToFileURL(file.file);
        })();
        if (bundle !== void 0) return bundle;

        // Solve the dependency as an external dependency
        return (() => {
            if (!dependencies.has(parsed.external.pkg)) return;
            const dependency = dependencies.get(parsed.external.pkg);

            const {external} = dependency;
            if (!external) return;

            let file = !parsed.external.file ? external.json.sass : parsed.external.file;
            file = require('path').join(external.path, file);
            return pathToFileURL(file);
        })();
    }
}
