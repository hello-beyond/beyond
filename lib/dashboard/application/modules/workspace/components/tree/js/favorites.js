class FavoritesTree extends BaseTree {

    get icons() {
        return {
            page: 'ts',
            code: 'scss',
            default: 'folder'
        }
    }

    get icon() {
        return 'favorite';
    }

    _module;
    get module() {
        return this._module;
    }

    get inlineActions() {
        return [
            {icon: 'delete', name: 'delete', confirm: true}
        ];
    }

    constructor() {
        super(...arguments);
        this.object.bind('change', this.onChange)
    }

    onChange = () => {
        this.triggerEvent();
    }

    /**
     * Process each Favorites item
     *
     * The Favorites list item can be any type of branch. To make it possible,
     * the Favorites Tree receives an array where each element is a FavoriteChildren object.
     * The FavoritesChildren object must define all the properties required to create a new tree
     * branch with the branchFavorty.
     * @param tree
     * @param branch
     */
    processItem(tree, branch) {
        const {bundle, module} = branch;
        const specs = {bundle, module};
        const element = branchFactory.get('favorites', branch, this.application, specs);
        this.addBranch(tree, branch.label, element);
    }

    addItem(branch) {
        const item = branchFactory.get('favorites',
            branch,
            this.application, {
                favoritesList: this.object,
                bundle: this.object,
                module: this._module
            });
        this.addBranch(this._tree, branch.label, item);
    }

    delete() {
        console.log("eliminemos", this.object);
        this.object.delete();
    }
}
