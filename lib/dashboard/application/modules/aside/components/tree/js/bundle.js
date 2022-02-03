class BundleTree extends BaseTree {

    get icons() {
        return {
            page: 'ts',
            code: 'scss',
            default: 'folder'
        }
    }

    processItem(tree, branch) {
        const item = branchFactory.get('processor',
            branch,
            this.application, {
                bundle: this.object,
                module: this.module
            });
        this.addBranch(tree, branch.name, item);
    }
}
