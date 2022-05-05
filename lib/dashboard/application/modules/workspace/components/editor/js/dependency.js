/***
 * Loads the monaco dependency
 *
 * After load the monaco dependency sets the default editor settings and languages.
 * The object is a singleton.
 * Manages the models  to allow them to be shared between
 * different instances of the monaco editor.
 */
export class MonacoDependency extends ReactiveModel {

    #promise;
    #monaco;

    get monaco() {
        return this.#monaco;
    }

    #models;
    get models() {
        return this.#models;
    }

    #settings;
    get settings() {
        return this.#settings;
    }

    constructor(props) {
        super(props);
        this.load();
    }

    #ready;
    get ready() {
        return this.#ready;
    }

    load() {
        if (this.ready) return true;
        if (!this.ready && this.#promise) return this.#promise;
        this.#promise = new PendingPromise();
        require(['vs/editor/editor.main'], monaco => {
            this.#monaco = monaco;
            this.#ready = true;
            this.#config();
            this.#promise.resolve(true);
            this.#promise = undefined;
            this.triggerEvent();
            this.#models = new Models(monaco);
            this.#settings = new Settings();
        });
        return this.#promise;
    }

    setConfig(specs) {

    }

    #source;

    setSource(source) {
        this.#source = source;
    }

    /**
     * TODO: the configuration needs accepts the definitions from the tsconfig file.
     * @private
     */
    #config() {
        this.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: false,
            noSyntaxValidation: false
        });

        // this.monaco.languages.registerDocumentFormattingEditProvider('typescript', {
        //     provideDocumentFormattingEdits: async model => {
        //
        //         // const text = prettier.format(model.getValue(), {
        //         //     plugins: [babel, parserTs],
        //         //     singleQuote: true,
        //         // });
        //
        //         const {text} = await this.#source.format({
        //             filename: this.#source.filename,
        //             content: model.getValue()
        //         });
        //
        //         return [
        //             {range: model.getFullModelRange(), text}
        //         ]
        //     }
        // })
        this.monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            experimentalDecorators: true,
            allowSyntheticDefaultImports: true,
            jsx: this.monaco.languages.typescript.JsxEmit.React,
            moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            allowNonTsExtensions: true,
            reactNamespace: 'React',
            // typeRoots: ["node_modules/@types"],
            target: monaco.languages.typescript.ScriptTarget.ES2020,
        });
    }
}

export const monacoDependency = new MonacoDependency();
