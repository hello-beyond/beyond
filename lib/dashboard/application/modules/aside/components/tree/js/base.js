/**
 *  Base tree object.
 *
 *  Set the main important values for the tree and makes available the
 *  validate method who is in charge to manage the process to create
 *  the tree structure. To make it the items class needs to makes available his
 *  own processTree method checking by itself the branches and calling the addBranch
 *  method where necessary
 */
class BaseTree extends ReactiveModel {

    _items = new Map();
    get items() {
        return this._items;
    }

    _elements = [];
    get elements() {
        return this._elements;
    }

    _tree = new Map();
    get tree() {
        return this._tree;
    }

    _object;
    get object() {
        return this._object;
    }

    _type;
    get type() {
        return this._type;
    }

    _application;
    get application() {
        return this._application;
    }

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

    _favorites;
    get favorites() {
        return this._favorites;
    }

    /**
     *
     * @param type
     * @param application
     * @param object
     * @param elements
     * @param module
     * @param bundle
     */
    constructor(type, application, object, elements, module, bundle) {
        super();
        if (this.constructor === BaseTree) {
            throw new Error("Can't instantiate abstract class!");
        }

        this._module = module;
        this._application = application;
        this._elements = elements;
        this._type = type;
        this._object = object;
        this._bundle = bundle;
        this._module = module;
        this.validate();
        this._favorites = FavoritesFactory.get(this.application.id, this.application);
        this.favorites.bind('loaded', this.checkFavorites.bind(this));

    }

    /**
     * Query to Favorites Model to check if the item was marked as favorite
     */
    checkFavorites() {
        this.items.forEach(item => {
            const isFavorite = this.favorites.isFavorite(item.pathname);
            item.isFavorite = isFavorite;
        });
        this.unbind('loaded', this.checkFavorites);
    }

    addBranch(map, key, item) {
        map.set(key, item);
    }

    processItem() {
        // this class may be implemented by items class.
    }

    get branchType() {
        return 'source';
    }

    validate() {

        const tree = new Map()

        this._elements.forEach(item => this.processItem(tree, item));
        // this function is used to order the map elements sending the tree elements at the end.
        const sort = ([fkey, fvalue], [sKey, sValue]) => {
            if (sValue instanceof Map) return -1;
            return 1;
        };
        const orderRecursively = (map) => {
            map.forEach((value, key) => {
                if (value instanceof Map) {
                    const mapOrdered = orderRecursively(new Map([...value.entries()].sort(sort)));
                    map.set(key, mapOrdered);
                }
            });
            return new Map([...map.entries()].sort(sort));
        }
        this._tree = orderRecursively(tree)
        this._items = orderRecursively(tree)

    }

    __setType(type) {
        this._type = type;
    }

    /**
     * Iterates recursively into the folders structure and returns the
     * subtree created.
     *
     * @param branch the main or parent branch
     * @param tree
     * @param folders
     * @returns {BaseTree}
     */
    subfolderProcess(branch, tree, folders) {
        const folder = folders.shift();
        const subtree = tree.has(folder)
            ? tree.get(folder)
            : branchFactory.get('subtree', branch, this.application, folder);

        if (!folders.length) {
            const type = this.type === 'static' ? 'static' : 'source';
            subtree.items.set(branch.filename, branchFactory.get(type, branch, this.application))
            return subtree;
        }

        const items = this.subfolderProcess(branch, subtree.items, folders);
        subtree.items.set(items.label, items);
        // tree.set(folder, process(subtree.items, folders, index + 1))
        return subtree;
    }

    update(items) {
        items.forEach(item => this._elements.push(item));
        this.validate();
        this.triggerEvent();
    }
}
