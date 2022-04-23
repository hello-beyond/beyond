class DependencyBranch extends ReactiveModel {

    get actions() {
        return []
    }

    get inlineActions() {
        return [];
    }

    get type() {
        return 'dependency';
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

    EXCLUDED = [
        '@beyond-js/kernel/core/ts'
    ];

    constructor(item, application, specs) {
        super();
        this._specs = specs;
        this._application = application;
        this._item = item;
        this._label = this.getName();
    }

    getName() {
        let name = this.item.resource;
        name = name.replace('beyond_libraries/', '').replace('beyond_modules/', '');
        this._navigable = !this.item.external && !this.EXCLUDED.includes(this.item.resources);
        return name;
    }

}
