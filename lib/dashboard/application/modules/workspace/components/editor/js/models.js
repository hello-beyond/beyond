class Models extends ReactiveModel {

    _languages = Object.freeze({
        jsx: 'typescript',
        js: 'javascript',
        ts: 'typescript',
        scss: 'scss'
    });
    _items = new Map();

    get items() {
        return this._items;
    }

    _default;
    get default() {
        if (!this._default) this._default = this.monaco.editor.createModel("//your code here");
        return this._default;
    }

    _monaco;

    constructor(monaco) {
        super();
        this._monaco = monaco;
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
            uri = `${source.file}`.replace('C:', '');
            uri = `${source.file}`.replace('D:', '');
        }

        if (this._items.has(uri)) return this._items.get(uri);
        const model = this._monaco.editor.createModel(
            source.code,
            this._languages[processor],// language
            this._monaco.Uri.file(uri)// uri
        );

        //we save a local map for all files
        this._items.set(uri, model);

        return model;
    }
}
