class ModuleTree extends BaseTree {

    get icons() {
        return {
            page: 'ts',
            code: 'scss',
            default: 'folder'
        }
    }

    get actions() {
        return [
            {name: 'addBundle', modal: true, icon: 'add'}
        ]
    }

    get inlineActions() {
        return [
            {name: 'addBundle', modal: true, icon: 'add'}
        ]
    }

    _module;
    get module() {
        return this._module;
    }

    constructor() {
        super(...arguments);
    }

    processItem(tree, branch) {

        const item = branchFactory.get('bundle',
            branch,
            this.application, {
                bundle: branch,
                module: this._object
            });
        this.addBranch(tree, branch.name, item);
    }

    rename() {
        console.log("rename");
    }
}