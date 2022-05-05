class ConsumersTree extends BaseTree {

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
        this.addBranch(tree, branch.id, branchFactory.get('consumer', branch, this.application, {}))
    }

    create() {

    }
}
