class StaticTree extends BaseTree {
    get icons() {
        return {
            page: 'ts',
            code: 'scss',
            default: 'folder'
        }
    }

    get inlineActions() {
        return [
            {icon: 'add', name: 'static', modal: true, className: 'md'}
        ]
    }

    get actions() {

    }

    processItem(tree, branch) {
        if (["backend-bridge", "dependency"].includes(branch.is)) return;
        // if the item.relative.dirname is undefined then
        // the file is in the relative root folder and we set as a branch

        if ([undefined, ""].includes(branch?.relative?.dirname)) {
            this.addBranch(tree, branch.filename, branchFactory.get(this.type, branch, this.application));
            return;
        }

        const dirname = branch.relative.dirname.replace(/\\/g, '/');
        const folders = dirname.replace(name, '').split('/');
        const subtree = this.subfolderProcess(branch, tree, folders);

        this.addBranch(tree, subtree.label, subtree);
    }
}
