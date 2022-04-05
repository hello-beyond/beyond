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

    get fetching() {
        return this.#dependencies?.fetching || this.#consumers?.fetching || this.#compiler?.fetching;
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
        return this.#compiler?.diagnostics ?? {};
    }

    get processed() {

        if (!this.bundle.processors.has('ts')) return true;
        return !!this.#compiler && this.#consumers.ready && this.#dependencies.ready;
    }

    get totalFiles() {
        let total = 0;
        if (!this.#bundle.tree.landed) return total;
        this.#bundle.processors.forEach(processor => {
            total += processor.sources.items.length
        });
        return total;
    }

    /**
     *
     * @param {ApplicationModel} application
     * @param tree {TreeFactory} Tree of module's bundles.
     * @param bundle
     * @param txt
     */
    constructor(application, tree, bundle, txt) {
        super();
        this.#bundle = bundle;
        this.#tree = tree;
        this.#application = application;
        this.#dependencies = new DependenciesManager(bundle, application, tree);
        this.#consumers = new ConsumersManager(bundle, application, tree);
        this.consumers.bind('change', this.triggerEvent);
        this.dependencies.bind('change', this.triggerEvent);
        // if (txt) processors.set('txt', txt.processors.get('txt'));
        this._process();
    }

    async _process() {
        this.bundle.processors.forEach(processor => {
            if (!this.HAS_DEPENDENCIES.includes(processor.name)) return;
            this.loadCompiler(processor.id);
        });

    }

    getFile(file, processorName) {
        file = file.replace(/\//g, '\\');
        if (!this.bundle.processors.has(processorName)) {
            return;
        }
        const processor = this.bundle.processors.get(processorName);
        return processor.sources.items.find(i => i.file === file);

    }

    async loadCompiler() {
        if (!this.bundle.processors.has('ts')) return;

        const processor = this.bundle.processors.get('ts');
        const compiler = new ProcessorCompiler({identifier: {id: processor.id}});
        this.#compiler = compiler;
        const onload = () => this.triggerEvent();

        compiler.bind('change', onload);
        compiler.fetch();
    }
}
