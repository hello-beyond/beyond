export class FavoriteChildren extends ReactiveModel {

    _bundle;
    get bundle() {
        return this._bundle;
    }

    _processor;
    get processor() {
        return this._processor;
    }

    _module;
    get module() {
        return this._module;
    }

    _type;
    get type() {
        return this._type;
    }

    _item;
    get item() {
        return this._item;
    }

    _name;
    get name() {
        return this._name;
    }

    _id;
    get id() {
        return this._id;
    }

    _pathname;
    get pathname() {
        return this._pathname;
    }

    _label;
    get label() {
        return this._label;
    }

    constructor(type, item) {
        super();
        const {bundle, label, pathname, module, processor, source} = item;
        this._type = type;
        this._processor = processor;
        this._bundle = bundle;
        this._module = module;
        this._source = source;
        this._pathname = pathname;
        this._label = label;
        this._item = ['processor', 'module', 'bundle'].includes(type) ? this[type] : source;

        this._id = this.item.id;
        this._name = this.getName();
    }

    getName() {
        if (this.type === 'module') return this.item.pathname;
        return this.source
            ? `${module.name}${source.relative.dirname ? `${source.relative.dirname}/` : ''}/${source.relative.file}`
            : this.item.name;
    }
}
