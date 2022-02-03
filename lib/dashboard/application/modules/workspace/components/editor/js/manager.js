/**
 * Map of editor's manager created.
 *
 * Each project has an EditorManager
 * @type {Map<any, any>}
 */
const managers = new Map();

/**
 * Manages the editor instances created by the panels
 *
 * Each panel has it's own editor
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
    /**
     * Represent the list of editor instances
     * @returns {Map<unknown, unknown>}
     */
    get items() {
        return this._items;
    }

    _favorites = new Map();
    get favorites() {
        return this._favorites;
    }

    _project
    get project() {
        return this._project;
    }

    get monaco() {
        return monacoDependency.monaco;
    }

    constructor(project) {
        super();
        this._instanceId = performance.now();
        this._project = project;

    }

    #dependencies = new Map();

    get(id) {
        return this.items.get(id);
    }

    /**
     * Creates a new Monaco Editor
     * @param specs
     * @returns {*}
     */
    create = specs => {
        if (this.items.has(specs.id)) return this.items.get(specs.id);
        const editor = new Editor(specs);
        this.items.set(specs.id, editor);
        if (!!this.#dependencies.size) {
            this._processEditorModels(editor);
        }
        return editor;
    }

    /**
     * Loads the sources of the module in all editor instances.
     *
     */
    setModuleManager(module) {

        module?.bundles?.items.forEach(bundle => {
            const process = () => {
                if (bundle.dependencies.ready) {

                    return;
                }
                bundle.dependencies.items.forEach(dependency => {
                    if (dependency.external) {
                        return console.log("la dependencia es externa")
                    }
                    this.#dependencies.set(dependency.id, dependency);
                });
                this._processSources();
            };
            if (!bundle.dependencies.ready) {
                bundle.dependencies.bind('change', process);
                return;
            }
            process();

        });

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
        this.#dependencies.forEach(dependency => {
            editor.setDependency(dependency.declaration.code, dependency.resource);
        })

    }

}

export function getEditorManager(project) {
    if (!project || !project.id) {
        console.error("cannot access to an undefined project");
        return;
    }
    if (managers.has(project.id)) return managers.get(project.id);

    let editorManager = new Manager(project);
    managers.set(project.id, editorManager);
    return editorManager;
}



