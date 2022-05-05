class DependenciesTree extends BaseTree {

    get icons() {
        return {
            page: 'ts',
            code: 'scss',
            default: 'folder'
        }
    }

    get inlineActions() {
        return [
            {icon: 'add', action: this.create}
        ]
    }


    processItem(tree, branch) {
        this.addBranch(tree, branch.id, branchFactory.get('dependency', branch, this.application, {}))
    }

    create() {

    }
}
