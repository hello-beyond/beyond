export class BundleManager extends ReactiveModel {

    #tree = new Map;
    get tree() {
        return this.#tree;
    }

    #bundle
    get bundle() {
        return this.#bundle;
    }

    get id() {
        return this.#bundle.id;
    }

    get name() {
        return this.#bundle.name;
    }

    HAS_DEPENDENCIES = ['ts'];

    #dependencies;
    get dependencies() {
        return this.#dependencies;
    }

    #consumers;
    get consumers() {
        return this.#consumers;

    }

    #compiler;
    get compiler() {
        return this.#compiler;
    }

    /**
     * Represents the model of the current application
     * @private
     */
    #application;
    get application() {
        return this.#application;
    }

    #processors;
    get processors() {
        return this.#processors;
    }

    get diagnostics() {
        const processor = this.bundle.processors.get('ts');
        if (!processor) return {};
        return processor?.compiler?.diagnostics ?? {};
    }

    #am;

    /**
     *
     * @param {ApplicationModel} application
     * @param tree {TreeFactory} Tree of module's bundles.
     * @param bundle
     * @param txt
     * @param am
     */
    constructor(application, tree, bundle, am, txt) {
        super();
        this.#am = am;
        const processors = bundle.processors;
        this.#bundle = bundle;
        this.#tree = tree;
        this.#application = application;
        if (txt) processors.set('txt', txt.processors.get('txt'));
        // this.#processors = processors;
        this._process();
    }

    _process() {
        this.bundle.processors.forEach(processor => {
            if (!this.HAS_DEPENDENCIES.includes(processor.name)) return;
            this.loadDependencies(processor.id);
            this.loadConsumers(processor.id);
            this.loadCompiler(processor.id);
        });
    }

    loadDependencies(processorId) {
        const specs = {
            tree: {
                properties: {
                    bundle: true,
                    declaration: true
                }
            },
            filter: [{
                field: 'processor',
                operand: 0,
                value: processorId
            }]
        };
        const dependencies = new ProcessorDependencies(specs);
        dependencies.bind('change', this._checkDependencies);
        dependencies.fetch();
        this.#dependencies = dependencies;

        //TODO @ftovar test
        // console.log('hi dependencies', processorId, specs)
        // processorId === 'application//1917723684//components/button//code//ts' && (window.#dependencies = dependencies);
        // console.log('hi dependencies collection', dependencies)
    }

    loadConsumers() {
        const specs = {
            tree: {
                properties: {
                    bundle: {properties: {processors: {properties: {compiler: true, dependencies: true}}}}
                }
            },
            filter: [{field: 'bundle', operand: 0, value: this.bundle.id}]
        };
        const collection = new Consumers(specs);
        collection.bind('change', this._checkConsumers);
        collection.fetch();
        this.#consumers = collection;

        //TODO @ftovar test
        // console.log('hi consumer', this.bundle.id, specs)
        // this.#bundle.id === 'application//1917723684//components/button//code' && (window.#consumers = collection)
        // console.log('hi consumer collection', collection)
    }

    _checkConsumers = () => {
        if (!this.consumers.tree.landed) return;
        this.triggerEvent();
        const branch = this.tree.items.get(this.bundle.name);
        branch.addConsumers(this.consumers);
        this.consumers.unbind('change', this._checkDependencies);
        this.triggerEvent('consumers.loaded');

    };

    _checkDependencies = () => {
        if (!this.dependencies.landed) return;
        if (this.dependencies.landed) {
            const branch = this.tree.items.get(this.bundle.name);
            branch.addDependencies(this.dependencies);
            this.triggerEvent();
        }
        if (this.dependencies.tree.landed) {
            this.dependencies.unbind('change', this._checkDependencies);
            this.triggerEvent('dependencies.loaded');
        }

    }

    getFile(file, processorName) {
        file = file.replace(/\//g, '\\');
        if (!this.bundle.processors.has(processorName)) {
            console.log("NO");
            return;
        }
        const processor = this.bundle.processors.get(processorName);
        return processor.sources.items.find(i => i.file === file);

    }

    async loadCompiler() {
        if (!this.bundle.processors.has('ts')) return;

        const processor = this.bundle.processors.get('ts');
        const compiler = new ProcessorCompiler({identifier: {id: processor.id}});
        compiler.bind('change', () => {
            const specs = {id: processor.id, module: this.#am, bundle: this.#bundle};
            DSNotifications.register(compiler.diagnostics, specs);
        });
        await compiler.fetch();
        this.#compiler = compiler;
    }
}
