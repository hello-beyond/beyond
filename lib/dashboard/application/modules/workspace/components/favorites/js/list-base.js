class FavoritesListBase extends ReactiveModel {
    _name;
    get name() {
        return this._name;
    }

    _id;
    get id() {
        return this._id;
    }

    _type;
    get type() {
        return this._type;
    }

    _items = [];
    get items() {
        return this._items;
    }

    _pathname;
    get pathname() {
        return this._pathname;
    }

    _path;
    get path() {
        return this._path;
    }

    _container;
    get container() {
        return this._container;
    }

    /**
     * Manager of the application modules.
     *
     * @private
     */
    _moduleManager
    get moduleManager() {
        return this._moduleManager;
    }

    _parent;
    get parent() {
        return this._parent;
    }


    get length() {
        return this.items?.length ?? 0;
    }

    _bundleName
    get bundleName() {
        return this._bundleName;
    }

    _processorName
    get processorName() {
        return this._processorName;
    }

    _folder
    get folder() {
        return this._folder;
    }

    _item;
    get item() {
        return this._item;
    }

    _tree;
    get tree() {
        return this._tree;
    }

    get store() {
        return this._store;
    }

    _processor;
    get processor() {
        return this._processor;
    }

    _bundle;
    get bundle() {
        return this._bundle;
    }

    _module;
    get module() {
        return this._module;
    }

    _application;
    get application() {
        return this._application;
    }

    _storedTree = new Map();

    _ready;
    get ready() {
        return this._ready;
    }

    _types = new Set();
    get types() {
        return this._types;
    }

    _idsByType = new Map();
    get idsByType() {
        return this._idsByType;
    }

}
