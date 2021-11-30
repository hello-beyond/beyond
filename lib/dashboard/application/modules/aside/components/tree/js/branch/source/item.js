class SourceBranch extends Branch {

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

    get module() {
        return this.am.module;
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

    get pathname() {
        return `${this.item.id}/${this.label}`;
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
        //TODO: the name must be updated automatically by PLM. is not working in this moment.
        this._label = name;
        this.triggerEvent();
        return true;
    }

    addFavorite(folder) {
        const {favorites, processor, bundle, module} = this;
        if (!this.bundle || !this.processor) {
            console.warn(`the source does not have a processor or bundle`);
            return;
        }

        const {dirname} = this.item.relative;
        this._isFavorite = true;
        this._favoritePathname = `${this.item.id}/${this.label}`;
        favorites.add(folder, {
            source: {
                name: `${module.pathname}/${dirname ? `${dirname}/` : ''}`,
                id: this.item.id,
                dirname: this.item.dirname
            },
            folder: folder,
            bundle: {id: bundle.id, name: bundle.name},
            processor: {name: processor.name, id: processor.id},
            module: {id: module.id, name: module.name},
            pathname: `${this.item.id}/${this.label}`,
            type: 'source'
        });
    }
}
