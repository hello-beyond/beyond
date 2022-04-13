class Subtree extends Branch {

    get icon() {
        return 'folder';
    }

    get type() {
        return 'subtree';
    }

    get actions() {
        return [
            {name: 'create', icon: 'plus'},
            {name: 'rename', icon: 'edit'}
        ];
    }

    constructor(branch, application, folder) {
        super(branch, application);
        this._label = folder;
        this._id = `${branch.id}.subtree`;
    }

}
