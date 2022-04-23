class Models extends ReactiveModel {

    #languages = Object.freeze({
        jsx: 'typescript',
        js: 'javascript',
        ts: 'typescript',
        scss: 'scss'
    });
    #items = new Map();

    get items() {
        return this.#items;
    }

    _default;
    get default() {
        if (!this._default) this._default = this.monaco.editor.createModel("//your code here");
        return this._default;
    }

    #monaco;

    constructor(monaco) {
        super();
        this.#monaco = monaco;
    }

    /**
     * Generates the model of a code
     * @param type
     * @param source
     * @param processor
     * @returns {V|*}
     */
    get(type, source, processor = 'ts') {
        let uri = '';
        if (type === 'dependency') {
            const path = '/node_modules/';
            uri = `${path}${source.label}.ts`;
        }
        else {
            uri = `${source.file}`.replace(/^[A-Z]:/, '');
        }
        if (this.#items.has(uri)) return this.#items.get(uri);

        const model = this.#monaco.editor.createModel(
            source.code,
            this.#languages[processor],// language
            this.#monaco.Uri.file(uri)// uri
        );
        //we save a local map for all files
        this.#items.set(uri, model);

        return model;
    }
}
