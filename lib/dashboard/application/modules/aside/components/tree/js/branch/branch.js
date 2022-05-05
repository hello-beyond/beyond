class Branch extends ReactiveModel {
    _label;
    get label() {
        return this._label;
    }

    _id;
    get id() {
        return this._id;
    }

    _link;
    get link() {
        return this._link;
    }

    _source;
    get source() {
        return this._source;
    }

    _item;
    get item() {
        return this._item;
    }

    /**
     * TODO: Check if can be removed and added to each branch type as
     * a specific property
     */
    _specs;

    specs() {
        return this._specs;
    }

    _items = new Map();
    get items() {
        return this._items;
    }

    /**
     * Must be the ApplicationModel
     *
     */
    #application;
    get application() {
        return this.#application;
    }

    #favorites;
    get favorites() {
        return this.#favorites;
    }

    _bundle;
    get bundle() {
        return this._bundle;
    }

    _processor;
    get processor() {
        return this._processor;
    }

    #module;
    get module() {
        return this.#module;
    }

    _isFavorite = false;
    get isFavorite() {
        return this._isFavorite;
    }

    #am
    get am() {
        return this.#am;
    }

    _favoritePathname;
    get favoritePathname() {
        return this._favoritePathname;
    }

    set isFavorite(value) {
        if (value === this._isFavorite) return;
        this._isFavorite = value;
        this.triggerEvent('favorite.changed');
        return this._isFavorite;
    }

    _pathname;
    get pathname() {
        return this._pathname;
    }

    #favoritesList = new Map();
    get favoritesList() {
        return this.#favoritesList;
    }

    constructor(item, project, specs = {}) {
        super();
        this._specs = specs
        this.parameters = specs;
        this.#application = project;
        this._link = item.filename;
        this._label = item.label ?? item.filename;
        this._source = item;
        this._item = item;
        this.#am = specs.module;
        this._isFavorite = specs?.isFavorite ?? false;
        this._id = item.id;
        this._specs = this.specs;

        if (project) {

            this.#favorites = FavoritesFactory.get(project.application.id, project);

            // this.#favorites.bind('loaded', this.checkFavorites.bind(this));
        }

        this._now = performance.now();
        if (item.items) this._items = item.items;
        this.#favoritesList = specs?.favoritesList;
        this.#module = specs.module;
        this._bundle = specs.bundle;
        this._processor = specs.processor;
    }

    addFavorite(item) {
        console.warn("the addFavorite method must be overwrite in the child class");
    }

    removeFavoriteItem = () => this.favoritesList.removeItem(this.pathname);

    registerFavorites = (list) => {
        /**
         * In the future, will be possible to have the same element in different favorites list.
         *
         */
    }
}
