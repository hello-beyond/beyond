class TemplateTree extends BaseTree {
    get icons() {
        return {
            page: 'ts',
            code: 'scss',
            default: 'folder'
        }
    }

    get inlineActions() {
        return [
            {name: 'create', icon: 'add', modal: true}
        ]
    }

    get favoriteAction() {
        return false;
    };

    #item;
    get item() {
        return this.#item;
    }

    constructor(type, application, object, elements, module, bundle) {
        super(type, application, object, elements, module, bundle);
        this.#item = object;
    }

    processItem(tree, branch) {
        if ([undefined, ""].includes(branch?.relative?.dirname)) {
            const branchItem = branchFactory.get('templateSource', branch, this.application);
            this.addBranch(tree, branch.filename, branchItem);
            return;
        }

        const dirname = branch.relative.dirname.replace(/\\/g, '/');
        const folders = dirname.replace(name, '').split('/');
        const subtree = this.subfolderProcess(branch, tree, folders);

        this.addBranch(tree, subtree.label, subtree);
    }

    async create(name) {
        const extension = name.split(["."]).slice(-1)[0];
        if (extension !== this.item.processor) return {error: true, message: 'EXT_INVALID'};

        try {
            const response = await this.item.createFile({filename: name});
            if (!response.status) {
                return {error: true, message: response.message};
            }
            this.triggerEvent('branch.added');
            return {status: true};
        }
        catch (e) {
            console.error(e.message);
            return {error: true, message: e.message};
        }
    }
}