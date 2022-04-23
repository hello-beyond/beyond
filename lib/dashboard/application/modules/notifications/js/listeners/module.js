class ModuleListener extends ReactiveModel {

    #model;
    get model() {
        return this.#model;
    }

    #maps = {
        errors: new Map(),
        warnings: new Map()
    };

    get id() {
        return this.#model.am?.module?.id;
    }

    get errors() {
        return Array.from(this.#maps.errors.values());
    }

    get warnings() {
        return Array.from(this.#maps.warnings.values());
    }

    #dependencies = [];
    get dependencies() {
        return this.#dependencies;
    }

    get name() {
        return this.#model.am?.module.name;
    }

    #general = [];
    get general() {
        return this.#general;
    }

    #overwrites = [];
    get overwrites() {
        return this.#overwrites;
    }

    get path() {
        return `${this.model.am?.module?.path.replaceAll('\\', '/')}/`;
    }

    #files = [];
    get files() {
        return this.#files;
    }

    constructor(model) {
        super();
        this.#model = model;
        this.model.bind('change', this.#listen);
        this.model.bind('model.loaded', this.#listen);
        this.check();
    }

    #listen = () => {
        this.check();
    }

    cleanCompiler() {
        this.#dependencies = [];
        this.#general = [];
        this.#files = [];
        this.#overwrites = [];
    }

    check() {
        if (!this.#model.am || !this.#model.am.module) return;
        const {am: {module: {errors, warnings}}, bundles} = this.#model;
        const elements = errors.map(item => item.id);
        const current = Array.from(this.#maps.errors.keys());

        current.forEach(item => {
            if (!elements.includes(item)) this.#maps.errors.delete(item);
        })
        if (errors) {
            errors.forEach(error => this.#maps.errors.set(error.id, error));
        }
        if (warnings) {
            warnings.forEach(warning => this.#maps.warnings.set(warning.id, warning));
        }

        this.cleanCompiler();

        const projectPath = this.model.am?.module?.path?.replaceAll('\\', '/');
        const module = this.model.am?.module;
        bundles?.items.forEach(bundle => {
            if (!bundle.compiler) {
                return
            }
            if (!bundle.compiler.diagnostics) {
                return;
            }
            const {dependencies, general, files, overwrites} = bundle.compiler.diagnostics;
            if (dependencies.size) {
                dependencies.forEach((items, file) => {
                    file = `${module.name}${file.replace(projectPath, '')}`;
                    if (items.length === 1) {
                        const item = {...items[0]};
                        item.file = file;
                        return this.#dependencies.push(item);
                    }
                    this.dependencies.push({
                        type: 'diagnostics',
                        file,
                        total: items.length,
                        message: 'TOTAL'
                    });
                });

            }
            if (general.length) this.#general.push(general);
            if (files.size) this.#files.push(files)
            if (overwrites.size) this.#overwrites.push(overwrites)
        });

        if (errors || warnings) {
            this.triggerEvent('new.notification');
        }
    }
}
