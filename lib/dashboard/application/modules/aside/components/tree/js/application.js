class ApplicationTree extends BaseTree {
    processItem(tree, branch) {
        const item = branchFactory.get('module', branch, this.application);
        if (!branch.module) {
            console.warn("the am could not be processed on tree", branch);
            return;
        }
        this.addBranch(tree, branch.module.pathname, item);
    }
}
