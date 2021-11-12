/**
 * Map of editor's manager created.
 *
 * Each application has an EditorManager
 * @type {Map<any, any>}
 */
const managers = new Map();

/**
 * Manages the editor instances created by the panels
 *
 */
class Manager extends ReactiveModel {

    /**
     * Map of available sources.
     *
     * The sources could be a entire module or a file.
     * @type {Map<any, any>}
     * @private
     */
    _sources = new Map();
    get sources() {
        return this._sources;
    }

    _instanceId;
    _items = new Map();
    get items() {
        return this._items;
    }

    _favorites = new Map();
    get favorites() {
        return this._favorites;
    }

    _application
    get application() {
        return this._application;
    }

    get monaco() {
        return monacoDependency.monaco;
    }

    constructor(application) {
        super();
        this._instanceId = performance.now();
        this._application = application;

    }

    get(id) {
        return this.items.get(id);
    }

    /**
     * Creates a new Monaco Editor
     * @param specs
     * @returns {*}
     */
    create = specs => {
        if (this.items.has(specs.id)) return;
        const editor = new Editor(specs);
        this.items.set(specs.id, editor);
        if (!!this.sources.size) {
            this._processEditorModels(editor);
        }
        return editor;
    }

    /**
     * Loads the sources of the module in all editor instances.
     *
     */
    setModule(module) {

        this.sources.set(module.id, module);
        if (!!this.items.size) {
            this._processSources(module);
        }
    }

    _processSources() {
        this.items.forEach(editor => this._processEditorModels(editor));
    }

    /**
     * Creates the models of the module
     * @param editor
     * @private
     */
    _processEditorModels(editor) {

        if (this._application.backend?.core?.path) {
            const {core} = this._application.backend;
            core.sources.items.forEach(source => editor.setDependency(source.code, `beyond_core/${source.basename}`));
        }

        if (this._application.backend?.sessions?.path) {
            const {sessions} = this._application.backend;
            sessions.sources.items.forEach(source => editor.setDependency(source, 'beyond_core'));
        }

        this.sources.forEach(source => {
            source.bundles.forEach(bundle => {
                bundle.dependencies?.items.forEach(dependency => {

                    if (!dependency.declaration) {
                        console.log("no tiene declaraciones", dependency.id)
                        return;
                    }
                    editor.setDependency(dependency.declaration.code, dependency.resource);
                });

            })

        });

    }

}

export function getEditorManager(application) {
    if (!application || !application.id) {
        console.error("cannot access to an undefined application");
        return;
    }
    if (managers.has(application.id)) return managers.get(application.id);

    let editorManager = new Manager(application);
    managers.set(application.id, editorManager);
    return editorManager;
}



