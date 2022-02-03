module.exports = class extends (require('./index')) {
    get dp() {
        return 'packager.compiler.singly';
    }

    _compileSource(source, is) {
        void (source);
        void (is);
    }

    #compile(is, source, updated, diagnostics) {
        const {file} = source.relative;

        let compiled, errors;
        if (this[is].has(file) && this[is].get(file).hash === source.hash) {
            compiled = this[is].get(file);
            errors = diagnostics[is].get(file);
        }
        else {
            const singular = is === 'files' ? 'source' : (is === 'extensions' ? 'extension' : 'overwrite');
            const csource = this._compileSource(source, singular);
            if (!csource) return;

            ({compiled, errors} = csource);
            if (!compiled && !errors) return;
        }

        updated[is].set(file, compiled);
        errors?.length && diagnostics[is].set(file, errors);
    }

    _compile(updated, diagnostics) {
        const {children} = this;

        let files, extensions, overwrites;
        if (children.has('analyzer')) {
            const analyzer = this.children.get('analyzer').child;
            ({files, extensions, overwrites} = analyzer);
        }
        else {
            files = children.get('files').child;
            extensions = children.get('extensions').child;
            overwrites = children.get('overwrites')?.child;
        }

        files.forEach(source => this.#compile('files', source, updated, diagnostics));
        extensions.forEach(source => this.#compile('extensions', source, updated, diagnostics));
        overwrites?.forEach(source => this.#compile('overwrites', source, updated, diagnostics));
    }
}
