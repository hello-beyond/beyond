class TemplateSourceBranch extends Branch {

    _icons = new Map([
        ['ts', 'ts'],
        ['tsx', 'tsx'],
        ['scss', 'scss'],
        ['txt', 'txt'],
        ['start', 'start'],
        ['default', 'txt'],
    ])

    get actions() {
        return [
            {name: 'rename', icon: 'edit', modal: true},
            {name: 'delete', icon: 'delete', confirm: true},
        ]
    }

    get icons() {

        return this._icons;
    }

    get extension() {
        return this.label?.split(".")?.slice(-1)[0];
    }

    get icon() {
        if (!this.extension) return 'file';
        return this.icons.get(this.extension) ?? this.icons.get('default');
    }

    get type() {
        return 'source';

    }

    get module() {
        return this.item;
    }

    delete() {
        this.source.delete();
        this.triggerEvent('deleted');
    }

    rename(name) {
        if (name.split(".").slice(-1)[0] !== this.source.filename.split(".").slice(-1)[0]) {
            throw Error('ERR__EXTENSION');
        }
        const {dirname, filename} = this.source;
        this.source.rename({path: dirname, current: filename, newName: name});
        //TODO: the name must be updated automatically by PLM.
        // is not working in this moment.
        this._label = name;
        this.triggerEvent();
        return true;
    }

    addFavorite(folder) {
        const {favorites} = this;
        this._isFavorite = true;
        const {id, dirname, filename, processor, relative, type} = this.item;

        favorites.add(folder, {
            pathname: `${this.item.id}${this.label}`,
            type: 'template',
            source: {id, dirname, filename, relative, type, processor}
        });
    }
}
