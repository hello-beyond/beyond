class StaticBranch extends Branch {

    get actions() {
        return [{
            name: 'delete', icon: 'delete', confirm: true
        }]
    }

    #deleted;
    get deleted() {
        return this.#deleted;
    }

    get extension() {
        return this.item.pathname.split(".").slice(-1)[0];
    }

    get icon() {
        const icon = this.icons.hasOwnProperty(this.extension) ? this.extension : 'image';
        return this.icons[icon];
    }

    get isImage() {

    }

    get getters() {
        return {
            deleted: this.deleted,
            label: this.label
        }
    }

    get icons() {
        return {
            map: 'map',
            image: 'image',
            css: 'css',
            js: 'js',
            ts: 'ts',
            less: 'less',
            scss: 'scss',

        }
    }

    get type() {
        return 'static';
    }

    _reader;
    get reader() {
        return this._reader;
    }

    async delete() {
        try {
            await this.item.delete();
            this.#deleted = true;
            this.triggerEvent();

        }
        catch (e) {
            console.error("error", e);
        }

    }
}
