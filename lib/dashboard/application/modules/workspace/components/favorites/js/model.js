export class FavoritesModel extends ReactiveModel {

    _tree;
    get tree() {
        return this._tree;
    }

    _items = new Map();
    get items() {
        return this._items;
    }

    _application;
    get application() {
        return this._application;
    }

    _moduleManager;
    get moduleManager() {
        return this._moduleManager;
    }

    get total() {
        return this.items.size;
    }

    _ready;
    get ready() {
        return this._ready;
    }

    _promise;

    constructor(application) {
        super();
        this._application = application;
        this._moduleManager = application.moduleManager;
        if (!this._moduleManager) console.trace(0.1, this._moduleManager);
        this.onRename = () => this.triggerEvent('favorite.renamed');
        this._check();
    }

    /**
     * Realizes the query to IndexedDb and generates the Favorites List instances
     * @returns {Promise<void>}
     * @private
     */
    async _check() {
        this._promise = new PendingPromise();
        await DSModel.initialise();
        const favorites = await DSModel.db.store('favorites');
        this._db = favorites;
        const items = await favorites.getAll();

        items.forEach(item => {
            /**
             * item.tree property is the data saved in indexedDB
             * TODO: @julio check the name
             * @type {FavoritesList}
             */
            if (this.items.has(item.id)) return this.items.get(item.id);
            const specs = {name: item.name, id: item.id, tree: item.tree};
            const instance = new FavoritesList(this, this._moduleManager, specs);
            const onLoad = () => {
                this.triggerEvent('loaded');
                this.items.set(instance.id, instance);
                instance.unbind('favorites.loaded', onLoad);
            };
            instance.bind('favorites.loaded', onLoad)
            instance.bind('favorite.renamed', this.onRename);
            this.items.set(instance.id, instance);

            return instance;
        });

        this.triggerEvent();
        this._ready = true;
    }

    async add(name, specs) {
        try {
            const identifier = name.replace(/ /g, '-').toLowerCase();
            const favorite = this.items.has(name)
                ? this.items.get(name)
                : new FavoritesList(this, this._moduleManager, {name: name, id: identifier});

            await favorite.add(specs);
            this.items.set(favorite.id, favorite);
            favorite.bind('favorite.renamed', this.onRename);
            this.triggerEvent();
        }
        catch (e) {
            console.error(103, e);
        }
    }

    async remove(id) {
        if (!this.items.has(id)) return;
        this.items.delete(id);
        this._db.delete(id);
        this.triggerEvent();
    }

    isFavorite = pathname => {
        return !![...this.items.values()].find(item => item.items.find(item => item.pathname === pathname));
    }

}

