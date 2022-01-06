class FavoritesBranch extends Branch {

    get actions() {
        return this.instance?.actions ?? [];
    }

    get inlineActions() {
        return this.instance?.inlineActions ?? [];
    }

    _instance;
    get instance() {
        return this._instance;
    }

    _bundle;
    get bundle() {
        return this._bundle;
    }

    get icons() {
        return this._icons;
    }

    _item;
    get item() {
        return this._item;
    }

    _module;
    get module() {
        return this._module;
    }

    get name() {
        return this._item?.name;
    }

    get type() {
        return this.instance?.type;
    }

    get favoriteProxy() {
        return true;
    }

    get label() {
        return this.item.label ?? this.instance.label
    }

    get id() {
        return `${this.instance.id}.favorites`;
    }

    _overwritten = ['label', 'id'];

    constructor(item, application, specs) {
        super(item, application);
        this._item = item;
        this._label = item.name;

        this._instance = this.getInstance(item)
        return new Proxy(this, {
            get: function (obj, field) {
                if (obj._overwritten.includes(field)) return obj[field];
                if (field in obj.instance) return obj.instance[field];
                if (field in obj) return obj[field];
            },
            set: function (obj, field, value) {
                if (field in obj.instance) {
                    obj.instance[field] = value;
                    return true;
                }
                return false;
            }
        })

    }

    getInstance(branch) {
        const {type, name, item, bundle, module} = branch;
        const specs = {favoritesList: this.object, bundle, module, isFavorite: true};
        return branchFactory.get(type, item, this.application, specs);

    }

}
