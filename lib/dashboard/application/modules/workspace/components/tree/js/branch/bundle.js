class BranchBundle extends Branch {

    get type() {
        return 'bundle';
    }

    get actions() {
        return [
            {name: 'create', icon: 'add'},
            {name: 'rename', icon: 'edit'}
        ];
    }

    get pathname() {
        return `${this.module.pathname}/${this.label}`;
    }

    _dependenciesTree;
    get dependenciesTree() {
        return this._dependenciesTree;
    }

    _consumersTree;
    get consumersTree() {
        return this._consumersTree;
    }

    constructor(item, application, specs = {}) {
        super(item, application, specs);
        this._bundle = item;
        this._item = item;
        this._module = specs.module;
        this._label = item.name;
        const tree = TreeFactory.get('bundle', [
            this.application,
            this.bundle,
            [...item.processors.values()],
            this.module,

        ]);
        this._items = tree.items;

    }

    addFavorite(folder) {

        let {item, module, bundle, favorites} = this;
        module = module.module ?? module;
        this._isFavorite = true;
        //todo: @julio remove ..Name Variables.
        favorites.add(folder, {
            favoriteFolder: folder,
            bundleName: bundle.name,
            label: `${module.pathname}/${this.label}`,
            bundle: {id: bundle.id, name: bundle.name},
            module: {id: module.id, name: module.name},
            containerId: module.id,
            pathname: `${module.pathname}/${this.label}`,
            path: item.path,
            type: 'bundle'
        });
    }

    addConsumers(consumers) {
        consumers.id = `${this.item.id}.consumers`;
        const branch = branchFactory.get('resources', consumers, this.application, {type: 'consumers'});
        this.items.set('consumers', branch);
        this.triggerEvent('change');
    }

    addDependencies(dependencies) {

        dependencies.id = `${this.item.id}.dependencies`;
        const branch = branchFactory.get('resources', dependencies, this.application, {type: 'dependencies'});
        this.items.set('dependencies', branch);
        this.triggerEvent('change');
    }
}
