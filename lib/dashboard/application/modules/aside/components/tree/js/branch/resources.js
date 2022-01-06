class ResourcesBranch extends ReactiveModel {

    get actions() {
        return []
    }

    get inlineActions() {
        return [];
    }

    get type() {
        return 'resources';
    }

    _reader;
    get reader() {
        return this._reader;
    }

    _icons = {
        default: 'file.dependency',
        react: 'file.tsx',
        'beyond/core/ts': 'file.beyond'
    }

    get icon() {
        if (['react', 'beyond/core/ts'].includes(this.label)) {
            return this._icons[this.label];
        }
        return this._icons.default;
    }

    _label;
    get label() {
        return this._label;
    }

    _item;
    get item() {
        return this._item;
    }

    get favoriteAction() {
        return false;
    }

    _items = new Map();
    get items() {
        return this._items;
    }

    _application;
    get application() {
        return this._application;
    }

    EXCLUDED = [
        '@beyond-js/kernel/core/ts'
    ];

    constructor(item, application, specs) {
        super();
        this._specs = specs;
        this._application = application;
        this._item = item;
        this._resourceType = specs.type;
        this._label = specs.type === 'dependencies' ? 'Dependencies' : 'Consumers';
        const tree = TreeFactory.get(specs.type, [this.application, item, item.items]);
        this._items = tree.items;
    }

}
