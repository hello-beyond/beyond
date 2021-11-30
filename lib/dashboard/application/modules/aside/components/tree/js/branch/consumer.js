class ConsumerBranch extends ReactiveModel {

    get actions() {
        return []
    }

    get inlineActions() {
        return [];
    }

    get type() {
        return 'consumer';
    }

    _reader;
    get reader() {
        return this._reader;
    }

    get icon() {
        return 'file.consumer';
    }

    _label;
    get label() {
        return this._label;
    }

    _item;
    get item() {
        return this._item;
    }

    _bundle;
    get bundle() {
        return this._bundle;
    }

    _ts;
    get ts() {
        return this._ts;
    }

    _compiler;
    get compiler() {
        return this._compiler;
    }

    get favoriteAction() {
        return false;
    }

    EXCLUDED = [
        '@beyond-js/kernel/core/ts'
    ];

    _diagnostics;
    get diagnostics() {
        return this._diagnostics ?? {};
    }

    _fetching;
    get fetching() {
        return this._fetching;
    }

    get errors() {
        if (!this.diagnostics) return 0;
        const {general, dependencies, files, overwrites} = this.diagnostics;
        return (general?.length ?? 0) + (dependencies?.size ?? 0) + (files?.size ?? 0) + (overwrites?.size ?? 0);
    }

    _application;
    get application() {
        return this._application;
    }

    _moduleId;
    get moduleId() {
        if (this._moduleId) return this._moduleId;
        const r = this.bundle.id.split('//');
        r.splice(r.length - 1, 1);
        return this._moduleId = r.join('//');
    }

    _bundleLoaded;
    get bundleLoaded() {
        return this._bundleLoaded;
    }

    _bundleTree;
    get bundleTree() {
        return this._bundleTree;
    }

    constructor(item, application, specs) {
        super();
        this._specs = specs;
        this._application = application;
        this._item = item;
        this._bundle = item.bundle;
        this._ts = item.bundle.processors.get('ts');
        this._compiler = this.ts.compiler;
        this._diagnostics = this.ts.compiler?.diagnostics;
        this._label = item.bundle.pathname;
    }

    loadBundle() {

        const tree = {
            properties: {
                processors: {
                    properties: {
                        sources: true,
                        overwrites: true,
                        compiler: true
                    }
                }
            }
        }
        const bundle = new Bundle({identifier: {id: this.bundle.id}, tree: tree});
        this.setFetching(true);
        bundle.bind('change', (_) => {
            if (!bundle.tree.landed) return;
            this._bundle = bundle;

            this._bundleLoaded = true;

            const tree = TreeFactory.get('bundle', [
                this.application,
                this.bundle,
                [...this.bundle.processors.values()],
                this.bundle
            ]);
            this._bundleTree = tree;
            this.setFetching(false);
        });
        bundle.fetch();

    }

    setFetching(value) {
        this._fetching = value;
        this.triggerEvent();
    }

}
