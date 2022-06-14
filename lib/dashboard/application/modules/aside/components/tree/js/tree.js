/**
 * Default tree
 *
 * TODO: @julio check if it's necessary
 */
class Tree extends BaseTree {

    _specs = {};

    get generalSpecs() {
        return this._specs;
    }

    get type() {
        return 'tree';
    }

    addBranch(map, key, item) {
        map.set(key, item);
    }

    /**
     * Check the item and creates it as a branch.
     * @param tree
     * @param item
     */
    processItem(tree, item) {

        if (["backend-bridge", "dependency"].includes(item.is)) return;

        const setBranch = (tree, item) => this.addBranch(tree, item.filename, branchFactory.create(item));

        if ([undefined, ""].includes(item?.relative?.dirname)) {
            setBranch(tree, item);
            return;
        }
        const dirname = item.relative.dirname.replace(/\\/g, '/');
        const folders = dirname.replace(name, '').split('/');
        let subtree = tree;
        const levels = folders.length;

        let path = '';
        folders.forEach((folder, index) => {
            //if the folder item does not exist into the tree, then is created.
            path += `${folder}/`;

            subtree.set(folder, {
                label: folder,
                path, item, // we add the same item in the folder branch
                specs: this.generalSpecs,
                items: new Map()
            });
            if (levels - 1 !== index) {
                //the subtree variable is overwritten to get the last tree level
                subtree = subtree.get(folder).items;
                return;
            }
            setBranch(subtree.get(folder).items, item);
        });

    }

}

export const FilesTree = Tree;
