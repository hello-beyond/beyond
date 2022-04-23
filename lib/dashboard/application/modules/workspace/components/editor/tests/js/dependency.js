export class MonacoDependency extends ReactiveModel {

    _promise;
    _monaco;
    _languages = Object.freeze({
        jsx: 'typescript',
        js: 'javascript',
        ts: 'typescript',
        scss: 'scss'
    })

    get monaco() {
        return this._monaco;
    }

    _models = new Map();
    get models() {
        return this._models;
    }

    _defaultModel;
    get defaultModel() {
        if (!this.monaco) return;
        if (!this._defaultModel) this._defaultModel = this.monaco.editor.createModel("//your code here");
        return this._defaultModel;
    }

    constructor(props) {
        super(props);
        this.load();
    }

    _config() {
        this.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: false,
            noSyntaxValidation: false
        });

        this.monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            experimentalDecorators: true,
            allowSyntheticDefaultImports: true,
            jsx: this.monaco.languages.typescript.JsxEmit.React
        });

    }

    load() {

        if (this.ready) return true;
        if (!this.ready && this._promise) return this._promise;
        this._promise = new PendingPromise();

        require(['vs/editor/editor.main'], monaco => {
            this._monaco = monaco;
            this._ready = true;
            this._config();
            this._promise.resolve(true);
            this._promise = undefined;
            this.triggerEvent();
        });
        return this._promise;
    }

    /**
     * Generates the model of a code
     * @param source
     * @param processor
     * @returns {V|*}
     */
    getModel(source, processor = 'ts') {

        const uri = `${source.file}`;

        if (this._models.has(uri)) return this._models.get(uri);

        const model = this.monaco.editor.createModel(
            source.code,
            this._languages[processor],// language
            this.monaco.Uri.file(uri) // uri
        );

        //we save a local map for all files
        this._models.set(uri, model);

        return model;
    }

}

export const monacoDependency = new MonacoDependency();