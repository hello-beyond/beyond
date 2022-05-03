class ProcessorBranch extends Branch {
    _icons = new Map([
        ['ts', 'ts'],
        ['scss', 'scss'],
        ['start', 'start'],
        ['default', 'default'],
    ])
    get icons() {
        return this._icons;
    }

    get extensions() {
        return {
            ts: ['ts', 'tsx'],
            js: ['js'],
            jsx: ['jsx'],
            scss: ['scss'],
            less: ['less']
        }
    }

    get type() {
        return 'processor';
    }

    get icon() {
        return this.icons.get(this.processor.name);
    }

    get actions() {
        return [
            {name: 'create', icon: 'add', modal: true},
        ]
    }

    get inlineActions() {
        return [
            {name: 'create', icon: 'add', modal: true}
        ]
    }

    get processor() {
        return this._processor;
    }

    _item;
    get item() {
        return this._item;
    }

    get name() {
        return this._item?.name;
    }

    _bundle;
    get bundle() {
        return this._bundle;
    }

    _module;
    get module() {
        return this._module;
    }

    get pathname() {
        return `${this.module?.pathname}/${this.label}`;
    }

    constructor(item, application, specs = {}) {
        super(item, application);

        this._bundle = specs.bundle;
        this._item = item;
        this._label = item?.label ?? item.name;
        this._processor = item;
        this._module = specs.module;
        const tree = TreeFactory.get('processor', {
            project: this.application,
            object: item,
            id: item.id,
            items: item.sources?.items,
            module: specs.module,
            bundle: specs.bundle,
        });
        this._items = tree.items;

    }

    async create(name) {
        const extension = name.split(["."]).slice(-1)[0];
        if (!this.extensions[this.name]?.includes(extension)) {
            throw Error('EXT_INVALID');
        }
        try {
            await this.processor.createFile({filename: name});
            this.triggerEvent('branch.added');
            return true;
        }
        catch (e) {
            console.error(e.message);
            return true;
        }
    }

    addFavorite(folder) {
        const {favorites} = this;
        let {processor, module, bundle} = this;
        module = module.module ?? module
        this.isFavorite = true;

        const label = `${bundle.pathname}/${this.label}`;

        favorites.add(folder, {
            label: label,
            favoriteFolder: folder,
            bundleName: bundle.name,
            processorName: processor.name,
            bundle: {id: bundle.id, name: bundle.name},
            processor: {name: processor.name, id: processor.id},
            module: {id: module.id, name: module.name},
            containerId: module.id,
            pathname: label,
            type: 'processor'
        });

    }
}
