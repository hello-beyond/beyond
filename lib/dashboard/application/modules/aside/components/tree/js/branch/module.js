class ModuleBranch extends Branch {

    get actions() {
        return [
            {name: 'addBundle', icon: 'add', modal: true},
            {name: 'rename', icon: 'edit', modal: true}
        ];
    }

    _inlineActions = [];
    get inlineActions() {
        return this._inlineActions;
    }

    get type() {
        return 'module';
    }

    _module;
    get module() {
        return this._module;
    }

    _model;
    get model() {
        return this._model;
    }

    _loaded;
    get loaded() {
        return this._loaded;
    }

    _manager;
    get manager() {
        return this._manager;
    }

    get pathname() {
        return `${this.item?.id}/${this.label}`;
    }

    constructor(item, application) {
        super(item, application);
        this._module = item?.module ? item.module : item;
        this._manager = application.moduleManager;
        this._label = this._module.pathname;
        this._check();
    }

    _check() {
        //TODO: @julio check if it is necessary
    }

    addFavorite(folder) {
        /**
         * The module is the ApplicationModule object the module item
         * is exposed as a property of it.
         */
        const {application: {favorites}, module} = this;
        this._isFavorite = true;

        favorites.add(folder, {
            folder: folder,
            label: module.pathname,
            module: {id: module.id, name: module.name},
            pathname: `${this.item.id}/${this.label}`,
            type: 'module'
        });
    }

    async expand() {
        if (this.loaded) return true;
        this.fetching = true;

        const module = await this.manager.load(this.item.id);
        this._model = module;
        this._loaded = true;
        module.bundles.forEach(({bundle}) => {
            const tree = branchFactory.get('bundle', bundle, this.application, {module});
            this.items.set(bundle.name, tree);
        });
        this.fetching = false;
        return true;
    }

    open() {
        console.log("si");
    }

    registerInlineAction(action) {
        this.inlineActions.push(action);
    }

    rename() {
        console.log("rename...");
    }

    addBundle() {
        console.log("add bundle");
    }
}
