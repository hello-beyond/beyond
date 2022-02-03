class FavoritesList extends FavoritesListBase {

    /**
     *
     * @param parent {FavoritesManager}
     * @param moduleManager {ModuleModel}
     * @param name {string} Name of the favorites item.
     * @param id {string} Identifier
     * @param tree
     */
    constructor(parent, moduleManager, {name, id, tree}) {
        super();
        this._parent = parent;
        this._moduleManager = moduleManager;

        this._name = name;
        this._application = parent.application;
        this._id = id;
        this._now = performance.now();
        this._store = DSModel.db.store('favorites');
        this.rename = this.rename.bind(this);
        this._createTree = this._createTree.bind(this);
        if (tree) this._loadItems(tree);
    }

    async _loadItems(tree) {
        const promises = [];
        this._storedTree = tree;
        tree.forEach(item => promises.push(this.add(item, true)))
        if (!promises.length) this._createTree();

        Promise.all(promises).then(this._createTree);
    }

    _createTree() {
        this._tree = TreeFactory.get('favorites', [this.application, this, this.items]);
        this._ready = true;
        this.triggerEvent('favorites.loaded');
        this.triggerEvent();
    }

    /**
     * Loads the ModuleModel by id passed
     * @param moduleId
     * @returns {Promise<ModuleModel>}
     * @private
     */
    async _loadModule(moduleId) {
        const module = await this._moduleManager.load(moduleId);
        this._container = module;
        return module;
    }

    /**
     * Registers the itemId
     * The idsByType is used externally to check if an element is saved as a favorite and can mark it on the ui
     *
     * @param type
     * @param id
     */
    registerId(type, id) {
        if (!this._idsByType.has(type)) this._idsByType.set(type, new Set);
        const item = this._idsByType.get(type);
        this._idsByType.set(type, item.add(id));
    }

    /**
     * Instances a new FavoriteChildren object and returns it.
     *
     * Register the children's type, add the item in the items array and calls the registerId method
     * @param type
     * @param specs
     * @returns {*}
     */
    getChildren(type, item) {
        this.types.add(type);
        const element = new FavoriteChildren(type, item);
        this.items.push(element);
        this.registerId(type, element.item.id);
        //TODO: @julio check if is required triggerEvent
        this.triggerEvent();
        return element;
    }

    async loadTemplate() {
        const promise = new PendingPromise();
        let {application: {template}} = this.application;
        const onChange = () => {
            if (!template || !template?.tree?.landed) return promise;
            promise.resolve();
        };
        this.application.bind('change', onChange);
        onChange();
        return promise;

    }

    async _loadTemplateItem(item) {
        let {application: {id: applicationId, template}} = this.application;

        await this.loadTemplate();
        if (item.type === 'processor') {
            return;
        }
        let collection = template.application;

        if (item.source?.type === 'processor') {
            const name = `${applicationId}//${item.source.processor}`;
            collection = template.processors.get(name);
        }

        const finder = i => {
            return item.source.dirname === i.dirname && i.filename === item.source.filename;
        }
        const source = collection.sources.items.find(finder);
        if (!source) {
            console.warn("the template file does not exists", item);
            return;
        }

        const backup = Object.assign({}, item, source);
        item.source = source;
        Object.keys(item).forEach(prop => this._set(prop, item[prop]));
        return this.getChildren('template', item);
    }

    /**
     * Load the favorite item
     *
     * Checks the properties of the element passed and loads the necessary objects
     * to instance the item correctly and returns a FavoriteChildren instance.
     * @param item
     * @returns {Promise<FavoriteItem>}
     * TODO: CHECK
     */

    async loadItem(item) {
        //source
        const {type} = item;
        const itemToLoad = Object.assign({}, item);
        /**
         * Originally the _loadTemplateItem was saving the item by itself
         * but this logic causes error, the next save call was after the 150 line.
         *  Was moved to here and was removed the save call into the _loadTemplateItem
         *  @todo: julio check.
         */
        this.save(item);
        if (type === 'template') return this._loadTemplateItem(itemToLoad);

        try {
            const module = await this._loadModule(item.module.id);
            /**
             * TODO: @julio check it.
             * @type {*}
             */
            itemToLoad.module = module.module;
            if (type === 'module') return this.getChildren(type, itemToLoad);

            const {bundle} = module.bundles.get(item.bundle.name);
            itemToLoad.bundle = bundle;
            if (type !== 'bundle') {
                const processor = bundle.processors.get(item.processor.name);
                itemToLoad.processor = processor;
                itemToLoad.source = type === 'source' && processor.sources.items.find(s => s.id === item.source.id);
            }
            return this.getChildren(type, itemToLoad);
        }
        catch (e) {
            console.error(e);
        }
    }

    /**
     * Add a new children item
     * @param newItem
     * @param loading Is only passed when the favorites are loading from indexedDB
     * @returns {Promise<void>}
     */
    async add(newItem, loading = false) {
        const item = await this.loadItem(newItem);

        if (loading) return;
        if (!this.tree) {
            this._createTree();
            this.triggerEvent();
            return;
        }
        this.tree.update([item])
        this.triggerEvent();
    }

    /**
     * Saves the element passed in indexedDB
     * @param item
     * @returns {Promise<void>}
     */
    async save(item) {
        if (item) this._storedTree.set(item.pathname, item);
        this.store.save({id: this.id, name: this.name, tree: this._storedTree});
        this.triggerEvent();
    }

    delete() {
        this.parent.remove(this.id);
    }

    rename(value) {
        this._name = value;
        this.save();
        this.triggerEvent('favorite.renamed');
    }

    removeItem(pathname) {
        if (!this._storedTree.has(pathname)) return;
        this._storedTree.delete(pathname);
        this.save();
        this.parent.triggerEvent();
    }

}
