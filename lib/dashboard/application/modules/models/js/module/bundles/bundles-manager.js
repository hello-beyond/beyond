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

    #items = new Map();
    get items() {
        return this.#items;
    }

    get consumers() {
        let consumers = [];
        this.items.forEach(bundle => {
            consumers = consumers.concat(Array.from(bundle.consumers.modules.values()))
        });
        return consumers;
    }

    #txt;

    #processed = new Set();

    constructor(applicationManager, bundlesTree, bundles, txt) {
        super();
        this.#applicationManager = applicationManager;

        this.#bundlesTree = bundlesTree;
        this.#bundles = bundles;
        this.#txt = txt;
        this.#process();
    }

    #process() {
        this.#bundles.forEach((bundle) => {
            if (bundle.name === 'txt') return;
            const bundleManager = new BundleManager(this.#applicationManager, this.#bundlesTree, bundle, this.#txt);
            const onProcess = () => {
                this.#processed.add(bundleManager.id);
                if (this.items.size === this.#processed.size) {
                    this.triggerEvent('bundles.processed');
                    bundleManager.unbind('change', onProcess);
                }
            }
            bundleManager.bind('change', onProcess);
            if (bundleManager.processed) onProcess();

            this.items.set(bundle.name, bundleManager);
        });

    }

}
