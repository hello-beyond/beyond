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
            {name: 'addBundle', modal: true, icon: 'add', className: "ds-modal md md-modal"}
        ]
    }

    get inlineActions() {
        return [
            {name: 'addBundle', modal: true, icon: 'add', className: "ds-modal md md-modal"}
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
                module: this.object
            });
        this.addBranch(tree, branch.name, item);
    }

    rename() {
        console.warn("rename");
    }
}
