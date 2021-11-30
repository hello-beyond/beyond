const ts = require('typescript');
const sep = require('path').sep;

module.exports = class {
    #path;
    #files;
    #dependencies;
    #options;

    #externals = new Set();
    get externals() {
        return this.#externals;
    }

    // The non relative already resolved modules
    #resolved = new Map();

    #output = new Map();
    get output() {
        return this.#output;
    }

    constructor(path, files, dependencies, options) {
        this.#path = path;
        this.#files = files;
        this.#dependencies = dependencies;
        this.#options = options;
    }

    getSourceFile(file, languageVersion) {
        const done = (file, content) => file && ts.createSourceFile(file, content, languageVersion);

        // The beyond context that returns the bundle, module or library objects
        if (file === `beyond_context.ts`) return done(file, require('./context'));

        // Check if it is an internal module of the bundle being compiled
        if (this.#files.has(file)) return done(file, this.#files.get(file).content);

        const module = file.substr(0, file.length - 5); // Remove the .dts extension
        if (this.#dependencies.has(module)) {
            const dependency = this.#dependencies.get(module);
            if (['bundle', 'transversal'].includes(dependency.kind)) return done(file, dependency.dts);
        }

        // Let typescript to look for the file
        if (ts.sys.fileExists(file)) return done(file, ts.sys.readFile(file));
    }

    resolveModuleNames = (modules, container) => {
        const output = [];

        const push = (module, resolved) => {
            !module.startsWith('.') && this.#resolved.set(module, resolved);
            output.push(resolved ? {resolvedFileName: resolved} : undefined);
        }

        modules.forEach(module => {
            // Check if module was already resolved
            if (this.#resolved.has(module)) return push(module, this.#resolved.get(module));

            // The beyond context
            if (module === 'beyond_context') return push(module, `${module}.ts`);

            // Check if it is a bundle of a BeyondJS local module
            if (this.#dependencies.has(module)) {
                const dependency = this.#dependencies.get(module);

                // Check if it is a dependency to a bundle of a local BeyondJS module
                if (['bundle', 'transversal'].includes(dependency.kind)) {
                    return push(module, `${module}.d.ts`);
                }
            }

            // Check if module is an external dependency
            (() => {
                if (module.startsWith('.')) return;
                if (container.includes(`${sep}node_modules${sep}@types${sep}`)) return;
                this.#externals.add(module);
            })(module);

            // Let typescript solve the dependency
            const host = ts.createCompilerHost(this.#options);
            const {resolvedModule} = ts.resolveModuleName(module, container, this.#options, host);
            const resolved = resolvedModule?.resolvedFileName;

            // Check if it is a bundle internal module, but the file is excluded or not reached
            // by the configuration of the processor
            if (resolved?.startsWith(`${this.#path}${sep}`) && !this.#files.has(resolved)) return done(module);

            return push(module, resolved);
        });

        return output;
    };

    getCurrentDirectory = () => this.#path;
    getCompilationSettings = () => this.#options;
    getDefaultLibFileName = options => ts.getDefaultLibFilePath(options);
    useCaseSensitiveFileNames = () => ts.sys.useCaseSensitiveFileNames;
    getCanonicalFileName = file => ts.sys.useCaseSensitiveFileNames ? file : file.toLowerCase();
    fileExists = ts.sys.fileExists;
    readFile = ts.sys.readFile;
    readDirectory = ts.sys.readDirectory;
    directoryExists = ts.sys.directoryExists;
    getDirectories = ts.sys.getDirectories;
    getNewLine = () => ts.sys.newLine;

    writeFile(file, content) {
        file = sep === '/' ? file : file.replace(/\//g, sep);
        this.#output.set(file, content);
    }
}
