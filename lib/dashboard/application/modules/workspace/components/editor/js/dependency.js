/***
 * Loads the monaco dependency
 *
 * After load the monaco dependency sets the default editor settings and languages.
 * The object is a singleton.
 * Manages the models  to allow them to be shared between
 * different instances of the monaco editor.
 */
export class MonacoDependency extends ReactiveModel {

    _promise;
    _monaco;

    get monaco() {
        return this._monaco;
    }

    _models;
    get models() {
        return this._models;
    }

    _settings;
    get settings() {
        return this._settings;
    }

    constructor(props) {
        super(props);
        this.load();
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
            this._models = new Models(monaco);
            this._settings = new Settings();

        });
        return this._promise;
    }

    setConfig(specs) {

    }

    /**
     * TODO: the configuration needs accepts the definitions from the tsconfig file.
     * @private
     */
    _config() {
        this.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: false,
            noSyntaxValidation: false
        });

        this.monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            experimentalDecorators: true,
            allowSyntheticDefaultImports: true,
            jsx: this.monaco.languages.typescript.JsxEmit.React,
            moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            allowNonTsExtensions: true,
            // typeRoots: ["node_modules/@types"],
            target: monaco.languages.typescript.ScriptTarget.ES2020,
        });
    }
}

export const monacoDependency = new MonacoDependency();
