class BundlesManager extends ReactiveModel {

    #applicationManager;
    get applicationManager() {
        return this.#applicationManager;
    }

    #bundlesTree;
    get bundlesTree() {
        return this.#bundlesTree;
    }

    #bundles;
    get bundles() {
        return this.#bundles;
    }

    get fetching() {
        let fetching = false;
        this.items.forEach(bundle => {
            if (bundle.fetching) fetching = true;
        });
        return fetching;
    }

    #items = new Map();
    get items() {
        return this.#items;
    }

    get consumers() {
        let consumers = [];
        const set = new Set();
        this.items.forEach(bundle => {
            const {items} = bundle.consumers;
            items.forEach(item => {
                if (set.has(item.id)) return;
                consumers.push(item);
                set.add(item.id);
            });
        });
        return consumers;
    }

    get dependencies() {
        let dependencies = [];
        const set = new Set();
        this.items.forEach(bundle => {
            const {items} = bundle.dependencies;
            items.forEach(item => {
                if (set.has(item.id)) return;
                set.add(item.id);
                dependencies.push(item);
            })
        });
        return dependencies;
    }

    #txt;

    #module;
    get module() {
        return this.#module;
    }

    get id() {
        return `${this.#module.id}////bundles-manager`;
    }

    #itemsProcessed = new Set();
    #processed = false;
    get processed() {
        return this.#processed;
    }

    constructor(module, bundlesTree, bundles, txt) {
        super();

        this.#module = module;
        this.#applicationManager = module.applicationManager;
        this.#bundlesTree = bundlesTree;
        this.#bundles = bundles;
        this.#txt = txt;
        this.#process();
    }

    check() {
        this.items.forEach(bundle => bundle.dependencies.check());
    }

    #process() {


        this.#bundles.forEach((bundle) => {
            if (bundle.name === 'txt') return;
            const bundleManager = new BundleManager(this.#applicationManager, this.#bundlesTree, bundle, this.#txt);
            const onProcess = () => {
                this.#itemsProcessed.add(bundleManager.id);
                if (!bundleManager.processed) {
                    return;
                }
                if (this.items.size === this.#itemsProcessed.size) {
                    this.triggerEvent('bundles.processed');
                    this.triggerEvent('change');
                    bundleManager.unbind('change', onProcess);
                }
            }
            bundleManager.bind('change', onProcess);
            bundleManager.bind('change', this.triggerEvent);
            this.items.set(bundle.name, bundleManager);
            if (bundleManager.processed) onProcess();

        });

    }

    /**
     * loads a consumer or dependency module
     *
     * @param type
     * @param moduleId
     * @param bundleId
     * @returns {Promise<void>}
     */
    async load(type, moduleId, bundleId) {
        const module = await this.#applicationManager.moduleManager.load(moduleId);
        if (!['consumers', 'dependencies'].includes(type)) throw new Error(`the property ${type} required to load does not exists`);

        this.items.forEach(item => {
            const object = item[type];
            if (!object.entries.has(bundleId)) return;
            object.setItem(bundleId, module)
            this.triggerEvent(`${module.am.id}.change`);
            this.triggerEvent();
        });
    }

}
