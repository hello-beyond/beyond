module.exports = class extends (require('./index')) {
    get dp() {
        return 'packager.compiler.singly';
    }

    _compileSource(source, is) {
        void (source);
        void (is);
    }

    async #compile(is, source, updated, diagnostics, request) {
        const {file} = source.relative;

        let compiled, errors;
        if (this[is].has(file) && this[is].get(file).hash === source.hash) {
            compiled = this[is].get(file);
            errors = diagnostics[is].get(file);
        }
        else {
            const singular = is === 'files' ? 'source' : (is === 'extensions' ? 'extension' : 'overwrite');
            const csource = await this._compileSource(source, singular, request);
            if (!csource) return;

            ({compiled, errors} = csource);
            if (!compiled && !errors) return;
        }

        updated[is].set(file, compiled);
        errors?.length && diagnostics[is].set(file, errors);
    }

    async _compile(updated, diagnostics, request) {
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

        const process = async (sources, is) => {
            for (const source of sources.values()) {
                await this.#compile(is, source, updated, diagnostics, request);
                if (this._request !== request) return;
            }
        }

        await process(files, 'files');
        await process(extensions, 'extensions');
        overwrites && await process(overwrites, 'overwrites');
    }
}
