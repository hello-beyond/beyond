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

    #items = new Map();
    get items() {
        return this.#items;
    }

    #elements = [];
    get elements() {
        return this.#elements;
    }

    #tree = new Map();
    get tree() {
        return this.#tree;
    }

    #object;
    get object() {
        return this.#object;
    }

    #type;
    get type() {
        return this.#type;
    }

    #application;
    get application() {
        return this.#application;
    }

    #bundle;
    get bundle() {
        return this.#bundle;
    }

    #processor;
    get processor() {
        return this.#processor;
    }

    #module;
    get module() {
        return this.#module;
    }

    #favorites;
    get favorites() {
        return this.#favorites;
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

        /**
         * TODO: @julio try to make a better logic to minimize the number of parameters.
         */
        this.#module = type === 'module' ? object : module;
        this.#application = application;
        this.#elements = elements;
        this.#type = type;
        this.#object = object;
        this.#bundle = bundle;
        this.#favorites = FavoritesFactory.get(this.application.id, this.application);
        this.favorites.bind('loaded', this.checkFavorites.bind(this));

        this.validate();
    }

    /**
     * Query to Favorites Model to check if the item was marked as favorite
     */
    checkFavorites() {
        this.items.forEach(item => {
            item.isFavorite = this.favorites.isFavorite(item.pathname);
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

        this.#elements.forEach(item => this.processItem(tree, item));
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
        this.#tree = orderRecursively(tree)
        this.#items = orderRecursively(tree)

    }

    __setType(type) {
        this.#type = type;
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
            subtree.items.set(branch.filename, branchFactory.get(type, branch, this.application, {
                module: this.#module,
                moduleId: this.#module?.id
            }))
            return subtree;
        }

        const items = this.subfolderProcess(branch, subtree.items, folders);
        subtree.items.set(items.label, items);
        // tree.set(folder, process(subtree.items, folders, index + 1))
        return subtree;
    }

    update(items) {
        items.forEach(item => this.#elements.push(item));
        this.validate();
        this.triggerEvent();
    }
}
